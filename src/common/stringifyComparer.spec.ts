import { test } from 'ava'
import {
  CardName,
  Suit,
  PlayingCard,
  StringifyComparer,
  Card,
  JokerCard
} from 'typedeck'

test('confirms equality', async t => {
  const comparer = new StringifyComparer()

  t.true(comparer.areEquivalent(
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Clubs)
  ))

  t.true(comparer.areEquivalent(
    new Card(CardName.King),
    new Card(CardName.King)
  ))

  t.true(comparer.areEquivalent(
    new JokerCard(),
    new Card(CardName.Joker)
  ))
})

test('confirms inequality', async t => {
  const comparer = new StringifyComparer()

  t.false(comparer.areEquivalent(
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Diamonds)
  ))

  t.false(comparer.areEquivalent(
    new Card(CardName.King),
    new Card(CardName.Ace)
  ))

  t.false(comparer.areEquivalent(
    new JokerCard(),
    new Card(CardName.Jack)
  ))
})
