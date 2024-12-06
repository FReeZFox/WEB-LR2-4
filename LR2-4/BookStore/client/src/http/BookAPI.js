import {$host} from "./index";

export const fetchGenres = async () => {
    const {data} = await $host.get('api/genre')
    return data
}

export const fetchPublishers = async () => {
    const {data} = await $host.get('api/publisher', )
    return data
}

export const fetchBooks = async (genreId, publisherId) => {
    const {data} = await $host.get('api/book', {params: {genreId, publisherId}})
    return data
}

export const fetchOneBook = async (id) => {
    const {data} = await $host.get('api/book/' + id)
    return data
}



