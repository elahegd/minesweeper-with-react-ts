import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from "../../../pages/store";
import { actions } from "../index";

import { Grid as GridComponent } from "../../../components/Grid";
import { Coords } from '../../../helpers/Field';

export const Grid: FC = () => {
    const dispatch = useDispatch();

    const { playerField } = useSelector(
        ({ game: { playerField } }: RootState) => ({ 
            playerField 
        })
    );

    const handleContextMenu = useCallback(
        (coords: Coords) => dispatch(actions.openCell(coords)), 
        // Stryker disable next-line ArrayDeclaration
        []
    );

    const handleClick = useCallback(
        (coords: Coords) => dispatch(actions.openCell(coords)), 
        // Stryker disable next-line ArrayDeclaration
        []
    );

    return (
        <GridComponent onClick={handleClick} onContextMenu={handleContextMenu}>
            {playerField}
        </GridComponent>
)
}


