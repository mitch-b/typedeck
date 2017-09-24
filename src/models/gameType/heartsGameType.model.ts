import { BaseGameType } from './gameType.model'
import { IGameType } from './gameType.interface'
import { ICard } from '../card/card.interface'
import { AceHighRankSet } from '../card/aceHighRankSet.model'
import { CardName } from '../card/cardName.model'
import { Suit } from '../card/suit.model'
import { PlayingCard } from '../card/playingCard.model'

/**
 * GameType with Hearts configuration
 */
export class HeartsGameType extends BaseGameType implements IGameType {
  public rankSet = new AceHighRankSet()
  public cardsAllowed: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.Two, Suit.Clubs),
    new PlayingCard(CardName.Three, Suit.Clubs),
    new PlayingCard(CardName.Four, Suit.Clubs),
    new PlayingCard(CardName.Five, Suit.Clubs),
    new PlayingCard(CardName.Six, Suit.Clubs),
    new PlayingCard(CardName.Seven, Suit.Clubs),
    new PlayingCard(CardName.Eight, Suit.Clubs),
    new PlayingCard(CardName.Nine, Suit.Clubs),
    new PlayingCard(CardName.Ten, Suit.Clubs),
    new PlayingCard(CardName.Jack, Suit.Clubs),
    new PlayingCard(CardName.Queen, Suit.Clubs),
    new PlayingCard(CardName.King, Suit.Clubs),

    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.Two, Suit.Spades),
    new PlayingCard(CardName.Three, Suit.Spades),
    new PlayingCard(CardName.Four, Suit.Spades),
    new PlayingCard(CardName.Five, Suit.Spades),
    new PlayingCard(CardName.Six, Suit.Spades),
    new PlayingCard(CardName.Seven, Suit.Spades),
    new PlayingCard(CardName.Eight, Suit.Spades),
    new PlayingCard(CardName.Nine, Suit.Spades),
    new PlayingCard(CardName.Ten, Suit.Spades),
    new PlayingCard(CardName.Jack, Suit.Spades),
    new PlayingCard(CardName.Queen, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Spades),

    new PlayingCard(CardName.Ace, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Diamonds),
    new PlayingCard(CardName.Three, Suit.Diamonds),
    new PlayingCard(CardName.Four, Suit.Diamonds),
    new PlayingCard(CardName.Five, Suit.Diamonds),
    new PlayingCard(CardName.Six, Suit.Diamonds),
    new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Ten, Suit.Diamonds),
    new PlayingCard(CardName.Jack, Suit.Diamonds),
    new PlayingCard(CardName.Queen, Suit.Diamonds),
    new PlayingCard(CardName.King, Suit.Diamonds),

    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.Two, Suit.Hearts),
    new PlayingCard(CardName.Three, Suit.Hearts),
    new PlayingCard(CardName.Four, Suit.Hearts),
    new PlayingCard(CardName.Five, Suit.Hearts),
    new PlayingCard(CardName.Six, Suit.Hearts),
    new PlayingCard(CardName.Seven, Suit.Hearts),
    new PlayingCard(CardName.Eight, Suit.Hearts),
    new PlayingCard(CardName.Nine, Suit.Hearts),
    new PlayingCard(CardName.Ten, Suit.Hearts),
    new PlayingCard(CardName.Jack, Suit.Hearts),
    new PlayingCard(CardName.Queen, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Hearts)
  ]
}
