import { PokerHandType } from './pokerHandType.model'
import { PlayingCard } from '../card/playingCard.model'

export class PokerHandResult {
  /**
   * Type of hand created with
   * `cardsUsed`.
   */
  public handType: PokerHandType
  /**
   * All cards used to determine
   * result.
   */
  public cards: PlayingCard[]
  /**
   * Cards in result.
   */
  public cardsUsed: PlayingCard[]
}
