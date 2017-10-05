import { PokerHandResult } from '../models/poker/pokerHandResult.model'
import { IHand } from '../models/cardCollection/hand.interface'
import { IPlayer } from '../models/player/player.interface'
import { IndexedMap } from '../common/indexedMap.model'
import { IPokerScoreService } from './pokerScoreService.interface'
import { PlayingCard } from '../models/card/playingCard.model'
import { PokerHandType } from '../models/poker/pokerHandType.model'
import { InvalidArgumentError } from '../errors/InvalidArgument.error'
import { PokerScoringError } from '../errors/PokerScoring.error'
import { TexasHoldEmPokerGameType } from '../models/gameType/texasHoldEmGameType.model'
import { CardName } from '../models/card/cardName.model'

export class PokerScoreService implements IPokerScoreService {

  private gameType = new TexasHoldEmPokerGameType()

  public scoreHand (hand: IHand, communityCards: PlayingCard[] = []): PokerHandResult {
    if (!hand) {
      throw new InvalidArgumentError('hand not specified')
    }
    const playerHand = [...hand.getCards().concat(communityCards)] as PlayingCard[]
    if (playerHand.length !== 5) {
      throw new PokerScoringError('Too many cards provided. Please send only 5 cards.')
    }
    return this.scoreCards(playerHand)
  }

  public scoreCards (cards: PlayingCard[], communityCards: PlayingCard[] = []): PokerHandResult {
    let result = new PokerHandResult()
    const playerCards = [...cards.concat(communityCards)] as PlayingCard[]
    if (playerCards.length !== 5) {
      throw new PokerScoringError('Too many cards provided. Please send only 5 cards.')
    }
    // TODO: determine result!
    result.cards = playerCards
    result.handType = PokerHandType.OnePair
    result.cardsUsed = [...playerCards.slice(0, 2)]
    return result
  }

  public scorePlayers (players: IPlayer[], communityCards: PlayingCard[] = []): IndexedMap<IPlayer, PokerHandResult> {
    const result = new IndexedMap<IPlayer, PokerHandResult>()
    players.forEach((player) => {
      const playerHand = [...player.getHand().getCards().concat(communityCards)] as PlayingCard[]
      if (playerHand.length !== 5) {
        throw new PokerScoringError(`Too many cards provided for ${player}. Please send only 5 cards.`)
      }
      result.add(player, this.scoreCards(playerHand))
    })
    return result
  }

  public getScoreRank (result: PokerHandResult): number {
    // TODO: determine score!
    return result.handType * 10000000000
  }

  score (...allCards: PlayingCard[][]): PokerHandResult {
    // return the best poker hand from a set or sets of cards
    let cards = this.sanitise(allCards)

    // start empty
    let best = new PokerHandResult()
    best.cards = cards

    // find best hand
    for (let combination of this.combinations(cards, 5)) {
      // calculate value of 5 cards
      let result = this.calculate(combination)
      if (result.value > best.value) {
        best = result
      }
    }
    // finish with best result
    return best
  }

  sanitise (allCards: PlayingCard[][]): PlayingCard[] {
    // concatenate
    let cards: PlayingCard[] = [].concat.apply([], allCards)
    return cards
  }

  combinations (cards: PlayingCard[], groups: number): PlayingCard[][] {
    // card combinations with the given size
    let result: PlayingCard[][] = []

    // not enough cards
    if (groups > cards.length) {
      return result
    }

    // one group
    if (groups === cards.length) {
      return [cards]
    }

    // one card in each group
    if (groups === 1) {
      return cards.map((card) => [card])
    }

    // everything else
    for (let i = 0; i < cards.length - groups; i++) {
      let head = cards.slice(i, (i + 1))
      let tails = this.combinations(cards.slice(i + 1), (groups - 1))
      for (let tail of tails) {
        result.push(head.concat(tail))
      }
    }

    return result
  }

  ranked (cards: PlayingCard[]): PlayingCard[][] {
    // split cards by rank
    let result: PlayingCard[][] = []

    for (let card of cards) {
      let r = this.gameType.rankSet.getRankValue(card)
      result[r] = result[r] || []
      result[r].push(card)
    }

    // condense
    result = result.filter((rank) => !!rank)

    // high to low
    result.reverse()

    // pairs and sets first
    result.sort((a, b) => {
      return a.length > b.length ? -1 : a.length < b.length ? 1 : 0
    })

    return result
  }

  isStraight (ranked: PlayingCard[][]): boolean {
    // must have 5 different cards
    if (!ranked[4]) {
      return false
    }

    // could be wheel if r1 is 'ace' and r4 is '2'
    if (ranked[0][0].cardName === CardName.Ace &&
      ranked[1][0].cardName === CardName.Five &&
      ranked[4][0].cardName === CardName.Two) {
      // hand is 'ace' '5' '4' '3' '2'
      ranked.push(ranked.shift() as PlayingCard[])
      // ace is now low
      return true
    }

    // run of five in row is straight
    let r1 = this.gameType.rankSet.getRankValue(ranked[0][0])
    let r4 = this.gameType.rankSet.getRankValue(ranked[4][0])
    return (r1 - r4) === 4
  }

  isFlush (cards: PlayingCard[]): boolean {
    // all suits match is flush
    let suit = cards[0].suit

    for (let card of cards) {
      if (card.suit !== suit) {
        return false
      }
    }

    return true
  }

  value (ranked: PlayingCard[][], primary: number): number {
    // primary wins the rest are kickers
    let str = ''

    for (let rank of ranked) {
      // create two digit value
      let r = this.gameType.rankSet.getRankValue(rank[0])
      let v = (r < 10 ? '0' : '') + r
      for (let i = 0; i < rank.length; i++) {
        // append value for each card
        str += v
      }
    }

    // to integer
    return (primary * 10000000000) + parseInt(str, 10)
  }

  result (card: PlayingCard[], description: string, rankValue: number): PokerHandResult {
    let result = new PokerHandResult()
    result.cards = card
    result.value = rankValue
    result.description = description
    return result
  }

  calculate (cards: PlayingCard[]): PokerHandResult {
    const ranked: PlayingCard[][] = this.ranked(cards)
    const isFlush = this.isFlush(cards)
    const isStraight = this.isStraight(ranked)
    if (isStraight && isFlush && ranked[0][0].cardName === CardName.Ace) {
      return this.result(cards, 'royal flush', this.value(ranked, 9))
    } else if (isStraight && isFlush) {
      return this.result(cards, 'straight flush', this.value(ranked, 8))
    } else if (ranked[0].length === 4) {
      return this.result(cards, 'four of a kind', this.value(ranked, 7))
    } else if (ranked[0].length === 3 && ranked[1].length === 2) {
      return this.result(cards, 'full house', this.value(ranked, 6))
    } else if (isFlush) {
      return this.result(cards, 'flush', this.value(ranked, 5))
    } else if (isStraight) {
      return this.result(cards, 'straight', this.value(ranked, 4))
    } else if (ranked[0].length === 3) {
      return this.result(cards, 'three of a kind', this.value(ranked, 3))
    } else if (ranked[0].length === 2 && ranked[1].length === 2) {
      return this.result(cards, 'two pair', this.value(ranked, 2))
    } else if (ranked[0].length === 2) {
      return this.result(cards, 'one pair', this.value(ranked, 1))
    } else {
      return this.result(cards, 'high card', this.value(ranked, 0))
    }
  }
}
