import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicPages } from './routes';
import { Fragment } from 'react';
import DefaultLayOut from './Layout/DefaulLayout';
import ProtectedRoute from './Components/protectedRouters';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicPages.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayOut;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    // render page theo vai tro ng dung
                                    route.roles ? (
                                        <ProtectedRoute roles={route.roles}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ProtectedRoute>
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
