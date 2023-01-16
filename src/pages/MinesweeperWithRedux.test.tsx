import { render } from "@testing-library/react";

import MinesweeperWithRedux from "./MinesweeperWithRedux";

describe("Minesweeper with redux test cases", () => {
    it("MinesweeperWithRedux is match snapshot", () => {
        const { asFragment } = render(<MinesweeperWithRedux />);
        expect(asFragment()).toMatchSnapshot();
    });
});