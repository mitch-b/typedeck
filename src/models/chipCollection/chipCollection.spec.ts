import { test } from 'ava'
import {
  IChip,
  Chip,
  ChipCollection,
  ChipColor,
  ChipColorType,
  StandardChip
} from 'typedeck'

test('empty without chips in constructor', async t => {
  const emptyChips: IChip[] = []
  const chipCollection = new ChipCollection()
  t.deepEqual(chipCollection.getChips(), emptyChips)
})

test('is empty with no chips', async t => {
  const chipCollection = new ChipCollection()
  t.true(chipCollection.isEmpty(), 'isEmpty() should have been true')
})

test('has chips when initialized with them', async t => {
  const chips: IChip[] = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Blue)
  ]
  const chipCollection = new ChipCollection(chips)
  t.false(chipCollection.isEmpty(), 'was empty')
  t.deepEqual(chipCollection.getChips()[0], chips[0], 'Chips were not equivalent or added in same order')
  t.deepEqual(chipCollection.getChips()[1], chips[1], 'Chips were not equivalent or added in same order')
})

test('adds a single chip', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  chipCollection.addChip(chip1)
  t.false(chipCollection.isEmpty(), 'Chip was not added')
  t.true(chipCollection.getChipCount() === 1, 'Chip count not matching')
  t.deepEqual(chipCollection.getChips()[0], chip1, 'Chip that was added did not match entry in collection')
})

test('adds multiple chips', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Blue)
  chipCollection.addChips([chip1, chip2])
  t.false(chipCollection.isEmpty(), 'Chips were not added')
  t.deepEqual(chipCollection.getChips()[0], chip1, 'Chip that was added did not match entry in collection')
  t.deepEqual(chipCollection.getChips()[1], chip2, 'Chip that was added did not match entry in collection')
})

test('sets multiple chips', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new Chip(ChipColor.Blue, ChipColorType.Standard)
  const chip2 = new Chip(ChipColor.Blue, ChipColorType.Standard)
  chipCollection.setChips([chip1, chip2])
  t.false(chipCollection.isEmpty(), 'Chips were not added')
  t.deepEqual(chipCollection.getChips()[0], chip1, 'Chip that was added did not match entry in collection')
  t.deepEqual(chipCollection.getChips()[1], chip2, 'Chip that was added did not match entry in collection')
})

test('takes chips', async t => {
  const takeChipValue = 3
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  chipCollection.setChips([chip1, chip2])
  const chipsPulled = chipCollection.takeValue(takeChipValue)
  const chipsPulledValue = chipsPulled.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  t.deepEqual(chipsPulledValue, takeChipValue)
})
