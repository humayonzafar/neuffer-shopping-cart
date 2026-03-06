import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchProducts, createProduct } from '../api/products';
import type { CartItem, Product, QuantityAction } from '../types';
import { QuantityActions } from '../types';

export const useCartStore = defineStore('cart', () => {

    // state
    const cartItems = ref<CartItem[]>([]);
    const shipping = ref(0);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const isAddingItem = ref(false);
    const isCartCheckedOut = ref(false);

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
    const isCartEmpty = computed((): boolean => {
        return !cartItems.value.length;
    });

    // actions
    const fetchCartItems = async () => {
        try {
            const data = await fetchProducts() ?? [];
            cartItems.value = data?.map((product): CartItem => {
                return { product, quantity: 1 };
            });
        } catch {
            error.value = 'Failed to fetch';
        } finally {
            loading.value = false;
        }
    };
    const createCartItem = async () => {
        isAddingItem.value = true;
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay timer to stop repeated inserts
            const data: Product = await createProduct(
                {
                    title: 'Ut diam consequat',
                    price: Math.floor(Math.random() * 100) + 1,
                    category: 'XL',
                    description: 'none',
                    image: Math.floor(Math.random() * 2) === 1 ? '/images/bag.png' : '/images/braclet.png'
                }
            );
            data.id = Date.now(); // just generating unique id for each product as api doesn't return it
            cartItems.value.push({ product: data, quantity: 1 });
        } catch {
            error.value = 'Failed to create';
        } finally {
            isAddingItem.value = false;
        }
    }
    const updateCartItemQuantity = (id: number, action: QuantityAction): void => {
        const item = cartItems.value.find(item => item.product.id === id);
        if (!item) {
            return;
        }
        if (action === QuantityActions.decrement && item.quantity > 1) {
            item.quantity -= 1;
        } else if (action === QuantityActions.increment && item.quantity < 99) {
            item.quantity += 1;
        }
    }
    const deleteCartItem = (id: number) => {
        cartItems.value = cartItems.value.filter(item =>
            item.product.id !== id
        )
    }
    const clearCart = (): void => {
        cartItems.value = [];
    }
    const onCheckout = (): void => {
        isCartCheckedOut.value = true;
        clearCart();
    }

    return {
        cartItems, fetchCartItems, createCartItem, deleteCartItem, updateCartItemQuantity, clearCart, onCheckout, isCartCheckedOut,
        subTotal, shipping, vat, cartTotal,
        isCartEmpty, isAddingItem
    };

})