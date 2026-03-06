<script setup lang="ts">
import CartItemList from './components/CartItemList.vue';
import CartSummary from './components/CartSummary.vue';
import ShippingCalculator from './components/ShippingCalculator.vue';

</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
        <section>
          <CartItemList />
        </section>

        <aside class="flex flex-col gap-6">
          <CartSummary />
          <ShippingCalculator />
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped></style>