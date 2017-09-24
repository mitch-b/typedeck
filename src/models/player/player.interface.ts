import { IHand } from '../cardCollection/hand.interface'

export interface IPlayer {
  id: string
  name: string
  score: number

  getHand (): IHand
  setHand (hand: IHand): IPlayer
  updateScore (score: number): IPlayer
}
