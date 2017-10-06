import { test } from 'ava'
import {
  PlayingCard,
  PokerHandType,
  CardName,
  Suit,
  PokerScoreService
} from 'typedeck'

function getHands (type: PokerHandType): PlayingCard[][] {
  switch (type) {
    case PokerHandType.OnePair:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.Three, Suit.Hearts)]
      ] as PlayingCard[][]
    case PokerHandType.TwoPair:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Hearts)]
      ] as PlayingCard[][]
    default:
      return [] as PlayingCard[][]
  }
}

test('evaluates a OnePair', async t => {
  const service = new PokerScoreService()
  const handsToTest: PlayingCard[][] = getHands(PokerHandType.OnePair)
  let result = service.score(handsToTest[0])
  t.true(result.handType === PokerHandType.OnePair)
})

test('evaluates a TwoPair', async t => {
  const service = new PokerScoreService()
  const handsToTest: PlayingCard[][] = getHands(PokerHandType.TwoPair)
  let result = service.score(handsToTest[0])
  t.true(result.handType === PokerHandType.TwoPair)
})
