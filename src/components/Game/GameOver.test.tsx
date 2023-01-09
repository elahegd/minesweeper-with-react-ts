import React from 'react';
import { render } from "@testing-library/react";

import { GameOver } from "./GameOver";

describe("Render and check click ", () => {
    it("Should render GameOver component correctly", () => {
        const { asFragment } = render(<GameOver isWin={true} onClick={jest.fn()} />);

        expect(asFragment()).toMatchSnapshot();
    });
})