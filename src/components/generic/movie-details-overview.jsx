import Clock from '../../assets/clock.svg?react'
import Eye from '../../assets/eye.svg?react'
import {use} from "react";

const MovieDetailsOverview = ({ itemPromise }) => {
    const item = use(itemPromise);

    return (
        <div className="h-7 justify-between items-start inline-flex">
            <div className="h-7 pl-1 pr-2 py-1 bg-black-08 rounded-[51px] border border-neutral-800 justify-start items-center gap-0.5 inline-flex">
                <div className="relative">
                    <Clock />
                </div>
                <div className="text-grey-60 text-xs font-medium font-manrope leading-[18px]">{item.release_date}</div>
            </div>
            <div className="h-7 pl-1 pr-2 py-1 bg-black-08 rounded-[51px] border border-neutral-800 justify-start items-center gap-1 inline-flex">
                <div className="relative">
                    <Eye />
                </div>
                <div className="text-grey-60 text-xs font-medium font-manrope leading-[18px]">{Math.floor(item.popularity)}</div>
            </div>
        </div>
    )

}

export default MovieDetailsOverview;