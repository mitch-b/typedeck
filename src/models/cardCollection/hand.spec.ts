import { test } from 'ava'
import { ICard, Hand, CardName, Suit, PlayingCard } from 'typedeck'

test('empty without cards in constructor', async t => {
  const emptyCards: ICard[] = []
  const hand = new Hand()
  t.deepEqual(hand.getCards(), emptyCards)
})

test('is empty with no cards', async t => {
  const hand = new Hand()
  t.true(hand.isEmpty(), 'isEmpty() should have been true')
})

test('has cards when initialized with them', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ]
  const hand = new Hand(cards)
  t.false(hand.isEmpty(), 'was empty')
  t.deepEqual(hand.getCards()[0], cards[0], 'Cards were not equivalent or added in same order')
  t.deepEqual(hand.getCards()[1], cards[1], 'Cards were not equivalent or added in same order')
})
