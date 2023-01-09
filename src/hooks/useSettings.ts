import { useState } from "react";

import { LevelNames, GameSettings, Settings } from "../module/GameSettings";

interface ReturnType {
    settings: Settings;
    level: LevelNames;
    setLevel: (level: LevelNames) => Settings;
}
export const useSettings = ():ReturnType => {
    const [level, setLevel] = useState<LevelNames>("beginner");
    const [size, bombs] = GameSettings[level];

    return {
        settings: [size, bombs],
        level,
        setLevel: (level) => {
            setLevel(level);
            return GameSettings[level]
        }
    }
}