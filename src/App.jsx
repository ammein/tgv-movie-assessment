import {Route, Routes} from "react-router";
import Home from './pages/main/home.jsx';
import AuthProvider from './components/authentication/auth-provider.jsx';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route index path={'/'} element={<Home/>}></Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
