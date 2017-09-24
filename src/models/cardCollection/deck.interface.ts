import { ICardPile } from './cardPile.interface'
import { HandOptions } from './handOptions.model'
import { IHand } from './hand.interface'

export interface IDeck extends ICardPile {
  createHand (options: HandOptions): IHand
  deal (hand: IHand, size: number): IDeck
}
