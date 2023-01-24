import React from 'react';
import { Provider } from 'react-redux';
import { render } from "@testing-library/react";

import { store } from '../../../pages/store';

import { GameWithReactRedux } from './GameWithReactRedux';

describe("GameWithReactRedux test cases", () => {
    it("GameWithReactRedux renders correctly", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <GameWithReactRedux />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
})