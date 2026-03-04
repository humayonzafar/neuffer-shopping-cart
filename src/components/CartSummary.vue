<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils';

const store = useCartStore();
const { subTotal, vat, cartTotal } = storeToRefs(store);

</script>

<template>
  <div>

    <h2 class="text-lg font-bold text-brand-blue text-center mb-4">Cart Totals</h2>

    <div class="bg-slate-50 rounded p-5 space-y-4">

      <!-- Subtotals -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Subtotals:</span>
        <span class="text-sm font-medium text-gray-800">{{formatPrice(subTotal)}}</span>
      </div>

      <!-- Shipping -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-blue-500 font-medium">Shipping</span>
        <span class="text-sm font-medium text-gray-800">£100.00</span>
      </div>

      <!-- Tax -->
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Tax (20%)</span>
        <span class="text-sm font-medium text-gray-800">{{formatPrice(vat)}}</span>
      </div>

      <!-- Divider + Total -->
      <div class="border-t border-gray-200 pt-4 flex justify-between items-center">
        <span class="text-sm font-semibold text-gray-700">Totals:</span>
        <span class="text-base font-bold text-gray-900">{{formatPrice(cartTotal)}}</span>
      </div>

      <!-- Checkout button -->
      <button class="w-full py-3 bg-brand-green text-white text-sm font-medium rounded hover:opacity-90 transition-opacity">
        Proceed To Checkout
      </button>

    </div>
  </div>
</template>

<style scoped></style>
