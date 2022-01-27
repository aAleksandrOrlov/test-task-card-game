import { Player } from './Player';
import { Deck, Card } from './Deck';

export class CartTable {
  private deck = new Deck();
  private players = [new Player(this.deck), new Player(this.deck)];

  private turn = 0;
  private attackCards: Card[] = [];
  private defenceCards: Card[] = [];
  private extraCardsNum: number = 0;

  private result: string | null = null;

  constructor() {
    this.checkUnorderMove();
  }

  private checkUnorderMove(): void {
    const { players } = this;
    const unorderedMoveIdxs: number[] = [];

    for (let i = 0; i < players.length; i++) {
      if (players[i].isUnorderMove()) unorderedMoveIdxs.push(i);
    }

    switch (unorderedMoveIdxs.length) {
      case 0:
        return;

      case 1:
        this.turn = unorderedMoveIdxs[0];
        return;

      default:
        this.turn =
          unorderedMoveIdxs[
            Math.floor(Math.random() * unorderedMoveIdxs.length)
          ];
    }
  }

  private checkWin(): boolean {
    const winners = [];
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].isEmpty() && this.deck.isEmpty()) winners.push(i + 1);
    }

    switch (winners.length) {
      case 0:
        return false;

      case 1:
        this.result = `Winner is player №${winners[0]}`;
        return true;

      case this.players.length:
        this.result = 'Draw!';
        return true;

      default:
        let result = 'Winners are:';
        for (let winner in winners) result += ` player №${winner}`;
        this.result = result;
        return true;
    }
  }

  private changeTurn(turnBack?: boolean): void {
    switch (this.turn) {
      case 0:
        if (turnBack) this.turn = this.players.length - 1;
        else this.turn++;
        return;

      case this.players.length - 1:
        if (turnBack) this.turn--;
        else this.turn = 0;
        return;

      default:
        if (turnBack) this.turn--;
        else this.turn++;
    }
  }

  private endMove(): void {
    if (this.checkWin()) {
      console.log(this.result);
      return;
    }

    this.attackCards = [];
    this.defenceCards = [];
    this.extraCardsNum = 0;

    for (let player of this.players) {
      player.drawCards();
    }

    this.checkUnorderMove();
  }

  attack(cardIdxs: number[]): void {
    if (cardIdxs.length > 3)
      throw new Error('The max amount of attack cards is three');

    this.attackCards = this.players[this.turn].useCards(cardIdxs);
    this.changeTurn();
  }

  defence(cardIdxs: number[]): void {
    if (cardIdxs.length > 3)
      throw new Error('The max amount of defence cards is three');
    if (cardIdxs.length > this.attackCards.length)
      throw new Error('Number of defence cards can not be more than attack cards');

    this.defenceCards = this.players[this.turn].useCards(cardIdxs);
    this.extraCardsNum = this.attackCards.length - this.defenceCards.length;

    if (this.extraCardsNum) {
      this.players[this.turn].drawCards(this.extraCardsNum);
      this.changeTurn(true);
    } else this.changeTurn();

    this.endMove();
  }
}
