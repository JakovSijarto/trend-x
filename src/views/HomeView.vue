<script setup lang="ts">
import { useProductStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'
import CategoryList from '../components/CategoryList.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const store = useProductStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative">
      <img 
        class="absolute inset-0 w-full h-full object-cover"
        src="/assets/hero.jpg"
      ></img>
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <div class="relative bg-transparent text-white py-20">
        <div class="container mx-auto px-4">
          <h1 class="text-5xl font-bold mb-4">Osvijetlite Svoj Svijet</h1>
          <p class="text-xl mb-8">Otkrijte našu premium kolekciju LED rasvjetnih rješenja</p>
          <div class="relative max-w-2xl">
            <input
              type="text"
              v-model="store.searchQuery"
              placeholder="Pretražite LED proizvode..."
              class="w-full px-4 py-3 pl-12 rounded-lg text-black"
            >
            <MagnifyingGlassIcon class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Categories -->
        <div class="md:col-span-1">
          <CategoryList />
        </div>

        <!-- Products -->
        <div class="md:col-span-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in store.filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>