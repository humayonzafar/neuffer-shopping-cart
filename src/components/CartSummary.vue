<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils';
import { computed } from 'vue';

const store = useCartStore();
const { subTotal, vat, shipping, cartTotal, isCartCheckedOut } = storeToRefs(store);
const { onCheckout } = store;

const isProccedToCheckOutDisabled = computed(() => {
  return !subTotal.value || !shipping.value;
});

</script>

<template>
  <div class="font-lato">
    <h2 class="section-heading text-center mb-4">
      Cart Totals
    </h2>
    <div class="bg-card-bg rounded p-5 space-y-4">
      <div class="flex justify-between items-center border-b-2 border-slate-200 pb-2 flex-wrap gap-2">
        <span class="text-lg text-navy-600 font-semibold">Subtotals:</span>
        <span class="font-medium text-navy-700">{{ formatPrice(subTotal) }}</span>
      </div>

      <div class="flex justify-between items-center border-b-2 border-slate-200 pb-2 flex-wrap gap-2">
        <span class="text-lg text-navy-600 font-semibold">Shipping</span>
        <span class="font-medium text-navy-700">{{ formatPrice(shipping) }}</span>
      </div>

      <div class="flex justify-between items-center border-b-2 border-slate-200 pb-2 flex-wrap gap-2">
        <span class="text-lg text-navy-600 font-semibold">Tax (20%)</span>
        <span class="font-medium text-navy-700">{{ formatPrice(vat) }}</span>
      </div>

      <div class="flex justify-between items-center border-b-2 border-slate-200 pb-2 mt-10 flex-wrap gap-2">
        <span class="text-lg font-medium text-navy-600 ">Totals:</span>
        <span class="text-navy-700">{{ formatPrice(cartTotal) }}</span>
      </div>

      <p
        v-if="isCartCheckedOut"
        data-testid="checkout-success-message"
        class="text-center text-brand-green font-semibold py-3"
      >
        Order placed successfully!
      </p>
      <button
        v-else 
        data-testid="btn-checkout"
        class="w-full py-3 bg-brand-green border-t border-slate-200 text-white text-sm rounded hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        :disabled="isProccedToCheckOutDisabled"
        @click="onCheckout"
      >
        Proceed To Checkout
      </button>
      <p
        v-if="!shipping && subTotal"
        class="text-xs text-center text-brand-pink -mt-2"
      >
        Please add shipping address to proceed.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
