import { ChipColorType } from './chipColorType.model'
import { Chip } from './chip.model'
import { IChip } from './chip.interface'
import { ChipColor } from './chipColor.model'

/**
 * Represents a California valuing Chip
 */
export class CaliforniaChip extends Chip implements IChip {
  public value = this.getValue()
  public colorType = ChipColorType.California

  constructor (
    public color: ChipColor) {
    super(color)
  }

  public toString (): string {
    return `${ChipColor[this.color]}`
  }

  public getValue (color: ChipColor = this.color) {
    // TODO: implement valuation of chip colors
    switch (color) {
      case ChipColor.White:
        return 1
      default:
        throw new Error(
          // tslint:disable-next-line:max-line-length
          `Unable to determine value of ${ChipColor[this.color]} Chip for ${ChipColorType[this.colorType]}`
        )
    }
  }

  public getIndex (): string {
    return this.toString()
  }
}
