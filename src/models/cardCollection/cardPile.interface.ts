import { ICardCollection } from './cardCollection.interface'
import { ICard } from '../card/card.interface'

export interface ICardPile extends ICardCollection {
  addCardsToBottom (cards: ICard[]): void
  takeCardFromBottom (): ICard
  takeCardsFromBottom (amount: number): ICard[]
}
