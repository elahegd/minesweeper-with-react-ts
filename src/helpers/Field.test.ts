import { fieldGenerator, generateFieldWithDefaultState, CellState } from "./Field";
const { empty, bomb, hidden } = CellState;

describe("Field Generator behaviour", () => {
    describe("generateFieldWithDefaultState", () => {
        it("2x2 empty field generator with default state", () => {
            expect(generateFieldWithDefaultState(2)).toStrictEqual([
                [empty, empty],
                [empty, empty]
            ])
        });
        it("3x3 empty field generator with default state", () => {
            expect(generateFieldWithDefaultState(3)).toStrictEqual([
                [empty, empty, empty],
                [empty, empty, empty],
                [empty, empty, empty]
            ])
        });
        it("3x3 hidden field generator with default state", () => {
            expect(generateFieldWithDefaultState(3, hidden)).toStrictEqual([
                [hidden, hidden, hidden],
                [hidden, hidden, hidden],
                [hidden, hidden, hidden]
            ])
        })
    });

    describe("Simple cases", () => {
        it("Wrong density", () => {
            const errorText = "Probability must be between 0 and 1";

            expect(() => fieldGenerator(2, -1)).toThrow(errorText);
            expect(() => fieldGenerator(2, 2)).toThrow(errorText);
        });
        it("Smallest possible field without bomb", () => {
            expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
        });
        it("Smallest possible field with bomb", () => {
            expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
        });
        it("2x2 filed with probability bomb", () => {
            expect(fieldGenerator(2, 1)).toStrictEqual([
                [bomb, bomb],
                [bomb, bomb]
            ])
        });
        it("2x2 filed without probability bomb", () => {
            expect(fieldGenerator(2, 0)).toStrictEqual([
                [empty, empty],
                [empty, empty]
            ])
        });

        it("2x2 field with 50% probability", () => {
            const field = fieldGenerator(2, 0.5);
            const flattedFields = field.flat(); 

            const bombsCount = flattedFields.filter((c) => c === bomb);
            const emptyCount = flattedFields.filter((c) => c === 2);
            
            expect(bombsCount).toHaveLength(2);
            expect(emptyCount).toHaveLength(2);
        });

        it("10x10 field with 25% probability", () => {
            const size = 10;
            const mines = 25;

            const probability = mines / (size * size);
            const field = fieldGenerator(size, probability);
            // const field = fieldGenerator(10, 0.25);
            const flattedFields = field.flat(); 

            // if line 66 change / to * just in the head of field is 99999.. and the tail is 00000...
            expect([...field[0], ...field[1]].join('')).not.toBe('9999999999');
            
            expect(flattedFields.filter((c) => c === bomb)).toHaveLength(25);
            
        })
    })
})