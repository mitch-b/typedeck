import { IHand } from '../cardCollection/hand.interface'
import { MapIndexable } from '../../common/mapIndexable.interface'

export interface IPlayer extends MapIndexable {
  id: string
  name: string
  score: number

  getHand (): IHand
  setHand (hand: IHand): IPlayer
  updateScore (score: number): IPlayer
}
