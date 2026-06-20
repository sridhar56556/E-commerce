import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

import { PRODUCTS } from '../src/data/products.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 8787
const MODEL = 'claude-opus-4-8'
const ORDERS_FILE = path.join(__dirname, 'orders.json')

// ---- helpers ----------------------------------------------------------
function loadOrders() {
  try {
    if (fs.existsSync(ORDERS_FILE)) return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'))
  } catch { /* ignore */ }
  return []
}

function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = 'LUM'
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]))

// ---- AI catalogue -----------------------------------------------------
const catalogText = PRODUCTS.map((p) => {
  const colors = p.colors.map((c) => c.name).join('/')
  const flags = [
    p.isNew ? 'new' : null,
    p.originalPrice ? `on-sale (was $${p.originalPrice})` : null,
  ]
    .filter(Boolean)
    .join(', ')
  return (
    `- ${p.id} | ${p.name} | ${p.category} | $${p.price}` +
    ` | colours: ${colors} | sizes: ${p.sizes.join(',')}` +
    (flags ? ` | ${flags}` : '') +
    ` | rated ${p.rating}/5 | ${p.description}`
  )
}).join('\n')

const SYSTEM_PROMPT = `You are the Lumière Style Concierge — a warm, knowledgeable personal stylist for an online contemporary fashion boutique. You help shoppers find pieces from our catalogue for their occasions, season, budget, and taste.

Here is the FULL Lumière catalogue. Only ever recommend items from this list, and always reference them by their exact id:

${catalogText}

How to respond — always by calling the recommend_products tool:
- Put a short, friendly, on-brand note (max ~70 words) in "message". Sound like a real stylist, not a search engine. No markdown, no bullet lists in the message.
- Recommend 1–4 products that genuinely fit the request. For each, give one specific reason it suits them. Favour a great fit over a long list.
- If the request is too vague to recommend well, ask ONE concise clarifying question in "message" and return an empty products array.
- Honour constraints: respect any stated budget/price limit, colour, category, size, occasion and season. Think about how the pieces work together.
- Never invent products, prices, or ids. If nothing truly fits, say so kindly in "message" and suggest the closest alternative from the catalogue.`

const RECOMMEND_TOOL = {
  name: 'recommend_products',
  description:
    'Reply to the shopper and optionally recommend products from the Lumière catalogue.',
  input_schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description:
          'A short, warm, stylist-style reply to the shopper (max ~70 words). Plain text only.',
      },
      products: {
        type: 'array',
        description:
          'Between 0 and 4 recommended products. Empty if you are asking a clarifying question or nothing fits.',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The exact product id from the catalogue.' },
            reason: { type: 'string', description: 'One short sentence on why this piece suits the shopper.' },
          },
          required: ['id', 'reason'],
        },
      },
    },
    required: ['message', 'products'],
  },
}

const hasKey = Boolean(process.env.ANTHROPIC_API_KEY)
const client = hasKey ? new Anthropic() : null

if (!hasKey) {
  console.warn(
    '\n  ⚠  ANTHROPIC_API_KEY is not set — the concierge will return a setup hint.\n' +
    '     Copy .env.example to .env, add your key, and restart this server.\n'
  )
}

// ---- App ------------------------------------------------------------
const app = express()
app.use(cors())
app.use(express.json({ limit: '256kb' }))

// ---- Health -----------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: MODEL, configured: hasKey, products: PRODUCTS.length })
})

// ---- Place order ------------------------------------------------------
app.post('/api/orders', (req, res) => {
  const { items, shipping, payment } = req.body

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' })
  }

  if (!shipping || !shipping.name || !shipping.address || !shipping.email) {
    return res.status(400).json({ error: 'Shipping details are required.' })
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0)
  const shippingCost = subtotal > 12000 ? 0 : 99
  const total = subtotal + shippingCost

  const order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    items: items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty || 1,
      size: item.size || 'N/A',
      color: item.color || 'N/A',
      image: item.image || '',
    })),
    shipping: {
      name: shipping.name,
      email: shipping.email,
      address: shipping.address,
      city: shipping.city || '',
      postal: shipping.postal || '',
      country: shipping.country || '',
    },
    payment: {
      method: payment?.method || 'card',
    },
    subtotal: Math.round(subtotal * 100) / 100,
    shippingCost,
    total: Math.round(total * 100) / 100,
    status: 'confirmed',
  }

  const orders = loadOrders()
  orders.unshift(order)
  saveOrders(orders)

  res.json({
    success: true,
    order: {
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.length,
    },
  })
})

// ---- Get order by ID --------------------------------------------------
app.get('/api/orders/:id', (req, res) => {
  const orders = loadOrders()
  const order = orders.find((o) => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found.' })
  res.json(order)
})

// ---- AI Concierge -----------------------------------------------------
function buildConversation(rawMessages) {
  if (!Array.isArray(rawMessages)) return []
  return rawMessages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({
      role: m.role,
      content: String(m.content ?? '').slice(0, 2000),
    }))
    .filter((m) => m.content.trim().length > 0)
    .slice(-12)
}

app.post('/api/concierge', async (req, res) => {
  const conversation = buildConversation(req.body?.messages)

  if (conversation.length === 0) {
    return res.status(400).json({
      message: 'Tell me what you’re looking for and I’ll pull a few pieces for you.',
      products: [],
    })
  }

  if (!client) {
    return res.json({
      message:
        'I’m almost ready! Add your ANTHROPIC_API_KEY to the server’s .env file and restart it, then I can start styling you. ✦',
      products: [],
    })
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: conversation,
      tools: [RECOMMEND_TOOL],
      tool_choice: { type: 'tool', name: 'recommend_products' },
    })

    const toolUse = response.content.find((b) => b.type === 'tool_use')
    const out = toolUse?.input ?? {}

    const message =
      typeof out.message === 'string' && out.message.trim()
        ? out.message.trim()
        : 'Here are a few pieces I’d suggest.'

    const seen = new Set()
    const products = Array.isArray(out.products)
      ? out.products
          .filter((p) => p && PRODUCT_BY_ID.has(p.id) && !seen.has(p.id) && seen.add(p.id))
          .slice(0, 4)
          .map((p) => ({ id: p.id, reason: String(p.reason ?? '').slice(0, 200) }))
      : []

    res.json({ message, products })
  } catch (err) {
    console.error('[concierge] error:', err?.message || err)
    const status = err?.status === 401 ? 401 : 500
    res.status(status).json({
      message:
        status === 401
          ? 'My styling service rejected the API key — please check ANTHROPIC_API_KEY and restart the server.'
          : 'Apologies — I had a moment of trouble just then. Could you try that again?',
      products: [],
    })
  }
})

app.listen(PORT, () => {
  console.log(`\n  ✦ Lumière server ready on http://localhost:${PORT}`)
  console.log(`    GET  /api/health`)
  console.log(`    POST /api/orders`)
  console.log(`    GET  /api/orders/:id`)
  console.log(`    POST /api/concierge   (model: ${MODEL}, key ${hasKey ? 'set ✓' : 'missing ✗'})\n`)
})
