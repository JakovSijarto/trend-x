<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { ref, computed } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import ProductCard from '../components/ProductCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const route = useRoute()
const store = useProductStore()
const cartStore = useCartStore()
const selectedImage = ref(0)
const quantity = ref(1)
const showCartNotification = ref(false)

const product = store.getProductById(Number(route.params.id))
const relatedProducts = computed(() => 
  product ? store.getRelatedProducts(product.category, product.id) : []
)

const addToCart = () => {
  if (product) {
    cartStore.addToCart(product.id, quantity.value)
    showCartNotification.value = true
    setTimeout(() => {
      showCartNotification.value = false
    }, 3000)
  }
}
</script>

<template>
  <div v-if="product" class="min-h-screen bg-gray-50 py-12">
    <!-- Cart Notification -->
    <div
      v-if="showCartNotification"
      class="fixed top-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-notification"
    >
      Proizvod dodan u košaricu!
    </div>

    <div class="container mx-auto px-4">
      <!-- Product Details -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Image Gallery -->
          <div>
            <img :src="product.images[selectedImage]" :alt="product.name" class="w-full rounded-lg mb-4">
            <div class="grid grid-cols-3 gap-4">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectedImage = index"
                class="border-2 rounded-md overflow-hidden"
                :class="{ 'border-black': selectedImage === index, 'border-transparent': selectedImage !== index }"
              >
                <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-20 object-cover">
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
            <div class="flex items-center mb-4">
              <StarIcon class="h-6 w-6 text-yellow-400" />
              <span class="ml-2 text-xl">{{ product.rating }}/5</span>
            </div>
            <p class="text-gray-600 mb-6">{{ product.description }}</p>
            <div class="text-3xl font-bold mb-6">{{ product.price }} €</div>

            <!-- Quantity Selector -->
            <div class="mb-6">
              <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Količina</label>
              <div class="flex items-center space-x-2">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="px-3 py-1 border rounded-md"
                >-</button>
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  class="w-20 text-center border rounded-md py-1"
                >
                <button 
                  @click="quantity++"
                  class="px-3 py-1 border rounded-md"
                >+</button>
              </div>
            </div>

            <!-- Specifications -->
            <div class="mb-6">
              <h2 class="text-xl font-semibold mb-4">Specifikacije</h2>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(value, key) in product.specs" :key="key" class="bg-gray-50 p-4 rounded-md">
                  <div class="text-gray-600 capitalize">{{ key }}</div>
                  <div class="font-semibold">{{ value }}</div>
                </div>
              </div>
            </div>

            <button 
              @click="addToCart"
              class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Dodaj u košaricu
            </button>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6">Recenzije kupaca</h2>
        <Swiper
          :modules="[Navigation, Pagination]"
          :slides-per-view="1"
          :navigation="true"
          :pagination="{ clickable: true }"
          class="h-48"
        >
          <SwiperSlide v-for="comment in product.comments" :key="comment.user">
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="font-semibold">{{ comment.user }}</div>
                <div class="flex items-center">
                  <StarIcon class="h-5 w-5 text-yellow-400" />
                  <span class="ml-1">{{ comment.rating }}/5</span>
                </div>
              </div>
              <p class="text-gray-600">{{ comment.text }}</p>
              <div class="text-gray-400 text-sm mt-2">{{ comment.date }}</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0">
        <h2 class="text-2xl font-bold mb-6">Slični proizvodi</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-2xl text-gray-600">Proizvod nije pronađen</div>
  </div>
</template>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: black !important;
  transform: scale(0.7) !important;
}

.swiper-pagination-bullet-active {
  background: black !important;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.animate-notification {
  animation: slideIn 0.5s ease-out forwards, slideOut 0.5s ease-in forwards 2.5s;
}
</style>