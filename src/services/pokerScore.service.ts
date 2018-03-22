import { PokerHandResult } from '../models/poker/pokerHandResult.model'
import { IHand } from '../models/cardCollection/hand.interface'
import { IPlayer } from '../models/player/player.interface'
import { IndexedMap } from '../common/indexedMap.model'
import { IPokerScoreService } from './pokerScoreService.interface'
import { PlayingCard } from '../models/card/playingCard.model'
import { PokerHandType } from '../models/poker/pokerHandType.model'
import { PokerScoringError } from '../errors/pokerScoring.error'
import { TexasHoldEmPokerGameType } from '../models/gameType/texasHoldEmGameType.model'
import { CardName } from '../models/card/cardName.model'
import { IterableExtensions } from '../common/iterableExtensions.model'

export class PokerScoreService implements IPokerScoreService {

  private gameType = new TexasHoldEmPokerGameType()

  public scoreHand (hand: IHand, communityCards: PlayingCard[] = []): PokerHandResult {
    const playerHand = [...hand.getCards().concat(communityCards)]
    if (playerHand.length < 5) {
      throw new PokerScoringError('Invalid cards provided. Please send at least 5 cards.')
    }
    return this.scoreCards(playerHand as PlayingCard[])
  }

  public scoreCards (cards: PlayingCard[], communityCards: PlayingCard[] = []): PokerHandResult {
    let bestHand = new PokerHandResult()
    const playerCards = [...cards.concat(communityCards)]
    if (playerCards.length < 5) {
      throw new PokerScoringError('Invalid cards provided. Please send at least 5 cards.')
    }
    // find best hand
    for (const combination of IterableExtensions.Combinations(cards, 5)) {
      const result = this.calculate(combination)
      if (result.value > bestHand.value) {
        bestHand = result
      }
    }
    return bestHand
  }

  public scorePlayers (players: IPlayer[], communityCards: PlayingCard[] = []): IndexedMap<IPlayer, PokerHandResult> {
    const result = new IndexedMap<IPlayer, PokerHandResult>()
    players.forEach((player) => {
      const playerHand = [...player.getHand().getCards().concat(communityCards)] as PlayingCard[]
      if (playerHand.length < 5) {
        throw new PokerScoringError(`Invalid cards provided for ${player}. Please send at least 5 cards.`)
      }
      const playerScore = this.scoreCards(playerHand)
      result.add(player, playerScore)
    })
    return result
  }

  public getScoreRank (result: PokerHandResult): number {
    if (result.cards.length < 5) {
      throw new PokerScoringError('Invalid cards provided. Please send at least 5 cards.')
    }
    result.value = this.value(this.ranked(result.cards), result.handType as number)
    return result.value
  }

  private ranked (cards: PlayingCard[]): PlayingCard[][] {
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

  private isStraight (ranked: PlayingCard[][]): boolean {
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

  private isFlush (cards: PlayingCard[]): boolean {
    // all suits match is flush
    return cards.every((card: PlayingCard) => card.suit === cards[0].suit)
  }

  private value (ranked: PlayingCard[][], handType: PokerHandType): number {
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
    return (handType * 10000000000) + parseInt(str, 10)
  }

  private calculate (cards: PlayingCard[]): PokerHandResult {
    let result: PokerHandResult
    let cardsUsed: PlayingCard[] = []
    let handType: PokerHandType

    const ranked: PlayingCard[][] = this.ranked(cards)
    const isFlush = this.isFlush(cards)
    const isStraight = this.isStraight(ranked)
    const highestPlayedCards = ranked[0]
    const rankSet = this.gameType.rankSet

    if (isStraight && isFlush && highestPlayedCards[0].cardName === CardName.Ace) {
      cardsUsed = [ranked[0][0], ranked[1][0], ranked[2][0], ranked[3][0], ranked[4][0]]
      handType = PokerHandType.RoyalFlush
    } else if (isStraight && isFlush) {
      cardsUsed = [ranked[0][0], ranked[1][0], ranked[2][0], ranked[3][0], ranked[4][0]]
      handType = PokerHandType.StraightFlush
    } else if (highestPlayedCards.length === 4) {
      cardsUsed = ranked[0]
      handType = PokerHandType.FourOfAKind
    } else if (ranked[0].length === 3 && ranked[1].length === 2) {
      cardsUsed = ranked[0].concat(ranked[1])
      handType = PokerHandType.FullHouse
    } else if (isFlush) {
      cardsUsed = [ranked[0][0], ranked[1][0], ranked[2][0], ranked[3][0], ranked[4][0]]
      handType = PokerHandType.Flush
    } else if (isStraight) {
      cardsUsed = [ranked[0][0], ranked[1][0], ranked[2][0], ranked[3][0], ranked[4][0]]
      handType = PokerHandType.Straight
    } else if (highestPlayedCards.length === 3) {
      cardsUsed = ranked[0]
      handType = PokerHandType.ThreeOfAKind
    } else if (ranked[0].length === 2 && ranked[1].length === 2) {
      cardsUsed = ranked[0].concat(ranked[1])
      handType = PokerHandType.TwoPair
    } else if (highestPlayedCards.length === 2) {
      cardsUsed = ranked[0]
      handType = PokerHandType.OnePair
    } else {
      cardsUsed = ranked[0]
      handType = PokerHandType.HighCard
    }
    result = new PokerHandResult(cards, this.value(ranked, handType), cardsUsed, rankSet)
      .setHandType(handType)
    return result
  }
}
