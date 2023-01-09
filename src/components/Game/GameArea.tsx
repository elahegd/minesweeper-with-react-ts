import React, { FC, ReactNode } from 'react';
import styled from "@emotion/styled";

export interface GameAreaProps {
    children: ReactNode;
}

export const GameArea:FC<GameAreaProps> = ({ children }) => {
  return (
    <Frame>{children}</Frame>
  )
}

const Frame = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 6px solid #e3e3e3;
    background-color: #e3e3e3;
    width: fit-content;
    margin: 0 auto;
    position: relative;
`;
