import React from 'react';
import { render, screen } from '@testing-library/react';
import { App, Home} from './App';

const searchParams = { get: () => null };
const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useSearchParams: () => [searchParams, mockSetSearchParams],
  useParams: () => ({ usename: "test" }),
}));

describe("App test case", () => {
  it("App renders check", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("Home renders check", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  })
})
