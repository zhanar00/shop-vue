<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>

<template>
  <aside class="cart">
    <h3>Корзина</h3>

    <div v-if="!cart.items.length">Корзина пуста</div>

    <div v-for="item in cart.items" :key="item.id" class="row">
      <div>{{ item.name }}</div>

      <div class="controls">
        <button @click="cart.decrease(item.id)">-</button>
        <span>{{ item.qty }}</span>
        <button @click="cart.addToCart(item)">+</button>
      </div>

      <div>{{ item.retail_price * item.qty }} ₸</div>

      <button @click="cart.remove(item.id)">✖</button>
    </div>

    <hr />

    <div class="total">Итого: {{ cart.total }} ₸</div>
  </aside>
</template>

<style scoped>
.cart {
  padding: 12px;
  border-left: 1px solid #eee;
  min-width: 260px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.controls {
  display: flex;
  gap: 6px;
}
</style>
