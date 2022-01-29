import { IAction } from './reducer';

export enum Actions {
  addAttackCard,
  addDefenceCard,
  endAttack,
  endDefence,
}

export const addAttackCard = (payload: number): IAction => ({
  type: Actions.addAttackCard,
  payload,
});

export const addDefenceCard = (payload: number): IAction => ({
  type: Actions.addDefenceCard,
  payload,
});

export const endAttack: IAction = { type: Actions.endAttack, payload: 0 }; // if payload is not need payload = 0
export const endDefence: IAction = { type: Actions.endDefence, payload: 0 };