import { IChipService } from './chipService.interface'
import { IChip } from '../models/chip/chip.interface'
import { IChipCollection } from '../models/chipCollection/chipCollection.interface'
import { ChipColor } from '../models/chip/chipColor.model'
import { ChipCollection } from '../models/chipCollection/chipCollection.model'
import { Chip } from '../models/chip/chip.model'
import { StandardChip } from '../models/chip/standardChip.model'

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
   * @param chipType Class of Chip to return
   */
  public makeChange (chipCollection: IChipCollection, needValue: number, chipType: typeof Chip = StandardChip): IChip[] {
    console.log(`Requesting change from a collection that has ${chipCollection.getChipCount()} chips in it`)
    const currentValue = chipCollection.getValue()
    if (needValue > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${needValue}`)
    } else if (needValue <= 0) {
      throw new Error(`makeChange requires a positive Chip amount needed`)
    }

    const orderedChips = chipCollection.getChips().sort((a: IChip, b: IChip) => a.getValue() - b.getValue())

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
    let pulledChips: IChipCollection = new ChipCollection()
    let i = 0
    while (pulledChips.getValue() < needValue) {
      pulledChips.addChip(orderedChips[i++])
      if (orderedChips[i]) {
        if (pulledChips.getValue() + orderedChips[i].getValue() > needValue) {
          break
        }
      } else {
        break
      }
    }
    if (pulledChips.getValue() === needValue) {
      chipCollection.removeChips(pulledChips.getChips())
      return [...pulledChips.getChips()]
    }

    // orderedChips[i] is a chip that when added to our currently pulled chips,
    // is larger than our requested amount. we should break it up into smaller denominations
    // to allow us to meet the specific requested amount
    const breakChip = orderedChips[i]
    const remainingValueNeeded = (needValue - pulledChips.getValue())
    chipCollection.removeChips([breakChip])
    chipCollection.addChips([...this.createChipsFromAmount(breakChip.getValue(), chipType)])

    if (remainingValueNeeded === needValue) {
      throw new Error('Available chips in chipClass cannot be used to generate change requested')
    }

    return this.makeChange(chipCollection, needValue, chipType)
  }

  public createChipsFromAmount (amount: number, chipType: typeof Chip): IChip[] {
    let sampleChip = new chipType(ChipColor.White)
    let sortedChips = Array.from(sampleChip.valueMap.entries())
      .sort((a: [ChipColor, number], b: [ChipColor, number]) => {
        return a[1] - b[1]
      })
      .filter((combo: [ChipColor, number]) => combo[1] < amount)
      .map((entry: [ChipColor, number]) => new chipType(entry[0]))

    if (sortedChips.length < 1) {
      throw new Error(`Incompatible Chip class to fulfill ${amount}`)
    }

    let index = sortedChips.length - 1
    const createdChips: IChip[] = []
    while (amount >= sortedChips[0].getValue()) {
      if (amount >= sortedChips[index].getValue()) {
        amount -= sortedChips[index].getValue()
        createdChips.push(sortedChips[index])
      } else {
        index--
      }
    }
    // console.log(`Creating chips to meet need`)
    // console.log(createdChips)
    return createdChips
  }

  // Consolidate chips into higher value chips if possible
  // consolidate(chipCollection: IChipCollection)
}
