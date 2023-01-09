import { FC, memo } from 'react';
import styled from '@emotion/styled';

export interface GameOverProps extends FrameProps {
    onClick: () => void;
}

export const GameOver:FC<GameOverProps> = memo(({ onClick, isWin }) => {
  return (
    <Frame onClick={ onClick } isWin={isWin}>
        {isWin ? '😎' : '🙁'}
    </Frame>
  )
});

// Stryker disable next-line StringLiteral
GameOver.displayName = "GameOver";

interface FrameProps {
    isWin: boolean;
}

const Frame = styled.div<FrameProps>`
    top: 50%;
    left: 50%;
    z-index: 11;
    width: 8vw;
    height: 8vw;
    font-size: 4vw;
    text-align: center;
    user-select: none;
    cursor: pointer;
    line-height: 8vw;
    position: absolute;
    border-radius: 50%;
    pointer-events: auto;
    background-color: #d1d1d1;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(51, 51, 51, 0.25);
`;
