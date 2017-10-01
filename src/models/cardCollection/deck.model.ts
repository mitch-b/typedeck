import { Suit } from '../card/suit.model'
import { CardName } from '../card/cardName.model'
import { PlayingCard } from '../card/playingCard.model'
import { CardPile } from './cardPile.model'
import { ICard } from '../card/card.interface'
import { HandOptions } from './handOptions.model'

import { IHand } from './hand.interface'
import { Hand } from './hand.model'

import { IDeck } from './deck.interface'

/**
 * Deck represents the source of cards in play. As such,
 * a Deck is merely a pile of cards that are drawn from
 * throughout the duration of the ongoing game.
 */
export class Deck extends CardPile implements IDeck {
  public name = 'Deck'
  constructor (cards: ICard[] = []) {
    super(cards) // CardPile.constructor
  }

  public static BuildFrom (cards: ICard[] = []): Deck {
    return new Deck(cards)
  }

  public static Build (suits: Suit[], cardNames: CardName[], extraCards: ICard[] = []): Deck {
    let cards: ICard[] = []

    suits.forEach((suit) =>
      cardNames.forEach((cardName) =>
        cards.push(new PlayingCard(cardName, suit))))

    if (extraCards && extraCards.length > 0) {
      cards = cards.concat(extraCards)
    }

    return new Deck(cards)
  }

  public createHand (options: HandOptions): IHand {
    const hand = new Hand()
    this.deal(hand, options.size, false)
    return hand
  }

  public deal (hand: IHand, /** Amount of cards to deal into Hand */ size: number, /** Deal cards to top of hand */ frontOfHand: boolean = false): this {
    if (frontOfHand) {
      hand.addCards(this.takeCards(size))
    } else {
      hand.addCardsToBottom(this.takeCards(size))
    }
    return this
  }
}
