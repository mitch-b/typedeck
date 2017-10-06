import { test } from 'ava'
import { Player, Hand, PlayingCard, CardName, Suit, MathRandomStringService } from 'typedeck'

test('create player with hand', async t => {
  const playerName = 'GenericPlayerName'
  const playerHand = new Hand()
  const player = new Player(playerName, playerHand)
  t.true(player.getHand().isEmpty())
})

test('player created with random name generator', async t => {
  const playerName = 'GenericPlayerName'
  const playerHand = new Hand()
  const stringGenerator = new MathRandomStringService()
  const player = new Player(playerName, playerHand, stringGenerator)
  t.deepEqual(player.toString(), playerName)
})

test('player has an id', async t => {
  const playerName = 'GenericPlayerName'
  const player = new Player(playerName)
  t.true(player.id.length > 0, 'Player ID was not generated')
})

test('create player without hand', async t => {
  const playerName = 'GenericPlayerName'
  const player = new Player(playerName)
  t.true(player.getHand().isEmpty())
})

test('create player without a name', async t => {
  const player = new Player()
  t.true(player.name === '')
})

test('update player score', async t => {
  const playerName = 'GenericPlayerName'
  const player = new Player(playerName)
  const newScore = 5
  t.true(player.score === 0)
  player.updateScore(newScore)
  t.true(player.score === newScore)
})

test('set player hand', async t => {
  const playerName = 'GenericPlayerName'
  const player = new Player(playerName)
  t.true(player.getHand().isEmpty())
  player.setHand(new Hand([
    new PlayingCard(CardName.Jack, Suit.Diamonds)
  ]))
  t.false(player.getHand().isEmpty(), 'Player hand is empty even though it was set')
})

test('player prints out name', async t => {
  const playerName = 'GenericPlayerName'
  const player = new Player(playerName)
  t.deepEqual(player.toString(), playerName)
})

test('player id is same as index', async t => {
  const playerName = 'GenericPlayerName'
  const player = new Player(playerName)
  t.deepEqual(player.id, player.getIndex())
})
