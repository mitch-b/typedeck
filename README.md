# <img src='http://svgshare.com/i/38a.svg' height='20px' alt='TypeDeck' /> TypeDeck

[![Build Status](https://travis-ci.org/mitch-b/typedeck.svg?branch=master)](https://travis-ci.org/mitch-b/typedeck)
[![NPM version](https://img.shields.io/npm/v/typedeck.svg)](https://www.npmjs.com/package/typedeck)
[![codecov](https://codecov.io/gh/mitch-b/typedeck/branch/master/graph/badge.svg)](https://codecov.io/gh/mitch-b/typedeck)
[![dependencies Status](https://david-dm.org/mitch-b/typedeck/status.svg)](https://david-dm.org/mitch-b/typedeck)
[![devDependencies Status](https://david-dm.org/mitch-b/typedeck/dev-status.svg)](https://david-dm.org/mitch-b/typedeck?type=dev)

A [TypeScript](https://www.typescriptlang.org/) library for playing cards. 

## Getting Started

* See the [documentation](https://mitch-b.github.io/typedeck/).
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
  * Poker Hand Scoring
* **And so much more** ... see the [documentation](https://mitch-b.github.io/typedeck/) for a full list.

## Credits

* Card images by Ben Davis from the Noun Project
* This library package is built from work by Jason Dreyzehner's [typescript-starter](https://github.com/bitjson/typescript-starter) project. This was the building block for docs, code coverage, and testing (among others). 
* Poker hand scoring from [@kequc](https://bitbucket.org/Kequc/poker-hand/)