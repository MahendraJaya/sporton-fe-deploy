import { fetchApi } from "../lib/api"
import { Product } from "../types"

export const getAllProducts = async ():Promise<Product[]> => {
    return await fetchApi<Product[]>('/products');
}

export const getDetailProduct = async (id:string):Promise<Product> => {
    return await fetchApi<Product>(`/products/${id}`);
}