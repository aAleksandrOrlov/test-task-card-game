import { ICard, Deck } from './Deck';

export class Player {
  public hand: ICard[];

  constructor(private deck: Deck) {
    this.hand = this.deck.getCards(4);
  }

  isUnorderMove(): boolean {
    const sameValues: { [cardName: string]: number } = {};

    for (let { cardName } of this.hand) {
      if (sameValues.hasOwnProperty(cardName)) sameValues[cardName] += 1;
      else sameValues[cardName] = 1;
    }

    for (let cardName in sameValues) {
      if (sameValues[cardName] >= 3) return true;
    }

    return false;
  }

  isEmpty(): boolean {
    return this.hand.length === 0;
  }

  useCards(cardIdxs: number[]): ICard[] {
    const cardsToUse: ICard[] = [];
    for (let cardIdx of cardIdxs) cardsToUse.push(this.hand[cardIdx]);
    this.hand = this.hand.filter((card) => cardsToUse.indexOf(card) === -1);

    return cardsToUse;
  }

  drawCards(extra: number = 0): void {
    const cardsToRefresh = 4 - this.hand.length + extra;
    this.hand.push(...this.deck.getCards(cardsToRefresh));
  }
}
