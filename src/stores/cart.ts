import { defineStore } from 'pinia'

export interface CartItem {
  productId: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  actions: {
    addToCart(productId: number, quantity: number) {
      const existingItem = this.items.find(item => item.productId === productId)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ productId, quantity })
      }
    },
    removeFromCart(productId: number) {
      const index = this.items.findIndex(item => item.productId === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    }
  }
})