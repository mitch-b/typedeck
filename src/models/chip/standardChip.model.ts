import { ChipColorType } from './chipColorType.model'
import { ChipColor } from './chipColor.model'
import { Chip } from './chip.model'

/**
 * Represents a Standard valuing Chip
 */
export class StandardChip extends Chip {
  constructor (
    color: ChipColor,
    colorType: ChipColorType = ChipColorType.Standard,
    overrideValue: number = 0) {
    super(color, colorType, overrideValue)
    this.configureDefaultColorValues()
  }

  private configureDefaultColorValues (): void {
    this
      .setColorValue(ChipColor.White, 1)
      .setColorValue(ChipColor.Red, 5)
      .setColorValue(ChipColor.Blue, 10)
      .setColorValue(ChipColor.Gray, 20)
      .setColorValue(ChipColor.Green, 25)
      .setColorValue(ChipColor.Black, 100)
  }
}
