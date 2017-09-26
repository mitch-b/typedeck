import { test } from 'ava'
import {
  CardName,
  Suit,
  ICard,
  PlayingCard,
  MapExtensions
} from 'typedeck'

test('groups cards by suit', async t => {
  const aceOfDiamonds = new PlayingCard(CardName.Ace, Suit.Diamonds)
  const fourOfHearts = new PlayingCard(CardName.Four, Suit.Hearts)
  const kingOfDiamonds = new PlayingCard(CardName.King, Suit.Diamonds)
  const queenOfClubs = new PlayingCard(CardName.Queen, Suit.Clubs)
  const jackOfSpades = new PlayingCard(CardName.Jack, Suit.Spades)
  const cards: ICard[] = [
    aceOfDiamonds,
    fourOfHearts,
    kingOfDiamonds,
    queenOfClubs,
    jackOfSpades
  ]
  const sortedCards = MapExtensions.GroupBy(cards, (card: PlayingCard) => card.suit)

  t.deepEqual(sortedCards.get(Suit.Clubs), [queenOfClubs])
  t.deepEqual(sortedCards.get(Suit.Spades), [jackOfSpades])
  t.deepEqual(sortedCards.get(Suit.Diamonds), [aceOfDiamonds, kingOfDiamonds])
  t.deepEqual(sortedCards.get(Suit.Hearts), [fourOfHearts])
})
