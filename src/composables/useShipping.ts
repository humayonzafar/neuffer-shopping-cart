import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'
import type { ShippingForm } from '../types'

const INITIAL_FORM: ShippingForm = { city: '', street: '', postalCode: '' };

export function useShipping() {
    const { shipping, isCartEmpty, isCartChecedkOut } = storeToRefs(useCartStore());
    const form = ref<ShippingForm>({ ...INITIAL_FORM });
    const lastCalculated = ref<ShippingForm | null>(null);
    const isFormInvalid = computed((): boolean =>
        !form.value.city.trim() ||
        !form.value.street.trim() ||
        !form.value.postalCode.trim()
    );
    const isCalculateShippingButtonDisabled = computed((): boolean => {
        if (isFormInvalid.value || isCartEmpty.value || isCartChecedkOut.value) {
            return true;  // if any form field is empty or cart is empty disable shipping button
        }
        if (!lastCalculated.value) {
            return false;    // if calculating for first time no need to compare and no need to disable
        }

        return (
            form.value.city === lastCalculated.value.city &&
            form.value.street === lastCalculated.value.street &&
            form.value.postalCode === lastCalculated.value.postalCode
        )
    })
    const calculateShipping = (): void => {
        shipping.value = Math.floor(Math.random() * 100) + 1;
        lastCalculated.value = { ...form.value }
    }
    const resetForm = () => {
        form.value = { ...INITIAL_FORM };
        shipping.value = 0;
        lastCalculated.value = null;
    }

    watch(isCartEmpty, () => {
        if (isCartEmpty.value) {
            resetForm();
        }
    });

    return { form, isCalculateShippingButtonDisabled, calculateShipping, isCartChecedkOut }
}
