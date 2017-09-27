import { test } from 'ava'
import { Chip, ChipColorType, ChipColor } from 'typedeck'

test('chip has type of StandardUS if not specified', async t => {
  const chip = new Chip(ChipColor.Black)
  t.deepEqual(chip.colorType, ChipColorType.StandardUS)
})

test('chip color is set', async t => {
  const chip = new Chip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
})

test('chip type can be set', async t => {
  const chip = new Chip(ChipColor.Black, ChipColorType.California)
  t.deepEqual(chip.color, ChipColor.Black)
  t.deepEqual(chip.colorType, ChipColorType.California)
})

test('chip color is printed', async t => {
  const chip = new Chip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
  t.deepEqual(chip.toString(), ChipColor.Black)
  t.deepEqual(chip.toString(), 'Black')
})

test('chip color is same as index', async t => {
  const chip = new Chip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
  t.deepEqual(chip.toString(), chip.getIndex())
})

test('chip value is 0', async t => {
  const chipColor = ChipColor.White
  const expectedValue = 0
  const chip = new Chip(chipColor)
  t.deepEqual(chip.color, chipColor)
  t.deepEqual(chip.getValue(), expectedValue)
  t.deepEqual(chip.getValue(chipColor), expectedValue)
})
