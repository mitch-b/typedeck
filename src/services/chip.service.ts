import { IChipService } from './chipService.interface'
import { IChip } from '../models/chip/chip.interface'
import { IChipCollection } from '../models/chipCollection/chipCollection.interface'
import { ChipColor } from '../models/chip/chipColor.model'
import { Chip } from '../models/chip/chip.model'
import { StandardChip } from '../models/chip/standardChip.model'
import { IterableExtensions } from '../common/iterableExtensions.model'

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
  public makeChange (
      chipCollection: IChipCollection,
      needValue: number,
      chipType: typeof Chip = StandardChip,
      colorUp: boolean = false): IChip[] {
    const currentValue = chipCollection.getValue()
    if (needValue > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${needValue}`)
    } else if (needValue <= 0) {
      throw new Error(`makeChange requires a positive Chip amount needed`)
    }

    if (colorUp && chipCollection.getChipCount() > 1) {
      const coloredUp = this.sortByValue(this.colorUp(chipCollection.getChips(), chipType))
      chipCollection.setChips(coloredUp)
    }

    // set aside high chips
    let chips = this.sortByValue(chipCollection.getChips())
    let highChips: IChip[] = []
    if (chipCollection.getChipCount() > 1) {
      let n = chipCollection.getChipCount() - 1
      while (n > 0) {
        if (this.valueOfChips(chips.slice(0, n)) >= needValue) {
          highChips.push(...chips.splice(n, 1))
        } else {
          break
        }
        n--
      }
    }

    let matchedCombination = this.hasCombinationOfAmount(needValue, chips)
    if (matchedCombination.length > 0) {
      chipCollection.removeChips(matchedCombination)
      return [...matchedCombination]
    }

    const breakChip = this.getNextChipToBreak(chips, needValue)
    chipCollection.removeChips([breakChip])
    const newChips = this.createChips(breakChip.getValue(), false, chipType)
    chipCollection.addChips([...newChips])

    return this.makeChange(chipCollection, needValue, chipType, false)
  }

  public sortByValue (chips: IChip[]): IChip[] {
    return Array.from(chips)
      .sort((a: IChip, b: IChip) => a.getValue() - b.getValue())
  }

  public createChips (
      amount: number,
      canBeSingleChip: boolean = true,
      chipType: typeof Chip = StandardChip): IChip[] {
    if (amount <= 0) {
      return []
    }
    let sampleChip = new chipType(ChipColor.White)
    let sortedChips = Array.from(sampleChip.valueMap.entries())
      .sort((a: [ChipColor, number], b: [ChipColor, number]) => {
        return a[1] - b[1]
      })
    const chipsThatCanFulfillValue = sortedChips
      .filter((combo: [ChipColor, number]) => combo[1] <= amount).length
    if (chipsThatCanFulfillValue === 1) {
      canBeSingleChip = true
    }
    let availableChips = sortedChips
      .filter((combo: [ChipColor, number]) =>
        canBeSingleChip ? combo[1] <= amount
                        : combo[1] < amount)
      .map<IChip>((entry: [ChipColor, number]) => new chipType(entry[0]))

    if (availableChips.length < 1) {
      throw new Error(`Incompatible Chip class to fulfill a value of '${amount}'`)
    }
    let index = availableChips.length - 1
    const createdChips: IChip[] = []
    while (amount >= availableChips[0].getValue()) {
      if (amount >= availableChips[index].getValue()) {
        amount -= availableChips[index].getValue()
        createdChips.push(availableChips[index])
      } else {
        index--
      }
    }
    return createdChips
  }

  public valueOfChips (chips: IChip[]): number {
    if (chips.length === 0) {
      return 0
    }
    return chips.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  }

  public colorUp (chips: IChip[], chipType: typeof Chip = StandardChip): IChip[] {
    const chipsValue = this.valueOfChips(chips)
    const canBeSingleChip = true
    return this.createChips(chipsValue, canBeSingleChip, chipType)
  }

  public hasCombinationOfAmount (amount: number, chips: IChip[]): IChip[] {
    const iteratedChips = this.sortByValue(chips)
    let size = chips.length
    while (size > 0) {
      for (let combination of IterableExtensions.Combinations(iteratedChips, size)) {
        if (this.valueOfChips(combination) === amount) {
          return [...combination]
        }
      }
      size--
    }
    return [] as IChip[]
  }

  public removeChipsFromStack (chips: IChip[], removeChips: IChip[]): IChip[] {
    removeChips.forEach((chip: IChip) => {
      for (let i = 0; i < chips.length; i++) {
        if (chips[i].getIndex() === chip.getIndex()) {
          chips.splice(i, 1)
          break
        }
      }
    })
    return chips
  }

  private getNextChipToBreak (chips: IChip[], needValue: number): IChip {
    const orderedChips = this.sortByValue(chips)
    const reverseOrderedChips = [...orderedChips].reverse()
    const pulledChips: IChip[] = []

    // find first largest chip at or under value
    let i = 0
    let runningTotal = 0
    while (i < reverseOrderedChips.length - 1) {
      const currentChip = reverseOrderedChips[i]
      const addedChipValue = runningTotal + currentChip.getValue()
      if (addedChipValue <= needValue) {
        runningTotal = addedChipValue
        pulledChips.push(currentChip)
      }
      i++
    }
    if (runningTotal > 0) {
      let remainingChips = this.removeChipsFromStack([...orderedChips], pulledChips)
      i = 0
      while (i < remainingChips.length - 1) {
        const currentChip = remainingChips[i]
        const addedChipValue = runningTotal + currentChip.getValue()
        if (addedChipValue <= needValue) {
          runningTotal = addedChipValue
        } else {
          // we found our breakchip at remainingChips[i]
          break
        }
        i++
      }
      return remainingChips[i]
    } else {
      return reverseOrderedChips[i]
    }
  }
}
