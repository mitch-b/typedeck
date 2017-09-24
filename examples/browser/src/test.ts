import { PlayingCard, CardName, Suit } from 'typedeck'

let playingCard = new PlayingCard(CardName.Jack, Suit.Clubs)

let expectedString = 'Jack of Clubs'

if (playingCard.toString() === expectedString) {
  console.log('Success!')
} else {
  console.log('Card did not contain expected value')
}
