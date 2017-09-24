import { ICard } from '../card/card.interface'
import { ICardCollection } from './cardCollection.interface'
import { IRankSet } from '../card/rankSet.interface'

export interface IHand extends ICardCollection {
  sortCards (cardRank: IRankSet): IHand
  playCard (card: ICard): void
}
