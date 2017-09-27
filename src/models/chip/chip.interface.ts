import { MapIndexable } from '../../common/mapIndexable.interface'
import { ChipColor } from './chipColor.model'
import { ChipColorType } from './chipColorType.model'

export interface IChip extends MapIndexable {
  color: ChipColor
  colorType: ChipColorType
  value: number
  getValue (color?: ChipColor): number
}
