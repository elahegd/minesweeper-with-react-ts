import { Field, CellState } from "./Field";

export const detectSolvedPuzzle = (
    playerField: Field, 
    gameField:Field): [boolean, number] => {
        const { empty, flag, weakFlag, bomb, hidden } = CellState;
        let isFieldHaveHiddenCell: boolean = false;
        let bombCounter: number = 0;
        let detectedBomb: number = 0;
        let flagCounter: number = 0;

        for(const y of gameField.keys()) {
            for(const x of gameField[y].keys()) {
                const playerCell = playerField[y][x];
                const gameCell = gameField[y][x];
                const flagged = [flag, weakFlag].includes(playerCell);
                
                if(playerCell === hidden) {
                    isFieldHaveHiddenCell = true 
                }
                
                if(flagged) {
                    
                    flagCounter ++;
                }
                if(gameCell === bomb) {
                    bombCounter++;

                    if(flagged) {
                        detectedBomb++;
                    }
                }
            }
        }
        
        const isPuzzleSolved = 
            bombCounter === detectedBomb &&
            flagCounter === bombCounter &&
            !isFieldHaveHiddenCell;

        return [isPuzzleSolved, flagCounter];
}