<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const cartStore = useCartStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="bg-black text-white py-4">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold">LOGO</RouterLink>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-6">
        <RouterLink to="/" class="hover:text-gray-300">Početna</RouterLink>
        <RouterLink to="/contact" class="hover:text-gray-300">Kontakt</RouterLink>
        <RouterLink to="/cart" class="relative hover:text-gray-300">
          <ShoppingCartIcon class="h-6 w-6" />
          <span v-if="cartStore.totalItems > 0" 
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden" @click="toggleMenu">
        <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden">
      <div class="px-4 pt-2 pb-3 space-y-1">
        <RouterLink 
          to="/" 
          class="block px-3 py-2 rounded-md hover:bg-gray-700"
          @click="isMenuOpen = false"
        >
          Početna
        </RouterLink>
        <RouterLink 
          to="/contact" 
          class="block px-3 py-2 rounded-md hover:bg-gray-700"
          @click="isMenuOpen = false"
        >
          Kontakt
        </RouterLink>
        <RouterLink 
          to="/cart" 
          class="block px-3 py-2 rounded-md hover:bg-gray-700"
          @click="isMenuOpen = false"
        >
          <div class="flex items-center">
            <span>Košarica</span>
            <ShoppingCartIcon class="h-5 w-5 ml-2" />
            <span v-if="cartStore.totalItems > 0" 
                  class="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>