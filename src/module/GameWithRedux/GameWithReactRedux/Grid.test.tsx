import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import { store } from '../../../pages/store';

import { Grid } from './Grid';

jest.mock("../../../helpers/Field");

describe("Grid test cases", () => { 
    it("Grid renders correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Grid />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
        // openCell
        userEvent.click(screen.getByTestId("0,0"));
        expect(asFragment()).toMatchSnapshot();
        // setFlag
        userEvent.click(screen.getByTestId("8,8"), { button: 2 });
        expect(asFragment()).toMatchSnapshot();
    });
})