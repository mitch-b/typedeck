import { Suit } from '../card/suit.model'
import { CardCollection } from './cardCollection.model'
import { MapExtensions } from '../../common/mapExtensions.model'
import { IHand } from './hand.interface'
import { ICard } from '../card/card.interface'
import { IRankSet } from '../card/rankSet.interface'

/**
 * Represents a group of cards assigned to an IPlayer
 */
export class Hand extends CardCollection implements IHand {

  private suitOrder: Suit[] = [Suit.Clubs, Suit.Spades, Suit.Diamonds, Suit.Hearts]

  constructor (cards: ICard[] = []) {
    super(cards) // CardCollection.constructor

    this.friendlyName = 'Hand' // default name
  }

  /**
   * Performs action of removing a card from player hand.
   *
   * Throws error if `ICard` played is not in player's hand.
   * @param card - Card being played
   */
  public playCard (card: ICard): void {
    this.removeCards([card])
  }

  /**
   * Order cards in Hand by Rank and Suit
   * @see Hand.suitOrder
   */
  public sortCards (cardRank: IRankSet): this {
    const cards = this.getCards()
    if (this.isEmpty()) {
      throw new Error('No cards to sort.')
    }
    if (this.suitOrder.length === 0) {
      throw new Error('No suit order defined.')
    }

    let sortedCardsBySuit: ICard[] = []
    const cardsBySuit = new Map<Suit, ICard[]>(
      Array.from(MapExtensions.GroupBy(cards, (card: any) => card.suit).entries()).sort()
    )

    cardsBySuit.forEach((suitCards: ICard[]) => {
      sortedCardsBySuit = sortedCardsBySuit.concat(suitCards.sort((a: ICard, b: ICard) => {
        return cardRank.getRankValue(a) - cardRank.getRankValue(b)
      }))
    })

    if (sortedCardsBySuit.length !== cards.length) {
      throw new Error('After sorting, card length changed. Cancelling sort.')
    }

    this.setCards(sortedCardsBySuit)
    return this
  }
}
