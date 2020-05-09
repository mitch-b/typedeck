import test from 'ava';
import { Suit, PlayingCard, CardName, PokerHandResult, PokerHandType, AceLowRankSet, AceHighRankSet } from 'typedeck';

test('test tostring of hand types', async t => {
  const handResult = new PokerHandResult();
  t.deepEqual(handResult.toString(), '');
  handResult.setHandType(PokerHandType.HighCard);
  t.deepEqual(handResult.toString(), 'High Card');
  handResult.setHandType(PokerHandType.OnePair);
  t.deepEqual(handResult.toString(), 'One Pair');
  handResult.setHandType(PokerHandType.TwoPair);
  t.deepEqual(handResult.toString(), 'Two Pair');
  handResult.setHandType(PokerHandType.ThreeOfAKind);
  t.deepEqual(handResult.toString(), 'Three Of A Kind');
  handResult.setHandType(PokerHandType.Flush);
  t.deepEqual(handResult.toString(), 'Flush');
  handResult.setHandType(PokerHandType.FullHouse);
  t.deepEqual(handResult.toString(), 'Full House');
  handResult.setHandType(PokerHandType.FourOfAKind);
  t.deepEqual(handResult.toString(), 'Four Of A Kind');
  handResult.setHandType(PokerHandType.StraightFlush);
  t.deepEqual(handResult.toString(), 'Straight Flush');
  handResult.setHandType(PokerHandType.RoyalFlush);
  t.deepEqual(handResult.toString(), 'Royal Flush');
});

test('kickers should be cards which do not exist in cardsUsed', t => {
  const cardsInPlay = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Six, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed);
  t.true(handResult.kickers.length === 2);
  t.true(handResult.kickers[0].cardName === CardName.Seven);
  t.true(handResult.kickers[1].cardName === CardName.Six);
});

test('kickers should be empty if all cards used', t => {
  const cardsInPlay = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed);
  t.true(handResult.kickers.length === 0);
});

test('can be created with different RankSets', t => {
  const handResult1 = new PokerHandResult([], 0, [], new AceHighRankSet());
  t.true(handResult1.rankSet instanceof AceHighRankSet);
  const handResult2 = new PokerHandResult([], 0, [], new AceLowRankSet());
  t.true(handResult2.rankSet instanceof AceLowRankSet);
});

test('returns card names used in scoring FullHouse', t => {
  const cardsInPlay = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed).setHandType(PokerHandType.FullHouse);
  t.true(handResult.scoringHandCardNames.map(cn => CardName[cn]).join(' ') === 'Nine Seven');
});

test('returns card names used in scoring TwoPair', t => {
  const cardsInPlay = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Hearts),
    new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed).setHandType(PokerHandType.TwoPair);
  t.true(handResult.scoringHandCardNames.map(cn => CardName[cn]).join(' ') === 'Nine Seven');
});

test('returns card names used in scoring Straight', t => {
  const cardsInPlay = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
    new PlayingCard(CardName.Jack, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Eight, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
    new PlayingCard(CardName.Jack, Suit.Hearts)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed).setHandType(PokerHandType.Straight);
  t.true(handResult.scoringHandCardNames.map(cn => CardName[cn]).join(' ') === 'Jack Ten Nine Eight Seven');
});

test('returns card names used in scoring OnePair', t => {
  const cardsInPlay = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
    new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
    new PlayingCard(CardName.Three, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed).setHandType(PokerHandType.OnePair);
  t.true(handResult.scoringHandCardNames.map(cn => CardName[cn]).join(' ') === 'Seven');
});

test('returns card names used in scoring HighCard', t => {
  const cardsInPlay = [new PlayingCard(CardName.Three, Suit.Spades), new PlayingCard(CardName.Two, Suit.Diamonds),
    new PlayingCard(CardName.Ten, Suit.Spades), new PlayingCard(CardName.Four, Suit.Diamonds),
    new PlayingCard(CardName.Five, Suit.Hearts)];
  const cardsUsed = [new PlayingCard(CardName.Ten, Suit.Spades)];
  const handResult = new PokerHandResult(cardsInPlay, 0, cardsUsed).setHandType(PokerHandType.HighCard);
  t.true(handResult.scoringHandCardNames.map(cn => CardName[cn]).join(' ') === 'Ten');
});
