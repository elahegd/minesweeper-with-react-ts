import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GameWithHooks } from "./GameWithHooks";

const mockHandleClick = jest.fn();
const mockHandleChangeLevel = jest.fn();
const mockOnReset = jest.fn();
const mockHandleContextMenu = jest.fn();

jest.mock('../../hooks/useGame', () => ({
    __esModule: true,
    useGame: () => ({
        level: 'beginner',
        isGameOver: true,
        isWin: false,
        setting: [9, 10],
        playerField: [
            [10, 10],
            [10, 10]
        ],
        handleClick: mockHandleClick,
        handleChangeLevel: mockHandleChangeLevel,
        onReset: mockOnReset,
        handleContextMenu: mockHandleContextMenu
    })
}));

beforeEach(() => jest.clearAllMocks());

describe("Game with hooks test cases", () => {
    it("Render game field by default", () => {
        const { asFragment } = render(<GameWithHooks />);
        expect(asFragment()).toMatchSnapshot();
    });
    it("Cell click works fine", () => {
        render(<GameWithHooks />);
        userEvent.click(screen.getByTestId("0,0"));
        expect(mockHandleClick).toHaveBeenCalled();
    });
    it("Reset handler works fine", () => {
        render(<GameWithHooks />);
        userEvent.click(screen.getByRole('button'));
        expect(mockOnReset).toHaveBeenCalled();
    });
    it("Change level works fine", () => {
        render(<GameWithHooks />);
        userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
        expect(mockHandleChangeLevel).toHaveBeenCalled();
    });
    it("Game over resets the game state", () => {
        render(<GameWithHooks />);
        userEvent.click(screen.getByText('🙁'));
        expect(mockOnReset).toHaveBeenCalled();
    });
    it("Context menu handler", () => {
        render(<GameWithHooks />);
        // {button:2} => press the secondbutton of the mouse
        userEvent.click(screen.getByTestId('0,0'), { button: 2});
        expect(mockHandleContextMenu).toHaveBeenCalled();
    });
});