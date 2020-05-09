import test from 'ava';
import { HeartsGameType } from 'typedeck';

test('HeartsGameType has allowed cards', async t => {
  const gameType = new HeartsGameType();
  t.true(gameType.cardsAllowed.length > 0, 'HeartsGameType did not contain Cards at initialization');
});
