import { IChipService } from './chipService.interface'
import { IChip } from '../models/chip/chip.interface'
import { IChipCollection } from '../models/chipCollection/chipCollection.interface'
import { ChipColor } from '../models/chip/chipColor.model'
import { ChipCollection } from '../models/chipCollection/chipCollection.model'
import { Chip } from '../models/chip/chip.model'

export class ChipService implements IChipService {
  /**
   * The service should accept an `IChipCollection` and
   * a requested specific amount of chip value, and be able to
   * "break" or "make change" to swap out chips to meet that
   * exact need. These chips are removed from the incoming
   * `chipCollection` and the return value are chips that
   * match the `needValue` requested.
   * @param chipCollection Chips to create `needValue` from
   * @param needValue Amount requested from chips
   * @param chipClass Class of Chip to return
   */
  makeChange (
      chipCollection: IChipCollection,
      needValue: number,
      chipClass: typeof Chip): IChip[] {

    const currentValue = chipCollection.getValue()
    if (needValue > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${needValue}`)
    } else if (needValue <= 0) {
      throw new Error(`makeChange requires a positive Chip amount needed`)
    }

    const orderedChips = chipCollection.getChips().sort((a: IChip, b: IChip) => a.getValue() - b.getValue())
    let pulledChips: IChipCollection = new ChipCollection()

    // check if chipCollection contains a single chip to fulfill needValue
    for (const chip of orderedChips) {
      if (chip.getValue() === needValue) {
        chipCollection.removeChips([chip])
        return [chip]
      } else if (chip.getValue() > needValue) {
        break
      }
    }

    // check if we can add up multiple chips to fulfill needValue
    let i = 0
    while (pulledChips.getValue() < needValue) {
      pulledChips.addChip(orderedChips[i++])
      if (pulledChips.getValue() + orderedChips[i].getValue() > needValue) {
        break
      }
    }
    if (pulledChips.getValue() === needValue) {
      chipCollection.removeChips(pulledChips.getChips())
      return [...pulledChips.getChips()]
    }

    // eat up smaller chips and break up next large chip to fulfill needValue
    pulledChips.setChips([])
    i = 0
    while (pulledChips.getValue() < needValue) {
      pulledChips.addChip(orderedChips[i++])
      if (pulledChips.getValue() + orderedChips[i].getValue() > needValue) {
        break
      }
    }

    // break up orderedChips[i]
    const breakChip = orderedChips[i]
    chipCollection.removeChips([breakChip])

    let newChip = new chipClass(ChipColor.White)
    console.log(newChip.valueMap.keys())

    let sortedColorValues = Array.from(newChip.valueMap.entries()).sort((a: [ChipColor, number], b: [ChipColor, number]) => {
      return a[1] - b[1]
    })
    for (let c of sortedColorValues) {
      
    }

    return []
  }

  // Consolidate chips into higher value chips if possible
  // consolidate(chipCollection: IChipCollection)
}
