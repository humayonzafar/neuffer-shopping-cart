<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col sm:grid sm:cart-grid sm:items-center py-5 border-b border-gray-200 last:border-b-0">

    <!-- Column 1: Product image + info -->
    <div class="flex items-center gap-4 mb-3 sm:mb-0 sm:pr-4">
      <div class="relative shrink-0">
        <div class="w-18 h-18 bg-gray-200 rounded-sm"></div>
         <img class="absolute -top-2 -left-2 w-5 h-5 " src="/images/icons/remove.svg" alt="rempve" width="24" height="24" />
      </div>
      <div>
        <p class="text-sm font-medium text-gray-800">Ut diam consequat</p>
        <p class="text-xs text-gray-400 mt-1">Color: Brown</p>
        <p class="text-xs text-gray-400">Size: XL</p>
      </div>
    </div>

    <!-- Columns 2–4 wrapper -->
    <div class="flex items-center justify-between pl-22 sm:pl-0 sm:contents">

      <!-- Price -->
      <div class="text-sm text-gray-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Price:</span>
        $32.00
      </div>

      <!-- Quantity control -->
      <div class="flex items-center gap-2">
        <span class="sm:hidden text-xs text-gray-400">Qty:</span>
        <div class="flex items-center">
          <button class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">−</button>
          <span class="w-9 h-7 border-y border-gray-300 flex items-center justify-center text-sm font-medium">1</span>
          <button class="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">+</button>
        </div>
      </div>

      <!-- Total -->
      <div class="text-sm text-gray-700">
        <span class="sm:hidden text-xs text-gray-400 mr-1">Total:</span>
        £219.00
      </div>

    </div>
  </div>
</template>

<style scoped></style>
