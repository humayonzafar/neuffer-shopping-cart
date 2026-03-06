import { mount } from '@vue/test-utils';
import { createPinia, type Pinia } from 'pinia';
import { nextTick } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CartItemList from './CartItemList.vue';
import CartItem from './CartItem.vue';
import { useCartStore } from '../stores/cartStore';
import { makeCartItem } from '../tests/fixtures';

describe('CartItemList', () => {
    let pinia: Pinia;

    beforeEach(() => {
        pinia = createPinia();
    });

    const mountCartItemList = () => {
        const store = useCartStore(pinia);
        vi.spyOn(store, 'fetchCartItems').mockResolvedValue();
        const wrapper = mount(CartItemList, {
            global: {
                plugins: [pinia]
            },
        });

        return { wrapper, store };
    };

    it('shows empty cart message when cart is empty', () => {
        const { wrapper } = mountCartItemList();

        expect(wrapper.find('[data-testid="empty-cart-message"]').exists()).toBe(true);
    });

    it('renders a CartItem for each item in the store', async () => {
        const { wrapper, store } = mountCartItemList();
        store.cartItems = [makeCartItem(1), makeCartItem(2)];
        await nextTick();

        expect(wrapper.findAllComponents(CartItem)).toHaveLength(2);
    });

    it('"Clear Cart" button is disabled when cart is empty', () => {
        const { wrapper } = mountCartItemList();

        expect(wrapper.find('[data-testid="btn-clear-cart"]').attributes('disabled')).toBeDefined();
    });

    it('clicking "Clear Cart" empties the cart', async () => {
        const { wrapper, store } = mountCartItemList();
        store.cartItems = [makeCartItem(1), makeCartItem(2)];
        await nextTick();
        await wrapper.find('[data-testid="btn-clear-cart"]').trigger('click');

        expect(store.cartItems).toHaveLength(0);
    });

    it('clicking "Add Item" calls createCartItem', async () => {
        const store = useCartStore(pinia);
        vi.spyOn(store, 'fetchCartItems').mockResolvedValue();
        const spy = vi.spyOn(store, 'createCartItem').mockResolvedValue();
        const wrapper = mount(CartItemList, { global: { plugins: [pinia] } });
        await wrapper.find('[data-testid="btn-add-item"]').trigger('click');

        expect(spy).toHaveBeenCalledOnce();
    });

});
