import { test } from 'ava';
import { PlayingCard, CardName, Suit } from 'typedeck';

test('parameters are set', async t => {
  const cardName = CardName.Jack;
  const suit = Suit.Hearts;
  const card = new PlayingCard(cardName, suit);
  t.deepEqual(card.cardName, cardName);
  t.deepEqual(card.suit, suit);
});

test('name and suit are printed', async t => {
  const expectedString = 'Ace of Spades';
  const card = new PlayingCard(CardName.Ace, Suit.Spades);
  t.deepEqual(card.toString(), expectedString);
});

test('toString is equivalent to getIndex', async t => {
  const card = new PlayingCard(CardName.Ace, Suit.Spades);
  t.deepEqual(card.toString(), card.getIndex());
});
