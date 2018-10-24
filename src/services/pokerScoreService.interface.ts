import { PokerHandResult } from '../models/poker/pokerHandResult.model';
import { IHand } from '../models/cardCollection/hand.interface';
import { PlayingCard } from '../models/card/playingCard.model';
import { IPlayer } from '../models/player/player.interface';
import { IndexedMap } from '../common/indexedMap.model';

export interface IPokerScoreService {
  /**
   * Retrieves cards from `IHand`
   * and calls `scoreCards(ICard[])`.
   */
  scoreHand (hand: IHand, communityCards?: PlayingCard[]): PokerHandResult;
  /**
   * Determine `PokerHandResult` from
   * cards.
   */
  scoreCards (cards: PlayingCard[], communityCards?: PlayingCard[]): PokerHandResult;
  /**
   * Return a Map of IPlayer objects and associated
   * PokerHandResult objects.
   */
  scorePlayers (players: IPlayer[], communityCards?: PlayingCard[]): IndexedMap<IPlayer, PokerHandResult>;
  /**
   * Return numeric value of PokerHandResult.
   * A larger number indicates the better hand.
   */
  getScoreRank (result: PokerHandResult): number;
}
