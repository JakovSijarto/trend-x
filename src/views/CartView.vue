<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <!-- Success Notification -->
    <div
      v-if="showSuccessNotification"
      class="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-notification"
    >
      Narudžba je uspješno poslana! Uskoro ćete primiti potvrdu na email.
    </div>

    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Košarica</h1>
        
        <div v-if="cartItems.length > 0" class="bg-white rounded-lg shadow-lg p-6">
          <!-- Cart Items -->
          <div class="space-y-6">
            <div v-for="item in cartItems" :key="item.productId" class="flex items-center space-x-4 py-4 border-b last:border-b-0">
              <RouterLink :to="`/product/${item.productId}`">
                <img 
                  v-if="item.product"
                  :src="item.product.images[0]" 
                  :alt="item.product.name"
                  class="w-24 h-24 object-cover rounded-md hover:opacity-75 transition-opacity"
                >
              </RouterLink>
              <div class="flex-1">
                <RouterLink :to="`/product/${item.productId}`">
                  <h3 class="text-lg font-semibold hover:text-gray-600">{{ item.product?.name }}</h3>
                </RouterLink>
                <p class="text-gray-600">{{ item.product?.price }} €</p>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="cartStore.updateQuantity(item.productId, Math.max(1, item.quantity - 1))"
                  class="px-3 py-1 border rounded-md"
                >-</button>
                <span class="w-8 text-center">{{ item.quantity }}</span>
                <button 
                  @click="cartStore.updateQuantity(item.productId, item.quantity + 1)"
                  class="px-3 py-1 border rounded-md"
                >+</button>
              </div>
              <button 
                @click="cartStore.removeFromCart(item.productId)"
                class="text-red-500 hover:text-red-700"
              >
                Ukloni
              </button>
            </div>
          </div>

          <!-- Cart Total -->
          <div class="mt-8 pt-6 border-t">
            <div class="flex justify-between items-center text-xl font-bold mb-4">
              <span>Ukupno:</span>
              <span>{{ total }} €</span>
            </div>
            <button 
              v-if="!showCheckoutForm"
              @click="showCheckoutForm = true"
              class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Nastavi na Checkout
            </button>
          </div>

          <!-- Checkout Form -->
          <div v-if="showCheckoutForm" class="mt-8 pt-6 border-t">
            <h2 class="text-2xl font-bold mb-6">Podaci za Dostavu</h2>
            
            <form @submit.prevent="submitOrder" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Ime i Prezime</label>
                  <input 
                    v-model="formData.name"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    v-model="formData.email"
                    type="email"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Telefon</label>
                  <input 
                    v-model="formData.phone"
                    type="tel"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Adresa</label>
                  <input 
                    v-model="formData.address"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Grad</label>
                  <input 
                    v-model="formData.city"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Poštanski Broj</label>
                  <input 
                    v-model="formData.postalCode"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Napomene</label>
                <textarea 
                  v-model="formData.notes"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                ></textarea>
              </div>
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {{ isSubmitting ? 'Slanje...' : 'Pošalji Narudžbu' }}
              </button>
            </form>
          </div>
        </div>

        <div v-else class="text-center py-12 bg-white rounded-lg shadow-lg">
          <p class="text-xl text-gray-600">Vaša košarica je prazna</p>
          <RouterLink to="/" class="inline-block mt-4 text-black hover:underline">
            Nastavi kupovinu
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import emailjs from '@emailjs/browser'

const cartStore = useCartStore()
const productStore = useProductStore()
const showCheckoutForm = ref(false)
const isSubmitting = ref(false)
const showSuccessNotification = ref(false)

const cartItems = computed(() => {
  return cartStore.items.map(item => ({
    ...item,
    product: productStore.getProductById(item.productId)
  }))
})

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    if (item.product) {
      return sum + (item.product.price * item.quantity)
    }
    return sum
  }, 0)
})

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  notes: ''
})

const submitOrder = async () => {
  try {
    isSubmitting.value = true

    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      from_phone: formData.value.phone,
      from_address: formData.value.address,
      from_city: formData.value.city,
      from_postalCode: formData.value.postalCode,
      from_notes: formData.value.notes,
      order_details: cartItems.value.map(item => `
        - ${item.product?.name}
          Količina: ${item.quantity}
          Cijena: ${item.product?.price} €
          Ukupno: ${(item.product?.price || 0) * item.quantity} €
      `).join('\n'),
      total_amount: total.value
    }

    await emailjs.send(
      'service_26j234o',
      'template_a1dya2y',
      templateParams,
      'tGrrFjuKCc7u6wh3f'
    )

    showSuccessNotification.value = true
    cartStore.items = []
    
    formData.value = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      notes: ''
    }
    
    setTimeout(() => {
      showCheckoutForm.value = false
      showSuccessNotification.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to send email:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>
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