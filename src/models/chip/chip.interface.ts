import { ChipColor } from './chipColor.model'
import { ChipColorType } from './chipColorType.model'

export interface IChip {
  color: ChipColor
  colorType: ChipColorType
  value: number
  getValue (color?: ChipColor): number
}
