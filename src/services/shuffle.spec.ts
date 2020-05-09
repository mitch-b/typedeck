import test from 'ava';
import {
  DurstenfeldShuffleService,
  ICard,
  Card,
  CardName
} from 'typedeck';

test('does shuffle', async t => {
  const service = new DurstenfeldShuffleService();
  const staticCards: ICard[] = [
    new Card(CardName.Ace),
    new Card(CardName.Two),
    new Card(CardName.Three),
    new Card(CardName.Four),
    new Card(CardName.Five),
    new Card(CardName.Six),
    new Card(CardName.Seven),
    new Card(CardName.Eight),
    new Card(CardName.Nine),
    new Card(CardName.Ten),
    new Card(CardName.Jack),
    new Card(CardName.Queen),
    new Card(CardName.King),
    new Card(CardName.Joker)
  ];
  const shuffledCards = service.shuffle([...staticCards]);
  let allEquivalent = true;
  for (let i = 0; i < shuffledCards.length; i++) {
    if (staticCards[i].getIndex() !== shuffledCards[i].getIndex()) {
      allEquivalent = false;
      break;
    }
  }
  t.false(allEquivalent);
});

test('will error on less than 2 cards', async t => {
  const service = new DurstenfeldShuffleService();
  const cardsToShuffle: ICard[] = [
    new Card(CardName.Ace)
  ];
  try {
    service.shuffle(cardsToShuffle);
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, 'Not enough cards to shuffle');
  }
});
