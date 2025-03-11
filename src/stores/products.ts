import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  rating: number
  images: string[]
  category: string
  description: string
  specs: {
    wattage: string
    lumens: string
    lifespan: string
    color: string
  }
  comments: {
    user: string
    rating: number
    text: string
    date: string
  }[]
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Smart LED Strip',
        price: 29.99,
        rating: 4.5,
        images: [
          'https://placehold.co/600x400',
          'https://placehold.co/600x400',
          'https://placehold.co/600x400'
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
            text: 'Amazing colors and easy to install!',
            date: '2024-03-15'
          },
          {
            user: 'Sarah M.',
            rating: 4,
            text: 'Great product, app could be better',
            date: '2024-03-10'
          }
        ]
      },
      {
        id: 2,
        name: 'LED Panel Light',
        price: 49.99,
        rating: 4.8,
        images: [
          'https://placehold.co/600x400',
          'https://placehold.co/600x400',
          'https://placehold.co/600x400'
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
            date: '2024-03-12'
          }
        ]
      },
      {
        id: 3,
        name: 'LED Spotlight',
        price: 19.99,
        rating: 4.2,
        images: [
          'https://placehold.co/600x400',
          'https://placehold.co/600x400',
          'https://placehold.co/600x400'
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
      },
      {
        id: 4,
        name: 'Smart Bulb Pro',
        price: 24.99,
        rating: 4.7,
        images: [
          'https://placehold.co/600x400',
          'https://placehold.co/600x400',
          'https://placehold.co/600x400'
        ],
        category: 'Smart LEDs',
        description: 'WiFi-enabled smart bulb with millions of colors and voice control support.',
        specs: {
          wattage: '9W',
          lumens: '800lm',
          lifespan: '25000h',
          color: 'RGB + CCT'
        },
        comments: [
          {
            user: 'Tom B.',
            rating: 5,
            text: 'Works perfectly with my smart home setup',
            date: '2024-03-14'
          }
        ]
      },
      {
        id: 5,
        name: 'Outdoor Floodlight',
        price: 79.99,
        rating: 4.6,
        images: [
          'https://placehold.co/600x400',
          'https://placehold.co/600x400',
          'https://placehold.co/600x400'
        ],
        category: 'Outdoor Lights',
        description: 'Weather-resistant LED floodlight perfect for security and landscape lighting.',
        specs: {
          wattage: '50W',
          lumens: '5000lm',
          lifespan: '50000h',
          color: '5000K'
        },
        comments: [
          {
            user: 'David M.',
            rating: 4,
            text: 'Bright and durable, great for security',
            date: '2024-03-11'
          }
        ]
      }
    ],
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
      return (id: number) => state.products.find(p => p.id === id)
    },
    getRelatedProducts: (state) => {
      return (category: string, currentId: number) => 
        state.products.filter(p => p.category === category && p.id !== currentId).slice(0, 3)
    }
  },
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  }
})