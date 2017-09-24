import { CardName } from './cardName.model'
import { ICard } from './card.interface'
import { MapIndexable } from '../../common/mapIndexable.interface'

/**
 * Represents a generic card.
 */
export class Card implements ICard, MapIndexable {
  public cardName: CardName

  constructor (cardName: CardName) {
    this.cardName = cardName
  }

  public toString (): string {
    return `${CardName[this.cardName]}`
  }

  public getIndex (): string {
    return this.toString()
  }
}
