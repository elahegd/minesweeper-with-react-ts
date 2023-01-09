import React from 'react';
import { render } from "@testing-library/react";

import { Top } from "./Top";

describe("Top renders coreectly", () => {
    it("get snapshot from Top component", () => {
        const { asFragment } = render(<Top feature={'Flag'}
        firstAction={'ctrl'}
        secondAction={'click'}>minesweeper</Top>);

        expect(asFragment()).toMatchSnapshot();
    })
})