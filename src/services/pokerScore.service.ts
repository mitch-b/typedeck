import { PokerHandResult } from '../models/poker/pokerHandResult.model'
import { IHand } from '../models/cardCollection/hand.interface'
import { IPlayer } from '../models/player/player.interface'
import { IndexedMap } from '../common/indexedMap.model'
import { IPokerScoreService } from './pokerScoreService.interface'
import { PlayingCard } from '../models/card/playingCard.model'
import { PokerHandType } from '../models/poker/pokerHandType.model'
import { InvalidArgumentError } from '../errors/InvalidArgument.error'
import { PokerScoringError } from '../errors/PokerScoring.error'

export class PokerScoreService implements IPokerScoreService {

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
}
