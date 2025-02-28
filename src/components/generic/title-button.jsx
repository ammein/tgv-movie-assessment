

import ArrowRight from '../../assets/right-arrow.svg?react'

const TitleButton = ({ title }) => {
    return (
        <div className="h-6 justify-start items-center inline-flex w-full">
            <div className="text-white text-base font-semibold font-manrope leading-normal grow">{title}</div>
            <div className="relative">
                <ArrowRight />
            </div>
        </div>
    )
}

export default TitleButton;