import React, {FC} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Reset } from "./Reset";

describe("Reset button check", () => {
    const onReset = jest.fn();
    const ResetWithDummyHandler: FC = () => <Reset onReset={onReset} />;
    it("Should render elements with default state", () => {
        render(<ResetWithDummyHandler />);

        // screen.debug();
        expect(screen.getByText('😀')).toBeInTheDocument();
    });

    // it("onReset handler should be called", () => {
    //     render(<ResetWithDummyHandler />);
    //     const button = screen.getByRole("button");
    //     const screenText = screen.getByText('😀');
    //     fireEvent.click(screenText);

    //     expect(button.textContent).toBe('😔')
    // });

    // it("Should change state when onMouseDown and onMouseUp events happened", () => {
    //     render(<ResetWithDummyHandler />);

    //     fireEvent.mouseDown(screen.getByText('😀'));
    //     expect(screen.getByText('😔')).toBeInTheDocument();

    //     fireEvent.mouseUp(screen.getByText('😔'));
    //     expect(screen.getByText('😀')).toBeInTheDocument();
    // });

    // it("Should change state when onMouseLeave event happened", () => {
    //     render(<ResetWithDummyHandler />);

    //     fireEvent.mouseDown(screen.getByText('😀'));
    //     expect(screen.getByText('😔')).toBeInTheDocument();

    //     fireEvent.mouseLeave(screen.getByText('😔'));
    //     expect(screen.getByText('😀')).toBeInTheDocument();
    // })
}) 