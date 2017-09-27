import { test } from 'ava'
import { StandardUSChip, ChipColorType, ChipColor } from 'typedeck'

test('chip has type of StandardUS', async t => {
  const chip = new StandardUSChip(ChipColor.Black)
  t.deepEqual(chip.colorType, ChipColorType.StandardUS)
})

test('chip color is set', async t => {
  const chip = new StandardUSChip(ChipColor.Black)
  t.deepEqual(chip.color, ChipColor.Black)
})
