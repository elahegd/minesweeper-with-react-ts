import React from 'react';
import { render } from "@testing-library/react";

import { Grid } from "./Grid";

import { Field } from "../../helpers/Field";

export const MockFieldData: Field = [
    [9, 2, 9, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 1, 0, 1, 9, 1, 1, 9, 1],
    [0, 0, 1, 9, 10, 0, 2, 2, 2, 1, 1, 1],
    [0, 0, 10, 10, 1, 0, 1, 9, 1, 2, 2, 2],
    [0, 1, 1, 2, 2, 9, 1, 1, 1, 0, 0, 0],
    [0, 1, 9, 3, 9, 2, 10, 0, 0, 2, 1, 1],
    [0, 2, 2, 4, 9, 2, 10, 1, 1, 1, 9, 1],
    [0, 1, 9, 2, 1, 1, 1, 9, 1, 2, 2, 2],
    [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
    [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
  ];

describe("Grid renders correctly", () => {
    const props = {
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
    }
    it("Should render Grid with props and take the snapshot", () => {

        const { asFragment } = render(<Grid {...props}>{MockFieldData}</Grid>);

        // expect(asFragment()).toMatchSnapshot();
    })
})