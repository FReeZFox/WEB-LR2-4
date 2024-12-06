import {$authHost} from "./index";

export const addToCart = async (bookId) => {
    const {data} = await $authHost.post('api/cart', bookId)
    return data
}

export const getCart = async () => {
    const {data} = await $authHost.get('api/cart')
    return data
}

export const deleteFromCart = async (id) => {
    const {data} = await $authHost.delete('/api/cart/' + id)
    return data
}

export const purchaseCart = async () => {
    const { data } = await $authHost.post('api/cart/purchase'); 
    return data;
};

export const fetchPurchases = async () => {
    const { data } = await $authHost.get('api/purchases'); 
    return data;
};