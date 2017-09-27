import { test } from 'ava'
import { ICard, CardPile, CardName, Suit, PlayingCard } from 'typedeck'

test('empty without cards in constructor', async t => {
  const emptyCards: ICard[] = []
  const pile = new CardPile()
  t.deepEqual(pile.getCards(), emptyCards)
})

test('is empty with no cards', async t => {
  const pile = new CardPile()
  t.true(pile.isEmpty(), 'isEmpty() should have been true')
})

test('has cards when initialized with them', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ]
  const pile = new CardPile(cards)
  t.false(pile.isEmpty(), 'was empty')
  t.deepEqual(pile.getCards()[0], cards[0], 'Cards were not equivalent or added in same order')
  t.deepEqual(pile.getCards()[1], cards[1], 'Cards were not equivalent or added in same order')
})

test('adds card to bottom', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ]
  const bottomCard = new PlayingCard(CardName.Queen, Suit.Hearts)
  const pile = new CardPile(cards)
  t.false(pile.isEmpty(), 'was empty')

  pile.addCardsToBottom([bottomCard])

  t.deepEqual(pile.getCards()[pile.getCount() - 1], bottomCard)
})

test('take card from bottom', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs) // bottom card
  ]
  const bottomCard = new PlayingCard(CardName.Two, Suit.Clubs)
  const pile = new CardPile(cards)
  t.false(pile.isEmpty(), 'was empty')

  t.deepEqual(pile.takeCardFromBottom(), bottomCard)
})

test('take multiple cards from bottom', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs) // bottom card
  ]
  const topCard = new PlayingCard(CardName.Eight, Suit.Diamonds)
  const bottomCard = new PlayingCard(CardName.Two, Suit.Clubs)
  const pile = new CardPile(cards)
  t.false(pile.isEmpty(), 'was empty')
  const pulledCards = pile.takeCardsFromBottom(2)
  t.deepEqual(pulledCards[0], bottomCard)
  t.deepEqual(pulledCards[1], topCard)
})

test('take card from bottom if no cards should error', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs) // bottom card
  ]
  const pile = new CardPile(cards)
  pile.takeCardFromBottom()
  pile.takeCardFromBottom()
  try {
    pile.takeCardFromBottom()
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, 'No cards remaining in pile')
  }
})
