import { CardCollection } from './cardCollection.model'
import { ICardPile } from './cardPile.interface'
import { ICard } from '../card/card.interface'

/**
 * Extending the basic CardCollection, this class supports
 * dealing with cards in an ordered pile. As such, interacting
 * with the pile from the bottom is supported by using this
 * class.
 */
export class CardPile extends CardCollection implements ICardPile {
  constructor (cards: ICard[] = []) {
    super(cards) // CardCollection.constructor

    this.friendlyName = 'Pile' // default name
  }

  public addCardsToBottom (cards: ICard[]): void {
    this.setCards(this.getCards().concat(cards))
  }

  public takeCardFromBottom (): ICard {
    if (this.getCount() > 0) {
      return this.getCards().pop() as ICard
    }
    throw new Error('No cards remaining in pile.')
  }

  public takeCardsFromBottom (amount: number): ICard[] {
    let pulledCards: ICard[] = []
    while (this.getCount() > 0 && pulledCards.length < amount) {
      pulledCards.push(this.getCards().pop() as ICard)
    }
    return pulledCards
  }
}
