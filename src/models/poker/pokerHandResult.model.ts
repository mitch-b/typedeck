import { PokerHandType } from './pokerHandType.model'
import { PlayingCard } from '../card/playingCard.model'

export class PokerHandResult {
  /**
   * Type of hand created with
   * `cardsUsed`.
   */
  public handType: PokerHandType
  /**
   * Comparable value of current hand
   * to rank above or below another
   * `PokerHandResult`.
   */
  public value: number = 0
  /**
   * All cards used to determine
   * result.
   */
  public cards: PlayingCard[] = []
  /**
   * Cards in result.
   */
  public cardsUsed: PlayingCard[] = []

  constructor (
    cards: PlayingCard[] = [],
    value: number = 0) {
    this.cards = cards
    this.value = value
  }

  setHandType (type: PokerHandType): this {
    this.handType = type
    return this
  }
}
