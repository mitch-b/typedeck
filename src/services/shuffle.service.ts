import { IShuffleService } from './shuffleService.interface'
import { ICard } from '../models/card/card.interface'

/**
 * Shuffle one card to a random location
 * for each card in the deck.
 *
 * If one card or less is provided, an Error
 * will throw that the cards could not be shuffled.
 */
export class DurstenfeldShuffleService implements IShuffleService {
  /**
   * Durstenfeld shuffle algorithm
   */
  public shuffle(cards: ICard[]): ICard[] {
    const length = cards.length
    if (length < 2) {
      throw new Error('Not enough cards to shuffle.')
    }
    for (let i = length; i; i--) {
      const n = Math.floor(Math.random() * i);
      [cards[i - 1], cards[n]] = [cards[n], cards[i - 1]]
    }
    return cards
  }
}
