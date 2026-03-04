<script setup lang="ts">
import CartItem from './CartItem.vue'
</script>

<template>
  <div>

    <!-- Table header: hidden on mobile, visible on desktop -->
    <div class="hidden sm:grid sm:cart-grid pb-4 border-b-2 border-gray-200">
      <span class="text-sm font-bold text-brand-blue">Product</span>
      <span class="text-sm font-bold text-brand-blue">Price</span>
      <span class="text-sm font-bold text-brand-blue">Quantity</span>
      <span class="text-sm font-bold text-brand-blue">Total</span>
    </div>

    <!-- Cart items -->
    <CartItem />

    <!-- Action buttons -->
    <div class="flex items-center justify-between mt-6">
      <button class="px-6 py-2.5 bg-brand-green text-white text-sm font-medium rounded hover:opacity-90 transition-opacity">
        Add Item
      </button>
      <button class="px-6 py-2.5 bg-brand-pink text-white text-sm font-medium rounded hover:opacity-90 transition-opacity">
        Clear Cart
      </button>
    </div>

  </div>
</template>

<style scoped></style>
