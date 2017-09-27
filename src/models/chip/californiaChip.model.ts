import { ChipColorType } from './chipColorType.model'
import { ChipColor } from './chipColor.model'
import { Chip } from './chip.model'

/**
 * Represents a California valuing Chip
 */
export class CaliforniaChip extends Chip {
  public colorType = ChipColorType.California

  constructor (
    public color: ChipColor) {
    super(color)
  }

  public toString (): string {
    return `${ChipColor[this.color]}`
  }

  public getValue (_color: ChipColor = this.color) {
    // TODO: implement valuation of chip colors
    switch (_color) {
      case ChipColor.White:
        return 1
      default:
        throw new Error(
          // tslint:disable-next-line:max-line-length
          `Unable to determine value of ${ChipColor[_color]} Chip for ${ChipColorType[this.colorType]}`
        )
    }
  }

  public getIndex (): string {
    return this.toString()
  }
}
