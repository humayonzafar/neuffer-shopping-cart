import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useShipping } from './useShipping';
import { useCartStore } from '../stores/cartStore';
import { makeCartItem } from '../tests/fixtures';
import type { ShippingForm } from '../types';

const filledForm: ShippingForm = { city: 'Berlin', street: 'Main St', postalCode: '10409' };

describe('useShipping', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    const setup = ({
        hasCartItems = false,
        isCheckedOut = false,
        formValues,
    }: {
        hasCartItems?: boolean;
        isCheckedOut?: boolean;
        formValues?: ShippingForm;
    } = {}) => {
        const store = useCartStore();
        if (hasCartItems) {
            store.cartItems = [makeCartItem()];
        }
        store.isCartCheckedOut = isCheckedOut;
        const shipping = useShipping();
        if (formValues) {
            shipping.form.value = { ...formValues };
        }

        return { store, ...shipping };
    };

    it('is disabled when form fields are empty', () => {
        const { isCalculateShippingButtonDisabled } = setup({ hasCartItems: true });

        expect(isCalculateShippingButtonDisabled.value).toBe(true);
    });

    it('is disabled when cart is empty even with form filled', () => {
        const { isCalculateShippingButtonDisabled } = setup({ formValues: filledForm });

        expect(isCalculateShippingButtonDisabled.value).toBe(true);
    });

    it('is disabled when already checked out', () => {
        const { isCalculateShippingButtonDisabled } = setup({ hasCartItems: true, isCheckedOut: true, formValues: filledForm });

        expect(isCalculateShippingButtonDisabled.value).toBe(true);
    });

    it('is disabled when form is unchanged after calculation', () => {
        const { isCalculateShippingButtonDisabled, calculateShipping } = setup({ hasCartItems: true, formValues: filledForm });
        calculateShipping();

        expect(isCalculateShippingButtonDisabled.value).toBe(true);
    });

    it('is enabled again when form changes after calculation', () => {
        const { form, isCalculateShippingButtonDisabled, calculateShipping } = setup({ hasCartItems: true, formValues: filledForm });
        calculateShipping();
        form.value.city = 'Hamburg';

        expect(isCalculateShippingButtonDisabled.value).toBe(false);
    });

    it('calculateShipping sets a non-zero shipping value', () => {
        const { store, calculateShipping } = setup({ hasCartItems: true, formValues: filledForm });
        calculateShipping();

        expect(store.shipping).toBeGreaterThan(0);
    });
});
