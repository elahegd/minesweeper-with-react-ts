import { copyField } from "./copyField";
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
        const newPlayerField = copyField(playerField)

        const cell = newPlayerField[y][x];

        const { flag, hidden, weakFlag } = CellState;

        switch(cell) {
            case flag:
                newPlayerField[y][x] = weakFlag;
                break;
            case hidden:
                if(prevFlagCounter < bombsCounter) {
                    newPlayerField[y][x] = flag;
                }
                break;
            case weakFlag:
                newPlayerField[y][x] = hidden;
                break;
        }

        const [isSolved, flagCounter] = detectSolvedPuzzle(newPlayerField, gameField);
        return [newPlayerField, isSolved, flagCounter];
}