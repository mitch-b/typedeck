import test from 'ava';
import { BaseGameType, DeckOptions, ICard, PlayingCard, CardName, Suit } from 'typedeck';

test('basegametype has empty allowed cards', async t => {
  const gameType = new BaseGameType();
  t.true(gameType.cardsAllowed.length === 0, 'BaseGameType contained allowed Cards at initialization');
});

test('creates a deck without options', async t => {
  const allowedCards: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Hearts)
  ];
  const gameType = new BaseGameType();
  gameType.cardsAllowed = allowedCards;
  const deck = gameType.createDeck();
  t.true(deck.getCount() === 2);
  t.true(deck.hasCards([
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Hearts)
  ]));
});

test('creates a deck with options', async t => {
  const allowedCards: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Hearts)
  ];
  const gameType = new BaseGameType();
  gameType.cardsAllowed = allowedCards;

  const options = new DeckOptions();
  options.numberOfDecks = 2;

  const deck = gameType.createDeck(options);
  t.true(deck.getCount() === (allowedCards.length * options.numberOfDecks) + options.extraCards.length);
  deck.removeCards([new PlayingCard(CardName.Ace, Suit.Spades)]);
  t.true(deck.hasCards([
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Hearts)
  ]));
});

test('creates a deck with options and extra cards', async t => {
  const allowedCards: ICard[] = [
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Hearts)
  ];
  const gameType = new BaseGameType();
  gameType.cardsAllowed = allowedCards;

  const options = new DeckOptions();
  options.numberOfDecks = 2;
  options.extraCards = [
    new PlayingCard(CardName.Jack, Suit.Clubs)
  ];

  const deck = gameType.createDeck(options);
  t.true(deck.getCount() === (allowedCards.length * options.numberOfDecks) + options.extraCards.length);
  deck.removeCards([new PlayingCard(CardName.Ace, Suit.Spades)]);
  t.true(deck.hasCards([
    new PlayingCard(CardName.Ace, Suit.Spades),
    new PlayingCard(CardName.King, Suit.Hearts),
    new PlayingCard(CardName.Jack, Suit.Clubs)
  ]));
});
