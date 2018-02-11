# <img src='http://svgshare.com/i/38a.svg' height='24px' alt='TypeDeck' /> TypeDeck

[![Build Status](https://travis-ci.org/mitch-b/typedeck.svg?branch=master)](https://travis-ci.org/mitch-b/typedeck)
[![NPM version](https://img.shields.io/npm/v/typedeck.svg)](https://www.npmjs.com/package/typedeck)
[![codecov](https://codecov.io/gh/mitch-b/typedeck/branch/master/graph/badge.svg)](https://codecov.io/gh/mitch-b/typedeck)
[![dependencies Status](https://david-dm.org/mitch-b/typedeck/status.svg)](https://david-dm.org/mitch-b/typedeck)
[![devDependencies Status](https://david-dm.org/mitch-b/typedeck/dev-status.svg)](https://david-dm.org/mitch-b/typedeck?type=dev)

A [TypeScript](https://www.typescriptlang.org/) library for playing cards. 

## Getting Started

* See the [documentation](https://mitch-b.github.io/typedeck/).
* [Examples on RunKit](https://runkit.com/mitch-b/typedeck-examples).
  * Includes examples on extending classes and using common components!
* See code on [GitHub](https://github.com/mitch-b/typedeck/).
* Try it out in your project!

## Features

`typedeck` gives you types and classes to help jumpstart your card-based game. 

* **Card**
  * Simple card classes (`PlayingCard`/`JokerCard`)
* **Chip**
  * Provided Chip classes and standard values
    * Values can be overridden, and custom Chip classes
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
    * Shuffle any `ICard` implementation
  * Poker Hand Scoring
    * Texas Hold Em Hand Detection
    * Winner scoring/determination
  * Chip management
    * Taking specific values
    * Creating chips from value
    * Breaking chips to get specific value
* **And so much more** ... see the [documentation](https://mitch-b.github.io/typedeck/) for a full list.

## Customization

Most features support parameters that implement either an interface or
a base class. You can create your own type of Card that implements `ICard` or 
a Chip with special chip color values which extends `Chip` base class. 

## Credits

* Card images by Ben Davis from the Noun Project
* This library package is built from work by Jason Dreyzehner's [typescript-starter](https://github.com/bitjson/typescript-starter) project. This was the building block for docs, code coverage, and testing (among others). 
* Poker hand scoring from [@kequc](https://bitbucket.org/Kequc/poker-hand/)
  * [How to score a poker hand in JavaScript](http://www.kequc.com/2016/07/31/how-to-score-a-poker-hand-in-javascript)