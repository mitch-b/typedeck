import { test } from 'ava';
import { SolitaireGameType } from 'typedeck';

test('SolitaireGameType has allowed cards', async t => {
  const gameType = new SolitaireGameType();
  t.true(gameType.cardsAllowed.length > 0, 'SolitaireGameType did not contain Cards at initialization');
});
