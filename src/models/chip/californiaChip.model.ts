import { ChipColorType } from './chipColorType.model';
import { ChipColor } from './chipColor.model';
import { Chip } from './chip.model';

/**
 * Represents a California valuing Chip
 */
export class CaliforniaChip extends Chip {
  constructor (
    color: ChipColor,
    colorType: ChipColorType = ChipColorType.California,
    overrideValue: number = 0) {
    super(color, colorType, overrideValue);
    this.configureDefaultColorValues();
  }

  private configureDefaultColorValues (): void {
    this
      .setColorValue(ChipColor.Blue, 1)
      .setColorValue(ChipColor.Green, 2)
      .setColorValue(ChipColor.Red, 3)
      .setColorValue(ChipColor.Yellow, 5)
      .setColorValue(ChipColor.Brown, 10)
      .setColorValue(ChipColor.Black, 20)
      .setColorValue(ChipColor.Purple, 25)
      .setColorValue(ChipColor.White, 100)
      .setColorValue(ChipColor.Gray, 500);
  }
}
