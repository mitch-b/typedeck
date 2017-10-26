import { IChipService } from './chipService.interface'
import { IChip } from '../models/chip/chip.interface'
import { IChipCollection } from '../models/chipCollection/chipCollection.interface'
import { ChipColor } from '../models/chip/chipColor.model'
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
  public makeChange (
      chipCollection: IChipCollection,
      needValue: number,
      chipType: typeof Chip = StandardChip): IChip[] {
    const currentValue = chipCollection.getValue()
    if (needValue > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${needValue}`)
    } else if (needValue <= 0) {
      throw new Error(`makeChange requires a positive Chip amount needed`)
    }

    let matchedCombination = this.hasCombinationOfAmount(needValue, chipCollection.getChips())
    if (matchedCombination.length > 0) {
      // success!
      chipCollection.removeChips(matchedCombination)
      return [...matchedCombination]
    }

    const breakChip = this.getNextChipToBreak(chipCollection.getChips(), needValue)

    chipCollection.removeChips([breakChip])
    const newChips = this.createChips(breakChip.getValue(), false, chipType)
    chipCollection.addChips([...newChips])

    return this.makeChange(chipCollection, needValue, chipType)
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
      .filter((combo: [ChipColor, number]) =>
        canBeSingleChip ? combo[1] <= amount
                        : combo[1] < amount)
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

    return createdChips
  }

  public valueOfChips (chips: IChip[]): number {
    if (chips.length === 0) {
      return 0
    }
    return chips.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  }

  public getNextChipToBreak (chips: IChip[], needValue: number): IChip {
    const orderedChips = chips
      .sort((a: IChip, b: IChip) => a.getValue() - b.getValue())
    const reverseOrderedChips = [...orderedChips].reverse()

    // find first largest chip at or under value
    let i = 0
    let runningTotal = 0
    // TODO: can i swap out while() loops for .filter() IChip[] results?
    while (i < reverseOrderedChips.length - 1) {
      const currentChip = reverseOrderedChips[i]
      const addedChipValue = runningTotal + currentChip.getValue()
      if (addedChipValue <= needValue) {
        runningTotal = addedChipValue
      }
      i++
    }
    if (runningTotal > 0) {
      i = 0
      while (i < orderedChips.length - 1) {
        const currentChip = orderedChips[i]
        const addedChipValue = runningTotal + currentChip.getValue()
        if (addedChipValue <= needValue) {
          runningTotal = addedChipValue
        } else {
          // we found our breakchip at orderedChips[i]
          break
        }
        i++
      }
      return orderedChips[i]
    } else {
      return reverseOrderedChips[i]
    }
  }

  public hasCombinationOfAmount (amount: number, chips: IChip[]): IChip[] {
    const iteratedChips = [...chips]
      .sort((a: IChip, b: IChip) => a.getValue() - b.getValue())
    const matches: IChip[][] = []

    let valueOfChips = (chips: IChip[]): number => {
      return chips.reduce((a: number, b: IChip) => a + b.getValue(), 0)
    }

    /**
     * http://js-algorithms.tutorialhorizon.com/2015/10/23/combinations-of-an-array/
     * @param chips
     * @param singleResult
     */
    let combinations = (chips: IChip[]): void => {
      let i = 0
      let j = 0
      let totalCombinations = Math.pow(2, chips.length)

      for (i = 0; i < totalCombinations; i++) {
        let temp: IChip[] = []
        for (j = 0; j < chips.length; j++) {
          if ((i & Math.pow(2, j))) {
            temp.push(chips[j])
            const chipsValue = valueOfChips(temp)
            if (chipsValue === amount) {
              matches.push([...temp])
              return
            } else if (chipsValue > amount) {
              break
            }
          }
        }
      }
      return
    }

    combinations(iteratedChips)

    if (matches.length > 0) {
      return matches[0]
    } else {
      return [] as IChip[]
    }
  }
}
