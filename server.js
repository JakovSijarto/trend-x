import express from 'express'
import cors from 'cors'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbFile = join(__dirname, 'db.json')

// Initialize adapter and database
const adapter = new JSONFile(dbFile)
const db = new Low(adapter, { products: [] }) // Provide default data structure here

await db.read()

// Initialize with default products if empty
if (!db.data.products || db.data.products.length === 0) {
  db.data.products = [
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
    }
  ]
  await db.write()
}

const app = express()
app.use(cors())
app.use(express.json())

// Get all products
app.get('/api/products', async (req, res) => {
  await db.read()
  res.json(db.data.products)
})

// Update a product
app.put('/api/products/:id', async (req, res) => {
  await db.read()
  const { id } = req.params
  const productIndex = db.data.products.findIndex(p => p.id === Number(id))
  
  if (productIndex !== -1) {
    const updatedProduct = {
      ...db.data.products[productIndex],
      ...req.body,
      id: Number(id) // Ensure ID remains unchanged
    }
    db.data.products[productIndex] = updatedProduct
    await db.write()
    res.json(updatedProduct)
  } else {
    res.status(404).json({ error: 'Product not found' })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})