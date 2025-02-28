import axios from "axios";

export const api_url = import.meta.env.VITE_API_URL + '/' + import.meta.env.VITE_API_VERSION;

/**
 *
 * @param {trendingType} type
 * @param time_window
 * @param language
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getTrending = async (type, time_window = "day", language = 'en-US') => {
    return await axios.get(`${api_url}/trending/${type}/${time_window}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`,
        },
        params: {
            language: language
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
    return await axios.get(`${api_url}/genre/${type}/list`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`,
        },
        params: {
            language: language
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
    return await axios.get(`${api_url}/discover/${type}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY_READ}`,
        },
        params: {
            ...options,
            language,
            page,
        }
    })
}