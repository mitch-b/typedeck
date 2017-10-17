import { IChip } from '../models/chip/chip.interface'
import { Chip } from '../models/chip/chip.model'
import { IChipCollection } from '../models/chipCollection/chipCollection.interface'

/**
 * Every theme should be a new instance
 * of an ICardImageService.
 */
export interface IChipService {
  /**
   * The service should accept an `IChipCollection` and
   * a requested specific amount of chip value, and be able to
   * "break" or "make change" to swap out chips to meet that
   * exact need. These chips are removed from the incoming
   * `chipCollection` and the return value are chips that
   * match the `needValue` requested.
   */
  makeChange (chipCollection: IChipCollection, needValue: number, chipType: typeof Chip): IChip[]

  /**
   * Given an amount, and a `Chip` class
   * that has a specified `IChip.valueMap`,
   * return an `IChip[]` that has a value to
   * match requested `amount`
   */
  createChips (
    amount: number,
    canBeSingleChip: boolean,
    chipType: typeof Chip): IChip[]

  /**
   * Return sum of each `IChip.getValue()`
   */
  valueOfChips (chips: IChip[]): number

  /**
   * Returns an `IChip[]` which contains
   * chips whose sum is less than or equal
   * to the requested amount based on provided
   * chips.
   */
  chipsUnderOrEqualToValue (needValue: number, chips: IChip[]): IChip[]
}
