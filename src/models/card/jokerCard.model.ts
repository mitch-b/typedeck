import { Card } from './card.model'
import { CardName } from './cardName.model'

/**
 * Represents a Joker card which is
 * not contained within any specific Suit
 * and can have a value based on current Game (if any/if used).
 */
export class JokerCard extends Card {
  constructor (cardName: CardName = CardName.Joker) {
    super(cardName)
  }
}
