// noinspection JSValidateTypes

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import {use, useContext, useRef} from "react";
import {AuthContext} from "../authentication/index.jsx";
import {SwiperButton} from "./main-slider.jsx";
import PosterItem from "../posters/poster-item.jsx";


const useAuth = () => {
    return useContext(AuthContext);
}

/**
 *
 * @param {"movie" | "tv"} listType
 * @param {"group" | "individual"} posterType
 * @param {Object | undefined} options - API Options. See: https://developer.themoviedb.org/reference/discover-movie
 * @param {string} headline
 * @param {Promise<import('axios').AxiosResponse<*>>} itemsPromise
 * @param {number} size
 * @returns {JSX.Element}
 * @constructor
 */
const ItemSlider = ({listType, posterType, options, headline, itemsPromise, size}) => {
    const items = use(itemsPromise);
    const swiperRef = useRef(null);

    const type = useRef("");

    const {configs} = useAuth();

    return (
        <>
            <div className="w-full h-fit gap-10 flex-col justify-start items-start inline-flex">
            <div className="h-fit justify-start items-center flex-row inline-flex w-full">
                <div className="text-white grow text-3xl font-bold font-manrope leading-[45px] capitalize">{headline + type.current}</div>
                <div
                    className="z-10 !px-10 relative w-fit h-14 rounded-xl justify-between items-center inline-flex">
                    <SwiperButton reference={swiperRef} direction={"left"}/>
                    <div className="swiper-pagination"></div>
                    <SwiperButton reference={swiperRef} direction={"right"}/>
                </div>
            </div>
            <Swiper
                className="h-fit justify-start items-center flex-row inline-flex w-full"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={5}
                spaceBetween={40}
                modules={[Navigation, Pagination]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    el: ".swiper-pagination", // Use a valid DOM element here
                    type: "fraction",
                }}
                breakpoints={{
                    400: {
                        spaceBetween: 0,
                        slidesPerView: 1,
                    },
                    576: {
                        spaceBetween: 5,
                        slidesPerView: 2,
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                    },
                    1044: {
                        slidesPerView: 5,
                    }
                }}
            >
                {configs && items && items.data && items.data.map((item, i) => {
                    let title = item.name || item.original_title || item.title;
                    type.current = " " + items.title;

                    return (
                        <SwiperSlide key={i}>
                            <PosterItem listType={listType} type={posterType} id={item.id} options={options} title={title} item={item}
                                        size={size}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </div>
        </>
    )
}

export default ItemSlider;