import React from 'react';
import { render, screen, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Level} from "./Level";

describe("Render Level component with props", () => {
    it("Level renders correctly", () => {
        const { asFragment } = render(<Level onChange={jest.fn()} value={'intermediat'}>{['beginner', 'intermediat', 'expert']}</Level>);

        expect(asFragment()).toMatchSnapshot();;
    });
});

describe("Change handler behaviour", () => {
    it("Change from intermediate to expert", () => {
        const onChange = jest.fn();

        render(<Level onChange={onChange} value={'intermediat'}>{['beginner', 'intermediat', 'expert']}</Level>);

        userEvent.selectOptions(screen.getByRole('combobox'), 'expert');

        expect(screen.getByRole('option', {name : 'expert'})).toBeEnabled();
        expect(onChange).toHaveBeenCalled();
    })
})