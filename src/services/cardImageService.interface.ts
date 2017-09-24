import { IndexedMap } from '../common/indexedMap.model'
import { Card } from '../models/card/card.model'

/**
 * Every theme should be a new instance
 * of an ICardImageService.
 */
export interface ICardImageService {
  cardMap: IndexedMap<Card, string>
  cardBackImageUrl: string
  setCardMap (cardMap: IndexedMap<Card, string>): ICardImageService

  setCardBackImageUrl (cardBackImageUrl: string): ICardImageService

  getImageUrl (card: Card): string
}
