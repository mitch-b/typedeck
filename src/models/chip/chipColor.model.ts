// tslint:disable-next-line:variable-name
const ChipColor = {
  Red: 'Red' as 'Red',
  Blue: 'Blue' as 'Blue',
  Green: 'Green' as 'Green',
  Black: 'Black' as 'Black',
  White: 'White' as 'White',
  Pink: 'Pink' as 'Pink',
  Gold: 'Gold' as 'Gold',
  Yellow: 'Yellow' as 'Yellow',
  Purple: 'Purple' as 'Purple',
  Brown: 'Brown' as 'Brown',
  Gray: 'Gray' as 'Gray'
}

type ChipColor = (typeof ChipColor)[keyof typeof ChipColor]
export { ChipColor }
