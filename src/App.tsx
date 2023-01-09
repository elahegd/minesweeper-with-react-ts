import React from 'react';
import './App.css';

import Cell from "./components/Grid/Cell";
import { Grid } from "./components/Grid/Grid";
import {Reset} from "./components/Scoreboard/Reset";
// import { Game } from "./components/Game";
import { GameWithHooks } from './module/GameWithHooks';

import {CellState, Coords} from './helpers/Field';
import { incrementNeibours } from "./helpers/CellsManipulator"
function App() {
  // const coords: Coords = [1, 1];
  // const cells: React.ReactElement[] = [];
  // incrementNeibours([1,2], [[1, 0, 1], [0, 1, 1], [2, 3, 9]]);
  // for(let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
  //   cells.push(<Cell 
  //     key={cell}
  //     onClick={() => null} 
  //     onContextMenu={() => null} 
  //     coords={coords} 
  //     children={cell}/>)
  // }

  return(<div className="App">
    {/* <Reset onReset={() => null} /> */}
    {/* {cells} */}
    {/* <Grid children={[
        [9, 2, 9, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1, 0, 1, 9, 1, 1, 9, 1],
        [0, 0, 1, 9, 10, 0, 2, 2, 2, 1, 1, 1],
        [0, 0, 10, 10, 1, 0, 1, 9, 1, 2, 2, 2],
        [0, 1, 1, 2, 2, 9, 1, 1, 1, 0, 0, 0],
        [0, 1, 9, 3, 9, 2, 10, 0, 0, 2, 1, 1],
        [0, 2, 2, 4, 9, 2, 10, 1, 1, 1, 9, 1],
        [0, 1, 9, 2, 1, 1, 1, 9, 1, 2, 2, 2],
        [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
        [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
      ]} 
      onClick={() => null} 
      onContextMenu={() => null} 
      /> */}
      {/* <Game /> */}
      <GameWithHooks />
  </div>

  );
}

export default App;
