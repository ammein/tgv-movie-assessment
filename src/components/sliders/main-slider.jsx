import Play from '../../assets/play.svg?react'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import {use, useContext, useRef} from "react";
import {AuthContext} from "../authentication/index.jsx";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {SwiperButton} from "./swiper-button.jsx";


const useAuth = () => {
    return useContext(AuthContext);
}

export const SkeletonMainSlider = ({children}) => (
    <>
        <SkeletonTheme baseColor={"#999"} highlightColor={"#e50000"}>
            <div
                className="w-full h-[80vh] relative rounded-2xl overflow-hidden !border-t !border-l !border-r !border-neutral-800 px-[50px] pt-[50px]">
                <div className="relative w-full h-full bg-cover pb-5">
                    <div
                        className="z-10 w-full h-[70%] bottom-0 absolute !pb-5 !bg-gradient-to-t from-black-08 !to-black-08/0 overflow-hidden"></div>
                    <div
                        className="z-20 absolute mx-auto left-0 right-0 bottom-40 h-fit flex-col justify-end items-center gap-[30px] inline-flex">
                        <div
                            className="h-fit relative !px-[150px] flex-col justify-start items-center gap-1 inline-flex">
                            <h1
                                className=" text-center text-white text-[38px] font-bold font-manrope leading-[57px]">
                                <Skeleton/></h1>
                            <p
                                className="text-center text-grey-60 text-lg font-medium font-manrope leading-[27px]">
                                <Skeleton/></p>
                        </div>
                        <div className="h-14 justify-start items-start gap-5 inline-flex">
                            <button
                                className="!h-fit !w-fit !px-6 !py-[18px] bg-red-45 !rounded-lg !justify-start !items-center !gap-1 !inline-flex cursor-not-allowed">
                                <Skeleton/>
                                <span className="text-white text-lg font-semibold font-manrope leading-7"><Skeleton
                                    enableAnimation={true}/>
                        </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </SkeletonTheme>
    </>
)

const MainSlider = ({allTrendingPromises, size}) => {
    const allTrending = use(allTrendingPromises);
    const swiperRef = useRef();

    const {configs} = useAuth();

    return (
        <>
            <Swiper
                className="w-full h-[80vh] relative rounded-2xl overflow-hidden !border-t !border-l !border-r !border-neutral-800 px-[50px] pt-[50px]"
                slidesPerView={1}
                modules={[Navigation, Pagination, Autoplay]}
                onSwiper={(swiper)=> {
                    swiperRef.current = swiper
                }}
                pagination={{
                    el: ".swiper-pagination", // Use a valid DOM element here
                    type: "progressbar",
                }}
                autoplay={{
                    pauseOnMouseEnter: true,
                    delay: 3000,
                }}
            >
                {configs && allTrending && allTrending.data.map((trending, i) => (
                    <SwiperSlide key={i} style={{
                        backgroundImage: `url(${configs.data.images.base_url + configs.data.images.backdrop_sizes[size] + trending.backdrop_path})`
                    }} className={`relative w-full h-full bg-cover pb-5`}>
                        <div
                            className="z-10 w-full h-[70%] bottom-0 absolute !pb-5 !bg-gradient-to-t from-black-08 !to-black-08/0 overflow-hidden"></div>
                        <div
                            className="z-20 absolute mx-auto left-0 right-0 bottom-40 h-fit flex-col justify-end items-center gap-[30px] inline-flex">
                            <div
                                className="h-fit relative !px-[150px] flex-col justify-start items-center gap-1 inline-flex">
                                <h1
                                    className=" text-center text-white text-[38px] font-bold font-manrope leading-[57px]">{trending.name || trending.original_title || trending.title}</h1>
                                <p
                                    className="sm:block hidden text-center text-grey-60 text-lg font-medium font-manrope leading-[27px]">{trending.overview}</p>
                            </div>
                            <div className="h-14 justify-start items-start gap-5 inline-flex">
                                <button
                                    className="!h-fit !w-fit !px-6 !py-[18px] !bg-red-45 !rounded-lg !justify-start !items-center !gap-1 !inline-flex cursor-pointer">
                                    <Play/>
                                    <div className="text-white text-lg font-semibold font-manrope leading-7">Play Now
                                    </div>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div
                    className="z-10 !px-10 absolute bottom-5 left-0 w-full h-14 rounded-xl justify-between items-center inline-flex">
                    <SwiperButton reference={swiperRef} direction={"left"}/>
                    <SwiperButton reference={swiperRef} direction={"right"}/>
                </div>
                <div className="swiper-pagination"></div>
            </Swiper>
        </>
    )
}

export default MainSlider;