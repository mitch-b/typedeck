import { test } from 'ava'
import { JokerCard, CardName } from 'typedeck'

test('CardName is set', async t => {
  const card = new JokerCard()
  t.deepEqual(card.cardName, CardName.Joker)
})

test('Joker is printed', async t => {
  const expectedString = 'Joker'
  const card = new JokerCard()
  t.deepEqual(card.toString(), expectedString)
})

test('toString is equivalent to getIndex', async t => {
  const card = new JokerCard()
  t.deepEqual(card.toString(), card.getIndex())
})

test('JokerCard allows other CardNames', async t => {
  const card = new JokerCard(CardName.Ace)
  t.deepEqual(card.toString(), 'Ace')
})
