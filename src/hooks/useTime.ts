import { useState, useEffect } from "react";

export const useTime = (
    gameIsStarted: boolean, 
    isGameOver: boolean): [number, () => void] => {

    const [time, setTime] = useState<number>(0);

    const onReset = () => setTime(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
  
        if(gameIsStarted) {
          interval = setInterval(() => {
            setTime(time + 1);
          }, 1000);
          
          // clear interval if the game is over
          if(isGameOver) {
            clearInterval(interval);
          }
        }
        // get rid of memory leak in component
        return () => {
          clearInterval(interval);
        }
    }, [gameIsStarted, time, isGameOver]);

    return [time, onReset];
}