import axios from "axios";

export const api_url = import.meta.env.VITE_API_URL + '/' + import.meta.env.VITE_API_VERSION;

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
    },
};
export const instanceAxios = axios.create({
    baseURL: api_url,
    https: config,
});

/**
 * Get Trending Lists
 * @param {trendingType} type
 * @param time_window
 * @param language
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getTrending = async (type, time_window = "day", language = 'en-US') => {
    return await instanceAxios.get(`/trending/${type}/${time_window}`, {
        params: {
            language: language,
            api_key: import.meta.env.VITE_API_KEY,
        }
    }).then(res => {
        return {
            data: Object.values(res.data.results),
            title: "Trending " + type
        }
    })
}

/**
 * Get Genre Lists
 * @param {"movie" || "tv"} type
 * @param {string} language
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getGenre = async (type, language = 'en') => {
    return await instanceAxios.get(`/genre/${type}/list`, {
        params: {
            language: language,
            api_key: import.meta.env.VITE_API_KEY,
        }
    }).then(res => {
        return {
            data: Object.values(res.data)[0],
            title: Object.keys(res.data)[0]
        }
    })
}

/**
 * Get List Details
 * @param {"movie" || "tv"} type
 * @param {Object} options - Refer options in https://developer.themoviedb.org/reference/discover-movie
 * @param {number} page
 * @param {string} language
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getListDetails = async (type, options, page = 1, language = 'en-US') => {
    return await instanceAxios.get(`/discover/${type}`, {
        params: {
            ...options,
            language,
            page,
            api_key: import.meta.env.VITE_API_KEY,
        }
    }).then(res => res.data.results)
}

/**
 * Get Images from Movie/Tv
 * @param {"movie" || "tv"} type
 * @param {number} id
 * @param {Object} options - Refer options in https://developer.themoviedb.org/reference/discover-movie
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getImages = async (type, id, options) => {
    return await instanceAxios.get(`/${type}/${id}/images`, {
        params: {
            ...options,
            api_key: import.meta.env.VITE_API_KEY,
        }
    }).then(res => res.data.posters)
}


/**
 * Get Detail from Movie/Tv
 * @param {"movie" || "tv"} type
 * @param {number} id
 * @param {string} language
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getDetail = async (type, id, language = 'en-US') => {
    return await instanceAxios.get(`/${type}/${id}`, {
        params: {
            language,
            api_key: import.meta.env.VITE_API_KEY,
        }
    }).then(res => res.data)
}

/**
 * Get Upcoming Movies
 * @param {number} page
 * @param {string} language
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getMovieUpcoming = async (page = 1,language = 'en-US') => {
    return await instanceAxios.get(`/movie/upcoming`, {
        params: {
            language,
            page,
            api_key: import.meta.env.VITE_API_KEY,
        }
    }).then(res => res.data.results)
}