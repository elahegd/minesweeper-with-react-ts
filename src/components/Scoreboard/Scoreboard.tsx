import React, { FC, ChangeEvent } from 'react';
import styled from "@emotion/styled";

import { Reset } from "./Reset";
import { Counter } from "./Counter";
import { Level } from './Level';

export interface ScoreboardProps {
    timer: string;
    levels: string[];
    defaultValue?: string;
    onChangeLevel: (event: ChangeEvent<HTMLSelectElement>) => void;
    onReset: () => void;
    bombs: string;
}

export const Scoreboard: FC<ScoreboardProps> = ({timer, levels, defaultValue, onChangeLevel, onReset, bombs}) => {
  return (
    <Wrapper>
      <Counter>{timer}</Counter>
      <ResetAndLevelWrapper>
        <Level value={defaultValue} onChange={onChangeLevel}>
          {levels}
        </Level>
        <Reset onReset={onReset} />
      </ResetAndLevelWrapper>
      <Counter>{bombs}</Counter>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const ResetAndLevelWrapper = styled.div`
  display: flex;
`;