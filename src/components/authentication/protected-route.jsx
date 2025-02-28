import {useContext, useEffect} from "react";
import {AuthContext} from "./auth-provider.jsx";
import {Navigate, useLocation} from "react-router";
import {isNotExpired} from "../../utils/index.jsx";

const useAuth = () => {
    return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { session, expiresAt, setGuestExpiry, setSession, getConfig, configs, setConfig} = useAuth();
    const location = useLocation();

    useEffect(  () => {
        async function getConfigurations() {
            let config = await getConfig();
            setConfig(config);
        }

        if (!configs) {
            // noinspection JSIgnoredPromiseFromCall
            getConfigurations();
        }
    },[configs, getConfig])

    if (session && expiresAt && !isNotExpired(expiresAt)) {
        setGuestExpiry(null);
        setSession(null);
        return <Navigate to="/" replace state={{
            // To let redirect enabled from previously visited page
            from: location
        }}/>;
    } else if(!session) {
        return <Navigate to="/" replace state={{
            // To let redirect enabled from previously visited page
            from: location
        }}/>;
    }

    return children;
};

export default ProtectedRoute;