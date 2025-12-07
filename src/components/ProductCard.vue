<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
const props = defineProps({
  product: Object,
})

const cart = useCartStore()
const isInCart = computed(() => {
  return cart.items.some((item) => item.id === props.product.id) ? 'В корзине' : 'В корзину'
})

const addToCart = () => {
  cart.addProduct(props.product)
  console.log('Добавлено:', props.product.name)
}
</script>

<template>
  <div class="card">
    <img :src="product.image" class="card-img" />
    <h3 class="card-title">{{ product.name }}</h3>
    <p class="card-price">{{ product.retail_price }} ₸</p>

    <button class="card-btn" :class="{ active: isInCart }" @click="addToCart">
      {{ isInCart }}
    </button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.card-title {
  font-size: 14px;
}

.card-price {
  font-weight: 600;
}

.card-btn {
  background: #2f80ed;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  transition: 0.2s;
}
/* .card-btn.active {
  transform: scale(0.95);
} */
.card-btn.active {
  background: #1f66c7;
}
</style>
