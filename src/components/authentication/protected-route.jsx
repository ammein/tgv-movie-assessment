import {useContext, useEffect} from "react";
import {AuthContext} from "./auth-provider.jsx";
import {Navigate, useLocation, useSearchParams} from "react-router";
import {isNotExpired} from "../../utils/index.jsx";

const useAuth = () => {
    return useContext(AuthContext);
}

const ProtectedRoute = ({ children }) => {
    const { session, expiresAt, setGuestExpiry, setSession, getConfig, configs, setConfig, token, setRequestToken, getSession} = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(  () => {
        async function getConfigurations() {
            let config = await getConfig();
            setConfig(config);
        }

        if (!configs) {
            // noinspection JSIgnoredPromiseFromCall
            getConfigurations();
        }

        if(searchParams.size > 0 && searchParams.has("approved") && JSON.parse(searchParams.get("approved"))) {
            setRequestToken(searchParams.get("request_token"));
            getSession(searchParams.get("request_token"));
        }
    },[configs, getConfig, searchParams, setConfig, setRequestToken, location, getSession])

    if (session && expiresAt && !isNotExpired(expiresAt)) {
        setGuestExpiry(null);
        setSession(null);
        return <Navigate to="/" replace state={{
            // To let redirect enabled from previously visited page
            from: location
        }}/>;
    } else if(!session && !token && searchParams.size === 0) {
        return <Navigate to="/" replace state={{
            // To let redirect enabled from previously visited page
            from: location
        }}/>;
    }

    return children;
};

export default ProtectedRoute;