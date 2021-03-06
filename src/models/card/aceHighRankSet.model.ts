import { CardName } from './cardName.model';
import { RankSet } from './cardRanks.model';

export class AceHighRankSet extends RankSet {
  public rankSet: CardName[] = [
    CardName.Joker,
    CardName.Two,
    CardName.Three,
    CardName.Four,
    CardName.Five,
    CardName.Six,
    CardName.Seven,
    CardName.Eight,
    CardName.Nine,
    CardName.Ten,
    CardName.Jack,
    CardName.Queen,
    CardName.King,
    CardName.Ace
  ];
}
