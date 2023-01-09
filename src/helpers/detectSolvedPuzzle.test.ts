import { detectSolvedPuzzle } from "./detectSolvedPuzzle";
import { CellState, Field } from "./Field";

const { empty: e, flag: f, bomb:b, hidden: h } = CellState;
describe("Detect solved puzzle function test cases", () => {
    it("Simplest 3*3 case", () => {
        const playerField: Field = [
            [1, 1, e],
            [f, 1, e],
            [1, 1, e]
        ];
        const gameField: Field = [
            [1, 1, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
        
        expect(isSolved).toBe(true);
        expect(flagCounter).toBe(1);
    });
    it("Wrong 3*3 hidden cells case", () => {
        const playerField: Field = [
            [1, 1, e],
            [h, 1, e],
            [1, 1, e]
        ];
        const gameField: Field = [
            [1, 1, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
        
        expect(isSolved).toBe(false);
        expect(flagCounter).toBe(0);
    });
    it("Wrong 3*3 hidden cells case with bomb", () => {
        const playerField: Field = [
            [1, h, e],
            [f, 1, e],
            [1, 1, e]
        ];
        const gameField: Field = [
            [1, 1, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
        
        expect(isSolved).toBe(false);
        expect(flagCounter).toBe(1);
    });
    it("Loose 3*3 case", () => {
        const playerField: Field = [
            [1, 1, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const gameField: Field = [
            [1, 1, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
        
        expect(isSolved).toBe(false);
        expect(flagCounter).toBe(0);
    });
    it("Wrong flag on 3*3 case", () => {
        const playerField: Field = [
            [1, f, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const gameField: Field = [
            [1, 1, e],
            [b, 1, e],
            [1, 1, e]
        ];
        const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
        
        expect(isSolved).toBe(false);
        expect(flagCounter).toBe(1);
    });
})