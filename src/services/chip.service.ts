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
    const currentValue = chipCollection.getValue()
    if (needValue > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${needValue}`)
    } else if (needValue <= 0) {
      throw new Error(`makeChange requires a positive Chip amount needed`)
    }

    const orderedChips = chipCollection.getChips()
                          .sort((a: IChip, b: IChip) => b.getValue() - a.getValue())
                          // .filter((chip: IChip) => chip.getValue() <= needValue)
    const reverseOrderedChips = [...orderedChips.reverse()]

    // check if chipCollection contains a single chip to fulfill needValue
    for (const chip of orderedChips) {
      if (chip.getValue() === needValue) {
        chipCollection.removeChips([chip])
        console.log(`Solved! [1]: ${needValue}`)
        console.log(
          orderedChips.map((chip: IChip) => chip.getValue())
        )
        return [chip]
      } else if (chip.getValue() > needValue) {
        break
      }
    }

    // check if we can add up multiple chips to fulfill needValue
    // check backwards first
    let pulledChips: IChip[] = this.chipsUnderOrEqualToValue(needValue, reverseOrderedChips)
    if (this.valueOfChips(pulledChips) === needValue) {
      chipCollection.removeChips(pulledChips)
      console.log(`Solved! [2]: ${needValue}`)
      console.log(
        orderedChips.map((chip: IChip) => chip.getValue())
      )
      return [...pulledChips]
    }

    // check forwards next
    pulledChips = this.chipsUnderOrEqualToValue(needValue, orderedChips)
    const amountCanBePulledUnderNeedValue = this.valueOfChips(pulledChips)
    if (amountCanBePulledUnderNeedValue === needValue) {
      chipCollection.removeChips(pulledChips)
      console.log(`Solved! [3]: ${needValue}`)
      console.log(
        orderedChips.map((chip: IChip) => chip.getValue())
      )
      return [...pulledChips]
    }
    // ask for: 27
    // has: 1, 1, 5, 10, 20, 100
    // has: 5, 10, 10, 10

    // Diagnostics
    console.log(`Analyzing Chips to get ${needValue}`)
    console.log(
      orderedChips.map((chip: IChip) => chip.getValue())
    )

    let i = 0
    let j = 0
    let chipz = new ChipCollection()
    while (i < orderedChips.length) {
      chipz.addChip(orderedChips[i])
      j = i + 1
      while (chipz.getValue() < needValue &&
        j < orderedChips.length) {
        chipz.addChip(orderedChips[i + (j++)])
      }
      if (chipz.getChipCount() === 1) {
        break // since it's ordered, we can't do better by continuing
      }
      if (chipz.getValue() === needValue) {
        chipCollection.removeChips(chipz.getChips())
        console.log(`Solved! [4]: ${needValue}`)
        console.log(
          orderedChips.map((chip: IChip) => chip.getValue())
        )
        return [...chipz.getChips()]
      }
      chipz = new ChipCollection()
      i++
    }

    // ask for: 20
    // has: 10, 100
    // has 10, 25, 25, 25, 25
    // has 5, 10, 10, 10, 25, 25, 25 ( how do i find the 2 '10's? )
    const breakChip = orderedChips[pulledChips.length]

    if (!breakChip) {
      throw new Error(`Couldn't determine breakChip`)
    }

    // orderedChips[i] is a chip that when added to our currently pulled chips,
    // is larger than our requested amount. we should break it up into smaller denominations
    // to allow us to meet the specific requested amount
    const remainingValueNeeded = (needValue - amountCanBePulledUnderNeedValue)
    chipCollection.removeChips([breakChip])
    chipCollection.addChips([...this.createChipsFromAmount(breakChip.getValue(), chipType)])

    if (remainingValueNeeded === needValue) {
      throw new Error('Available chips in chipClass cannot be used to generate change requested')
    }

    return this.makeChange(chipCollection, needValue, chipType)
  }

  public createChipsFromAmount (amount: number, chipType: typeof Chip = StandardChip): IChip[] {
    let sampleChip = new chipType(ChipColor.White)
    let sortedChips = Array.from(sampleChip.valueMap.entries())
      .sort((a: [ChipColor, number], b: [ChipColor, number]) => {
        return a[1] - b[1]
      })
      .filter((combo: [ChipColor, number]) => combo[1] < amount)
      .map<Chip>((entry: [ChipColor, number]) => new chipType(entry[0]))

    if (sortedChips.length < 1) {
      throw new Error(`Incompatible Chip class to fulfill a value of '${amount}'`)
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

  public valueOfChips (chips: IChip[]): number {
    if (!chips || chips.length === 0) {
      return 0
    }
    return chips.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  }

  private chipsUnderOrEqualToValue (needValue: number, chips: IChip[]): IChip[] {
    const pulledChips = new ChipCollection()
    let i = 0
    while (pulledChips.getValue() < needValue) {
      pulledChips.addChip(chips[i++])
      if (chips[i]) {
        if (pulledChips.getValue() + chips[i].getValue() > needValue) {
          break
        }
      } else {
        break
      }
    }
    return [...pulledChips.getChips()]
  }
}
