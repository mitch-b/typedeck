import { test } from 'ava'
import {
  PlayingCard,
  PokerHandType,
  CardName,
  Suit,
  PokerScoreService,
  Hand,
  Player,
  PokerHandResult
} from 'typedeck'

let getHands = (type: PokerHandType): PlayingCard[][] => {
  switch (type) {
    case PokerHandType.HighCard:
      return [
        [new PlayingCard(CardName.Ace, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.King, Suit.Hearts)],
        [new PlayingCard(CardName.Three, Suit.Spades), new PlayingCard(CardName.Two, Suit.Diamonds),
          new PlayingCard(CardName.Ten, Suit.Spades), new PlayingCard(CardName.Four, Suit.Diamonds),
          new PlayingCard(CardName.Five, Suit.Hearts)],
        [new PlayingCard(CardName.Three, Suit.Spades), new PlayingCard(CardName.Two, Suit.Diamonds),
          new PlayingCard(CardName.Ten, Suit.Spades), new PlayingCard(CardName.Four, Suit.Diamonds),
          new PlayingCard(CardName.Five, Suit.Hearts), new PlayingCard(CardName.Queen, Suit.Diamonds),
          new PlayingCard(CardName.Eight, Suit.Clubs)]
      ]
    case PokerHandType.OnePair:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.Three, Suit.Hearts)],
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.Three, Suit.Hearts), new PlayingCard(CardName.Four, Suit.Clubs),
          new PlayingCard(CardName.Queen, Suit.Hearts)]
      ]
    case PokerHandType.TwoPair:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Hearts)]
      ]
    case PokerHandType.ThreeOfAKind:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Six, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Hearts)]
      ]
    case PokerHandType.Straight:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Eight, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Diamonds),
          new PlayingCard(CardName.Jack, Suit.Hearts)],
        [new PlayingCard(CardName.Three, Suit.Spades), new PlayingCard(CardName.Two, Suit.Diamonds),
          new PlayingCard(CardName.Ace, Suit.Spades), new PlayingCard(CardName.Four, Suit.Diamonds),
          new PlayingCard(CardName.Five, Suit.Hearts)],
        [new PlayingCard(CardName.Jack, Suit.Spades), new PlayingCard(CardName.Queen, Suit.Diamonds),
          new PlayingCard(CardName.Ace, Suit.Spades), new PlayingCard(CardName.King, Suit.Diamonds),
          new PlayingCard(CardName.Ten, Suit.Hearts)],
        [new PlayingCard(CardName.Three, Suit.Spades), new PlayingCard(CardName.Two, Suit.Diamonds),
          new PlayingCard(CardName.Ten, Suit.Spades), new PlayingCard(CardName.Four, Suit.Diamonds),
          new PlayingCard(CardName.Five, Suit.Hearts), new PlayingCard(CardName.Ace, Suit.Diamonds),
          new PlayingCard(CardName.Eight, Suit.Clubs)]
      ]
    case PokerHandType.Flush:
      return [
        [new PlayingCard(CardName.King, Suit.Spades), new PlayingCard(CardName.Five, Suit.Spades),
          new PlayingCard(CardName.Two, Suit.Spades), new PlayingCard(CardName.Ten, Suit.Spades),
          new PlayingCard(CardName.Jack, Suit.Spades)]
      ]
    case PokerHandType.FullHouse:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Seven, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Hearts)]
      ]
    case PokerHandType.FourOfAKind:
      return [
        [new PlayingCard(CardName.Seven, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Clubs),
          new PlayingCard(CardName.Nine, Suit.Spades), new PlayingCard(CardName.Nine, Suit.Diamonds),
          new PlayingCard(CardName.Nine, Suit.Hearts)]
      ]
    case PokerHandType.StraightFlush:
      return [
        [new PlayingCard(CardName.Four, Suit.Clubs), new PlayingCard(CardName.Five, Suit.Clubs),
          new PlayingCard(CardName.Six, Suit.Clubs), new PlayingCard(CardName.Seven, Suit.Clubs),
          new PlayingCard(CardName.Eight, Suit.Clubs)]
      ]
    case PokerHandType.RoyalFlush:
      return [
        [new PlayingCard(CardName.Ten, Suit.Clubs), new PlayingCard(CardName.Queen, Suit.Clubs),
          new PlayingCard(CardName.King, Suit.Clubs), new PlayingCard(CardName.Jack, Suit.Clubs),
          new PlayingCard(CardName.Ace, Suit.Clubs)]
      ]
    default:
      return []
  }
}

test('exception thrown for invalid card amount tested', async t => {
  const service = new PokerScoreService()
  const handsToTest: PlayingCard[][] = getHands(PokerHandType.OnePair)
  try {
    service.scoreCards(handsToTest[0].splice(0, 1))
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, 'Poker Scoring: Invalid cards provided. Please send at least 5 cards.')
  }
})

