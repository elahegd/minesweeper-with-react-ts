import { render } from "@testing-library/react";

import MinesweeperWithHooks from "./MinesweeperWithHooks";

const searchParams = { get: () => null };
const mockSetSearchParams = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ usename: "test" }),
    useSearchParams: () => [searchParams, mockSetSearchParams],
}))


describe("Minesweeper with hooks test cases", () => {
    it("MinesweeperWithHooks is match snapshot", () => {
        const { asFragment } = render(<MinesweeperWithHooks />);
        expect(asFragment()).toMatchSnapshot();
    });
});