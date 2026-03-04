import type { Product, CreateProductBody } from "../types";
import client from "./client";

export const fetchProducts = async (limit = 5): Promise<Product[]> => {
    return client.get<Product[]>(`/products?limit=${limit}`);
}

export const createProduct = async (body: CreateProductBody): Promise<Product> => {
    return await client.post<Product, CreateProductBody>('/products', body);
}

