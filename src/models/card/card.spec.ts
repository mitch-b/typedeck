import { test } from 'ava'
import { Card, CardName } from 'typedeck'

test('card', async t => {
  t.deepEqual(new Card(CardName.Ace), new Card(CardName.Ace))
})
