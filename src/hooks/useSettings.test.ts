import { renderHook, act } from "@testing-library/react";

import { useSettings } from "./useSettings";
import { GameSettings } from "../module/GameSettings";

describe("use Setting test cases", () => {
    it("Check default settings", () => {
        const { result } = renderHook(useSettings);

        expect(result.current.settings).toEqual(GameSettings.beginner);
        expect(result.current.level).toBe('beginner')
    });
    it("Check setLevel to intermediate", () => {
        const { result } = renderHook(useSettings);
        const { setLevel } = result.current;

        expect(result.current.settings).toEqual(GameSettings.beginner);
        expect(result.current.level).toBe('beginner');

        act(() => setLevel('intermediate'));
        const { level, settings } = result.current;

        expect(settings).toEqual(GameSettings.intermediate);
        expect(level).toBe('intermediate');
    })
})