import React from 'react';
import {render, screen, fireEvent, createEvent} from "@testing-library/react";

import { CellState, Coords } from '../../helpers/Field';
import Cell, { checkCellIsActive, ClosedFrame } from "./Cell";

describe('Cell component check', () => {
    const coords: Coords = [1, 1];
    it("Should render elements of cell with props", () => {
        const props = {
            onClick: jest.fn(), 
            onContextMenu: jest.fn(),
            coords: coords,            
        }
        render(<Cell {...props}  children= {0} />);
    });

    it("Closed frame renders correctly", () => {
        const { asFragment } = render(<ClosedFrame mouseDown={true} />);
        expect(asFragment()).toMatchSnapshot();
    })

    for(let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
        it("check prevent default context menu for every type of cell", () => {
            const props = {
                coords,
                onClick: jest.fn(),
                onContextMenu: jest.fn(),
            }
            render(<Cell {...props} children= {cell} />);

            //should pass this data-testid to the element in the component as well
            const cellComponent = screen.getByTestId(`${coords}`);
            const contextMenuEvent = createEvent.contextMenu(cellComponent);
            fireEvent(cellComponent, contextMenuEvent);
            expect(contextMenuEvent.defaultPrevented).toBe(true);
        });

        it("onClick and onContextMenu handler shhould be called for active cells", () => {
            const props = {
                coords,
                onClick: jest.fn(),
                onContextMenu: jest.fn(),
                'data-testid':`${coords}`
            }
            render(<Cell {...props} children= {cell} />);

            const cellComponent = screen.getByTestId(`${coords}`);
            fireEvent.contextMenu(cellComponent);
            fireEvent.click(cellComponent);

            if(checkCellIsActive(cell)){
                expect(props.onClick).toBeCalled();
                expect(props.onContextMenu).toBeCalled();
            } else {
                expect(props.onClick).not.toBeCalled();
                expect(props.onContextMenu).not.toBeCalled();
            }
        }); 
    }

})