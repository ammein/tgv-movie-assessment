import LeftArrow from "../../assets/left-arrow.svg?react";
import RightArrow from "../../assets/right-arrow.svg?react";

/**
 * Swiper Button Component
 * @param {import('react').RefObject} reference
 * @param {"left" || "right"} direction
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
export const SwiperButton = ({reference, direction, children}) => {

    switch (direction) {
        case 'left':
            return <button
                className="!p-5 !border !border-neutral-800 !bg-black-06 !rounded-xl swiper-button-prev !gap-2 cursor-pointer"
                onClick={() => reference.current.slidePrev()}><LeftArrow/>{children}</button>
        case 'right':
            return <button
                className="!p-5 !border !border-neutral-800 !bg-black-06 !rounded-xl swiper-button-next !gap-2 cursor-pointer"
                onClick={() => reference.current.slideNext()}><RightArrow/>{children}</button>
    }
}