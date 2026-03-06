import { mount } from '@vue/test-utils';
import { createPinia, type Pinia } from 'pinia';
import { nextTick } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.vue';
import { useCartStore } from '../stores/cartStore';
import { makeCartItem } from './fixtures';

describe('app cart flow', () => {
    let pinia: Pinia;

    beforeEach(() => {
        pinia = createPinia();
    });

    const mountApp = () => {
        const store = useCartStore(pinia);
        vi.spyOn(store, 'fetchCartItems').mockResolvedValue();
        const wrapper = mount(App,
            {
                global:
                {
                    plugins: [pinia]
                }
            });

        return { wrapper, store };
    };

    it('checkout button is disabled until shipping is calculated', async () => {
        const { wrapper, store } = mountApp();
        store.cartItems = [makeCartItem(1, 10, 1)];
        await nextTick();

        expect(wrapper.find('[data-testid="btn-checkout"]').attributes('disabled')).toBeDefined();

        await wrapper.find('[name="city"]').setValue('Berlin');
        await wrapper.find('[name="street"]').setValue('Ostseestraße 79');
        await wrapper.find('[name="postalcode"]').setValue('10409');
        await wrapper.find('[data-testid="btn-calculate-shipping"]').trigger('click');
        await nextTick();

        expect(wrapper.find('[data-testid="btn-checkout"]').attributes('disabled')).toBeUndefined();
    });

    it('completing checkout shows success message and clears cart', async () => {
        const { wrapper, store } = mountApp();
        store.cartItems = [makeCartItem(1, 10, 1)];
        store.shipping = 5;
        await nextTick();

        await wrapper.find('[data-testid="btn-checkout"]').trigger('click');

        expect(wrapper.find('[data-testid="checkout-success-message"]').exists()).toBe(true);
        expect(store.cartItems).toHaveLength(0);
    });

});
