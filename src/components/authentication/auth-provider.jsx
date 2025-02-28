import {createContext, useState} from "react";
import {resolvePath, useNavigate} from "react-router";
import { api_url } from '../../utils/'
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
    session: null,
    token: null,
    onGuestLogin: () => {},
    onLogin: () => {},
    onLogout: () => {},
    getConfig: () => {}
});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [sessionID, setSessionID] = useState(null);
    const [requestToken, setRequestToken] = useState(null);

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

        navigate('/show');
    }

    const validate_session = async (valid, redirect) => {
        if(!valid.data.success) throw new Error("API key not found or invalid");

        const request = await axios.get(`${api_url}/authentication/token/new`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            }
        })

        if(!request.data.success) throw new Error("Invalid request for a session");

        setRequestToken(request.data.request_token);

        try {
            await navigate(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${resolvePath(redirect)}`);
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

            await validate_guest_session(valid);
        } catch (err) {
            return console.error(err);
        }
    }

    const login = async (redirect) => {
        try {
            const valid = await axios.get(`${api_url}/authentication`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
                }
            });

            await validate_session(valid, redirect);
        } catch (err) {
            return console.error(err);
        }
    }

    const logout = () => {
        setSessionID(null);
        setRequestToken(null);
        navigate("/");
    }

    const config = async () => {
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
        onGuestLogin: guest_login,
        onLogin: login,
        onLogout: logout,
        getConfig: config,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;