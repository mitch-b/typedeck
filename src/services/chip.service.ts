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
      chipType: typeof Chip = StandardChip,
      colorUp: boolean = false): IChip[] {
    const currentValue = chipCollection.getValue()
    if (needValue > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${needValue}`)
    } else if (needValue <= 0) {
      throw new Error(`makeChange requires a positive Chip amount needed`)
    }

    if (colorUp && chipCollection.getChipCount() > 1) {
      console.log(`Looking to make change of ${needValue} from ${chipCollection.getValue()}`)
      console.log(`Coloring Up ${chipCollection.toString()}`)
      const coloredUp = this.sortByValue(this.colorUp(chipCollection.getChips(), chipType))
      chipCollection.setChips(coloredUp)
      console.log(`After coloring up: ${chipCollection.toString()}`)
    }

    let matchedCombination = this.hasCombinationOfAmount(needValue, chipCollection.getChips())
    if (matchedCombination.length > 0) {
      // success!
      chipCollection.removeChips(matchedCombination)
      return [...matchedCombination]
    }

    const breakChip = this.getNextChipToBreak(chipCollection.getChips(), needValue)
    console.log(`Next chip to break is a ${breakChip.getValue()}`)
    chipCollection.removeChips([breakChip])
    const newChips = this.createChips(breakChip.getValue(), false, chipType)
    chipCollection.addChips([...newChips])

    return this.makeChange(chipCollection, needValue, chipType, false)
  }

  public sortByValue (chips: IChip[]): IChip[] {
    return [...chips]
      .sort((a: IChip, b: IChip) => a.getValue() - b.getValue())
  }

  public createChips (
      amount: number,
      canBeSingleChip: boolean = true,
      chipType: typeof Chip = StandardChip): IChip[] {
    console.log(`Creating ${amount} chips`)
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

  public getNextChipToBreak (chips: IChip[], needValue: number): IChip {
    const orderedChips = this.sortByValue(chips)
    const reverseOrderedChips = [...orderedChips].reverse()

    console.log(`Breaking chips for ${needValue}`)
    console.log(`Have: ${chips.map((chip) => chip.getValue())}`)
    console.log(`orderedChips: ${orderedChips.map((chip) => chip.getValue())}`)
    console.log(`reverseOrderedChips: ${reverseOrderedChips.map((chip) => chip.getValue())}`)

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

  public colorUp (chips: IChip[], chipType: typeof Chip = StandardChip): IChip[] {
    const chipsValue = this.valueOfChips(chips)
    const singleChipAllowed = true
    console.log(`Coloring up! ${chipsValue}`)
    return this.createChips(chipsValue, singleChipAllowed, chipType)
  }

  public hasCombinationOfAmount (amount: number, chips: IChip[]): IChip[] {
    const iteratedChips = this.sortByValue(chips)

    let size = chips.length
    while (size > 0) {
      console.log(`Trying a size of ${size} of chips to fulfill ${amount} from ${iteratedChips.map((c) => c.getValue())}`)
      for (let combination of this.combinations(iteratedChips, size)) {
        if (this.valueOfChips(combination) === amount) {
          console.log(`Found ${amount} in ${combination.map((c) => c.getValue())}`)
          return [...combination]
        }
      }
      size--
    }
    return []
  }

  public* combinations<T> (iterable: T[], r: number): IterableIterator<T[]> {
    let pool = Array.from(iterable)
    let len = pool.length
    if (r > len) {
      return []
    }

    let indices = Array.from(this.range(0 , r , 1))

    yield Array.from(this.pick(pool, indices))

    while ( true ) {
      let i = r - 1
      while (true) {
        if ( i < 0 ) {
          return []
        }
        if (indices[i] !== i + len - r) {
          let pivot = ++indices[i]
          for (++i; i < r ; ++i ) {
            indices[i] = ++pivot
          }
          break
        }
        --i
      }
      yield Array.from(this.pick(pool, indices))
    }
  }

  public* pick (object: any, iterable: any) {
    for (let key of iterable) {
      yield object[key]
    }
  }

  public* range (start: number, stop: number, step: number) {
    if (step < 0) {
      for ( ; start > stop; start += step) yield start
    } else {
      for ( ; start < stop; start += step) yield start
    }
  }
}
