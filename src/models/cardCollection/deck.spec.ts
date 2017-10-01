import { test } from 'ava'
import { ICard, Deck, CardName, Suit, PlayingCard, HandOptions, Hand, JokerCard } from 'typedeck'

test('empty without cards in constructor', async t => {
  const emptyCards: ICard[] = []
  const deck = new Deck()
  t.deepEqual(deck.getCards(), emptyCards)
})

test('is empty with no cards', async t => {
  const deck = new Deck()
  t.true(deck.isEmpty(), 'isEmpty() should have been true')
})

test('has default name', async t => {
  const deck = new Deck()
  t.deepEqual(deck.name, 'Deck')
})

test('can assign name', async t => {
  const deck = new Deck()
  deck.name = 'Main Deck'
  t.deepEqual(deck.name, 'Main Deck')
})

test('has cards when initialized with them', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ]
  const deck = new Deck(cards)
  t.false(deck.isEmpty(), 'was empty')
  t.deepEqual(deck.getCards()[0], cards[0], 'Cards were not equivalent or added in same order')
  t.deepEqual(deck.getCards()[1], cards[1], 'Cards were not equivalent or added in same order')
})

test('builds from another ICard[]', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ]
  const deck = Deck.BuildFrom(cards)

  t.false(deck.isEmpty(), 'was empty')
  t.true(deck.getCount() === 2, 'Did not create expected number of cards')
})

test('builds from CardName and Suit combo', async t => {
  const suits = [Suit.Spades, Suit.Hearts]
  const cardNames = [CardName.Queen, CardName.King]
  const deck = Deck.Build(suits, cardNames)

  t.false(deck.isEmpty(), 'was empty')
  t.true(deck.getCount() === (suits.length * cardNames.length), 'Did not create expected number of cards')
  t.true(deck.hasCards([
    new PlayingCard(CardName.Queen, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Queen, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Hearts)
  ]), 'Did not contain all expected cards')
})

test('builds from CardName and Suit combo with extras', async t => {
  const suits = [Suit.Spades, Suit.Hearts]
  const cardNames = [CardName.Queen, CardName.King]
  const extras = [
    new PlayingCard(CardName.Jack, Suit.Clubs),
    new PlayingCard(CardName.Seven, Suit.Spades)
  ]
  const deck = Deck.Build(suits, cardNames, extras)

  t.false(deck.isEmpty(), 'was empty')
  t.true(deck.getCount() === (suits.length * cardNames.length) + extras.length, 'Did not create expected number of cards')
  t.true(deck.hasCards([
    new PlayingCard(CardName.Queen, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Queen, Suit.Hearts),
    new PlayingCard(CardName.King, Suit.Hearts),
    new PlayingCard(CardName.Jack, Suit.Clubs),
    new PlayingCard(CardName.Seven, Suit.Spades)
  ]), 'Did not contain all expected cards')
})

test('builds from with no cards', async t => {
  const deck = Deck.BuildFrom()

  t.true(deck.isEmpty(), 'was not empty')
})

test('creates a new Hand', async t => {
  const suits = [Suit.Spades, Suit.Hearts, Suit.Clubs]
  const cardNames = [CardName.Queen, CardName.King]
  const deck = Deck.Build(suits, cardNames)
  const options = new HandOptions()
  options.size = 4
  const hand = deck.createHand(options)
  t.true(hand.getCount() === 4, 'Did not create hand with expected cards')
})

test('deals to a Hand', async t => {
  const suits = [Suit.Spades, Suit.Hearts, Suit.Clubs]
  const cardNames = [CardName.Queen, CardName.King]
  const deck = Deck.Build(suits, cardNames)
  const hand = new Hand()
  deck.deal(hand, 4)
  t.true(hand.getCount() === 4, 'Did not deal hand with expected cards')
})

test('deals to top of Hand', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Seven, Suit.Hearts)
  ]
  const deck = Deck.BuildFrom(cards)
  const hand = new Hand([
    new JokerCard()
  ])
  deck.deal(hand, 4, true)
  t.true(hand.getCount() === 5, 'Did not deal hand with expected cards')
  t.deepEqual(hand.takeCard(), new PlayingCard(CardName.Eight, Suit.Diamonds), 'Did not deal hand with expected cards')
})

test('deals to bottom of Hand', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs),
    new PlayingCard(CardName.King, Suit.Spades),
    new PlayingCard(CardName.Seven, Suit.Hearts)
  ]
  const deck = Deck.BuildFrom(cards)
  const hand = new Hand([
    new JokerCard()
  ])
  deck.deal(hand, 4, false)
  t.true(hand.getCount() === 5, 'Did not deal hand with expected cards')
  t.deepEqual(hand.takeCard(), new JokerCard(), 'Did not deal hand with expected cards')
})
