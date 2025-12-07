<script setup>
import { ref, onMounted, computed } from 'vue'
import SlideBar from './components/SlideBar.vue'
import ProductGrid from './components/ProductGrid.vue'
import Header from './components/Header.vue'
import AuthModal from './components/AuthModal.vue'
import CartModal from './components/CartModal.vue'
import { useCartStore } from './stores/cart'

const categories = ref([])
const products = ref([])
const isLoading = ref(false)
const error = ref(null)
const activeCategoryId = ref(null)
const menuOpen = ref(false)
const isAuthOpen = ref(false)
const searchText = ref('')
const cart = useCartStore()

// Загрузка категорий
const fetchCategories = async () => {
  try {
    const response = await fetch('/api/products/categories/?store_id=1')
    categories.value = await response.json()
  } catch (err) {
    console.error(err)
  }
}

// Загрузка товаров по категории
const fetchProductsByCategory = async (categoryId) => {
  isLoading.value = true
  try {
    const response = await fetch(`/api/products/?store_id=1&category_id=${categoryId}`)
    const data = await response.json()
    products.value = data.results
  } catch (err) {
    error.value = 'Ошибка загрузки'
  } finally {
    isLoading.value = false
  }
}

// сохранение выбора категории при обновдении страницы
const handleSelectCategory = (id) => {
  activeCategoryId.value = id
  localStorage.setItem('lastCategoryId', id)

  fetchProductsByCategory(id)
}

// Первая загрузка категорий и сохранение текущей ка егории при загрузке стр
onMounted(async () => {
  const cats = await fetchCategories()

  const savedId = localStorage.getItem('lastCategoryId')

  if (savedId) {
    activeCategoryId.value = savedId
    fetchProductsByCategory(savedId)
  } else {
    const defaultCategory = cats[0]?.children?.[0]
    if (defaultCategory) {
      activeCategoryId.value = defaultCategory.id
      fetchProductsByCategory(defaultCategory.id)
    }
  }
})

// Фильтрация товаров по поисковому запросу
const filteredProducts = computed(() => {
  if (!searchText.value) {
    return products.value
  }
  return products.value.filter((p) => p.name.toLowerCase().includes(searchText.value.toLowerCase()))
})
</script>

<template>
  <Header @openAuth="isAuthOpen = true" @search="searchText = $event" />
  <AuthModal v-if="isAuthOpen" @close="isAuthOpen = false" />
  <CartModal />

  <div class="app">
    <button class="burger" @click="menuOpen = !menuOpen">☰</button>
    <SlideBar
      v-if="menuOpen"
      class="slidebar"
      :categories="categories"
      :active-id="activeCategoryId"
      @select="handleSelectCategory"
      @close="menuOpen = false"
    />
    <main :class="['content', { shifted: menuOpen }]">
      <ProductGrid :products="filteredProducts" :loading="isLoading" />
    </main>
  </div>

  <!-- <div class="layout">
    <SlideBar
      :categories="categories"
      :activeId="activeCategoryId"
      @select="handleSelectCategory"
    />

    <ProductGrid :products="products" :loading="isLoading" />
  </div> -->
</template>

<style>
.app {
  height: 100vh;
  overflow: hidden;
}
.burger {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 50;
  font-size: 26px;
  background: none;
  border: none;
  cursor: pointer;
}
.slidebar {
  padding: 10px;
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: white;
  overflow-y: auto;
  z-index: 40;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
.content {
  height: 100vh;
  overflow-y: auto;
  padding: 16px;
  transition: margin-left 0.25s ease;
}

.content.shifted {
  margin-left: 280px;
}
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  padding: 16px;
}
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.status {
  padding: 12px;
}

.status.error {
  color: #c0392b;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>
