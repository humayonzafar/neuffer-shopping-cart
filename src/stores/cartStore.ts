import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchProducts, createProduct } from '../api/products';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', () => {

    // state
    const cartItems = ref<CartItem[]>([]);
    const shipping = ref<number>(100);
    const loading = ref(true);
    const error = ref<string | null>(null);

    // getters
    const subTotal = computed((): number => {
        return cartItems.value.reduce((total, item): number => {
            total = total + (item.product.price * item.quantity);
            return total;
        }, 0);
    });
    const vat = computed((): number => {
        return subTotal.value * 0.2; 
    });
    const cartTotal = computed((): number => {
        return subTotal.value + shipping.value + vat.value; 
    });

     // actions
    const fetchCartItems = async () => {
        try {
            const data: Product[] = await fetchProducts();
            cartItems.value = data?.map((product): CartItem => {
                return { product, quantity: 1 };
            });
        } catch (e) {
            error.value = 'Failed to fetch';
        } finally {
            loading.value = false;
        }
    };

    const createCartItem = async () => {
        try {
            const data: Product = await createProduct({ title: '1', price: 100 });
            console.log(data);
        } catch (e) {
            error.value = 'Failed to create';
        } finally {
            loading.value = false;
        }
    };

    const clearCart = (): void => {
        cartItems.value = [];
    }


    return { cartItems, fetchCartItems, createCartItem, clearCart, subTotal, vat, cartTotal };

})