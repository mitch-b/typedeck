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
  const myChips: IChip[] = [
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Black),
    new StandardChip(ChipColor.Black)
  ]
  const chipCollection = new ChipCollection(myChips)
  const initialValue = chipCollection.getValue()
  const requestedAmount = 398
  const chipsOfRequestedValue = new ChipCollection(service.makeChange(chipCollection, requestedAmount))
  t.true(chipsOfRequestedValue.getValue() === requestedAmount, 'Amount pulled did not match requested')
  t.true(chipCollection.getValue() === initialValue - requestedAmount, 'Chips left in collection do not match pulled')
})

test('can create chips from amount 31', async t => {
  const service = new ChipService()
  const requestedChips = 31
  const chips = service.createChipsFromAmount(requestedChips)
  const chipsValue = service.valueOfChips(chips)
  t.true(chipsValue === requestedChips, 'Amount pulled did not match requested')
})
