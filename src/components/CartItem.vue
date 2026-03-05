<script setup lang="ts">
import { computed } from 'vue';
import { QuantityActions } from "../types";
import type { CartItem, QuantityAction } from '../types';
import { formatPrice } from '../utils';
import closeIcon from '@/assets/icons/close.svg'
import { useCartStore } from '../stores/cartStore';

const { cartItem } = defineProps<{
  cartItem: CartItem
}>();
const { deleteCartItem } = useCartStore();
const updateCartItemQuantity = (action: QuantityAction): void => {
  if (action === QuantityActions.decrement && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  } else if (action === QuantityActions.increment && cartItem.quantity < 999) {
    cartItem.quantity += 1;
  }
}

const cartItemTotal = computed((): string => {
  return formatPrice(cartItem.product.price * cartItem.quantity);
});

</script>

<template>
  <div class="flex flex-col sm:grid sm:cart-grid sm:items-center py-5 border-b border-gray-200 last:border-b-0">

    <div class="flex items-center gap-4 mb-3 sm:mb-0 sm:pr-4">
      <div class="relative shrink-0">
        <img class="w-18 h-18 rounded-sm" :src="cartItem.product.image" alt="product_image" />
        <button @click="deleteCartItem(cartItem.product.id)">
          <img :src="closeIcon" class="absolute -top-2 -right-2 w-3 h-3 cursor-pointer" alt="remove" />
        </button>
      </div>
      <div>
        <p class="text-sm">{{ cartItem.product.title }}</p>
        <p class="text-xs text-gray-400 mt-1">Color: Brown</p>
        <p class="text-xs text-gray-400">Size: XL</p>
      </div>
    </div>

    <div class="flex items-center justify-between pl-22 sm:pl-0 sm:contents">

      <div class="text-sm text-navy-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Price:</span>
        {{ formatPrice(cartItem.product.price) }}
      </div>

      <div class="flex items-center gap-2">
        <span class="sm:hidden text-xs text-gray-400">Qty:</span>
        <div class="flex items-center">
          <button
            class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="cartItem.quantity <= 1" @click="updateCartItemQuantity(QuantityActions.decrement)">−</button>
          <span
            class="w-9 h-7 border-y border-gray-300 flex items-center justify-center text-sm font-medium text-navy-700">
            {{ cartItem.quantity }}
          </span>
          <button
            class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            @click="updateCartItemQuantity(QuantityActions.increment)">+</button>
        </div>
      </div>

      <div class="text-sm text-navy-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Total:</span>
        {{ cartItemTotal }}
      </div>

    </div>
  </div>
</template>

<style scoped></style>
