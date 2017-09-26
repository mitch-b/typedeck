import { test } from 'ava'
import { CardName, Card, IndexedMap } from 'typedeck'

test('add card', async t => {
  const cardIndexedMap = new IndexedMap<Card, string>()

  const testCard1 = new Card(CardName.Ace)
  cardIndexedMap.add(testCard1, 'testCard1')

  t.deepEqual(cardIndexedMap.entries().size, 1)
})

test('get card', async t => {
  const cardIndexedMap = new IndexedMap<Card, string>()

  const testCard1 = new Card(CardName.Ace)
  const testCard2 = new Card(CardName.Joker)
  cardIndexedMap.add(testCard1, 'testCard1')
  cardIndexedMap.add(testCard2, 'testCard2')

  t.deepEqual(cardIndexedMap.get(testCard1), 'testCard1')
  t.deepEqual(cardIndexedMap.get(testCard2), 'testCard2')
})

test('delete card', async t => {
  const cardIndexedMap = new IndexedMap<Card, string>()

  const testCard1 = new Card(CardName.Ace)
  cardIndexedMap.add(testCard1, 'testCard1')

  t.deepEqual(cardIndexedMap.entries().size, 1)

  cardIndexedMap.delete(testCard1)

  t.deepEqual(cardIndexedMap.entries().size, 0)
})

test('clear cards', async t => {
  const cardIndexedMap = new IndexedMap<Card, string>()

  const testCard1 = new Card(CardName.Ace)
  const testCard2 = new Card(CardName.Joker)
  cardIndexedMap.add(testCard1, 'testCard1')
  cardIndexedMap.add(testCard2, 'testCard2')

  t.deepEqual(cardIndexedMap.entries().size, 2)

  cardIndexedMap.clear()

  t.deepEqual(cardIndexedMap.entries().size, 0)
})

test('contains card', async t => {
  const cardIndexedMap = new IndexedMap<Card, string>()

  const testCard1 = new Card(CardName.Ace)
  cardIndexedMap.add(testCard1, 'testCard1')

  t.deepEqual(cardIndexedMap.contains(testCard1), true)
})
