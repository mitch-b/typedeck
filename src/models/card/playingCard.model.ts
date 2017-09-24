import { ICard } from './card.interface'
import { Card } from './card.model'
import { Suit } from './suit.model'
import { CardName } from './cardName.model'

/**
 * Represents a card that contains a Suit
 * and a Value (Rank).
 */
export class PlayingCard extends Card implements ICard {
  public suit: Suit

  constructor (cardName: CardName, suit: Suit) {
    super(cardName)
    this.suit = suit
  }

  public toString (): string {
    return `${CardName[this.cardName]} of ${Suit[this.suit]}`
  }
}
