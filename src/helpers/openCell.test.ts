
import { CellState, Field } from "./Field";

import { openCell } from "./openCell";

const { bomb: b, hidden: h , flag: f, weakFlag: w } = CellState;

describe("Open cell action", () => {
    describe("Simple cases with loose", () => {
        it("Open cell with the bomb", () => {
            const openCellWithBomb = () => openCell([1, 1], [[h, h], [h, h]], [[1,1 ], [1, b]]);
            expect(openCellWithBomb).toThrowError('Game Over');
        });
    });

    describe("Open cell with number", () => {
        it("Open cell with state = 1", () => {
            const [openCellWithOne] = openCell(
                [1, 1], 
                [
                    [h, h, h], 
                    [h, h, h], 
                    [h, h, h]
                ], 
                [
                    [1, 1, 0], 
                    [9, 1, 0], 
                    [1, 1, 0]
                ]);
            expect(openCellWithOne).toStrictEqual(
                [
                    [h, h, h], 
                    [h, 1, h], 
                    [h, h, h]
                ]);
        });
        it("Open cell with state = 3", () => {
            const [openCellWithOne] = openCell(
                [1, 1], 
                [
                    [h, h, h], 
                    [h, h, h], 
                    [h, h, h]
                ], 
                [
                    [9, 2, 0], 
                    [9, 3, 0], 
                    [9, 2, 0]
                ]);
            expect(openCellWithOne).toStrictEqual(
                [
                    [h, h, h], 
                    [h, 3, h], 
                    [h, h, h]
                ]);
        });
    });
    describe("Open empty cell", () => {
        it("Open empty cell, simple 3*3 case", () => {
            const [playerField] = openCell(
                [1,2],
                [
                    [h, h, h],
                    [h, h, h],
                    [h, h, h]
                ],
                [
                    [1, 1, 0],
                    [9, 1, 0],
                    [1, 1, 0]
                ]
            );
            expect(playerField).toStrictEqual([
                [h, 1, 0],
                [h, 1, 0],
                [h, 1, 0]
            ])
        });

        it("Open empty cell, simple 5*5 case", () => {
            const [playerField] = openCell(
                [2,2],
                [
                    [h, h, h, h, h],
                    [h, h, h, h, h],
                    [h, h, h, h, h],
                    [h, h, h, h, h],
                    [h, h, h, h, h]
                ],
                [
                    [9, 9, 1, 1, 2],
                    [9, 3, 1, 0, 0],
                    [1, 1, 0, 1, 1],
                    [1, 0, 0, 1, 9],
                    [2, 1, 0, 1, 0]
                ]
            );
            expect(playerField).toStrictEqual([
                [h, h, 1, 1, 2],
                [h, 3, 1, 0, 0],
                [1, 1, 0, 1, 1],
                [1, 0, 0, 1, h],
                [2, 1, 0, 1, h]
            ])
        }) 
    });

    describe("Detect win state", () => {
        it("3*3 solved case", () => {
            const playerField: Field = [
                [f, f, 1],
                [3, 1, 0],
                [h, 1, f]
            ];
            const gameField: Field = [
                [9, 9, 1],
                [3, 1, 0],
                [2, 1, 9]
            ];
            const [resultPlayerField, isSolved] = openCell([2, 0], playerField, gameField);

            expect(isSolved).toBe(true);
            expect(resultPlayerField).toStrictEqual([
                [f, f, 1],
                [3, 1, 0],
                [2, 1, f]])

        })
    });
    it("Open cell with the flag it shouldn't open", () => {
        const rawPlayerField: Field = [
            [h, h, h], 
            [h, f, h],
            [h, h, h]
        ];
        const gameField: Field = [
            [1, 1, 0], 
            [9, 1, 0],
            [1, 1, 0]
        ];
        const [playerField, isSolved] = openCell(
            [1, 1], 
            rawPlayerField, 
            gameField);
        expect(isSolved).toBe(false);
        expect(playerField).toStrictEqual([
            [h, h, h], 
            [h, f, h],
            [h, h, h]
        ])
    });
    it("Open cell with the weak flag should open", () => {
        const rawPlayerField: Field = [
            [h, h, h], 
            [h, w, h],
            [h, h, h]
        ];
        const gameField: Field = [
            [1, 1, 0], 
            [9, 1, 0],
            [1, 1, 0]
        ];
        const [playerField, isSolved] = openCell(
            [1, 1], 
            rawPlayerField, 
            gameField);
        expect(isSolved).toBe(false);
        expect(playerField).toStrictEqual([
            [h, h, h], 
            [h, 1, h],
            [h, h, h]
        ])
    });
})