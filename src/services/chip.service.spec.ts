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

test('get as many chips under or equal to requested value', async t => {
  const service = new ChipService()
  const needValue = 101
  const chips = service.createChips(needValue - 1)
  const chipsUpToValue = service.chipsUnderOrEqualToValue(needValue, chips)
  const chipsValue = service.valueOfChips(chipsUpToValue)
  t.true(chipsValue < needValue, 'Did not return expected chip results')
  t.true(chipsValue === needValue - 1, 'Did not pull as many chips as it could to meet needValue')
})

test('get as many chips under or equal to value', async t => {
  const service = new ChipService()
  const needValue = 100
  const chips = service.createChips(needValue)
  const chipsUpToValue = service.chipsUnderOrEqualToValue(needValue, chips)
  const chipsValue = service.valueOfChips(chipsUpToValue)
  t.true(chipsValue === needValue, 'Did not return expected chip results')
})

test('get as many chips under or equal to value - cant be one chip', async t => {
  const service = new ChipService()
  const needValue = 100
  const chips = service.createChips(needValue, false)
  const chipsUpToValue = service.chipsUnderOrEqualToValue(needValue, chips)
  const chipsValue = service.valueOfChips(chipsUpToValue)
  t.true(chipsValue === needValue, 'Did not return expected chip results')
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
