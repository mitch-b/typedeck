import { test } from 'ava'
import {
  PlayingCard,
  PokerHandType
} from 'typedeck'

function getHands (type: PokerHandType): PlayingCard[][] {
  switch (type) {
    case PokerHandType.TwoPair:
      return [
        [PlayingCard.From('7', 'S'), PlayingCard.From('7', 'D'), PlayingCard.From('9', 'S'), PlayingCard.From('T', 'D'), PlayingCard.From('3', 'H')]
      ] as PlayingCard[][]
    default:
      return [] as PlayingCard[][]
  }
}
