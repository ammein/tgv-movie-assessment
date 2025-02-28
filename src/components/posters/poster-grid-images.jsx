import {use, useContext} from "react";
import {AuthContext} from "../authentication";

const useAuth = () => {
    return useContext(AuthContext);
}

const PosterGridImages = ({type, imagesPromise, size}) => {
    const images = use(imagesPromise);
    const { configs } = useAuth();

    return (
        <div className={type === "group" ? "grid grid-cols-2 gap-1" : undefined}>
            {
                configs && images && type === "group" ?
                    images.filter(val => val.poster_path).filter((val, i) => i < 4).map((image, i) => <img className="aspect-3/4 object-cover" key={i} src={configs.data.images.base_url + configs.data.images.poster_sizes[size] + image.poster_path} alt={image.name}/>)
            :
                    images.length > 0 ?
                    <img className="aspect-3/4 object-cover" key={images[0].file_path} src={configs.data.images.base_url + configs.data.images.poster_sizes[size] + images[0].file_path} alt={"Image"}/>
                        :
                        <img className="aspect-3/4 object-cover" key={images.title} src={configs.data.images.base_url + configs.data.images.poster_sizes[size] + images.poster_path} alt={images.title}/>
            }
        </div>
    )
}

export default PosterGridImages;