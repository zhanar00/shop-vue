<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

defineEmits(['openAuth', 'search'])
</script>

<template>
  <header class="header">
    <input
      type="text"
      class="search"
      placeholder="Поиск товаров..."
      @input="$emit('search', $event.target.value)"
    />
    <button class="auth-btn" @click="$emit('openAuth')">Войти</button>
    <button class="cart-btn" @click="cart.openCart()">Корзина {{ cart.count }}</button>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
}
.search {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
.auth-btn {
  margin-left: 16px;
  padding: 8px 12px;
  background: #2f80ed;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
}
.cart-btn {
  margin-left: 16px;
  padding: 8px 12px;
  background: #2f80ed;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
