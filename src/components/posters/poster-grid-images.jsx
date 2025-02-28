
import {use, useContext} from "react";
import {AuthContext} from "../authentication";

const useAuth = () => {
    return useContext(AuthContext);
}

const PosterGridImages = ({imagesPromise, size}) => {
    const images = use(imagesPromise);
    const { configs } = useAuth();

    return (
        <div className="grid grid-cols-2 gap-1">
            {configs && images && images.data.results.filter((val, i) => i < 4).map((image, i) => <img className="aspect-3/4 object-cover" key={i} src={configs.data.images.base_url + configs.data.images.poster_sizes[size] + image.poster_path} alt={image.name}/>)}
        </div>
    )
}

export default PosterGridImages;