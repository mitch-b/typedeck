const CardName = {
  Ace: 'Ace' as 'Ace',
  Two: 'Two' as 'Two',
  Three: 'Three' as 'Three',
  Four: 'Four' as 'Four',
  Five: 'Five' as 'Five',
  Six: 'Six' as 'Six',
  Seven: 'Seven' as 'Seven',
  Eight: 'Eight' as 'Eight',
  Nine: 'Nine' as 'Nine',
  Ten: 'Ten' as 'Ten',
  Jack: 'Jack' as 'Jack',
  Queen: 'Queen' as 'Queen',
  King: 'King' as 'King',
  Joker: 'Joker' as 'Joker'
}

type CardName = (typeof CardName)[keyof typeof CardName]
export { CardName }
