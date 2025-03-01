import MainSlider, { SkeletonMainSlider } from "../../components/sliders/main-slider.jsx";
import {getGenre, getTrending, trendingType, getMovieUpcoming} from '../../utils'
import {Suspense} from "react";
import Badge from "../../components/badge/badge.jsx";
import ItemSlider from "../../components/sliders/item-slider.jsx";

const Show = () => {

    return (
        <div className="w-full sm:px-32 md:px-20 px-4 !py-20 flex flex-col gap-14">
            <Suspense fallback={<SkeletonMainSlider>
                <div className="!p-[50px] rounded-xl border border-neutral-800 gap-[100px] flex-col justify-start items-start inline-flex">
                    <Badge title={"Movies"}/>
                </div>
            </SkeletonMainSlider>}>
                <MainSlider allTrendingPromises={getTrending(trendingType['ALL'])} size={3} />
                <div className="sm:p-[50px] p-[20px] rounded-xl border border-neutral-800 gap-[100px] flex-col justify-start items-start inline-flex">
                    <Badge title={"Movies"}/>
                    <ItemSlider listType={"movie"} posterType={"group"} itemsPromise={getGenre("movie")} options={{
                        sort_by: "vote_average.asc",
                    }} size={3} headline={"Our"} />
                    <ItemSlider listType={"movie"} posterType={"group"} itemsPromise={getGenre("movie")} options={{
                        sort_by: "popularity.desc",
                    }} size={3} headline={"Popular Top 10 in"} />
                    <ItemSlider listType={"movie"} posterType={"individual"} itemsPromise={getTrending(trendingType['MOVIES'])} options={{
                        include_image_language: "en"
                    }} size={3} headline={"Popular Top 10 in"} />
                    <ItemSlider listType={"movie"} posterType={"individual"} itemsPromise={getMovieUpcoming()} size={0} headline={"Upcoming"} />
                </div>
                <div className="sm:p-[50px] p-[20px] rounded-xl border border-neutral-800 gap-[100px] flex-col justify-start items-start inline-flex">
                    <Badge title={"Shows"}/>
                    <ItemSlider listType={"tv"} posterType={"group"} itemsPromise={getGenre("tv")} options={{
                        sort_by: "vote_average.asc",
                    }} size={3} headline={"Our"} />
                    <ItemSlider listType={"tv"} posterType={"group"} itemsPromise={getGenre("tv")} options={{
                        sort_by: "popularity.desc",
                    }} size={3} headline={"Popular Top 10 in"} />
                    <ItemSlider listType={"tv"} posterType={"individual"} itemsPromise={getTrending(trendingType['TV'])} options={{
                        sort_by: "popularity.desc",
                    }} size={3} headline={"Trending"} />
                </div>
            </Suspense>
        </div>
    )
}

export default Show;