<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-8">Upravljanje Proizvodima</h1>
        
        <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
        <div v-if="success" class="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {{ success }}
        </div>

        <!-- Product Selection -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-2">Odaberi Proizvod</label>
          <select 
            v-model="selectedProductId" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          >
            <option v-for="product in store.products" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
        </div>

        <!-- Edit Form -->
        <div v-if="selectedProduct" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Naziv</label>
            <input 
              v-model="editForm.name" 
              type="text" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cijena (€)</label>
            <input 
              v-model="editForm.price" 
              type="number" 
              step="0.01" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Opis</label>
            <textarea 
              v-model="editForm.description" 
              rows="4" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Slike (URL-ovi, odvojeni zarezom)</label>
            <textarea 
              v-model="imagesText" 
              rows="3" 
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            ></textarea>
          </div>

          <!-- Preview -->
          <div class="mt-8">
            <h2 class="text-lg font-semibold mb-4">Pregled</h2>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <img 
                v-for="(image, index) in editForm.images" 
                :key="index" 
                :src="image" 
                :alt="editForm.name" 
                class="w-full h-32 object-cover rounded-md"
              >
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button 
              @click="resetForm" 
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Poništi
            </button>
            <button 
              @click="saveChanges" 
              :disabled="isSaving"
              class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
            >
              {{ isSaving ? 'Spremanje...' : 'Spremi Promjene' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useProductStore } from '../stores/products'

const store = useProductStore()
const selectedProductId = ref(null)
const editForm = ref({
  name: '',
  price: 0,
  description: '',
  images: []
})
const error = ref('')
const success = ref('')
const isSaving = ref(false)

const selectedProduct = computed(() => {
  return store.getProductById(selectedProductId.value)
})

const imagesText = computed({
  get: () => editForm.value.images.join(', '),
  set: (value) => {
    editForm.value.images = value.split(',').map(url => url.trim()).filter(url => url)
  }
})

watch(selectedProduct, (newProduct) => {
  if (newProduct) {
    editForm.value = {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      images: [...newProduct.images]
    }
  }
})

const resetForm = () => {
  if (selectedProduct.value) {
    editForm.value = {
      name: selectedProduct.value.name,
      price: selectedProduct.value.price,
      description: selectedProduct.value.description,
      images: [...selectedProduct.value.images]
    }
    error.value = ''
    success.value = ''
  }
}

const saveChanges = async () => {
  if (selectedProduct.value) {
    try {
      isSaving.value = true
      error.value = ''
      success.value = ''

      store.updateProduct(selectedProduct.value.id, {
        name: editForm.value.name,
        price: Number(editForm.value.price),
        description: editForm.value.description,
        images: editForm.value.images
      })

      success.value = 'Promjene su uspješno spremljene!'
    } catch (err) {
      error.value = 'Došlo je do greške prilikom spremanja promjena.'
    } finally {
      isSaving.value = false
    }
  }
}
</script>