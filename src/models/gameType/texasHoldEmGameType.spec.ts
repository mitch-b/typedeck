import { test } from 'ava';
import { TexasHoldEmPokerGameType } from 'typedeck';

test('TexasHoldEmPokerGameType has allowed cards', async t => {
  const gameType = new TexasHoldEmPokerGameType();
  t.true(gameType.cardsAllowed.length > 0, 'TexasHoldEmPokerGameType did not contain Cards at initialization');
});
