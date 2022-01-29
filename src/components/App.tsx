import { connect, ConnectedProps } from 'react-redux';

import { IState } from '../reducer';
import { Player } from './Player';
import { Table } from './Table';

const mapStateToProps = ({ game }: IState) => ({
  game,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const _App: React.FC<PropsFromRedux> = ({ game }) => {
  return game.result ? (
    <h1 className="result">{game.result}</h1>
  ) : (
    <>
      <Player idx={1} />
      <Table />
      <Player idx={0} />
    </>
  );
};

export const App = connector(_App);
