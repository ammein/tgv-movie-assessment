import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import Navbar from "./components/generic/navbar.jsx";
import AuthProvider from './components/authentication/auth-provider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <App />
          </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
