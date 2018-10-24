import { ICard } from '../card/card.interface';
import { ICardPile } from './cardPile.interface';
import { IRankSet } from '../card/rankSet.interface';

export interface IHand extends ICardPile {
  sortCards (cardRank: IRankSet): IHand;
  playCard (card: ICard): void;
}
