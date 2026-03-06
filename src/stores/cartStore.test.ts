import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cartStore';
import { makeCartItem } from '../tests/fixtures';
import type { CartItem } from '../types';

describe('cartStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    const setup = () => {
        const store = useCartStore();
        const seedCart = (...items: CartItem[]) => {
            store.cartItems = items;
        };

        return { store, seedCart }
    }

    describe('getters', () => {
        it('subTotal is 0 when cart is empty', () => {
            const { store } = setup();

            expect(store.subTotal).toBe(0);
        });

        it('vat is 20% of subTotal', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 100, 1));

            expect(store.vat).toBe(20);
        });

        it('subTotal sums price * quantity across all items', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 10, 2), makeCartItem(2, 5, 3));

            expect(store.subTotal).toBe(35);
        });

        it('cartTotal is subTotal + shipping + vat', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 100, 1));
            store.shipping = 10;

            expect(store.cartTotal).toBe(130);
        });

        it('isCartEmpty is true when no items', () => {
            const { store } = setup();

            expect(store.isCartEmpty).toBe(true);
        });

        it('isCartEmpty is false when items exist', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 10, 1));

            expect(store.isCartEmpty).toBe(false);
        });
    });

    describe('actions', () => {
        it('deleteCartItem removes the correct item', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 10, 1), makeCartItem(2, 20, 1));
            store.deleteCartItem(1);
            const [remaining] = store.cartItems;

            expect(store.cartItems).toHaveLength(1);
            expect(remaining?.product.id).toBe(2);
        });

        it('clearCart empties the cart', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 10, 1), makeCartItem(2, 20, 1));
            store.clearCart();

            expect(store.cartItems).toHaveLength(0);
        });

        it('onCheckout sets isCartCheckedOut to true', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 10, 1));
            store.onCheckout();

            expect(store.isCartCheckedOut).toBe(true);
        });

        it('onCheckout clears the cart', () => {
            const { store, seedCart } = setup();
            seedCart(makeCartItem(1, 10, 1));
            store.onCheckout();

            expect(store.cartItems).toHaveLength(0);
        });
    });
});
