import { IShorthandConversionService } from './shorthandConversionService.interface'
import { ShorthandCardName } from '../models/card/shorthandCardName.model'
import { CardName } from '../models/card/cardName.model'
import { ShorthandSuit } from '../models/card/shorthandSuit.model'
import { Suit } from '../models/card/suit.model'

export class ShorthandConversionService implements IShorthandConversionService {
  getCardName (shorthandCardName: ShorthandCardName): CardName {
    switch (shorthandCardName.toUpperCase()) {
      case ShorthandCardName.Ace:
        return CardName.Ace
      case ShorthandCardName.Two:
        return CardName.Two
      case ShorthandCardName.Three:
        return CardName.Three
      case ShorthandCardName.Four:
        return CardName.Four
      case ShorthandCardName.Five:
        return CardName.Five
      case ShorthandCardName.Six:
        return CardName.Six
      case ShorthandCardName.Seven:
        return CardName.Seven
      case ShorthandCardName.Eight:
        return CardName.Eight
      case ShorthandCardName.Nine:
        return CardName.Nine
      case ShorthandCardName.Ten:
        return CardName.Ten
      case ShorthandCardName.Jack:
        return CardName.Jack
      case ShorthandCardName.Queen:
        return CardName.Queen
      case ShorthandCardName.King:
        return CardName.King
      default:
        return CardName.Joker
    }
  }
  getSuit (shorthandSuit: ShorthandSuit): Suit {
    switch (shorthandSuit.toUpperCase()) {
      case ShorthandSuit.Clubs:
        return Suit.Clubs
      case ShorthandSuit.Spades:
        return Suit.Spades
      case ShorthandSuit.Diamonds:
        return Suit.Diamonds
      default:
        return Suit.Hearts
    }
  }
}
