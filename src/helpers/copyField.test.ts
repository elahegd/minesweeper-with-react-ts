import { copyField } from "./copyField";

import { Field } from "./Field";
import { fieldGenerator } from "./__mocks__/Field";

describe("Check copyField function", () => {
    it("Object.is should be different, data is the same", () => {
        // They should point to different space of the ram but the data still is the same
        const prevField = fieldGenerator(9) as Field;
        const nextField = copyField(prevField);

        expect(prevField).not.toBe(nextField);
        expect(prevField).toStrictEqual(nextField);
    })
})