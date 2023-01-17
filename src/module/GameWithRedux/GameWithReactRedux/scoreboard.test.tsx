import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from "@testing-library/react";

import { store } from '../../../pages/store';

import { Scoreboard } from './Scoreboard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';

jest.mock("react-redux", () => ({
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

describe("Scoreboard test cases", () => {
    it("Scoreboard renders correctly", () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as jest.Mock).mockReturnValue({
            level: "beginner",
            time: 0,
            bombs: 10,
            flagCounter: 3
        })
        const { asFragment } = render(
            <Provider store={store}>
                <Scoreboard />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
        
        // Handle change behaviour
        userEvent.selectOptions(screen.getByRole("combobox"), "intermediate");
        expect(asFragment()).toMatchSnapshot();

        // onReset behaviour
        userEvent.click(screen.getByRole("button"));
        expect(mockDispatch).toHaveBeenCalled();
        // First call for firing handlechange the second is for clicking on reset emoji
        expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
})