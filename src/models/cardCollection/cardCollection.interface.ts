import { ICard } from '../card/card.interface'

export interface ICardCollection {
  getCards (): ICard[]
  addCard (card: ICard): ICardCollection
  addCards (cards: ICard[]): ICardCollection
  removeCards (cards: ICard[]): ICardCollection
  takeCard (): ICard
  takeCards (amount: number): ICard[]
  getCount (): number
  isEmpty (): boolean
  hasCard (card: ICard): boolean
  hasCards (cards: ICard[]): boolean
  shuffle (): void
  indexOfCard (card: ICard): number
  cardAtIndex (index: number): ICard
}
