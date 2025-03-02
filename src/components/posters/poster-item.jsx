import PosterGridImages from "./poster-grid-images.jsx";
import Card from "../generic/card.jsx";
import TitleButton from "../generic/title-button.jsx";
import MovieDetailsOverview from "../generic/movie-details-overview.jsx";
import {getImages, getListDetails, getDetail} from "../../utils";
import {Suspense} from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

/**
 * Poster Item
 * @param {"movie" || "tv"} listType
 * @param {"group" || "individual"} type
 * @param {Object} options
 * @param {string} title
 * @param {number | undefined} id
 * @param {number} size
 * @returns {JSX.Element}
 * @constructor
 */
const PosterItem = ({ listType, type, options= {}, title, id, size }) => {

    return (
        <Card>
                <Suspense fallback={<Skeleton/>}>
                    <PosterGridImages type={type} imagesPromise={type === "group" ? getListDetails(listType, Object.assign({}, options,id ? {
                        "with_genres": id.toString()
                    } : {})) : getImages(listType, id, options)} size={size} />
                </Suspense>

                {type === "group" ? <TitleButton title={title} /> :
                    <Suspense fallback={<Skeleton/>}>
                        <MovieDetailsOverview itemPromise={getDetail(listType, id)} />
                    </Suspense>
                }
        </Card>
    )
}

export default PosterItem;