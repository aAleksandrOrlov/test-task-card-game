import { CardTable } from './basic classes/CardTable';
import { Actions } from './actions';
import { ICard } from './basic classes/Deck';

const initialState: IState = {
  game: new CardTable(2),
  toAttack: [],
  toDefence: [],
  attackHandCopy: [],
  moveType: 'attack',
  error: null,
};

export interface IState {
  game: CardTable;
  toAttack: number[];
  toDefence: number[];
  attackHandCopy: ICard[];
  moveType: 'attack' | 'defence';
  error: string | null;
}

export interface IAction {
  type: Actions;
  payload: number;
}

export const reducer = (
  state: IState = initialState,
  action: IAction
): IState => {
  const { type, payload } = action;
  switch (type) {
    case Actions.addAttackCard:
      if (state.toAttack.length < 3)
        return { ...state, toAttack: [...state.toAttack, payload] };
      return { ...state, error: `Max number of attack cards is 3` };

    case Actions.addDefenceCard:
      const { players, turn } = state.game;

      const defenceCardValue = players[turn].hand[payload].value;
      const attackCardValue =
        state.attackHandCopy[state.toAttack[state.toDefence.length]].value;

      if (attackCardValue === undefined)
        return { ...state, error: `Nothing to beat` };
      if (defenceCardValue <= attackCardValue)
        return { ...state, error: `Can't beat card.` };

      return { ...state, toDefence: [...state.toDefence, payload] };

    case Actions.endAttack:
      if (state.toAttack.length === 0)
        return { ...state, error: `Select attack cards` };

      const attackHandCopy = state.game.players[state.game.turn].hand;
      const newGameAttack = new CardTable(2);

      Object.assign(newGameAttack, state.game);
      newGameAttack.attack(state.toAttack);

      return {
        ...state,
        game: newGameAttack,
        moveType: 'defence',
        error: null,
        attackHandCopy,
      };

    case Actions.endDefence:
      const newGameDefence: CardTable = new CardTable(2);
      Object.assign(newGameDefence, state.game);
      newGameDefence.defence(state.toDefence);
      
      return {
        ...state,
        game: newGameDefence,
        toAttack: [],
        toDefence: [],
        moveType: 'attack',
        error: null,
      };

    default:
      return state;
  }
};
