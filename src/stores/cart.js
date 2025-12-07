import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'cart_items'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  // --- ВОССТАНОВЛЕНИЕ ИЗ LOCALSTORAGE ---
  const savedCart = localStorage.getItem(STORAGE_KEY)

  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart)
    } catch (e) {
      console.warn('Ошибка чтения localStorage')
      items.value = []
    }
  }

  // --- АВТО СОХРАНЕНИЕ ---
  watch(
    items,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true },
  )

  // --- МЕТОДЫ ---
  const addProduct = (product) => {
    const existing = items.value.find((i) => i.id === product.id)

    if (existing) {
      existing.qty++
    } else {
      items.value.push({
        ...product,
        qty: 1,
      })
    }
  }

  const removeProduct = (id) => {
    items.value = items.value.filter((i) => i.id !== id)
  }

  const increaseQty = (id) => {
    const item = items.value.find((i) => i.id === id)
    if (item) item.qty++
  }

  const decreaseQty = (id) => {
    const item = items.value.find((i) => i.id === id)
    if (!item) return

    if (item.qty > 1) {
      item.qty--
    } else {
      removeProduct(id)
    }
  }

  const clearCart = () => {
    items.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + Number(item.retail_price) * item.qty, 0),
  )

  // --- UI ---
  const openCart = () => (isOpen.value = true)
  const closeCart = () => (isOpen.value = false)

  return {
    items,
    isOpen,

    addProduct,
    removeProduct,
    increaseQty,
    decreaseQty,
    clearCart,

    openCart,
    closeCart,

    totalPrice,
  }
})
