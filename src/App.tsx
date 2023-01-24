import React, { FC, Suspense, lazy } from 'react';
import { Provider } from "react-redux";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useSearchParams } from "react-router-dom";
import { Location } from "history";

import { store } from './pages/store';

const GameWithHooks = lazy(() => import("./pages/MinesweeperWithHooks/MinesweeperWithHooks"));
const MinesweeperWithUseReducer = lazy(() => import("./pages/MinesweeperWithUseReducer/MinesweeperWithUseReducer"));
const MinesweepeerWithReactRedux = lazy(() => import("./pages/MinesweepeerWithReactRedux/MinesweepeerWithReactRedux"));

export const Navigation: FC = () => {
    const [query] = useSearchParams();
    const level = query.get('level') || "";

    const getLevelParam = (pathname: string): Partial<Location> => {
        return {
            pathname,
            search:  `${
                level &&
                `?${new URLSearchParams({
                  level,
                }).toString()}`
              }`
        }
    }

    return (
        <Nav>
            <NavigationList>
                <List><Link className="nav-link" to={getLevelParam("/")}>Home</Link></List>
                <List><Link className="nav-link" to={getLevelParam("/minesweeper/hooks")}>Game With Hooks</Link></List>
                <List><Link className="nav-link" to={getLevelParam("/minesweeper/usereducer")}>Game With Reducer</Link></List>
                <List><Link className="nav-link" to={getLevelParam("/minesweeper/react-redux")}>Game With React-redux</Link></List>
            </NavigationList>
        </Nav> 
    )
}

export const App: FC = () => (
    <Router>
        <Navigation />
        <Routes>
            <Route
                index
                element={<Home />}
            />
            <Route path="/minesweeper">    
                <Route
                    path="hooks"
                    element={
                        <Suspense fallback={<>Loading game with hooks</>}>
                            <GameWithHooks />
                        </Suspense>
                    }
                >
                    <Route 
                        path=":username?"
                        element={
                            <Suspense fallback={<>Loading game with hooks</>}>
                                <GameWithHooks />
                            </Suspense>
                        }
                    >
                    
                    </Route>
                </Route>
            </Route>
            <Route path="/minesweeper">    
                <Route
                    path="usereducer"
                    element={
                        <Suspense fallback={<>Loading game with useReducer</>}>
                            <MinesweeperWithUseReducer />
                        </Suspense>
                    }
                />
            </Route>
            <Route path="/minesweeper">
                <Route
                    path="react-redux"
                    element={
                        <Suspense fallback={<>Loading game with react-redux</>}>
                            <Provider store={store}>
                                <MinesweepeerWithReactRedux />
                            </Provider> 
                        </Suspense>
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
);

export const Home: FC = () => <Text>Welcome to the Minesweeper game</Text>

const Nav = styled.div`
  background: #f5f5f5;
  display: flex;
  max-width: 100%;
  justify-content: center;
`;

const NavigationList = styled.div`
   display: flex;
   list-style: none;
   justify-content: space-between;
`;

const List = styled.li`
    padding: 10px;
    text-decoration: none;
    
`;

const Text = styled.h2`
   text-align: center;
`;