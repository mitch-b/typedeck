import test from 'ava';
import { StandardChip, ChipColorType, ChipColor } from 'typedeck';

test('chip has type of Standard', async t => {
  const chip = new StandardChip(ChipColor.Black);
  t.deepEqual(chip.colorType, ChipColorType.Standard);
});

test('chip color is set', async t => {
  const chip = new StandardChip(ChipColor.Black);
  t.deepEqual(chip.colorType, ChipColorType.Standard);
  t.deepEqual(chip.color, ChipColor.Black);
});

test('chip color is set and type set', async t => {
  const chip = new StandardChip(ChipColor.Black, ChipColorType.Standard);
  t.deepEqual(chip.colorType, ChipColorType.Standard);
  t.deepEqual(chip.color, ChipColor.Black);
});

test('chip color is set and type set with override', async t => {
  const overrideValue = 45;
  const chip = new StandardChip(ChipColor.Black, ChipColorType.Standard, overrideValue);
  t.deepEqual(chip.colorType, ChipColorType.Standard);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.getValue(), overrideValue);
});

test('chip color is printed', async t => {
  const chip = new StandardChip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.toString(), ChipColor[ChipColor.Black]);
  t.deepEqual(chip.toString(), 'Black');
});

test('chip color is same as index', async t => {
  const chip = new StandardChip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.toString(), chip.getIndex());
});

test('chip white is 1', async t => {
  const chipColor = ChipColor.White;
  const expectedValue = 1;
  const chip = new StandardChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('chip red is 5', async t => {
  const chipColor = ChipColor.Red;
  const expectedValue = 5;
  const chip = new StandardChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('chip blue is 10', async t => {
  const chipColor = ChipColor.Blue;
  const expectedValue = 10;
  const chip = new StandardChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('chip gray is 20', async t => {
  const chipColor = ChipColor.Gray;
  const expectedValue = 20;
  const chip = new StandardChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('chip green is 25', async t => {
  const chipColor = ChipColor.Green;
  const expectedValue = 25;
  const chip = new StandardChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('chip black is 100', async t => {
  const chipColor = ChipColor.Black;
  const expectedValue = 100;
  const chip = new StandardChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('brown chip throws exception', async t => {
  const chipColor = ChipColor.Brown;
  const chip = new StandardChip(chipColor);

  try {
    chip.getValue();
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, `Unable to determine value of ${ChipColor[chipColor]} Chip for ${ChipColorType[ChipColorType.Standard]}`);
  }
});
