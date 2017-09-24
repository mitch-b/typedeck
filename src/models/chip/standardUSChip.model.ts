import { ChipColorType } from './chipColorType.model'
import { Chip } from './chip.model'
import { IChip } from './chip.interface'
import { ChipColor } from './chipColor.model'

/**
 * Represents a StandardUS valuing Chip
 */
export class StandardUSChip extends Chip implements IChip {
  public value = this.getValue()
  public colorType = ChipColorType.StandardUS

  constructor (
    public color: ChipColor) {
    super(color)
  }

  public toString (): string {
    return `${ChipColor[this.color]}`
  }

  public getValue (color: ChipColor = this.color) {
    switch (color) {
      case ChipColor.White:
        return 1
      case ChipColor.Pink:
        return 2.5
      case ChipColor.Red:
        return 5
      case ChipColor.Green:
      case ChipColor.Yellow:
        return 25
      case ChipColor.Blue:
        return 50
      case ChipColor.Black:
        return 100
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
