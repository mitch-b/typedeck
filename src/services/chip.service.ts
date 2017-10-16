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
      .sort((a: IChip, b: IChip) => a.getValue() - b.getValue())
    const reversedChips = [...orderedChips].reverse()

    // Diagnostics
    console.log(`Analyzing Chips to get ${needValue}`)
    console.log(
      orderedChips.map((chip: IChip) => chip.getValue())
    )

    let matchedCombination = this.hasCombinationOfAmount(needValue, orderedChips)
    if (matchedCombination.length > 0) {
      console.log(`Success [1]! ${needValue}`)
      console.log(
        orderedChips.map((chip: IChip) => chip.getValue())
      )
      // success!
      chipCollection.removeChips(matchedCombination)
      return [...matchedCombination]
    }

    // ask for: 27
    // has: 1, 1, 5, 10, 20, 100
    // has: 5, 10, 10, 10

    // ask for: 20
    // has: 10, 100
    // has 10, 25, 25, 25, 25
    // has 5, 10, 10, 10, 25, 25, 25 ( how do i find the 2 '10's? )

    let pulledChips: IChip[] = this.chipsUnderOrEqualToValue(needValue, reversedChips)
    let breakChip: IChip = reversedChips[pulledChips.length]
    if (pulledChips.length === 0) {
      pulledChips = this.chipsUnderOrEqualToValue(needValue, orderedChips)
      breakChip = orderedChips[pulledChips.length]
    }
    const amountCanBePulledUnderNeedValue = this.valueOfChips(pulledChips)

    if (!breakChip) {
      throw new Error(`Couldn't determine breakChip`)
    }

    // orderedChips[i] is a chip that when added to our currently pulled chips,
    // is larger than our requested amount. we should break it up into smaller denominations
    // to allow us to meet the specific requested amount
    console.log(`Right now, can only pull ${amountCanBePulledUnderNeedValue}`)
    console.log(`Breaking: ${breakChip}`)
    chipCollection.removeChips([breakChip])
    const newChips = this.createChipsFromAmount(breakChip.getValue(), chipType)
    console.log(`Broke ${breakChip} into: ${newChips.map((c: IChip) => c.getValue())}`)
    chipCollection.addChips([...newChips])

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
    if (pulledChips.getValue() > needValue) {
      return [] as IChip[]
    }
    return [...pulledChips.getChips()]
  }

  /**
   * https://codereview.stackexchange.com/a/7025
   * @param amount
   * @param chips
   */
  private hasCombinationOfAmount (amount: number, chips: IChip[]): IChip[] {
    const iteratedChips = [...chips]
    const options: IChip[][] = []
    console.log(`Querying for options of ${iteratedChips.map((chip) => chip.getValue())}`)
    let fn = function (temp: IChip[], iteratedChips: IChip[], options: IChip[][]) {
      if (!temp && !iteratedChips) {
        return undefined
      }
      if (!iteratedChips || iteratedChips.length === 0) {
        options.push(temp)
      } else {
        fn([...temp, iteratedChips[0]], iteratedChips.slice(1), options)
        fn(temp, iteratedChips.slice(1), options)
      }
      return options
    }
    let availableOptions = fn([] as IChip[], iteratedChips, options)
    let matchingOptions = (availableOptions as IChip[][])
      .filter((chipArr: IChip[]) => this.valueOfChips(chipArr) === amount)
      .sort((a: IChip[], b: IChip[]) => b.length - a.length)

    if (matchingOptions.length > 0) {
      return matchingOptions[0]
    } else {
      return [] as IChip[]
    }
  }
}
