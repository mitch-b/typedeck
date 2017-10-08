import { ChipColorType } from './chipColorType.model'
import { ChipColor } from './chipColor.model'
import { Chip } from './chip.model'

/**
 * Represents a California valuing Chip
 */
export class CaliforniaChip extends Chip {
  constructor (
    color: ChipColor,
    colorType: ChipColorType = ChipColorType.California,
    overrideValue: number = 0) {
    super(color, colorType, overrideValue)
    this.configureDefaultColorValues()
  }

  private configureDefaultColorValues (): void {
    this
      .setColorValue(ChipColor.White, 1)
  }
}
