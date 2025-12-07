<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: Array,
  loading: Boolean,
})
</script>

<template>
  <div class="grid">
    <div v-if="loading">Загрузка...</div>

    <ProductCard v-for="item in products" :key="item.id" :product="item" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
</style>
