import React from 'react';
import { render } from "@testing-library/react";

import {GameName} from "./GameName";

describe("GameName renders coreectly", () => {
    it("get snapshot from GameName component", () => {
        const { asFragment } = render(<GameName>Minesweeper</GameName>);

        expect(asFragment()).toMatchSnapshot();
    })
})