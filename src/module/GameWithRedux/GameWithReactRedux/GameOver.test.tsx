import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';

import { store } from '../../../pages/store';

import { GameOver } from './GameOver';

jest.mock("react-redux", () => ({
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

describe("GameOver test cases", () => {
    it("GameOver renders correctly", () => {
        const mockDispatch = jest.fn();

        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as jest.Mock).mockReturnValue({
            isGameOver: true,
            isWin: false,
        })
        const { asFragment } = render(
            <Provider store={store}>
                <GameOver />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();

        userEvent.click(screen.getByText('🙁'));
        expect(mockDispatch).toHaveBeenCalled();
    });

    it("GameOver with win check", () => {
        const mockDispatch = jest.fn();

        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as jest.Mock).mockReturnValue({
            isGameOver: true,
            isWin: true,
        })
        const { asFragment } = render(
            <Provider store={store}>
                <GameOver />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();

        userEvent.click(screen.getByText('😎'));
        expect(mockDispatch).toHaveBeenCalled();
    });
})