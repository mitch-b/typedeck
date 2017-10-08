import { ChipColorType } from './chipColorType.model'
import { ChipColor } from './chipColor.model'
import { Chip } from './chip.model'

/**
 * Represents a StandardUS valuing Chip
 */
export class StandardUSChip extends Chip {
  constructor (
    color: ChipColor,
    colorType: ChipColorType = ChipColorType.StandardUS,
    overrideValue: number = 0) {
    super(color, colorType, overrideValue)
    this.configureDefaultColorValues()
  }

  private configureDefaultColorValues (): void {
    this
      .setColorValue(ChipColor.White, 1)
      .setColorValue(ChipColor.Pink, 2.5)
      .setColorValue(ChipColor.Red, 5)
      .setColorValue(ChipColor.Green, 25)
      .setColorValue(ChipColor.Yellow, 25)
      .setColorValue(ChipColor.Blue, 50)
      .setColorValue(ChipColor.Black, 100)
  }
}
