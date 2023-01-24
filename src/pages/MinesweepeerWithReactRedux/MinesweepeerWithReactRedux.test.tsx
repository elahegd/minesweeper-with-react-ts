import React from 'react';
import { Provider } from 'react-redux';
import { render } from "@testing-library/react";

import { store } from '../../pages/store';

import MinesweepeerWithReactRedux from "./MinesweepeerWithReactRedux";

describe("GameOver test cases", () => {
    it("GameOver renders correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MinesweepeerWithReactRedux />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
})