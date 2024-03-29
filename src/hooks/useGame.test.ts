import { renderHook, act } from "@testing-library/react";

import { useGame } from "./useGame";
import { CellState, Field } from '../helpers/Field';
import { GameLevel, GameSettings } from "../module/GameSettings";

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

jest.mock("../helpers/Field");

const [beginner, intermediate, expert] = GameLevel;

const flatArray = (array: Field, cond: number) => {
    const flattedArray = array.flat();
    return flattedArray.filter((t) => t === cond)
     
}

describe("Game test cases", () => {
    // describe("Render behaviour", () => {
    //     it("Render game field by default", () => {
    //         const { result } = renderHook(useGame);

    //         const { level, isGameOver, isWin, setting, playerField, gameField } = result.current;

    //         expect({level, isGameOver, isWin, setting }).toStrictEqual({
    //             level: beginner,
    //             isGameOver: false,
    //             isWin: false,
    //             setting: GameSettings.beginner
    //         });
    //         expect(playerField).toHaveLength(9);
    //         expect(flatArray(gameField, b)).toHaveLength(10);
    //     });

    //     it("onChange game level handler", () => {
    //         const { result } = renderHook(useGame);

    //         const { playerField: beginnerPlayerField , handleChangeLevel } = result.current;
    //         expect(beginnerPlayerField).toHaveLength(9);

    //         act(() => handleChangeLevel(intermediate));
    //         const { playerField: intermediatePlayerField } = result.current;
    //         expect(intermediatePlayerField).toHaveLength(16);

    //         act(() => handleChangeLevel(expert));
    //         const { playerField: expertPlayerField } = result.current;
    //         expect(expertPlayerField).toHaveLength(22);
    //     })
    // });    

    // describe("Open cell test cases", () => {
    //     it("Click to non-empty cells area", () => {
    //         const { result } = renderHook(useGame);
    //         const { handleClick } = result.current;

    //         act(() => handleClick([0,8]));
    //         const { playerField: newPlayerField } = result.current;
    //         expect(flatArray(newPlayerField, 1)).toHaveLength(1);
    //     });

    //     it("Open empty cell on the beginner level", () => {
    //         const { result } = renderHook(useGame);
    //         const { playerField: beginnerPlayerField, handleClick } = result.current;

    //         expect(flatArray(beginnerPlayerField, e)).toHaveLength(0);
            
    //         act(() => handleClick([0,0]));
    //         const { playerField: newPlayerField } = result.current;
    //         expect(flatArray(newPlayerField, e)).toHaveLength(18);
    //     });

    //     it("Check click to the cell when the level is changed", () => {
    //         const { result } = renderHook(useGame);

    //         expect(result.current.playerField).toHaveLength(9);
    //         act(() => result.current.handleChangeLevel(intermediate));

    //         expect(result.current.playerField).toHaveLength(16);
    //         act(() => result.current.handleClick([15,15]));

    //         expect(flatArray(result.current.playerField, e)).toHaveLength(2);
    //         act(() => result.current.handleChangeLevel(expert));

    //         expect(flatArray(result.current.playerField, h)).toHaveLength(484);
    //         act(() => result.current.handleClick([21,21]));

    //         expect(flatArray(result.current.playerField, e)).toHaveLength(1);
    //         expect(flatArray(result.current.playerField, 1)).toHaveLength(2);
    //         expect(flatArray(result.current.playerField, 2)).toHaveLength(1);
    //     });

    //     it("Check click on reset button", () => {
    //         const { result } = renderHook(useGame);
    //         // const { playerField, handleClick, onReset, gameField } = result.current;

    //         act(() => result.current.handleClick([0,8]));
    //         expect(flatArray(result.current.playerField, 1)).toHaveLength(1);

    //         act(() => result.current.handleClick([0,0]));
    //         expect(flatArray(result.current.playerField, e)).toHaveLength(18);

    //         act(() => result.current.onReset());

    //         expect(flatArray(result.current.playerField, h)).toHaveLength(81);
    //         expect(flatArray(result.current.gameField, b)).toHaveLength(10);
    //     });

    //     it("Handle Context menu", () => {
    //         const { result } = renderHook(useGame);
    //         const { handleContextMenu } = result.current;

    //         act(() => handleContextMenu([0,0]));
    //         const { playerField: newPlayerField } = result.current;
    //         expect(flatArray(newPlayerField, f)).toHaveLength(1);
    //     })
    // });

    // describe("Game over behaviour", () => {
    //     it("Player loose the game then reset the game by clicking on emoji", () => {
    //         const { result } = renderHook(useGame);
    //         // Use the mocked fields
    //         // When client click on cell game is started and timer should be start
    //         act(() => result.current.handleClick([0,8]));
    //         expect(flatArray(result.current.playerField, 1)).toHaveLength(1);
    //         act(() => result.current.handleClick([0,0]));
    //         expect(flatArray(result.current.playerField, e)).toHaveLength(18);
    //         expect(result.current.gameIsStarted).toBe(true);
    //         expect(result.current.isGameOver).toBe(false);
    //         // bomb cell
    //         act(() => result.current.handleClick([0,7]));

    //         expect(flatArray(result.current.playerField, h)).toHaveLength(0);
    //         expect(flatArray(result.current.playerField, e)).toHaveLength(27);
    //         expect(flatArray(result.current.playerField, 1)).toHaveLength(30);
    //         expect(flatArray(result.current.playerField, 2)).toHaveLength(12);
    //         expect(flatArray(result.current.playerField, 3)).toHaveLength(2);
    //         expect(result.current.isGameOver).toBe(true);
    //         expect(result.current.isWin).toBe(false);
    //         expect(result.current.isGameOver).toBe(true);
    //         // click on failed emoji
    //         act(() => result.current.onReset());

    //         expect(result.current.isGameOver).toBe(false);
    //         expect(result.current.isWin).toBe(false);
    //         expect(result.current.gameIsStarted).toBe(false);
    //         expect(result.current.isGameOver).toBe(false);
    //         expect(flatArray(result.current.playerField, h)).toHaveLength(81);
    //     });

    //     it("Check the setTime functionality", () => {
    //         jest.useFakeTimers();
    //         const { result } = renderHook(useGame);
    //         const timeMustPass = 5;

    //         act(() => result.current.handleClick([0,8]));
    //         expect(flatArray(result.current.playerField, 1)).toHaveLength(1);
    //         for(let i = 0; i < timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }

    //         expect(result.current.time).toBe(5);
    //         expect(result.current.isGameOver).toBe(false);
    //         expect(result.current.isWin).toBe(false);
    //         expect(result.current.gameIsStarted).toBe(true);
    //         expect(result.current.isGameOver).toBe(false);
    //         // bomb cell
    //         act(() => result.current.handleClick([0,7]));
    //         // Move the timer 5s again and expect that the time should be stopped
    //         for(let i = 0; i < timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }

    //         expect(result.current.time).toBe(5);
    //         expect(result.current.isGameOver).toBe(true);
    //         expect(result.current.isWin).toBe(false);
    //         expect(result.current.gameIsStarted).toBe(false);
    //         expect(result.current.isGameOver).toBe(true);

    //         expect(flatArray(result.current.playerField, h)).toHaveLength(0);
    //         expect(flatArray(result.current.playerField, e)).toHaveLength(27);
    //         expect(flatArray(result.current.playerField, 1)).toHaveLength(30);
    //         expect(flatArray(result.current.playerField, 2)).toHaveLength(12);
    //         expect(flatArray(result.current.playerField, 3)).toHaveLength(2);

    //     });
    // });

    describe("Player win the game", () => {
        it("Palyer win the game randomlly", () => {
            const { result } = renderHook(useGame);
            const { gameField } = result.current;
            for(const y of gameField.keys()) {
                for(const x of gameField[y].keys()) {
                    const gameCell = gameField[y][x];
                    // When the cell is bomb we add flag otherwise we open the cell until the game is solved
                    act(() => {
                        gameCell === b ? result.current.handleContextMenu([y, x]) : result.current.handleClick([y, x]) 
                    })
                }
            }

            expect(result.current.isWin).toBe(true);
            expect(result.current.isGameOver).toBe(true);
        });
        it("Player win the game with open the last hidden cell", () => {
            const { result } = renderHook(useGame);
            const { gameField } = result.current;
            // Marked all bomb cells as flag
            for(const y of gameField.keys()) {
                for(const x of gameField[y].keys()) {
                    const gameCell = gameField[y][x];
                    act(() => {
                        gameCell === b && result.current.handleContextMenu([y, x]);
                    })
                }
            }
            // Open hidden cells
            for(const y of gameField.keys()) {
                for(const x of gameField[y].keys()) {
                    const gameCell = gameField[y][x];
                    act(() => {
                        gameCell !== b && result.current.handleClick([y, x]);
                    })
                }
            }

            expect(result.current.isWin).toBe(true);
            expect(result.current.isGameOver).toBe(true);
        });
        it("Player win the game when mark the last cell as a flag", () => {
            const { result } = renderHook(useGame);
            const { gameField } = result.current;
            // Open hidden cells
            for(const y of gameField.keys()) {
                for(const x of gameField[y].keys()) {
                    const gameCell = gameField[y][x];
                    act(() => {
                        gameCell !== b && result.current.handleClick([y, x]);
                    })
                }
            }

            // Marked all bomb cells as flag
            for(const y of gameField.keys()) {
                for(const x of gameField[y].keys()) {
                    const gameCell = gameField[y][x];
                    act(() => {
                        gameCell === b && result.current.handleContextMenu([y, x]);
                    })
                }
            }
            expect(result.current.isWin).toBe(true);
            expect(result.current.isGameOver).toBe(true);
        })
    })

    // describe("Timer behaviour", () => {
    //     it("Timer should start by the first click on cell", () => {
    //         jest.useFakeTimers();

    //         const { result } = renderHook(useGame);
    //         const { time, handleClick } = result.current;

    //         const timeMustPass = 5;

    //         for(let i = 0; i<timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }
    //         // Timer shouldn't works before game has started
    //         expect(time).toBe(0);

    //         //  Click on a cell
    //         act(() => {
    //             handleClick([0,0]);
    //         });

    //         for(let i = 0; i<timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }
    //         const { time: timerAfterClick } = result.current;
    //         expect(timerAfterClick).toBe(timeMustPass);
    //     });
    //     it("Timer should start by mark a cell as a flag", () => {
    //         jest.useFakeTimers();

    //         const { result } = renderHook(useGame);
    //         const { time, handleContextMenu } = result.current;

    //         const timeMustPass = 5;

    //         for(let i = 0; i<timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }
    //         // Timer shouldn't works before game has started
    //         expect(time).toBe(0);

    //         //  Click on a cell
    //         act(() => {
    //             handleContextMenu([0,0]);
    //         });

    //         for(let i = 0; i<timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }
    //         const { time: timerAfterMarkedFlag } = result.current;
    //         expect(timerAfterMarkedFlag).toBe(timeMustPass);
    //     });
    //     it("Timer should reset when the game is over by onReset", () => {
    //         jest.useFakeTimers();

    //         const { result } = renderHook(useGame);
    //         const { time, handleContextMenu } = result.current;

    //         expect(time).toBe(0);
    //         act(() => {
    //             handleContextMenu([0,0]);
    //         });
            
    //         const timeMustPass = 5;
    //         for(let i = 0; i<timeMustPass; i++) {
    //             act(() => {
    //                 jest.advanceTimersByTime(1000);
    //             })
    //         }

    //         expect(result.current.time).toBe(timeMustPass);

    //         // Click on reset button
    //         act(() => result.current.onReset());
    //         expect(result.current.time).toBe(0)
    //     })
    // });
    // describe("Flag counter restriction", () => {
    //     it("flagCounter should be incearsed when handleContextMenu calls", () => {
    //         const { result } = renderHook(useGame);

    //         act(() => result.current.handleContextMenu([0,0]));
    //         expect(result.current.flagCounter).toBe(1);
    //     });
    //     it("flagCounter should stop when flagCounter > bombs", () => {
    //         const { result } = renderHook(useGame);

    //         for(let y=0; y<3; y++) {
    //             for(let x=0; x<4; x++) {
    //                 act(() => result.current.handleContextMenu([y,x]));
    //             }
    //         }

    //         expect(result.current.flagCounter).toBe(10);
    //     })
    // })
});