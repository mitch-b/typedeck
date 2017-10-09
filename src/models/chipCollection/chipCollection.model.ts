import { IChip } from '../chip/chip.interface'
import { IChipCollection } from './chipCollection.interface'
import { IObjectComparer } from '../../common/objectComparer.interface'
import { StringifyComparer } from '../../common/stringifyComparer.model'
import { IChipService } from '../../services/chipService.interface'
import { ChipService } from '../../services/chip.service'
import { StandardUSChip } from '../chip/standardUSChip.model'

/**
 * Basic class to represent a grouping of IChips.
 *
 * Supports activities like: getting chips,
 * adding chips, taking specific chip, taking
 * chips by value, getting value of chips.
 */
export class ChipCollection implements IChipCollection {
  private objectComparer: IObjectComparer = new StringifyComparer()
  private chipService: IChipService = new ChipService()

  constructor (private chips: IChip[] = []) {
  }

  public addChip (chip: IChip): this {
    return this.addChips([chip])
  }

  public addChips (chips: IChip[]): this {
    this.getChips().unshift(...chips)
    return this
  }

  public getChips (): IChip[] {
    return this.chips
  }

  public setChips (chips: IChip[]): this {
    this.chips = chips
    return this
  }

  public getChipCount (): number {
    return this.getChips().length
  }

  public isEmpty (): boolean {
    return this.getChipCount() === 0
  }

  public removeChips (chips: IChip[]): IChipCollection {
    chips.forEach((chip: IChip) => {
      const position: number = this.indexOfChip(chip)
      if (position > -1) {
        this.getChips().splice(position, 1)
      } else {
        throw new Error('Chip does not exist in collection')
      }
    })
    return this
  }

  /**
   * Returns first identified index position of chip in
   * collection.
   * @param chip Object to search for in collection
   */
  public indexOfChip (chip: IChip): number {
    for (let i = 0; i < this.getChipCount(); i++) {
      const loopCard = this.getChips()[i] as IChip
      if (this.objectComparer.areEquivalent(chip, loopCard)) {
        return i
      }
    }
    return -1
  }

  /**
   * Return value of Chips currently in ChipCollection (via `IChipCollection.getChips()`).
   * Optionally, can pass in `IChip[]` to evaluate a manually passed in value.
   * @param chips Optional, value of passed in chips. If no chips passed in,
   * it will evaluate value of current ChipCollection.
   */
  public getValue (chips?: IChip[] | undefined): number {
    if (chips === undefined) {
      chips = this.getChips()
    }
    return chips.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  }

  /**
   * Will pull `IChip`s from `IChipCollection` to satisfy
   * the `amount` requested.
   * @param amount Value to take from IChipCollection
   */
  public takeValue (amount: number): IChip[] {
    const currentValue = this.getValue()
    if (amount > currentValue) {
      throw new Error(`Not enough chips (${currentValue}) to satisfy requested amount ${amount}`)
    }
    console.log(this.getChips())
    let newChips = this.chipService.makeChange(this, amount, StandardUSChip)
    console.log(this.getChips())
    return newChips
  }
}
