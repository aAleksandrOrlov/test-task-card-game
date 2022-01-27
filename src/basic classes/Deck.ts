export interface Card {
  value: number;
  suit: string;
  cardName: string;
}

const cardNames = ['ace', 'king', 'queen', 'jack', 'ten', 'seven', 'six']; // cards placed in ascending order
const suites = ['spades', 'clubs', 'diamonds', 'hearts'];

export class Deck {
  public deck: Card[] = [];

  constructor() {
    this.generateDeck();
    this.shuffleDeck();
  }

  private generateDeck(): void {
    for (let i = 0; i < cardNames.length; i++) {
      for (let suite of suites) {
        this.deck.push({
          value: i,
          suit: suite,
          cardName: cardNames[i],
        });
      }
    }
  }

  private shuffleDeck(): void {
    this.deck.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }

  getCards(num: number): Card[] {
    const cards: Card[] = [];
    while (num > 0) {
      const lastEl = this.deck.pop();
      if (lastEl) cards.push(lastEl);
      num--;
    }

    return cards;
  }

  isEmpty(): boolean {
    return this.deck.length === 0;
  }
}
