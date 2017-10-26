import { test } from 'ava'
import {
  IChip,
  StandardChip,
  ChipColor,
  ChipCollection,
  ChipService
} from 'typedeck'

test('can split chips from collection', async t => {
  const service = new ChipService()
  const myChips: IChip[] = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Blue)
  ]
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 100
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can split chips by concatenating chips', async t => {
  const service = new ChipService()
  const myChips: IChip[] = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Blue)
  ]
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 110
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can split chips by breaking up a chip and giving smaller denominations', async t => {
  const service = new ChipService()
  const myChips: IChip[] = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Blue)
  ]
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 20
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can split chips by breaking up a chip and giving smaller denominations complex', async t => {
  const service = new ChipService()
  const myChips: IChip[] = service.createChips(401)
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 398
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can split chips by breaking up a chip and giving smaller denominations complex 2', async t => {
  const service = new ChipService()
  const myChips: IChip[] = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Black)
  ]
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 37
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can split chips by breaking up a chip and giving smaller denominations complex 3', async t => {
  const service = new ChipService()
  const chipCollection = new ChipCollection()
    .addChips(service.createChips(300))
    .addChips(service.createChips(63))
    .addChips(service.createChips(67))
    .addChips(service.createChips(84))
  const initialValue = chipCollection.getValue()
  const requestedAmount = 67
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can create chips from amount 1', async t => {
  const service = new ChipService()
  const requestedChips = 1
  const chips = service.createChips(requestedChips, true, StandardChip)
  const chipsValue = service.valueOfChips(chips)
  t.true(chipsValue === requestedChips, 'Amount pulled did not match requested')
})

test('can create chips for large amount of 1023124', async t => {
  const service = new ChipService()
  const requestedChips = 1023124
  const chips = service.createChips(requestedChips, true, StandardChip)
  const chipsValue = service.valueOfChips(chips)
  t.true(chipsValue === requestedChips, 'Amount pulled did not match requested')
})

test('can create chips from amount 31', async t => {
  const service = new ChipService()
  const requestedChips = 31
  const chips = service.createChips(requestedChips)
  const chipsValue = service.valueOfChips(chips)
  t.true(chipsValue === requestedChips, 'Amount pulled did not match requested')
})

test('calculates chip sum', async t => {
  const service = new ChipService()
  const requestedChips = 99327
  const chips = service.createChips(requestedChips)
  const chipsValue = service.valueOfChips(chips)
  const calculatedValue = chips.reduce((a: number, b: IChip) => a + b.getValue(), 0)
  t.true(chipsValue === calculatedValue, 'Amount pulled did not match requested')
  t.true(chipsValue === requestedChips, 'Amount pulled did not match requested')
})

test('returns lowest chip to break if all too large', async t => {
  const service = new ChipService()
  const requestedValue = 7
  const chips = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Gray),
    new StandardChip(ChipColor.Green)
  ]
  const breakChip = service.getNextChipToBreak(chips, requestedValue)
  t.deepEqual(breakChip, new StandardChip(ChipColor.Gray), 'Lowest value chip not broken')
})

test('throws error if making change less than passed in', async t => {
  const service = new ChipService()
  const hasValue = 84
  const needValue = 100
  const chipCollection = new ChipCollection(service.createChips(hasValue))
  try {
    service.makeChange(chipCollection, needValue)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Not enough chips (${hasValue}) to satisfy requested amount ${needValue}`)
  }
})

test('throws error if making change less than passed in', async t => {
  const service = new ChipService()
  const hasValue = 84
  const needValue = 100
  const chipCollection = new ChipCollection(service.createChips(hasValue))
  try {
    service.makeChange(chipCollection, needValue)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Not enough chips (${hasValue}) to satisfy requested amount ${needValue}`)
  }
})

test('throws error if requesting negative values', async t => {
  const service = new ChipService()
  const hasValue = 10
  const needValue = -3
  const chipCollection = new ChipCollection(service.createChips(hasValue))
  try {
    service.makeChange(chipCollection, needValue)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `makeChange requires a positive Chip amount needed`)
  }
})

test('throws error if requesting negative values', async t => {
  const service = new ChipService()
  const hasValue = 10
  const needValue = 0
  const chipCollection = new ChipCollection(service.createChips(hasValue))
  try {
    service.makeChange(chipCollection, needValue)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `makeChange requires a positive Chip amount needed`)
  }
})

test('value of chips is 0', async t => {
  const service = new ChipService()
  const hasValue = 0
  const chips = service.createChips(hasValue)
  t.true(service.valueOfChips(chips) === 0)
})

test('value of chips is 0', async t => {
  const service = new ChipService()
  t.true(service.valueOfChips([]) === 0)
})

test('throws error if requesting chip value that cant be split into', async t => {
  const service = new ChipService()
  const hasValue = 0.5
  try {
    service.createChips(hasValue, true, StandardChip)
    t.fail('Error should have thrown')
  } catch (err) {
    t.deepEqual(err.message, `Incompatible Chip class to fulfill a value of '${hasValue}'`)
  }
})

test('can make large complex change 1', async t => {
  const service = new ChipService()
  const myChips: IChip[] = service.createChips(300)
  myChips.push(...service.createChips(67))
  myChips.push(...service.createChips(33))
  myChips.push(...service.createChips(63))
  myChips.push(...service.createChips(41))
  myChips.push(...service.createChips(82))
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 67
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})