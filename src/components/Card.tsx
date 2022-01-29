import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import { ICard } from '../basic classes/Deck';
import { Actions } from '../actions';
import { IState } from '../reducer';

const mapStateToProps = ({ game, moveType, toAttack, toDefence }: IState) => ({
  game,
  moveType,
  toAttack,
  toDefence,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addAttackCard: (payload: number) =>
      dispatch({ type: Actions.addAttackCard, payload }),
    addDefenceCard: (payload: number) =>
      dispatch({ type: Actions.addDefenceCard, payload }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CardProps = PropsFromRedux & {
  card: ICard;
  idx: number;
  player: number | null;
  inactive?: boolean;
};

const _Card: React.FC<CardProps> = ({
  game,
  card,
  idx,
  moveType,
  toAttack,
  toDefence,
  addAttackCard,
  addDefenceCard,
  player,
  inactive = false,
}) => {
  const handleClick = (): void => {
    if (!inactive) {
      if (moveType === 'attack') addAttackCard(idx);
      else addDefenceCard(idx);
    }
  };

  let classes = 'card';
  if (
    (toAttack.indexOf(idx) > -1 &&
      moveType === 'attack' &&
      game.turn === player) ||
    (toDefence.indexOf(idx) > -1 &&
      moveType === 'defence' &&
      game.turn === player)
  )
    classes += ' active';

  return (
    <li className={classes} onClick={handleClick}>
      <div className="cardname">
        {card.cardName} of {card.suit}
      </div>
    </li>
  );
};

export const Card = connector(_Card);
