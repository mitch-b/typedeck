import { IGameType } from './gameType.interface';
import { IRankSet } from '../card/rankSet.interface';
import { AceHighRankSet } from '../card/aceHighRankSet.model';
import { ICard } from '../card/card.interface';
import { IDeck } from '../cardCollection/deck.interface';
import { DeckOptions } from '../cardCollection/deckOptions.model';
import { Deck } from '../cardCollection/deck.model';

export class BaseGameType implements IGameType {
  public rankSet: IRankSet = new AceHighRankSet();
  public cardsAllowed: ICard[] = [];

  public createDeck (_options?: DeckOptions): IDeck {
    if (_options) {
      let gameCards: ICard[] = [];
      for (let i = 0; i < _options.numberOfDecks; i++) {
        gameCards.push(...this.cardsAllowed);
      }
      if (_options.extraCards && _options.extraCards.length > 0) {
        gameCards = gameCards.concat(_options.extraCards);
      }
      return Deck.BuildFrom(gameCards);
    } else {
      return Deck.BuildFrom(this.cardsAllowed);
    }
  }
}
