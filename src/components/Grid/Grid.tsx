import { FC, memo } from 'react';

import styled from "@emotion/styled";

import { Coords, Field } from "../../helpers/Field";

import Cell from "./Cell";

export interface GridProps {
    children: Field;
    onClick: (coords: Coords) => void;
    onContextMenu: (coords: Coords) => void;
}

export const Grid: FC<GridProps> = memo(({ children, ...rest}) => {
    return (
      <Wrapped size={children.length}>{children.map((row, y) => row.map((cell, x) => (<Cell
          key={x}
          coords={[y, x]} 
          {...rest}
        >
              {cell}
          </Cell>))
          
      )}</Wrapped>
    )
});
// Stryker disable next-line StringLiteral
Grid.displayName = "Grid";

interface WrapperSize {
    size: number;
}

const Wrapped = styled.div<WrapperSize>`
    display: grid;
    grid-template-columns: repeat(${({size}) => size}, auto);
    width: max-content;
    padding: 1vw;
`;