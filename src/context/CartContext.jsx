import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'lumiere.cart.v1'
const WISH_KEY = 'lumiere.wishlist.v1'

// A cart line is uniquely identified by product + size + color
const lineId = (id, size, color) => `${id}__${size}__${color}`

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, size, color, qty } = action
      const key = lineId(product.id, size, color)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l
        )
      }
      return [
        ...state,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          color,
          qty,
        },
      ]
    }
    case 'REMOVE':
      return state.filter((l) => l.key !== action.key)
    case 'QTY':
      return state.map((l) =>
        l.key === action.key
          ? { ...l, qty: Math.max(1, Math.min(action.qty, 10)) }
          : l
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitial)
  const [isCartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  // Lock body scroll while the cart drawer is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isCartOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [isCartOpen])

  const addItem = useCallback((product, { size, color, qty = 1 } = {}) => {
    dispatch({
      type: 'ADD',
      product,
      size: size || product.sizes[0],
      color: color || product.colors[0].name,
      qty,
    })
    setCartOpen(true)
  }, [])

  const removeItem = useCallback((key) => dispatch({ type: 'REMOVE', key }), [])
  const setQty = useCallback((key, qty) => dispatch({ type: 'QTY', key, qty }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const toggleWish = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, l) => {
        acc.count += l.qty
        acc.subtotal += l.qty * l.price
        return acc
      },
      { count: 0, subtotal: 0 }
    )
  }, [items])

  const shipping = subtotal > 12000 || subtotal === 0 ? 0 : 99
  const total = subtotal + shipping

  const value = {
    items,
    count,
    subtotal,
    shipping,
    total,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    addItem,
    removeItem,
    setQty,
    clearCart,
    wishlist,
    toggleWish,
    isWished: (id) => wishlist.includes(id),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
