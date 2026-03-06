import { mount } from '@vue/test-utils';
import { createPinia, type Pinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import CartSummary from './CartSummary.vue';
import { useCartStore } from '../stores/cartStore';
import { makeCartItem } from '../tests/fixtures';

describe('CartSummary', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
  })

  function mountCartSummary() {
    return mount(CartSummary, {
      global: {
        plugins: [pinia],
      },
    })
  }

  it('checkout button is disabled when cart is empty', () => {
    const wrapper = mountCartSummary()

    expect(wrapper.find('[data-testid="btn-checkout"]').attributes('disabled')).toBeDefined()
  })

  it('checkout button is disabled when shipping is not set', () => {
    const store = useCartStore(pinia);
    store.cartItems = [makeCartItem()];
    const wrapper = mountCartSummary();

    expect(wrapper.find('[data-testid="btn-checkout"]').attributes('disabled')).toBeDefined()
  })

  it('checkout button is enabled when cart has items and shipping is set', () => {
    const store = useCartStore(pinia);
    store.cartItems = [makeCartItem()];
    store.shipping = 5;
    const wrapper = mountCartSummary();

    expect(wrapper.find('[data-testid="btn-checkout"]').attributes('disabled')).toBeUndefined()
  })

  it('shows success message after checkout', async () => {
    const store = useCartStore(pinia);
    store.cartItems = [makeCartItem()];
    store.shipping = 5;
    const wrapper = mountCartSummary();
    await wrapper.find('[data-testid="btn-checkout"]').trigger('click');

    expect( wrapper.find('[data-testid="checkout-success-message"]').exists()).toBe(true);
  })

  it('hides checkout button after successful checkout', async () => {
    const store = useCartStore(pinia);
    store.cartItems = [makeCartItem()];
    store.shipping = 5;
    const wrapper = mountCartSummary();
    await wrapper.find('[data-testid="btn-checkout"]').trigger('click');

    expect(wrapper.find('[data-testid="btn-checkout"]').exists()).toBe(false);
  })
})