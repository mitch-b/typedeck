import { test } from 'ava'
import {
  IChip,
  Chip,
  ChipCollection,
  ChipColor,
  ChipColorType,
  StandardChip,
  ChipService
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

test('takes chips in odd amounts', async t => {
  const takeChipValue = 67
  const chipService = new ChipService()
  const chipCollection = new ChipCollection([...chipService.createChips(300)])
  const chipsPulled = chipCollection.takeValue(takeChipValue)
  const chipsPulledValue = chipsPulled.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  t.deepEqual(chipsPulledValue, takeChipValue)
})

test('removes no chips', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  chipCollection.setChips([chip1, chip2])
  chipCollection.removeChips([])
  t.deepEqual(chipCollection.getChipCount(), 2)
})

test('removes one chip', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  chipCollection.setChips([chip1, chip2])
  chipCollection.removeChips([chip1])
  t.deepEqual(chipCollection.getChipCount(), 1)
  t.deepEqual(chipCollection.getChips(), [chip2])
})

test('throws error when removing chip that doesnt exist', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  chipCollection.setChips([chip1, chip2])
  try {
    chipCollection.removeChips([new StandardChip(ChipColor.White)])
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Chip does not exist in collection`)
  }
})

test('index of chip is provided', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  const chip3 = new StandardChip(ChipColor.Red)
  chipCollection.setChips([chip1, chip2, chip3])
  const position = chipCollection.indexOfChip(chip2)
  t.true(position === 1)
})

test('index -1 for chip that doesnt exist', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  const chip3 = new StandardChip(ChipColor.Red)
  const chip4 = new StandardChip(ChipColor.Green)
  chipCollection.setChips([chip1, chip2, chip3])
  const position = chipCollection.indexOfChip(chip4)
  t.true(position === -1)
})

test('takeValue throws error if more requested than in collection', async t => {
  const takeChipValue = 300
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  chipCollection.setChips([chip1, chip2])
  const chipCollectionValue = chipCollection.getValue()
  try {
    chipCollection.takeValue(takeChipValue)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Not enough chips (${chipCollectionValue}) to satisfy requested amount ${takeChipValue}`)
  }
})

test('getValue returns all chips value', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  chipCollection.setChips([chip1, chip2])
  const chipCollectionValue = chipCollection.getValue()
  t.true(chipCollectionValue === 110)
})

test('getValue can have chips passed in', async t => {
  const chipCollection = new ChipCollection()
  const chip1 = new StandardChip(ChipColor.Blue)
  const chip2 = new StandardChip(ChipColor.Black)
  const calculatedValue = chipCollection.getValue([chip1, chip2])
  t.true(calculatedValue === 110)
})
