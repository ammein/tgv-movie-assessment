import {Route, Routes} from "react-router";
import Home from './pages/main/home.jsx';
import Show from "./pages/main/show.jsx";
import ProtectedRoute from "./components/authentication/protected-route.jsx";

function App() {
    return (
        <Routes>
            <Route index path={'/'} element={<Home/>}></Route>
            <Route path={'/show'} element={
                <ProtectedRoute>
                    <Show/>
                </ProtectedRoute>
            }></Route>
        </Routes>
    )
}

export default App
