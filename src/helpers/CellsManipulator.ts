// Increment neighbour items for cell with coords

import { CellState, Cell, Coords, Field } from "./Field";

export const getNeigboursItems = ([y, x]: Coords): Record<string, [number, number]> => ({
    top: [y-1, x],
    topRight: [y-1, x+1],
    right: [y, x+1],
    rightBottom: [y+1, x+1],
    bottom: [y+1, x],
    left: [y, x-1],
    leftTop: [y-1, x-1],
    bottomLeft: [y+1, x-1]
});

export const checkItemInField = ([y, x]: Coords, { length }: Field): boolean => {
    return y >= 0 && x >= 0 && length - y > 0 && length - x > 0;
}
    

export const incrementNeibours = (coords: Coords, field: Field): Field => {
    const items = getNeigboursItems(coords);
    // console.log("hhh", items, Object.values(items), field);
    for (const [y, x] of Object.values(items)) {
        if (checkItemInField([y, x], field)) {
          const cell = field[y][x];
          // wnat to show the digit   
          if (cell < 8) {
            // increment the cell because we want to get rid of empty which is 0 and show the digit
            field[y][x] = (cell + 1) as Cell;
          }
        }
      }
    return field;
}
