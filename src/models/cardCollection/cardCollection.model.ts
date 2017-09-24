import { ICard } from '../card/card.interface'
import { DurstenfeldShuffleService } from '../../services/shuffle.service'
import { ICardCollection } from './cardCollection.interface'
import { IShuffleService } from '../../services/shuffleService.interface'

/**
 * Basic class to represent a grouping of ICards.
 *
 * Supports activities like: getting list of cards,
 * adding cards to group, taking first card, taking
 * multiple cards, getting count of cards, and shuffling
 * the cards.
 */
export class CardCollection implements ICardCollection {
  /**
   * Friendly name of card collection that
   * means something: "Hand", "Discard Pile",
   * "In Play", etc.
   */
  public friendlyName: string
  private shuffleService: IShuffleService = new DurstenfeldShuffleService()

  constructor (private cards: ICard[] = []) {

  }

  public addCards (cards: ICard[]): this {
    this.getCards().unshift(...cards)
    return this
  }

  public removeCards (cards: ICard[]): this {
    cards.forEach((card) => {
      const position: number = this.getCards().indexOf(card)
      if (position > -1) {
        this.getCards().splice(position, 1)
      } else {
        throw new Error('Card does not exist in collection')
      }
    })
    return this
  }

  public takeCard (): ICard {
    if (this.getCount() > 0) {
      return this.getCards().shift() as ICard
    }
    throw new Error('No cards remaining in pile.')
  }

  /**
   * Remove cards from hand.
   * @param amount Amount of cards to remove from Hand. If less than 1, all cards are taken.
   */
  public takeCards (amount: number): ICard[] {
    if (!amount || amount < 1) {
      amount = this.getCount()
    }
    // tslint:disable-next-line:prefer-const
    let pulledCards: ICard[] = []
    while (this.getCount() > 0 && pulledCards.length < amount) {
      pulledCards.push(this.getCards().shift() as ICard)
    }
    return pulledCards
  }

  public getCards (): ICard[] {
    return this.cards
  }

  public setCards (cards: ICard[]): this {
    this.cards = cards
    return this
  }

  public getCount (): number {
    return this.getCards().length
  }

  public shuffle (): void {
    this.setCards(this.shuffleService.shuffle(this.getCards()))
  }
}
