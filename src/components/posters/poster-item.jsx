import PosterGridImages from "./poster-grid-images.jsx";
import Card from "../generic/card.jsx";
import TitleButton from "../generic/title-button.jsx";
import MovieDetailsOverview from "../generic/movie-details-overview.jsx";
import {getListDetails} from "../../utils";
import {Suspense} from "react";
import Skeleton from "react-loading-skeleton";

/**
 * Poster Item
 * @param {"movie" || "tv"} listType
 * @param {"group" || "individual"} type
 * @param {string} title
 * @param {number} id
 * @param {number} size
 * @returns {JSX.Element}
 * @constructor
 */
const PosterItem = ({ listType, type, title, id, size }) => {

    return (
        <Card>
            <Suspense fallback={<Skeleton/>}>
                <PosterGridImages imagesPromise={getListDetails(listType, {
                    "with_genres": id.toString()
                })} size={size} />
                {type === "group" ? <TitleButton title={title} /> : <MovieDetailsOverview itemPromise={getListDetails(listType, {
                    "with_genres": id.toString()
                })} /> }
            </Suspense>
        </Card>
    )
}

export default PosterItem;