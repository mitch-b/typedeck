import { IChip } from '../chip/chip.interface'

export interface IChipCollection {
  getChips (): IChip[]
  addChip (chip: IChip): IChipCollection
  addChips (chips: IChip[]): IChipCollection
  setChips (chips: IChip[]): IChipCollection
  removeChips (chips: IChip[]): IChipCollection
  colorUp (): IChipCollection
  getValue (chips?: IChip[]): number
  getChipCount (): number
  isEmpty (): boolean
  takeValue (amount: number): IChip[]
  toString (): string
}
