import test from 'ava';
import { CaliforniaChip, ChipColorType, ChipColor } from 'typedeck';

test('chip has type of CaliforniaChip', async t => {
  const chip = new CaliforniaChip(ChipColor.Black);
  t.deepEqual(chip.colorType, ChipColorType.California);
});

test('chip color is set', async t => {
  const chip = new CaliforniaChip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
});

test('chip color is set and type set', async t => {
  const chip = new CaliforniaChip(ChipColor.Black, ChipColorType.California);
  t.deepEqual(chip.colorType, ChipColorType.California);
  t.deepEqual(chip.color, ChipColor.Black);
});

test('chip color is set and type set with override', async t => {
  const overrideValue = 45;
  const chip = new CaliforniaChip(ChipColor.Black, ChipColorType.California, overrideValue);
  t.deepEqual(chip.colorType, ChipColorType.California);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.getValue(), overrideValue);
});

test('chip color is printed', async t => {
  const chip = new CaliforniaChip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.toString(), ChipColor[ChipColor.Black]);
  t.deepEqual(chip.toString(), 'Black');
});

test('chip color is same as index', async t => {
  const chip = new CaliforniaChip(ChipColor.Black);
  t.deepEqual(chip.color, ChipColor.Black);
  t.deepEqual(chip.toString(), chip.getIndex());
});

test('chip blue is 1', async t => {
  const chipColor = ChipColor.Blue;
  const expectedValue = 1;
  const chip = new CaliforniaChip(chipColor);
  t.deepEqual(chip.color, chipColor);
  t.deepEqual(chip.getValue(), expectedValue);
  t.deepEqual(chip.getValue(chipColor), expectedValue);
});

test('gold chip throws exception', async t => {
  const chipColor = ChipColor.Gold;
  const chip = new CaliforniaChip(chipColor);

  try {
    chip.getValue();
    t.fail('Error should have thrown');
  } catch (err) {
    t.deepEqual(err.message, `Unable to determine value of ${ChipColor[chipColor]} Chip for ${ChipColorType[ChipColorType.California]}`);
  }
});
