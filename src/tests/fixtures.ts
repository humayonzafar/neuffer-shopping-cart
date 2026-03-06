import type { CartItem } from '../types';

export const makeCartItem = (id = 1, price = 10, quantity = 1): CartItem => ({
    product: { id, title: 'Test Product', price, description: '', category: '', image: '' },
    quantity,
});
