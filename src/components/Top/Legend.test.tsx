import React from 'react';
import { render } from "@testing-library/react";

import { Legend } from "./Legend";

describe("Legend renders coreectly", () => {
    it("get snapshot from Legend component", () => {
        const { asFragment } = render(<Legend feature={'Flag'}
        firstAction={'ctrl'}
        secondAction={'click'} />);

        expect(asFragment()).toMatchSnapshot();
    })
})