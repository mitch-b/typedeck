import { ICard } from '../card/card.interface'
import { DurstenfeldShuffleService } from '../../services/shuffle.service'
import { ICardCollection } from './cardCollection.interface'
import { IShuffleService } from '../../services/shuffleService.interface'
import { IObjectComparer } from '../../common/objectComparer.interface'
import { StringifyComparer } from '../../common/stringifyComparer.model'

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
  public name: string
  private shuffleService: IShuffleService = new DurstenfeldShuffleService()
  private objectComparer: IObjectComparer = new StringifyComparer()

  constructor (private cards: ICard[] = []) {

  }

  public addCard (card: ICard): this {
    return this.addCards([card])
  }

  public addCards (cards: ICard[]): this {
    this.getCards().unshift(...cards)
    return this
  }

  public removeCards (cards: ICard[]): this {
    cards.forEach((card) => {
      const position: number = this.indexOfCard(card)
      if (position > -1) {
        this.getCards().splice(position, 1)
      } else {
        throw new Error('Card does not exist in collection')
      }
    })
    return this
  }

  public takeCard (): ICard {
    if (!this.isEmpty()) {
      return this.getCards().shift() as ICard
    }
    throw new Error('No cards remaining in pile')
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
    while (!this.isEmpty() && pulledCards.length < amount) {
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

  public hasCard (card: ICard): boolean {
    return this.getCards().some((c: ICard) => c.getIndex() === card.getIndex())
  }

  public hasCards (cards: ICard[]): boolean {
    if (!this.hasCard(cards.shift() as ICard)) {
      return false
    }
    if (cards && cards.length > 0) {
      return this.hasCards(cards)
    } else {
      return true
    }
  }

  public getCount (): number {
    return this.getCards().length
  }

  public isEmpty (): boolean {
    return this.getCount() === 0
  }

  public shuffle (): void {
    this.setCards(this.shuffleService.shuffle(this.getCards()))
  }

  public indexOfCard (card: ICard): number {
    for (let i = 0; i < this.getCount(); i++) {
      const loopCard = this.getCards()[i]
      if (this.objectComparer.areEquivalent(card, loopCard)) {
        return i
      }
    }
    return -1
  }

  public cardAtIndex (index: number): ICard {
    if (index >= 0 && index <= (this.getCount() - 1)) {
      return this.getCards()[index]
    } else {
      throw new Error('Card collection does not contain card at index')
    }
  }
}
