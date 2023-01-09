import React, { FC, ReactNode } from 'react';
import styled from "@emotion/styled";

export interface WrapperProps {
    children: ReactNode;
}

export const Wrapper:FC<WrapperProps> = ({ children }) => {
  return (
    <Frame>{children}</Frame>
  )
}

const Frame = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`