import React, { FC, Suspense, lazy } from 'react';
import { Provider } from "react-redux";
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
        <nav>
            <ul>
                <li><Link to={getLevelParam("/")}>Home</Link></li>
                <li><Link to={getLevelParam("/minesweeper/hooks")}>Game With Hooks</Link></li>
                <li><Link to={getLevelParam("/minesweeper/usereducer")}>Game With Redcer</Link></li>
                <li><Link to={getLevelParam("/minesweeper/react-redux")}>Game With React-redux</Link></li>
            </ul>
        </nav> 
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

const Home: FC = () => <h2>Mineisdjf</h2>

  