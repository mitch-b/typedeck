import { Card } from './card.model'
import { Suit } from './suit.model'
import { CardName } from './cardName.model'
import { ShorthandCardName } from './shorthandCardName.model'
import { ShorthandSuit } from './shorthandSuit.model'
import { IShorthandConversionService } from '../../services/shorthandConversionService.interface'
import { ShorthandConversionService } from '../../services/shorthandConversion.service'

/**
 * Represents a card that contains a Suit
 * and a Value (Rank).
 */
export class PlayingCard extends Card {
  public suit: Suit

  constructor (cardName: CardName, suit: Suit) {
    super(cardName)
    this.suit = suit
  }

  public static From (shortCardName: ShorthandCardName, shortSuit: ShorthandSuit): PlayingCard {
    const shorthandResolver: IShorthandConversionService = new ShorthandConversionService()
    let cardName = shorthandResolver.getCardName(shortCardName)
    let suit = shorthandResolver.getSuit(shortSuit)
    return new PlayingCard(cardName, suit)
  }

  public toString (): string {
    return `${CardName[this.cardName]} of ${Suit[this.suit]}`
  }
}
