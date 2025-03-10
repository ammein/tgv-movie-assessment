import {useContext, useEffect, useRef} from "react";
import {AuthContext} from "./auth-provider.jsx";
import {Navigate, useLocation, useSearchParams} from "react-router";
import {getCookie} from "react-use-cookie";

const useAuth = () => {
    return useContext(AuthContext);
}

const ProtectedRoute = ({ children }) => {
    const { getConfig, configs, setConfig, getSession} = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const isMounted = useRef(false);

    useEffect(() => {
        // To let it not run twice when initialized: https://www.reddit.com/r/reactjs/comments/15s1p0q/comment/jwbsd7x/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
        if (!isMounted.current) {
            const getConfigurations = async () => {
                let config = await getConfig();

                if(searchParams.size > 0 && searchParams.has("approved") && JSON.parse(searchParams.get("approved"))) {
                    if(!getCookie('session_id')){
                        await getSession(searchParams.get("request_token"));
                    }
                }

                if(!configs) {
                    setConfig(config);
                }
            }

            if(!configs) {
                getConfigurations()
                    .catch(console.error)
            }

            // Set it to true to let the function execution above only run once
            isMounted.current = true;
        }
    },[configs])

    if(!getCookie('session_id') && searchParams.size === 0) {
        return <Navigate to="/" replace state={{
            // To let redirect enabled from previously visited page
            from: location
        }}/>;
    }

    return children;
};

export default ProtectedRoute;