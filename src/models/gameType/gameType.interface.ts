import { ICard } from '../card/card.interface'
import { DeckOptions } from '../cardCollection/deckOptions.model'
import { IDeck } from '../cardCollection/deck.interface'
import { IRankSet } from '../card/rankSet.interface'

export interface IGameType {
  rankSet: IRankSet
  cardsAllowed: ICard[]
  createDeck (options: DeckOptions): IDeck
}
