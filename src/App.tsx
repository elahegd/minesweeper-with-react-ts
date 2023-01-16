import React, { FC, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useSearchParams } from "react-router-dom";
import { Location } from "history";

const GameWithHooks = lazy(() => import("./pages/MinesweeperWithHooks"));
const MinesweeperWithRedux = lazy(() => import("./pages/MinesweeperWithRedux"));

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
                <li><Link to={getLevelParam("/minesweeper/usereducer")}>Game With Redcerx</Link></li>
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
                            <MinesweeperWithRedux />
                        </Suspense>
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
);

const Home: FC = () => <h2>Mineisdjf</h2>

  