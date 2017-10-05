// tslint:disable-next-line:variable-name
const ShorthandCardName = {
  Joker: '0' as '0',
  Ace: 'A' as 'A',
  Two: '2' as '2',
  Three: '3' as '3',
  Four: '4' as '4',
  Five: '5' as '5',
  Six: '6' as '6',
  Seven: '7' as '7',
  Eight: '8' as '8',
  Nine: '9' as '9',
  Ten: 'T' as 'T',
  Jack: 'J' as 'J',
  Queen: 'Q' as 'Q',
  King: 'K' as 'K'
}
type ShorthandCardName = (typeof ShorthandCardName)[keyof typeof ShorthandCardName]
export { ShorthandCardName }
