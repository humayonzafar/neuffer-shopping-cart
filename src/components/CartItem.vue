<script setup lang="ts">
import { computed } from 'vue';
import { QuantityActions } from "../types";
import type { CartItem, QuantityAction } from '../types';
import { formatPrice } from '../utils';
import closeIcon from '@/assets/icons/close.svg'

const { cartItem } = defineProps<{
  cartItem: CartItem
}>();

const updateCartItemQuantity = (action: QuantityAction) => {
  cartItem.quantity = action === QuantityActions.increment ?
    cartItem.quantity + 1 :
    cartItem.quantity - 1;
}
const cartItemTotal = computed(() => {
  return formatPrice(cartItem.product.price * cartItem.quantity);
});

</script>

<template>
  <div class="flex flex-col sm:grid sm:cart-grid sm:items-center py-5 border-b border-gray-200 last:border-b-0">

    <!-- Column 1: Product image + info -->
    <div class="flex items-center gap-4 mb-3 sm:mb-0 sm:pr-4">
      <div class="relative shrink-0">
        <img class="w-18 h-18 rounded-sm" :src="cartItem.product.image" alt="product_image" />
        <img :src="closeIcon" class="absolute -top-2 -right-2 w-3 h-3" alt="remove" />
      </div>
      <div>
        <p class="text-sm font-medium text-gray-800">{{ cartItem.product.title }}</p>
        <p class="text-xs text-gray-400 mt-1">Color: Brown</p>
        <p class="text-xs text-gray-400">Size: XL</p>
      </div>
    </div>

    <!-- Columns 2–4 wrapper -->
    <div class="flex items-center justify-between pl-22 sm:pl-0 sm:contents">

      <!-- Price -->
      <div class="text-sm text-gray-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Price:</span>
        {{ formatPrice(cartItem.product.price) }}
      </div>

      <!-- Quantity control -->
      <div class="flex items-center gap-2">
        <span class="sm:hidden text-xs text-gray-400">Qty:</span>
        <div class="flex items-center">
          <button
            class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            :disabled="cartItem.quantity <= 1" @click="updateCartItemQuantity(QuantityActions.decrement)">−</button>
          <span class="w-9 h-7 border-y border-gray-300 flex items-center justify-center text-sm font-medium">{{
            cartItem.quantity }}</span>
          <button
            class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            @click="updateCartItemQuantity(QuantityActions.increment)">+</button>
        </div>
      </div>

      <!-- Total -->
      <div class="text-sm text-gray-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Total:</span>
        {{ cartItemTotal }}
      </div>

    </div>
  </div>
</template>

<style scoped></style>
