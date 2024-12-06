import {$authHost} from "./index";

export const createGenre = async (genre) => {
    const {data} = await $authHost.post('api/genre', genre)
    return data
}

export const createPublisher = async (publisher) => {
    const {data} = await $authHost.post('api/publisher', publisher)
    return data
}

export const createBook = async (book) => {
    const {data} = await $authHost.post('api/book', book)
    return data
}

export const deleteBook = async (id) => {
    const { data } = await $authHost.delete('api/book/' + id); 
    return data;
};

export const deleteGenre = async (id) => {
    const { data } = await $authHost.delete('api/genre/' + id);
    return data;
};

export const deletePublisher = async (id) => {
    const { data } = await $authHost.delete('api/publisher/' + id);
    return data;
};