import { CardName } from './cardName.model'
import { ICard } from './card.interface'
import { IRankSet } from './rankSet.interface'

export class RankSet implements IRankSet {
  public rankSet: CardName[] = []
  public cardHigherThan (thisCard: ICard, compareCard: ICard): boolean {
    return this.getRankValue(thisCard) > this.getRankValue(compareCard)
  }
  public getRankValue (card: ICard): number {
    return this.rankSet.indexOf(card.cardName)
  }
}
