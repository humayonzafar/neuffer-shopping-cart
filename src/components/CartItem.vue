<script setup lang="ts">
import { computed } from 'vue';
import { QuantityActions } from "../types";
import type { CartItem } from '../types';
import { formatPrice } from '../utils';
import closeIcon from '@/assets/icons/close.svg'
import { useCartStore } from '../stores/cartStore';

const props = defineProps<{
  cartItem: CartItem
}>();

const { deleteCartItem, updateCartItemQuantity } = useCartStore();

const cartItemTotal = computed((): string => {
  return formatPrice(props.cartItem.product.price * props.cartItem.quantity);
});

</script>

<template>
  <div class="flex flex-col sm:grid sm:cart-grid sm:items-center py-5 border-b border-gray-200 last:border-b-0">
    <div class="flex items-center gap-4 mb-3 sm:mb-0 sm:pr-4">
      <div class="relative shrink-0">
        <img
          class="w-18 h-18 rounded-sm"
          :src="props.cartItem.product.image"
          alt="product_image"
        >
        <button
          data-testid="btn-delete"
          @click="deleteCartItem(props.cartItem.product.id)"
        >
          <img
            :src="closeIcon"
            class="absolute -top-2 -right-2 w-3 h-3 cursor-pointer"
            alt="remove"
          >
        </button>
      </div>
      <div>
        <p class="text-sm">
          {{ props.cartItem.product.title }}
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Color: Brown
        </p>
        <p class="text-xs text-gray-400">
          Size: XL
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between pl-22 sm:pl-0 sm:contents flex-wrap gap-2">
      <div class="text-sm text-navy-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Price:</span>
        {{ formatPrice(props.cartItem.product.price) }}
      </div>

      <div class="flex items-center gap-2">
        <span class="sm:hidden text-xs text-gray-400">Qty:</span>
        <div class="flex items-center">
          <button
            class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="props.cartItem.quantity <= 1"
            data-testid="btn-decrement"
            @click="updateCartItemQuantity(props.cartItem.product.id, QuantityActions.decrement)"
          >
            −
          </button>
          <span
            data-testid="quantity-display"
            class="w-9 h-7 border-y border-gray-300 flex items-center justify-center text-sm font-medium text-navy-700"
          >
            {{ props.cartItem.quantity }}
          </span>
          <button
            class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            data-testid="btn-increment"
            @click="updateCartItemQuantity(props.cartItem.product.id, QuantityActions.increment)"
          >
            +
          </button>
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
