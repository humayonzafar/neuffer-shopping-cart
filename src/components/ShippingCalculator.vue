<script setup lang="ts">
import { useShipping } from '../composables/useShipping';

const { form, isCalculateShippingButtonDisabled , calculateShipping } = useShipping();
</script>

<template>
  <div class="font-lato">
    <h2 class="section-heading text-center mb-4">Calculate Shipping</h2>

    <div class="bg-card-bg rounded p-5 space-y-5">
      <div class="border-b-2  border-navy-500 transition-colors mx-2">
        <input v-model.trim="form.city" type="text" placeholder="Berlin"  name="city"
          class="w-full bg-transparent text-sm text-navy-600 py-1.5 outline-none placeholder:text-input-placeholder font-semibold" />
      </div>

      <div class="border-b-2 border-navy-500 transition-colors mx-2">
        <input v-model.trim="form.street" type="text" placeholder="Ostseestraße 79" name="street"
          class="w-full bg-transparent text-sm text-navy-600 py-1.5 outline-none placeholder:text-input-placeholder font-semibold" />
      </div>

      <div class="border-b-2 border-navy-500 transition-colors mx-2">
        <input v-model.trim="form.postalCode" type="text" placeholder="10409"  name="postalcode"
          class="w-full bg-transparent text-sm text-navy-600 py-1.5 outline-none placeholder:text-input-placeholder font-semibold" />
      </div>

      <button @click="calculateShipping" :disabled="isCalculateShippingButtonDisabled"
        class="px-6 py-2.5 bg-brand-pink text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded hover:opacity-90 transition-opacity">
        Calculate Shipping
      </button>

    </div>
  </div>
</template>

<style scoped></style>
