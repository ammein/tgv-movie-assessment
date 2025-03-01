import {createContext, useCallback, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import {axios, isNotExpired} from '../../utils/'

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
    getSession: () => {},
    setRequestToken: () => {},
});

const AuthProvider = ({ children }) => {
    const [guestExpiryDate, setGuestExpiryDate] = useLocalStorage("guest_expiry_date");
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionID, setSessionID] = useLocalStorage("session_id");
    const [requestToken, setRequestToken] = useLocalStorage("request_token");
    const [configs, setConfigs] = useState(null);

    const validate_guest_session = useCallback(async (valid) => {
        if(!valid.data.success) throw new Error("API key not found or invalid");

        const request = await axios.get(`/authentication/guest_session/new`, {
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
    }, [])

    const validate_session = useCallback(async (request_token) => {
        const request = await axios.post(`authentication/session/new`, {
            request_token: request_token,
        }, {
            headers: {
                Accept: "application/json",
                'content-type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            },
            params: {
                api_key: import.meta.env.VITE_API_KEY,
            }
        })

        if(!request.data.success) throw new Error("Invalid request for a session");

        setSessionID(request.data.session_id);

        navigate('/show');
    }, [])


    const remove_session = useCallback(async (guest) => {
        if(guest){
            window.localStorage.clear();
            setSessionID(null);
            setRequestToken(null);
            setGuestExpiryDate(null);
        } else {
            const request = await axios.delete(`/authentication/session`, {
                headers: {
                    Accept: "application/json",
                    'content-type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
                },
                data: {
                    session_id: sessionID,
                },
                params: {
                    api_key: import.meta.env.VITE_API_KEY
                }
            });

            if(!request.data.success) throw new Error("Unable to delete the session");

            window.localStorage.clear();
            setSessionID(null);
            setRequestToken(null);
            setGuestExpiryDate(null);

            try{
                await navigate('/');
            }catch{
                throw new Error("Unable to navigate to home page");
            }
        }
    }, [sessionID])

    const get_request_token = useCallback(async (valid) => {
        if(!valid.data.success) throw new Error("API key not found or invalid");

        const request = await axios.get(`/authentication/token/new`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            }
        })

        if(!request.data.success) throw new Error("Invalid request for a session");

        setRequestToken(request.data.request_token);

        const origin = location.state?.from?.pathname && location.state?.from?.pathname !== '/' ? location.state?.from?.pathname : '/show';

        window.location.href = `https://www.themoviedb.org/authenticate/${request.data.request_token}?redirect_to=${window.location.origin + origin}`;
    }, [location.state?.from?.pathname])

    const guest_login = async () => {
        try {
            const valid = await axios.get(`/authentication`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
                }
            });

            if(sessionID && isNotExpired(guestExpiryDate) || requestToken) return await navigate('/show');

            await validate_guest_session(valid);
        } catch (err) {
            return console.error(err);
        }
    }

    const login = async () => {
        try {
            const valid = await axios.get(`/authentication`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
                }
            });

            const origin = location.state?.from?.pathname !== '/' ? location.state?.from?.pathname : '/show';

            if(sessionID) return await navigate(origin);

            await get_request_token(valid);
        } catch (err) {
            return console.error(err);
        }
    }

    const logout = async (guest = false) => {
        try{
            await remove_session(guest);
        } catch (err) {
            return console.error(err);
        }
    }

    const getConfig = async () => {
        return await axios.get(`/configuration`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`
            },
            params: {
                api_key: import.meta.env.VITE_API_KEY
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
        getSession: validate_session,
        setConfig: setConfigs,
        configs: configs,
        setGuestExpiry: setGuestExpiryDate,
        setSession: setSessionID,
        setRequestToken: setRequestToken,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;