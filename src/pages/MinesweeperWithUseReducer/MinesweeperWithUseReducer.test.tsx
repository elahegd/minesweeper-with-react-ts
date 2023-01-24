import { render } from "@testing-library/react";

import MinesweeperWithUseReducer from "./MinesweeperWithUseReducer";

describe("Minesweeper with redux test cases", () => {
    it("MinesweeperWithUseReducer is match snapshot", () => {
        const { asFragment } = render(<MinesweeperWithUseReducer />);
        expect(asFragment()).toMatchSnapshot();
    });
});