/* eslint-disable react/prop-types */
import {use} from "react";


const PosterAttractions = ({ moviesPromise, peoplesPromise, tvPromise, size, configsPromise }) => {
    const movies = use(moviesPromise);
    const peoples = use(peoplesPromise);
    const tv = use(tvPromise);
    const configs = use(configsPromise);

    const posterClass = "h-auto max-w-full sm:h-36 aspect-2/3 rounded-xl";

    const poster = (key, configs, item) => {
        if(item.poster_path) {
            return <img key={key} src={configs.data.images.base_url + '/' + configs.data.images.poster_sizes[size] + item.poster_path} alt={item.name} className={posterClass}/>
        } else {
            return <div key={key} className={posterClass + " bg-black-08 text-center align-middle items-center justify-center flex-col inline-flex text-absolute-white font-manrope"}>{item.name}</div>
        }
    }

    return (
        <div className="grid lg:grid-cols-9 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-5 w-full h-auto">
            {configs && movies && movies.data.results.map((movie, i) => poster(i, configs, movie))}
            {configs && tv && tv.data.results.map((eachTV, i) => poster(i, configs, eachTV))}
            {configs && peoples && peoples.data.results.map((people, i) => poster(i, configs, people))}
        </div>
    )
}

export default PosterAttractions;