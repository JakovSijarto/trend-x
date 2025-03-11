<template>
  <div class="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105">
    <RouterLink :to="`/product/${product.id}`">
      <img :src="product.images[0]" :alt="product.name" class="w-full h-48 object-cover rounded-md mb-4">
      <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
      <div class="flex items-center mb-2">
        <StarIcon class="h-5 w-5 text-yellow-400" />
        <span class="ml-1">{{ product.rating }}/5</span>
      </div>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold">{{ product.price }} €</span>
        <button class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Kupi Odmah
        </button>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>