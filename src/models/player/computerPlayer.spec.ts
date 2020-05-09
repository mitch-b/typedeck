import test from 'ava';
import { ComputerPlayer, Hand, Difficulty } from 'typedeck';

test('create ComputerPlayer with hand', async t => {
  const playerName = 'GenericComputerPlayerName';
  const playerHand = new Hand();
  const player = new ComputerPlayer(playerName, playerHand);
  t.true(player.getHand().isEmpty());
});

test('create computerPlayer without hand', async t => {
  const playerName = 'GenericComputerPlayerName';
  const player = new ComputerPlayer(playerName);
  t.true(player.getHand().isEmpty());
});

test('create computerPlayer without a name', async t => {
  const player = new ComputerPlayer();
  t.true(player.name === '');
});

test('computerPlayer prints out name', async t => {
  const playerName = 'GenericComputerPlayerName';
  const player = new ComputerPlayer(playerName);
  t.deepEqual(player.toString(), `Computer: ${playerName}`);
});

test('computerPlayer defaults to Normal difficulty', async t => {
  const playerName = 'GenericComputerPlayerName';
  const player = new ComputerPlayer(playerName);
  t.deepEqual(player.difficulty, Difficulty.Normal);
});

test('computerPlayer sets difficulty', async t => {
  const playerName = 'GenericComputerPlayerName';
  const player = new ComputerPlayer(playerName);
  player.setDifficulty(Difficulty.Expert);
  t.deepEqual(player.difficulty, Difficulty.Expert);
});

test('create ComputerPlayer with optional parameters', async t => {
  const computerPlayerFields = {
    name: 'Bleep',
    difficulty: Difficulty.Hard
  } as ComputerPlayer;
  const player = ComputerPlayer.Create(computerPlayerFields);
  t.deepEqual(player.difficulty, Difficulty.Hard);
  t.deepEqual(player.name, 'Bleep');
});

test('create ComputerPlayer with empty optional parameters', async t => {
  const player = ComputerPlayer.Create();
  t.deepEqual(player.difficulty, Difficulty.Normal);
  t.deepEqual(player.name, '');
});
