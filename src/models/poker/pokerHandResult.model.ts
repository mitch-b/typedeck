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

  toString (): string {
    return PokerHandType[this.handType]
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      .replace(/^./, function (str) { return str.toUpperCase() })
      // Remove any white space left around the word
      .trim()
  }
}
