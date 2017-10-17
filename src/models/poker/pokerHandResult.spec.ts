import { test } from 'ava'
import { PokerHandResult, PokerHandType } from 'typedeck'

test('test tostring of hand types', async t => {
  const handResult = new PokerHandResult()
  handResult.setHandType(PokerHandType.HighCard)
  t.deepEqual(handResult.toString(), 'High Card')
  handResult.setHandType(PokerHandType.OnePair)
  t.deepEqual(handResult.toString(), 'One Pair')
  handResult.setHandType(PokerHandType.TwoPair)
  t.deepEqual(handResult.toString(), 'Two Pair')
  handResult.setHandType(PokerHandType.ThreeOfAKind)
  t.deepEqual(handResult.toString(), 'Three Of A Kind')
  handResult.setHandType(PokerHandType.Flush)
  t.deepEqual(handResult.toString(), 'Flush')
  handResult.setHandType(PokerHandType.FullHouse)
  t.deepEqual(handResult.toString(), 'Full House')
  handResult.setHandType(PokerHandType.FourOfAKind)
  t.deepEqual(handResult.toString(), 'Four Of A Kind')
  handResult.setHandType(PokerHandType.StraightFlush)
  t.deepEqual(handResult.toString(), 'Straight Flush')
  handResult.setHandType(PokerHandType.RoyalFlush)
  t.deepEqual(handResult.toString(), 'Royal Flush')
})
