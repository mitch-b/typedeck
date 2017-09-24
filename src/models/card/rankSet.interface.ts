import { CardName } from './cardName.model';
import { ICard } from './card.interface';

export interface IRankSet {
    rankSet: CardName[];
    getRankValue(card: ICard): number;
    cardHigherThan(thisCard: ICard, compareCard: ICard): boolean;
}
