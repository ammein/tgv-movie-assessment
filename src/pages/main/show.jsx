import MainSlider, { SkeletonMainSlider } from "../../components/sliders/main-slider.jsx";
import {getGenre, getTrending, trendingType} from '../../utils'
import {Suspense} from "react";
import Badge from "../../components/badge/badge.jsx";
import ItemSlider from "../../components/sliders/item-slider.jsx";

const Show = () => {

    return (
        <div className="w-full !px-32 !py-20 flex flex-col gap-14">
            <Suspense fallback={<SkeletonMainSlider>
                <div className="!p-[50px] rounded-xl border border-neutral-800 gap-[100px] flex-col justify-start items-start inline-flex">
                    <Badge title={"Movies"}/>
                </div>
            </SkeletonMainSlider>}>
                <MainSlider allTrendingPromises={getTrending(trendingType['ALL'])} size={3} />
                <div className="!p-[50px] rounded-xl border border-neutral-800 gap-[100px] flex-col justify-start items-start inline-flex">
                    <Badge title={"Movies"}/>
                    <ItemSlider listType={"movie"} posterType={"group"} itemsPromise={getGenre("movie")} size={3} headline={"Our"} />
                </div>
            </Suspense>
        </div>
    )
}

export default Show;