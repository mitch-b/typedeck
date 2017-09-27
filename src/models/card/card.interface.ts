import { CardName } from './cardName.model'
import { MapIndexable } from '../../common/mapIndexable.interface'

export interface ICard extends MapIndexable {
  cardName: CardName
}
