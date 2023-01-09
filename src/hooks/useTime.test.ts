import { renderHook, act } from "@testing-library/react";

import { useTime } from "./useTime";

describe("useTime test cases", () => {
    it("Timer works fine when game is started", () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useTime(true, false));

        const timeMustPass = 5;
        for(let i = 0; i < timeMustPass; i++) {
            act(() => {
                jest.advanceTimersByTime(1000);
            })
        }

        expect(result.current[0]).toBe(timeMustPass);
    });
    it("Timer stops when game is over", () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useTime(true, true));
        const timeMustPass = 5;
        for(let i = 0; i < timeMustPass; i++) {
            act(() => {
                jest.advanceTimersByTime(1000);
            })
        }
        expect(result.current[0]).toBe(0);

    });
    it("Timer full lifecycle", () => {
        const { result, rerender } = renderHook(
            ({ gameIsStarted, isGameOver }) => useTime(gameIsStarted, isGameOver),
            {
                initialProps: { gameIsStarted: false, isGameOver: false}
            });

        const timeMustPass = 5;
        for(let i = 0; i < timeMustPass; i++) {
            act(() => {
                jest.advanceTimersByTime(1000);
            })
        }
        expect(result.current[0]).toBe(0);
        // rerender the hook and start the game
        rerender({ gameIsStarted: true, isGameOver: false});

        for(let i = 0; i < timeMustPass; i++) {
            act(() => {
                jest.advanceTimersByTime(1000);
            })
        }
        expect(result.current[0]).toBe(5);
        // rerender the game and finished the game
        rerender({ gameIsStarted: true, isGameOver: true});

        for(let i = 0; i < timeMustPass; i++) {
            act(() => {
                jest.advanceTimersByTime(1000);
            })
        }
        expect(result.current[0]).toBe(5);
        // click on reset button so fire the onReset handler
        act(() => result.current[1]());
        expect(result.current[0]).toBe(0);
    });
})