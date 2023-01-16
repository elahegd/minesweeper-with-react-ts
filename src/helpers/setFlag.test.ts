import { CellState, Field } from "./Field";
import { setFlag } from "./setFlag";

const { flag: f, weakFlag: w, hidden: h , empty: e, bomb: b } = CellState;

describe("Set flag action", () => {
    it("Set flag to the non hidden cell should be ignored", () => {
        const [setFlagOnNonHiddenCell] = setFlag(
            [0, 0], 
            [
                [1, h, h], 
                [h, h, h], 
                [h, h, h]
            ], 
            [
                [1, 1, e], 
                [b, 1, e], 
                [1, 1, e]
            ], 0, 3);

        expect(setFlagOnNonHiddenCell).toStrictEqual([
            [1 , h, h],
            [h, h, h],
            [h, h, h]
        ])

    });

    it("Set flag action", () => {
        const gameField: Field = [
            [1, 1, e], 
            [b, 1, e], 
            [1, 1, e]
        ];
        const playerField: Field = [
            [h, h, h], 
            [h, h, h], 
            [h, h, h]
        ];
        const result = setFlag([0, 0], playerField, gameField, 0, 3);
        expect(result[0]).toStrictEqual([
            [f, h, h],
            [h, h, h],
            [h, h, h]
        ]);

        const result2 = setFlag([0, 0], result[0], gameField, 1, 3);
        expect(result2[0]).toStrictEqual([
            [w, h, h],
            [h, h, h],
            [h, h, h]
        ]);

        const result3 = setFlag([0, 0], result2[0], gameField, 1, 3);
        expect(result3[0]).toStrictEqual([
            [h, h, h],
            [h, h, h],
            [h, h, h]
        ]);
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
            [9, 1, 9]
        ];
        const [resultPlayerField, isSolved, flagCounter] = setFlag([2, 0], playerField, gameField, 3, 4);

        expect(isSolved).toBe(true);
        expect(flagCounter).toBe(4);
        expect(resultPlayerField).toStrictEqual([
            [f, f, 1],
            [3, 1, 0],
            [f, 1, f]])

    })
});

describe('Restrict flagCounter by the number of bombs on the field', () => { 
    it("Restriction on 3*3 field", () => {
        const playerField: Field = [
            [f, h, h],
            [h, h, h],
            [f, h, h]
        ];
        const gameField: Field = [
            [1, 2, 1],
            [b, 1, b],
            [1, 1, e]
        ];
        const [newPlayerField] = setFlag([0,1], playerField, gameField, 2, 2);
        expect(newPlayerField).toStrictEqual([
            [f, h, h],
            [h, h, h],
            [f, h, h]
        ])
    });
    it("Still can switch flags from flag to weakFlag", () => {
        const playerField: Field = [
            [f, h, h],
            [h, h, h],
            [f, h, h]
        ];
        const gameField: Field = [
            [1, 2, 1],
            [b, 1, b],
            [1, 1, e]
        ];
        const [newPlayerField] = setFlag([0,0], playerField, gameField, 2, 2);
        expect(newPlayerField).toStrictEqual([
            [w, h, h],
            [h, h, h],
            [f, h, h]
        ])
    });
    it("Can't add new flag even if flags are weak", () => {
        const playerField: Field = [
            [w, h, h],
            [h, h, h],
            [w, h, h]
        ];
        const gameField: Field = [
            [1, 2, 1],
            [b, 1, b],
            [1, 1, e]
        ];
        const [newPlayerField] = setFlag([0,1], playerField, gameField, 2, 2);
        expect(newPlayerField).toStrictEqual([
            [w, h, h],
            [h, h, h],
            [w, h, h]
        ])
    });
    it("Can set the new flag after drop prev", () => {
        const playerField: Field = [
            [f, h, h],
            [h, h, h],
            [f, h, h]
        ];
        const gameField: Field = [
            [1, 2, 1],
            [b, 1, b],
            [1, 1, e]
        ];
        // it changes [0,0] cell to weakFlag
        const result1 = setFlag([0,0], playerField, gameField, 2, 2);
        const result2 = setFlag([0,0], result1[0], gameField, 2, 2);
        expect(result2).toStrictEqual([
            [
                [h, h, h],
                [h, h, h],
                [f, h, h]
            ], false, 1
        ]);

        const result3 = setFlag([0,0], result2[0], gameField, 1, 2);
        expect(result3).toStrictEqual([
            [
                [f, h, h],
                [h, h, h],
                [f, h, h]
            ], false, 2
        ]);
    })
})