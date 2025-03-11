import { defineStore } from 'pinia'

const defaultProducts = [
  {
    id: 1,
    name: 'Smart LED Strip',
    price: 29.99,
    rating: 4.5,
    images: [
      '../../public/assets/product-1-img1.jpg',
      '../../public/assets/product-1-img2.jpg',
      '../../public/assets/product-1-img3.jpg'
    ],
    category: 'LED Strips',
    description: 'RGB LED strip with smart home integration. Perfect for ambient lighting and entertainment setups.',
    specs: {
      wattage: '24W',
      lumens: '2000lm',
      lifespan: '50000h',
      color: 'RGB + White'
    },
    comments: [
      {
        user: 'John D.',
        rating: 5,
        text: 'Nevjerojatne boje i jednostavan za postavljanje!',
        date: '2025-03-15'
      },
      {
        user: 'Sarah M.',
        rating: 4,
        text: 'Izvrstan proizvod, aplikacija bi mogla biti bolja',
        date: '2025-03-10'
      }
    ]
  },
  {
    id: 2,
    name: 'LED Panel Light',
    price: 49.99,
    rating: 4.8,
    images: [
      '../../public/assets/product-2-img1.jpg',
      '../../public/assets/product-2-img2.jpg',
      '../../public/assets/product-2-img3.jpg'
    ],
    category: 'Panels',
    description: 'Ultra-thin LED panel for modern spaces. Perfect for office and commercial lighting.',
    specs: {
      wattage: '36W',
      lumens: '3600lm',
      lifespan: '70000h',
      color: '4000K'
    },
    comments: [
      {
        user: 'Mike R.',
        rating: 5,
        text: 'Perfect replacement for old fluorescent lights',
        date: '2025-03-12'
      }
    ]
  },
  {
    id: 3,
    name: 'LED Spotlight',
    price: 19.99,
    rating: 4.2,
    images: [
      '../../public/assets/product-3-img1.jpg',
    ],
    category: 'Spotlights',
    description: 'Adjustable LED spotlight for accent lighting. Great for highlighting artwork or architectural features.',
    specs: {
      wattage: '12W',
      lumens: '1000lm',
      lifespan: '45000h',
      color: '3000K'
    },
    comments: [
      {
        user: 'Lisa K.',
        rating: 4,
        text: 'Great focused light, perfect for my artwork',
        date: '2024-03-08'
      }
    ]
  }
]

export const useProductStore = defineStore('products', {
  state: () => ({
    products: defaultProducts,
    searchQuery: '',
    categories: [
      'LED Strips',
      'Panels',
      'Spotlights',
      'Downlights',
      'Outdoor Lights',
      'Smart LEDs',
      'Industrial LEDs',
      'Decorative LEDs'
    ]
  }),
  getters: {
    filteredProducts: (state) => {
      const query = state.searchQuery.toLowerCase()
      return state.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    },
    getProductById: (state) => {
      return (id) => state.products.find(p => p.id === Number(id))
    },
    getRelatedProducts: (state) => {
      return (category, currentId) => 
        state.products.filter(p => p.category === category && p.id !== currentId).slice(0, 3)
    }
  },
  actions: {
    updateProduct(productId, updates) {
      const index = this.products.findIndex(p => p.id === productId)
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          ...updates
        }
      }
    },
    setSearchQuery(query) {
      this.searchQuery = query
    }
  },
  persist: true
})