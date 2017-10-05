// tslint:disable-next-line:variable-name
const ShorthandSuit = {
  Clubs: 'C' as 'C',
  Spades: 'S' as 'S',
  Diamonds: 'D' as 'D',
  Hearts: 'H' as 'H'
}
type ShorthandSuit = (typeof ShorthandSuit)[keyof typeof ShorthandSuit]
export { ShorthandSuit }
