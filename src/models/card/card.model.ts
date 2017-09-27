import { CardName } from './cardName.model'
import { ICard } from './card.interface'

/**
 * Represents a generic card.
 */
export class Card implements ICard {
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
