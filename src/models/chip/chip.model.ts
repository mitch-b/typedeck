import { IChip } from './chip.interface'
import { ChipColor } from './chipColor.model'
import { ChipColorType } from './chipColorType.model'

/**
 * Represents a generic chip - typically used
 * in Poker style games.
 */
export class Chip implements IChip {
  public valueMap = new Map<ChipColor, number>()

  constructor (
    public color: ChipColor,
    public colorType: ChipColorType = ChipColorType.Standard,
    public overrideValue: number = 0) {
  }

  public toString (): string {
    return `${ChipColor[this.color]}`
  }

  public getValue (_color: ChipColor = this.color): number {
    if (this.overrideValue !== 0) {
      return this.overrideValue
    }
    if (this.valueMap.has(_color)) {
      return this.valueMap.get(_color) as number
    } else {
      throw new Error(
        // tslint:disable-next-line:max-line-length
        `Unable to determine value of ${ChipColor[_color]} Chip for ${ChipColorType[this.colorType]}`
      )
    }
  }

  public setValue (amount: number): this {
    this.overrideValue = amount
    return this
  }

  public setColorValue (color: ChipColor, amount: number): this {
    this.valueMap.set(color, amount)
    return this
  }

  public getIndex (): string {
    return this.toString()
  }
}
