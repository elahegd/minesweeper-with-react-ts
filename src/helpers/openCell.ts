import { getNeigboursItems, checkItemInField } from "./CellsManipulator";
import { copyField } from "./copyField";
import { detectSolvedPuzzle } from "./detectSolvedPuzzle";
import { CellState, Coords, Field } from "./Field";

export const openCell = (coords: Coords, playerField: Field, gameField: Field): [Field, boolean] => {
    return openCellRecursively(coords, copyField(playerField), gameField);
}

export const openCellRecursively = (coords: Coords, playerField: Field, gameField: Field): [Field, boolean] => {
    const { bomb, hidden, empty, flag, weakFlag } = CellState;

    const [y, x] = coords;
    const gameCell = gameField[y][x];
    const playerCell = playerField[y][x];

    if(gameCell === bomb) {
        throw new Error("Game Over");
    }

    if (flag === playerCell) {
        return [playerField, false];
    }

    playerField[y][x] = gameCell;
    if(gameCell === empty && [hidden, weakFlag].includes(playerCell)) {
        const neighbour = getNeigboursItems(coords);
        
        for (const [y, x] of Object.values(neighbour)) {
            if(checkItemInField([y, x], gameField)) {
                [playerField] = openCellRecursively([y, x], playerField, gameField);
            }
        }
    }
    
    const [isSolved] = detectSolvedPuzzle(playerField, gameField)
    
    return [playerField, isSolved];
}