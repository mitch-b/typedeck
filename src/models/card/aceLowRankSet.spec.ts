import { test } from 'ava'
import {
  AceLowRankSet,
  CardName,
  Card
} from 'typedeck'

test('aces are NOT higher than king', async t => {
  const rankSet = new AceLowRankSet()
  const isHigher = rankSet.cardHigherThan(new Card(CardName.Ace), new Card(CardName.King))
  t.false(isHigher, 'Ace was valued higher than King')
})
