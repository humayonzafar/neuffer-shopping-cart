<script setup lang="ts">
import CartItem from './CartItem.vue';
import { useCartStore } from '../stores/cartStore';
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useCartStore();
const { fetchCartItems, createCartItem, clearCart } = store;
const { cartItems, isCartEmpty, isAddingItem, isCartChecedkOut } = storeToRefs(store);

onMounted(() => {
  fetchCartItems();
});

const addItemText = computed(() => {
  return isAddingItem.value ? 'Adding...' : 'Add Item';
});

</script>

<template>
  <div>

    <div class="hidden sm:grid sm:cart-grid pb-4 border-b-2 border-gray-200">
      <span class="section-heading">Product</span>
      <span class="section-heading">Price</span>
      <span class="section-heading">Quantity</span>
      <span class="section-heading">Total</span>
    </div>

    <CartItem v-for="cartItem in cartItems" :key="cartItem.product.id" :cart-item=cartItem />
    <p v-if="isCartEmpty" class="flex justify-center mt-6"> Cart is empty...!</p>

    <div class="flex items-center justify-between mt-6">
      <button
        class="px-10 py-2.5 bg-brand-green text-white font-semibold rounded hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isAddingItem || isCartChecedkOut" @click="createCartItem">
        {{ addItemText }}
      </button>
      <button
        class="px-10 py-2.5 bg-brand-pink text-white font-semibold rounded hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isCartEmpty || isCartChecedkOut" @click="clearCart">
        Clear Cart
      </button>
    </div>

  </div>
</template>

<style scoped></style>
