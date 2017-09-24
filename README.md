# <img src='http://svgshare.com/i/38a.svg' height='20px' alt='TypeDeck' /> TypeDeck

A [TypeScript](https://www.typescriptlang.org/) library for playing cards. 

## Getting Started

* See the [documentation](https://mitch-b.github.io/typedeck/).
* See the [examples](./examples/readme.md). (Coming soon)
* Try it yourself!

## Features

`typedeck` gives you types and classes to help jumpstart your card-based game. 

* **Card**
  * Simple card classes (`PlayingCard`/`JokerCard`)
* **Declarative Types**
  * `CardName`: `[Ace, Two, Three, ...]`
  * `Suit`: `[Clubs, Spades, Diamonds, Hearts]`
* **Card collections**
  * Classes that represent multiple cards as a logical item.
    * `Hand` - cards that belong to a player
    * `CardPile` - cards that are frequently drawn from or added to
    * `Deck` - extension of `CardPile` with additional game-time helpers
* **Services**
  * Shuffle
* **And so much more** ... see the [documentation](https://mitch-b.github.io/typedeck/) for a full list.

## Credits

* Card images by Ben Davis from the Noun Project
* This library package is built from work by Jason Dreyzehner's [typescript-starter](https://github.com/bitjson/typescript-starter) project. This was the building block for docs, code coverage, and testing (among others). 