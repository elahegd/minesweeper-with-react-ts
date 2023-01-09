import { detectSolvedPuzzle } from "./detectSolvedPuzzle";
import { CellState, Coords, Field } from "./Field";

const { flag, weakFlag, hidden } = CellState;

export const setFlag = (
    coords: Coords, 
    playerField: Field, 
    gameField: Field,
    prevFlagCounter: number,
    bombsCounter: number
    ): [Field, boolean, number] => { 
        const [y,x] = coords;
        const playerCell = playerField[y][x];

        switch(playerCell) {
            case flag:
                playerField[y][x] = weakFlag;
                break;
            case hidden:
                if(prevFlagCounter < bombsCounter) {
                    playerField[y][x] = flag;
                }
                break;
            case weakFlag:
                playerField[y][x] = hidden;
                break;
        }

        const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
        return [playerField, isSolved, flagCounter];
}