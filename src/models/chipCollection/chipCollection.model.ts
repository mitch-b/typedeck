import { IChip } from '../chip/chip.interface'
import { IChipCollection } from './chipCollection.interface'
import { IObjectComparer } from '../../common/objectComparer.interface'
import { StringifyComparer } from '../../common/stringifyComparer.model'
import { IChipService } from '../../services/chipService.interface'
import { ChipService } from '../../services/chip.service'

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

  public toString (): string {
    return JSON.stringify(this.getChips().map((chip: IChip) => chip.getValue()))
  }

  public removeChips (chips: IChip[]): IChipCollection {
    if (chips.length === 0) {
      return this
    }
    this.chipService.removeChipsFromStack(this.getChips(), chips)
    return this
  }

  public colorUp (canBeSingleChip: boolean = true): IChipCollection {
    if (this.getChipCount() === 0) {
      return this
    }
    const newChips = this.chipService.colorUp(this.getChips(), canBeSingleChip, this.getChips()[0].constructor as any)
    this.setChips(newChips)
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
    return this.chipService.valueOfChips(chips)
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
    return this.chipService.makeChange(this, amount, this.getChips()[0].constructor as any)
  }
}
