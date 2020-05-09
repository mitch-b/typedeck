import test from 'ava';
import { Chip, ChipColorType, ChipColor } from 'typedeck';

test('chip has type of Standard if not specified', async t => {
  const chip = new Chip(ChipColor.Black);
  t.deepEqual(chip.colorType, ChipColorType.Standard);
});

test('chip color is set', async t => {
  const chip = new Chip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
});

test('chip type can be set', async t => {
  const chip = new Chip(ChipColor.Black, ChipColorType.California);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.colorType, ChipColorType.California);
});

test('chip color is printed', async t => {
  const chip = new Chip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.toString(), ChipColor[ChipColor.Black]);
  t.deepEqual(chip.toString(), 'Black');
});

test('chip color is same as index', async t => {
  const chip = new Chip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.toString(), chip.getIndex());
});

test('chip value throws error unless set', async t => {
  const chipColor = ChipColor.White;
  const chip = new Chip(chipColor);
  t.deepEqual(chip.color, chipColor);
  try {
    chip.getValue();
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message,
      `Unable to determine value of ${ChipColor[chipColor]} Chip for ${ChipColorType[ChipColorType.Standard]}`);
  }
});

test('chip value returns override value', async t => {
  const chipColor = ChipColor.White;
  const overrideValue = 10;
  const chip = new Chip(chipColor, ChipColorType.Standard, overrideValue);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), overrideValue);
  t.deepEqual(chip.getValue(chipColor), overrideValue);
});

test('chip value returns override value after creation', async t => {
  const chipColor = ChipColor.White;
  const overrideValue = 10;
  const chip = new Chip(chipColor, ChipColorType.Standard);
  chip.setColorValue(chipColor, 1000);
  chip.setValue(overrideValue);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), overrideValue);
  t.deepEqual(chip.getValue(chipColor), overrideValue);
});

test('chip value can be set by color', async t => {
  const chipColor = ChipColor.White;
  const chipValue = 20;
  const chip = new Chip(chipColor);
  chip.setColorValue(chipColor, chipValue);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), chipValue);
  t.deepEqual(chip.getValue(chipColor), chipValue);
});
