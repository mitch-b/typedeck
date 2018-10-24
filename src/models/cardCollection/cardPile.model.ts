import { CardCollection } from './cardCollection.model';
import { ICardPile } from './cardPile.interface';
import { ICard } from '../card/card.interface';

/**
 * Extending the basic CardCollection, this class supports
 * dealing with cards in an ordered pile. As such, interacting
 * with the pile from the bottom is supported by using this
 * class.
 */
export class CardPile extends CardCollection implements ICardPile {
  public name = 'Pile';
  constructor (cards: ICard[] = []) {
    super(cards); // CardCollection.constructor
  }

  public addCardsToBottom (cards: ICard[]): void {
    this.setCards(this.getCards().concat(cards));
  }

  public takeCardFromBottom (): ICard {
    if (!this.isEmpty()) {
      return this.getCards().pop() as ICard;
    }
    throw new Error('No cards remaining in pile');
  }

  public takeCardsFromBottom (amount: number): ICard[] {
    let pulledCards: ICard[] = [];
    while (!this.isEmpty() && pulledCards.length < amount) {
      pulledCards.push(this.getCards().pop() as ICard);
    }
    return pulledCards;
  }
}
