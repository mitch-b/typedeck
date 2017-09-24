import { IGameType } from './gameType.interface'
import { IRankSet } from '../card/rankSet.interface'
import { AceHighRankSet } from '../card/aceHighRankSet.model'
import { ICard } from '../card/card.interface'
import { IDeck } from '../cardCollection/deck.interface'
import { DeckOptions } from '../cardCollection/deckOptions.model'
import { Deck } from '../cardCollection/deck.model'

export class BaseGameType implements IGameType {
  public rankSet: IRankSet = new AceHighRankSet()
  public cardsAllowed: ICard[] = []

  public createDeck (options: DeckOptions): IDeck {
    let gameCards: ICard[] = []
    for (let i = 0; i < options.numberOfDecks; i++) {
      gameCards.push(...this.cardsAllowed)
    }
    if (options.extraCards) {
      gameCards = gameCards.concat(options.extraCards)
    }
    return Deck.BuildFrom(gameCards)
  }
}