test('evaluates from cards with community cards', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  const handToTest: Hand = new Hand(getHands(testForHandType)[0].slice(0, 5))
  const handResult: PokerHandResult = service.scoreCards(handToTest.getCards() as PlayingCard[], [new PlayingCard(CardName.Jack, Suit.Clubs)])
  t.deepEqual(handResult.handType, testForHandType)
})

test('exception thrown for invalid hand card amount tested', async t => {
  const service = new PokerScoreService()
  const handToTest: Hand = new Hand(getHands(PokerHandType.OnePair)[0].splice(0, 1))
  try {
    service.scoreHand(handToTest)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, 'Poker Scoring: Invalid cards provided. Please send at least 5 cards.')
  }
})

test('evaluates from a Hand', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  const handToTest: Hand = new Hand(getHands(testForHandType)[0])
  const handResult: PokerHandResult = service.scoreHand(handToTest)
  t.deepEqual(handResult.handType, testForHandType)
})

test('evaluates from a Hand with community cards', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  const communityCards = getHands(testForHandType)[0]
  const handCards = [communityCards.pop(), communityCards.pop()] as PlayingCard[]
  const handToTest: Hand = new Hand(handCards)
  const handResult: PokerHandResult = service.scoreHand(handToTest, communityCards)
  t.deepEqual(handResult.handType, testForHandType)
})

test('exception thrown for invalid Player card amount tested', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  const handToTest: Hand = new Hand(getHands(testForHandType)[0].splice(0, 3))
  const player = new Player('Random Player', handToTest)
  try {
    service.scorePlayers([player], [])
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Poker Scoring: Invalid cards provided for ${player.name}. Please send at least 5 cards.`)
  }
})

test('evaluates from a Player', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  const handToTest: Hand = new Hand(getHands(testForHandType)[0])
  const player = new Player('Random Player', handToTest)
  const playerResults = service.scorePlayers([player])
  t.deepEqual(playerResults.get(player).handType, testForHandType)
})

test('evaluates from multiple Players', async t => {
  const service = new PokerScoreService()

  const testForHandType1 = PokerHandType.OnePair
  const handToTest1: Hand = new Hand(getHands(testForHandType1)[0])
  const player1 = new Player('Random Player 1', handToTest1)

  const testForHandType2 = PokerHandType.TwoPair
  const handToTest2: Hand = new Hand(getHands(testForHandType2)[0])
  const player2 = new Player('Random Player 2', handToTest2)

  const testForHandType3 = PokerHandType.ThreeOfAKind
  const handToTest3: Hand = new Hand(getHands(testForHandType3)[0])
  const player3 = new Player('Random Player 3', handToTest3)

  const playerResults = service.scorePlayers([player1, player2, player3])
  t.deepEqual(playerResults.get(player1).handType, testForHandType1)
  t.deepEqual(playerResults.get(player2).handType, testForHandType2)
  t.deepEqual(playerResults.get(player3).handType, testForHandType3)
})

test('evaluates from a Player with community cards', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  const communityCards = getHands(testForHandType)[0]
  const handCards = [communityCards.pop(), communityCards.pop()] as PlayingCard[]
  const handToTest: Hand = new Hand(handCards)
  const player = new Player('Random Player', handToTest)
  const playerResults = service.scorePlayers([player], communityCards)
  t.deepEqual(playerResults.get(player).handType, testForHandType)
})

test('evaluates a HighCard', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.HighCard
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a OnePair', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.OnePair
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a TwoPair', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.TwoPair
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a ThreeOfAKind', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.ThreeOfAKind
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Straight', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.Straight
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Straight', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.Flush
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Straight', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.FullHouse
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Straight', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.FourOfAKind
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Straight', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.StraightFlush
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Straight', async t => {
  const service = new PokerScoreService()
  const testForHandType = PokerHandType.RoyalFlush
  for (const hand of getHands(testForHandType)) {
    let result = service.scoreCards(hand)
    t.true(result.handType === testForHandType)
  }
})

test('evaluates a Score from cards', async t => {
  const service = new PokerScoreService()
  let testForHandType = PokerHandType.HighCard
  for (const hand of getHands(testForHandType)) {
    const score = service.getScoreRank(service.scoreCards(hand))
    t.true(score > 0)
  }
  testForHandType = PokerHandType.TwoPair
  for (const hand of getHands(testForHandType)) {
    const score = service.getScoreRank(service.scoreCards(hand))
    t.true(score > 0)
    t.true(score.toString()[0] === testForHandType.toString())
  }
  testForHandType = PokerHandType.Straight
  for (const hand of getHands(testForHandType)) {
    const score = service.getScoreRank(service.scoreCards(hand))
    t.true(score > 0)
    t.true(score.toString()[0] === testForHandType.toString())
  }
})

test('throws error when scoring if less than 5 cards sent', async t => {
  const service = new PokerScoreService()
  const handResult = new PokerHandResult(getHands(PokerHandType.Straight)[0].splice(0, 3))
  try {
    service.getScoreRank(handResult)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, 'Poker Scoring: Invalid cards provided. Please send at least 5 cards.')
  }
})
