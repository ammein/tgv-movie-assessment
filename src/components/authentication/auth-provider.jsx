import {createContext, useState} from "react";
import {resolvePath, useLocation, useNavigate} from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { api_url } from '../../utils/'
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
    session: null,
    expiresAt: null,
    token: null,
    configs: null,
    onGuestLogin: () => {},
    onLogin: () => {},
    onLogout: () => {},
    getConfig: () => {},
    setConfig: () => {},
    setGuestExpiry: () => {},
    setSession: () => {},
});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [guestExpiryDate, setGuestExpiryDate] = useLocalStorage("guest_expiry_date",null);
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionID, setSessionID] = useLocalStorage("session_id",null);
    const [requestToken, setRequestToken] = useLocalStorage("request_token", null);
    const [configs, setConfigs] = useState(null);

    const validate_guest_session = async (valid) => {
        if(!valid.data.success) throw new Error("API key not found or invalid");

        const request = await axios.get(`${api_url}/authentication/guest_session/new`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            }
        })

        if(!request.data.success) throw new Error("Invalid request for a session");

        setSessionID(request.data.guest_session_id);
        setGuestExpiryDate(request.data.expires_at);

        try{
            await navigate('/show');
        }catch{
            throw new Error("Unable to navigate to show page");
        }
    }

    const validate_session = async (valid) => {
        if(!valid.data.success) throw new Error("API key not found or invalid");

        const request = await axios.get(`${api_url}/authentication/token/new`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            }
        })

        if(!request.data.success) throw new Error("Invalid request for a session");

        setRequestToken(request.data.request_token);

        const origin = location.state?.from?.pathname || '/show';

        try {
            await navigate(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${resolvePath(origin)}`);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            throw new Error("Invalid request for a session");
        }

    }

    const guest_login = async () => {
        try {
            const valid = await axios.get(`${api_url}/authentication`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
                }
            });

            if(sessionID) return await navigate('/show');

            await validate_guest_session(valid);
        } catch (err) {
            return console.error(err);
        }
    }

    const login = async () => {
        try {
            const valid = await axios.get(`${api_url}/authentication`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
                }
            });

            const origin = location.state?.from?.pathname || '/show';

            if(sessionID) return await navigate(origin);

            await validate_session(valid);
        } catch (err) {
            return console.error(err);
        }
    }

    const logout = async () => {
        setSessionID(null);
        setRequestToken(null);
        setGuestExpiryDate(null);
        await navigate("/");
    }

    const getConfig = async () => {
        return await axios.get(`${api_url}/configuration`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            }
        });
    }

    const value = {
        session: sessionID,
        token: requestToken,
        expiresAt: guestExpiryDate,
        onGuestLogin: guest_login,
        onLogin: login,
        onLogout: logout,
        getConfig: getConfig,
        setConfig: setConfigs,
        configs: configs,
        setGuestExpiry: setGuestExpiryDate,
        setSession: setSessionID,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;