import { ICard } from '../models/card/card.interface';

export interface IShuffleService {
  shuffle (cards: ICard[]): ICard[];
}
