import { test } from 'ava'
import {
  DurstenfeldShuffleService,
  ICard,
  Card,
  CardName
} from 'typedeck'

test('does shuffle', async t => {
  const service = new DurstenfeldShuffleService()
  const shuffledCards: ICard[] = [
    new Card(CardName.Ace),
    new Card(CardName.Five),
    new Card(CardName.Six)
  ]
  const staticCards: ICard[] = [
    new Card(CardName.Ace),
    new Card(CardName.Five),
    new Card(CardName.Six)
  ]
  service.shuffle(shuffledCards)
  let allEquivalent = true
  for (let i = 0; i < shuffledCards.length; i++) {
    if (staticCards[i].getIndex() !== shuffledCards[i].getIndex()) {
      allEquivalent = false
      break
    }
  }
  t.false(allEquivalent)
})

test('will error on less than 2 cards', async t => {
  const service = new DurstenfeldShuffleService()
  const cardsToShuffle: ICard[] = [
    new Card(CardName.Ace)
  ]
  try {
    service.shuffle(cardsToShuffle)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, 'Not enough cards to shuffle')
  }
})
