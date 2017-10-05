import { CardName } from '../models/card/cardName.model'
import { ShorthandCardName } from '../models/card/shorthandCardName.model'
import { Suit } from '../models/card/suit.model'
import { ShorthandSuit } from '../models/card/shorthandSuit.model'

export interface IShorthandConversionService {
  getCardName (shorthandCardName: ShorthandCardName): CardName
  getSuit (shorthandSuit: ShorthandSuit): Suit
}
