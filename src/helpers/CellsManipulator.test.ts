import { CellState } from "./Field";

import { openCell } from "./openCell";
const { bomb: b, hidden: h , empty: e } = CellState;

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
    })
})