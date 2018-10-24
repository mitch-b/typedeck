import { test } from 'ava';
import {
  AceHighRankSet,
  CardName,
  Card
} from 'typedeck';

test('aces are higher than king', async t => {
  const rankSet = new AceHighRankSet();
  const isHigher = rankSet.cardHigherThan(new Card(CardName.Ace), new Card(CardName.King));
  t.true(isHigher, 'Ace was not valued higher than King');
});
