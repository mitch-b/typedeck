import test from 'ava';
import { ICard, CardCollection, CardName, Suit, PlayingCard } from 'typedeck';

test('empty without cards in constructor', async t => {
  const emptyCards: ICard[] = [];
  const cardCollection = new CardCollection();
  t.deepEqual(cardCollection.getCards(), emptyCards);
});

test('is empty with no cards', async t => {
  const cardCollection = new CardCollection();
  t.true(cardCollection.isEmpty(), 'isEmpty() should have been true');
});

test('has cards when initialized with them', async t => {
  const cards: ICard[] = [
    new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Two, Suit.Clubs)
  ];
  const cardCollection = new CardCollection(cards);
  t.false(cardCollection.isEmpty(), 'was empty');
  t.deepEqual(cardCollection.getCards()[0], cards[0], 'Cards were not equivalent or added in same order');
  t.deepEqual(cardCollection.getCards()[1], cards[1], 'Cards were not equivalent or added in same order');
});

test('adds a single card', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  cardCollection.addCard(card1);
  t.false(cardCollection.isEmpty(), 'Card was not added');
  t.true(cardCollection.getCount() === 1, 'Card count not matching');
  t.deepEqual(cardCollection.getCards()[0], card1, 'Card that was added did not match entry in collection');
});

test('adds multiple cards', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  cardCollection.addCards([card1, card2]);
  t.false(cardCollection.isEmpty(), 'Cards were not added');
  t.deepEqual(cardCollection.getCards()[0], card1, 'Card that was added did not match entry in collection');
  t.deepEqual(cardCollection.getCards()[1], card2, 'Card that was added did not match entry in collection');
});

test('can take a card', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  cardCollection.addCards([card1, card2]);
  t.deepEqual(cardCollection.takeCard(), card1, 'Card that was added did not match entry in collection');
  t.deepEqual(cardCollection.takeCard(), card2, 'Card that was added did not match entry in collection');
});

test('can take a specific card out', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  const card4 = new PlayingCard(CardName.Ace, Suit.Diamonds);
  cardCollection.addCards([card1, card2, card3, card4]);
  cardCollection.removeCards([card2]);
  t.false(cardCollection.hasCard(card2), 'Card2 remained in collection');
});

test('can check and remove multiple cards', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  const card4 = new PlayingCard(CardName.Ace, Suit.Diamonds);
  cardCollection.addCards([card1, card2, card3, card4]);
  t.true(cardCollection.hasCards([card3, card4]));
  cardCollection.removeCards([card3, card4]);
  t.false(cardCollection.hasCards([card3, card4]));
  t.true(cardCollection.hasCards([card1, card2]));
});

test('can chain addCard commands', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  const card4 = new PlayingCard(CardName.Ace, Suit.Diamonds);
  cardCollection
    .addCard(card1)
    .addCard(card2)
    .addCards([card3, card4]);
  t.true(cardCollection.hasCards([card1, card2, card3, card4]));
});

test('can take multiple cards', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  const card4 = new PlayingCard(CardName.Ace, Suit.Diamonds);
  cardCollection
    .addCard(card1)
    .addCard(card2)
    .addCards([card3, card4]);
  const pulledCards = cardCollection.takeCards(3);
  pulledCards.forEach((card: PlayingCard) => {
    t.not(card, null);
  });
  t.true(pulledCards.length === 3);
  t.true(cardCollection.getCount() === 1);
});

test('shuffles cards', async t => {
  const injectedCards: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.Ace, Suit.Diamonds)
  ];

  const cardCollection = new CardCollection(injectedCards);
  const initialLength = cardCollection.getCount();

  cardCollection.shuffle();

  t.true(cardCollection.getCount() === initialLength, 'After shuffling cards, card count no longer equivalent');
});

test('throws error if removing card not in collection', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  cardCollection
    .addCard(card1)
    .addCard(card2);
  t.false(cardCollection.hasCard(card3));
  try {
    cardCollection.removeCards([card3]);
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, 'Card does not exist in collection');
  }
});

test('takes all cards when 0 requested', async t => {
  const injectedCards: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.Ace, Suit.Diamonds)
  ];
  const cardCollection = new CardCollection(injectedCards);
  const takenCards = cardCollection.takeCards(0);
  t.true(takenCards.length === 4);
});

test('takes all cards when -1 requested', async t => {
  const injectedCards: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.Ace, Suit.Clubs),
    new PlayingCard(CardName.Ace, Suit.Hearts),
    new PlayingCard(CardName.Ace, Suit.Diamonds)
  ];
  const cardCollection = new CardCollection(injectedCards);
  const takenCards = cardCollection.takeCards(-1);
  t.true(takenCards.length === 4);
});

test('throws error if taking more cards than available', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  cardCollection.addCards([card1, card2, card3]);
  cardCollection.takeCard();
  cardCollection.takeCard();
  cardCollection.takeCard();
  t.true(cardCollection.isEmpty());

  try {
    cardCollection.takeCard();
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, 'No cards remaining in pile');
  }
});

test('can identify index of card', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  cardCollection.addCards([card1, card2, card3]);
  t.true(cardCollection.indexOfCard(new PlayingCard(CardName.Ace, Suit.Spades)) === 0);
  t.true(cardCollection.indexOfCard(new PlayingCard(CardName.Ace, Suit.Clubs)) === 1);
  t.true(cardCollection.indexOfCard(new PlayingCard(CardName.Ace, Suit.Hearts)) === 2);
  t.true(cardCollection.indexOfCard(new PlayingCard(CardName.Queen, Suit.Hearts)) === -1);
});

test('can return card at index', async t => {
  const cardCollection = new CardCollection();
  const card1 = new PlayingCard(CardName.Ace, Suit.Spades);
  const card2 = new PlayingCard(CardName.Ace, Suit.Clubs);
  const card3 = new PlayingCard(CardName.Ace, Suit.Hearts);
  cardCollection.addCards([card1, card2, card3]);
  t.true(cardCollection.cardAtIndex(2) === card3);
  try {
    cardCollection.cardAtIndex(3);
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, 'Card collection does not contain card at index');
  }
  try {
    cardCollection.cardAtIndex(-5);
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, 'Card collection does not contain card at index');
  }
});
