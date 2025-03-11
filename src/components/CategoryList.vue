<script setup lang="ts">
import { useProductStore } from '../stores/products'
import { ref } from 'vue'

const store = useProductStore()
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectCategory = (category: string) => {
  store.setSearchQuery(category)
  isOpen.value = false
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="relative">
      <button 
        @click="toggleDropdown"
        class="w-full flex items-center justify-between px-4 py-2 text-xl font-semibold bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
      >
        <span>Kategorije</span>
        <svg 
          class="w-5 h-5 transition-transform"
          :class="{ 'transform rotate-180': isOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div 
        v-if="isOpen"
        class="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg"
      >
        <button 
          @click="selectCategory('')"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          Sve
        </button>
        <button 
          v-for="category in store.categories" 
          :key="category"
          @click="selectCategory(category)"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          {{ category }}
        </button>
      </div>
    </div>
  </div>
</template>