import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import { IState } from '../reducer';
import { Card } from './Card';
import { Actions } from '../actions';

const mapStateToProps = ({ game, moveType, error }: IState) => ({
  game,
  moveType,
  error,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    endAttack: () => dispatch({ type: Actions.endAttack, payload: 0 }),
    endDefence: () => dispatch({ type: Actions.endDefence, payload: 0 }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const _Table: React.FC<PropsFromRedux> = ({
  game,
  moveType,
  error,
  endAttack,
  endDefence,
}) => {
  const handleClick = (): void => {
    if (moveType === 'attack') endAttack();
    else endDefence();
  };

  return (
    <div className="table">
      <ul className="cards">
        {game.attackCards.map((card, i) => (
          <Card
            key={i}
            card={card}
            idx={i}
            player={null}
            inactive
          />
        ))}
      </ul>
      <div className="info">
        <button className="button" onClick={handleClick}>
          End move
        </button>
        <div className="error">{error}</div>
      </div>
    </div>
  );
};

export const Table = connector(_Table);
