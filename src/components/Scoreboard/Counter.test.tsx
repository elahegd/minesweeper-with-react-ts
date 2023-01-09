import React from 'react';
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import {Counter} from "./Counter";


afterEach(cleanup);

describe("Test click counter", () => {
    it("should increse the counter when click on the button", () => {
        const { asFragment } = render(<Counter>001</Counter>);

        expect(asFragment()).toMatchSnapshot();
        // const counter = screen.getByRole("heading");
        // const increaseButton = screen.getByRole("button", {name : "Increse"});
        // const decreaseButton = screen.getByRole("button", {name: "Decrease"});

        // expect(counter.textContent).toBe("Counter: 0");

        // fireEvent.click(increaseButton);
        // expect(counter.textContent).toBe("Counter: 1");

        // fireEvent.click(decreaseButton);
        // expect(counter.textContent).toBe("Counter: 0");
    })
})