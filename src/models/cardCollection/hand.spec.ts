import test from 'ava';
import { ICard, Hand, CardName, Suit, PlayingCard, AceHighRankSet, AceLowRankSet } from 'typedeck';

test('empty without cards in constructor', async t => {
  const emptyCards: ICard[] = [];
  const hand = new Hand();
  t.deepEqual(hand.getCards(), emptyCards);
});

test('is empty with no cards', async t => {
  const hand = new Hand();
  t.true(hand.isEmpty(), 'isEmpty() should have been true');
});

test('has default name', async t => {
  const hand = new Hand();
  t.deepEqual(hand.name, 'Hand');
});

test('can assign name', async t => {
  const hand = new Hand();
  hand.name = 'Player 1 Hand';
  t.deepEqual(hand.name, 'Player 1 Hand');
});

test('has cards when initialized with them', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ];
  const hand = new Hand(cards);
  t.false(hand.isEmpty(), 'was empty');
  t.deepEqual(hand.getCards()[0], cards[0], 'Cards were not equivalent or added in same order');
  t.deepEqual(hand.getCards()[1], cards[1], 'Cards were not equivalent or added in same order');
});

test('playing a card removes it from hand', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ];
  const playedCard = new PlayingCard(CardName.Two, Suit.Clubs);
  const hand = new Hand(cards);
  hand.playCard(playedCard);
  t.false(hand.hasCard(playedCard), 'hasCard() should have been false');
  t.true(hand.getCount() === 1, 'Invalid card count left in hand');
});

test('throw error if no cards to sort', async t => {
  const hand = new Hand();
  try {
    hand.sortCards(new AceHighRankSet());
  } catch (err) {
    t.deepEqual(err.message, 'No cards to sort');
  }
});

test('throw error if no Suit order defined', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ];
  const hand = new Hand(cards);
  hand.suitOrder = [];
  try {
    hand.sortCards(new AceHighRankSet());
  } catch (err) {
    t.deepEqual(err.message, 'No suit order defined');
  }
});

test('sort clubs to spades', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Spades),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ];
  const hand = new Hand(cards);
  hand.sortCards(new AceHighRankSet());
  t.true((hand.getCards()[0] as PlayingCard).suit === Suit.Clubs);
  t.true((hand.getCards()[1] as PlayingCard).suit === Suit.Spades);
});

test('sort cards aces high', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.King, Suit.Diamonds),
    new PlayingCard(CardName.Ace, Suit.Diamonds),
    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Ace, Suit.Spades)
  ];
  const hand = new Hand(cards);
  hand.sortCards(new AceHighRankSet());
  t.true(hand.getCards()[1].cardName === CardName.Ace);
  t.true(hand.getCards()[3].cardName === CardName.Ace);
  t.true(hand.getCards()[5].cardName === CardName.Ace);
  t.true(hand.getCards()[7].cardName === CardName.Ace);
  t.true((hand.getCards()[0] as PlayingCard).suit === Suit.Clubs);
  t.true((hand.getCards()[2] as PlayingCard).suit === Suit.Spades);
  t.true((hand.getCards()[4] as PlayingCard).suit === Suit.Diamonds);
  t.true((hand.getCards()[6] as PlayingCard).suit === Suit.Hearts);
});

test('sort cards aces low', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.King, Suit.Diamonds),
    new PlayingCard(CardName.Ace, Suit.Diamonds),
    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Ace, Suit.Spades)
  ];
  const hand = new Hand(cards);
  hand.sortCards(new AceLowRankSet());
  t.true(hand.getCards()[0].cardName === CardName.Ace);
  t.true(hand.getCards()[2].cardName === CardName.Ace);
  t.true(hand.getCards()[4].cardName === CardName.Ace);
  t.true(hand.getCards()[6].cardName === CardName.Ace);
  t.true((hand.getCards()[0] as PlayingCard).suit === Suit.Clubs);
  t.true((hand.getCards()[2] as PlayingCard).suit === Suit.Spades);
  t.true((hand.getCards()[4] as PlayingCard).suit === Suit.Diamonds);
  t.true((hand.getCards()[6] as PlayingCard).suit === Suit.Hearts);
});

test('custom suit order sorting', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.King, Suit.Diamonds),
    new PlayingCard(CardName.Ace, Suit.Diamonds),
    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Ace, Suit.Spades)
  ];
  const hand = new Hand(cards);
  hand.suitOrder = [Suit.Hearts, Suit.Diamonds, Suit.Spades, Suit.Clubs];
  hand.sortCards(new AceLowRankSet());
  t.true(hand.getCards()[0].cardName === CardName.Ace);
  t.true(hand.getCards()[2].cardName === CardName.Ace);
  t.true(hand.getCards()[4].cardName === CardName.Ace);
  t.true(hand.getCards()[6].cardName === CardName.Ace);
  t.true((hand.cardAtIndex(0) as PlayingCard).suit === Suit.Hearts);
  t.true((hand.getCards()[2] as PlayingCard).suit === Suit.Diamonds);
  t.true((hand.getCards()[4] as PlayingCard).suit === Suit.Spades);
  t.true((hand.getCards()[6] as PlayingCard).suit === Suit.Clubs);
});
