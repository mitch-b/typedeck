import { test } from 'ava';
import {
  IterableExtensions, StandardChip, ChipColor, IChip
} from 'typedeck';

test('produces combinations', async t => {
  const testArray: IChip[] = [
    new StandardChip(ChipColor.White),
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Green)
  ];
  let combinations: IChip[][] = [];
  for (let comb of IterableExtensions.Combinations(testArray, 3)) {
    combinations.push(comb);
  }
  t.true(combinations.length === 1, 'did not produce proper number of combinations');

  combinations = [];
  for (let comb of IterableExtensions.Combinations(testArray, 2)) {
    combinations.push(comb);
  }
  t.true(combinations.length === 3, 'did not produce proper number of combinations');

  combinations = [];
  for (let comb of IterableExtensions.Combinations(testArray, 1)) {
    combinations.push(comb);
  }
  t.true(combinations.length === 3, 'did not produce proper number of combinations');
});

test('produces empty result if asking for too large combination', async t => {
  const testArray: IChip[] = [
    new StandardChip(ChipColor.White),
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Green)
  ];
  let combinations: IChip[][] = [];
  for (let comb of IterableExtensions.Combinations(testArray, 4)) {
    combinations.push(comb);
  }
  t.true(combinations.length === 0, 'produced erroneous combinations');
});

test('produces ranges counting up', async t => {
  const start = 1;
  const end = 11;
  const step = 1;
  let rangeNumbers: number[] = [];
  for (let num of IterableExtensions.Range(start, end, step)) {
    rangeNumbers.push(num);
  }
  t.true(rangeNumbers.length === 10, 'produced erroneous range');
  t.true(rangeNumbers[0] === 1, 'first number in range wrong');
  t.true(rangeNumbers[9] === 10, 'last number in range wrong');
});

test('produces ranges counting up by 2s', async t => {
  const start = 1;
  const end = 11;
  const step = 2;
  let rangeNumbers: number[] = [];
  for (let num of IterableExtensions.Range(start, end, step)) {
    rangeNumbers.push(num);
  }
  t.true(rangeNumbers.length === 5, 'produced erroneous range');
});

test('produces ranges counting down', async t => {
  const start = 15;
  const end = 9;
  const step = -1;
  let rangeNumbers: number[] = [];
  for (let num of IterableExtensions.Range(start, end, step)) {
    rangeNumbers.push(num);
  }
  t.true(rangeNumbers.length === 6, 'produced erroneous range');
  t.true(rangeNumbers[0] === 15, 'first number in range wrong');
  t.true(rangeNumbers[5] === 10, 'last number in range wrong');
});
