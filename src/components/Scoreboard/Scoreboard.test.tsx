import React from 'react';
import { render, screen, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Scoreboard} from "./Scoreboard";

describe("Render Scoreboard component with props", () => {
    it("Scoreboard renders correctly", () => {
        const { asFragment } = render(<Scoreboard
            levels= {['beginner', 'intermediat', 'expert']}
            timer= {"000"}
            onReset={() => null} 
            onChangeLevel={() => null}
            defaultValue={'intermediat'} bombs={"010"} />);

        expect(asFragment()).toMatchSnapshot();;
    });
});

describe("Change handler behaviour", () => {
    it("Change from intermediate to expert", () => {
        const onChange = jest.fn();

        render(<Scoreboard onChangeLevel={onChange} 
            levels= {['beginner', 'intermediat', 'expert']}
            timer= {"000"}
            onReset={() => null} 
            defaultValue={'intermediat'} bombs={"010"} />);

        userEvent.selectOptions(screen.getByRole('combobox'), 'expert');

        expect(screen.getByRole('option', {name : 'expert'})).toBeEnabled();
        expect(onChange).toHaveBeenCalled();
    })
})