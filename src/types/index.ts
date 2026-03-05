export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
}

export interface CartItem {
    product: Product
    quantity: number
}

export type CreateProductBody = Omit<Product, 'id'>;
 
export const QuantityActions = {
  increment: 'increment',
  decrement: 'decrement',
} as const;
export type QuantityAction = (typeof QuantityActions)[keyof typeof QuantityActions];

export type ShippingForm = {
  city: string
  street: string
  postalCode: string
}
