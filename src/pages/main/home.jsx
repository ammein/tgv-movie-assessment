import {useContext, Suspense, useEffect} from "react";
import { AuthContext } from '../../components'
import {getTrending, trendingType} from '../../utils/'
import Logo from '../../assets/StreamVibeLogo.svg?react'
import PosterAttractions from "../../components/posters/poster-attractions.jsx";
import ErrorBoundary from "../../components/hoc/error-boundary.jsx";

const useAuth = () => {
    return useContext(AuthContext);
};

function Home() {

    const { onGuestLogin } = useAuth();

    const { getConfig, configs, setConfig} = useAuth();

    useEffect(  () => {
        async function getConfigurations() {
            let config = await getConfig();
            setConfig(config);
        }

        if (!configs) {
            // noinspection JSIgnoredPromiseFromCall
            getConfigurations();
        }
    },[configs, getConfig, setConfig])

    return (
        <div className="h-screen w-screen grid grid-rows-2 auto-rows-fr gap-5 overflow-hidden">
            <div className="z-10 fixed w-full h-1/10 bg-gradient-to-b from-black-08 to-black-08/0"></div>
            <div>
                <ErrorBoundary modal>
                    <Suspense fallback={null}>
                        <PosterAttractions size={3} moviesPromise={getTrending(trendingType['MOVIES'])} peoplesPromise={getTrending(trendingType['PEOPLES'])}
                                           tvPromise={getTrending(trendingType['TV'])}/>
                    </Suspense>
                </ErrorBoundary>
            </div>
            <div className="z-20 bottom-20 md:bottom-10 sm:bottom-5 fixed flex-col gap-[50px] justify-center items-center inline-flex">
                <div className="h-fit lg:w-1/2 lg:py-0 lg:px-0 xs:px-2 md:w-full sm:w-full xs:w-full flex-col justify-center items-center gap-3.5 inline-flex">
                    <div className="xl:w-1/2 lg:w-50 md:w-30 w-20 relative mx-auto inset-0 justify-self-center">
                        <Logo/>
                    </div>
                    <h1
                        className="text-center text-absolute-white md:text-[58px] text-[28px] font-bold font-manrope leading-[87px] sm:leading-[42px]">The
                        Best Streaming Experience
                    </h1>
                    <p
                        className="text-center text-grey-60 text-lg leading-[27px]">StreamVibe
                        is the best streaming experience for watching your favorite movies and shows on demand, anytime,
                        anywhere. <span className="md:inline hidden">With StreamVibe, you can enjoy a wide variety of content, including the latest
                        blockbusters, classic movies, popular TV shows, and more. You can also create your own
                            watchlists, so you can easily find the content you want to watch.</span>
                    </p>
                </div>
                <button
                    className="!h-fit !w-fit !px-6 !py-[18px] !bg-red-45 !rounded-lg !justify-start !items-center !gap-1 !inline-flex cursor-pointer"
                    onClick={onGuestLogin}>
                    <div className="relative">
                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M5.75 6.59479C5.75 4.93097 7.53383 3.87624 8.9917 4.67807L22.4557 12.0833C23.9668 12.9144 23.9668 15.0856 22.4557 15.9167L8.9917 23.3219C7.53383 24.1238 5.75 23.069 5.75 21.4052V6.59479Z"
                                  fill="white"/>
                        </svg>
                    </div>
                    <div className="text-absolute-white text-lg font-semibold font-manrope leading-[27px]">Start
                        Watching
                        Now
                    </div>
                </button>
            </div>
            <div className="z-10 fixed bottom-0 w-full h-1/1 bg-gradient-to-b from-black-08/0 to-black-08"></div>
        </div>
    );
}

export default Home;