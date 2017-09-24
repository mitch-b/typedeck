import { MapIndexable } from '../../common/mapIndexable.interface'
import { IChip } from './chip.interface'
import { ChipColor } from './chipColor.model'
import { ChipColorType } from './chipColorType.model'

/**
 * Represents a generic chip - typically used
 * in Poker style games.
 */
export class Chip implements IChip, MapIndexable {
  public value = this.getValue()

  constructor (
    public color: ChipColor,
    public colorType: ChipColorType = ChipColorType.StandardUS) {
  }

  public toString (): string {
    return `${ChipColor[this.color]}`
  }

  public getValue (_color?: ChipColor): number {
    return 0
  }

  public getIndex (): string {
    return this.toString()
  }
}
