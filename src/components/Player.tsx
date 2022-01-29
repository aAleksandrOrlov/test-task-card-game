import { connect, ConnectedProps } from 'react-redux';

import { Card } from './Card';
import { IState } from '../reducer';

const mapStateToProps = ({ game }: IState) => ({
  game,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerProps = PropsFromRedux & {
  idx: number;
};

const _Player: React.FC<PlayerProps> = ({ idx, game }) => {
  return (
    <div className="player">
      {idx !== game.turn ? <div className="inactive-cover" /> : null}

      {game.players[idx].hand.map((card, i) => (
        <Card key={i} card={card} idx={i} player={idx} />
      ))}
    </div>
  );
};

export const Player = connector(_Player);
