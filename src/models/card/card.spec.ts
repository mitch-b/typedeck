import { test } from 'ava'
import { Card, CardName } from 'typedeck'

test('CardName is set', async t => {
  const testCardName = CardName.Ace
  const card = new Card(testCardName)
  t.deepEqual(card.cardName, testCardName)
})

test('CardName is printed', async t => {
  const testCardName = CardName.Ace
  const expectedString = 'Ace'
  const card = new Card(testCardName)
  t.deepEqual(card.toString(), expectedString)
})

test('toString is equivalent to getIndex', async t => {
  const testCardName = CardName.Ace
  const card = new Card(testCardName)
  t.deepEqual(card.toString(), card.getIndex())
})
