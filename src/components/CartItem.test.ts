import { mount } from '@vue/test-utils';
import { createPinia, type Pinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import CartItem from './CartItem.vue';
import { makeCartItem } from '../tests/fixtures'
import { useCartStore } from '../stores/cartStore';

describe('CartItem', () => {
    let pinia: Pinia;

    beforeEach(() => {
        pinia = createPinia()
    })

    const mountCartItem = (quantity = 1) => {
        const store = useCartStore(pinia);
        store.cartItems = [makeCartItem(1, 10, quantity)];
        return mount(CartItem, {
            props: {
                cartItem: store.cartItems[0]!,
            },
            global: {
                plugins: [pinia],
            },
        })
    }

    it('clicking + increments quantity display', async () => {
        const wrapper = mountCartItem(1);
        await wrapper.find('[data-testid="btn-increment"]').trigger('click');

        expect(wrapper.find('[data-testid="quantity-display"]').text()).toBe('2');
    })

    it('clicking - decrements quantity display', async () => {
        const wrapper = mountCartItem(3);
        await wrapper.find('[data-testid="btn-decrement"]').trigger('click');

        expect(wrapper.find('[data-testid="quantity-display"]').text()).toBe('2');
    })

    it('decrement button is disabled when quantity is 1', () => {
        const wrapper = mountCartItem(1);

        expect(wrapper.find('[data-testid="btn-decrement"]').attributes('disabled')).toBeDefined();
    })

    it('decrement does not go below 1', async () => {
        const wrapper = mountCartItem(1);
        await wrapper.find('[data-testid="btn-decrement"]').trigger('click');

        expect(wrapper.find('[data-testid="quantity-display"]').text()).toBe('1');
    })
})