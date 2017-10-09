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
  makeChange (chipCollection: IChipCollection, needValue: number, chipClass: typeof Chip): IChip[]
}
