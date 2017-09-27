import { test } from 'ava'
import { CaliforniaChip, ChipColorType, ChipColor } from 'typedeck'

test('chip has type of CaliforniaChip', async t => {
  const chip = new CaliforniaChip(ChipColor.Black)
  t.deepEqual(chip.colorType, ChipColorType.California)
})

test('chip color is set', async t => {
  const chip = new CaliforniaChip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
})

test('chip color is printed', async t => {
  const chip = new CaliforniaChip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
  t.deepEqual(chip.toString(), ChipColor.Black)
  t.deepEqual(chip.toString(), 'Black')
})

test('chip color is same as index', async t => {
  const chip = new CaliforniaChip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
  t.deepEqual(chip.toString(), chip.getIndex())
})

test('chip white is 1', async t => {
  const chipColor = ChipColor.White
  const expectedValue = 1
  const chip = new CaliforniaChip(chipColor)
  t.deepEqual(chip.color, chipColor)
  t.deepEqual(chip.getValue(), expectedValue)
  t.deepEqual(chip.getValue(chipColor), expectedValue)
})

test('brown chip throws exception', async t => {
  const chipColor = ChipColor.Brown
  const chip = new CaliforniaChip(chipColor)

  try {
    chip.getValue()
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Unable to determine value of ${chipColor} Chip for ${ChipColorType.California}`)
  }
})
