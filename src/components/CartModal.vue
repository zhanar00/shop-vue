<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>

<template>
  <div v-if="cart.isOpen" class="overlay" @click.self="cart.closeCart()">
    <div class="modal" @click.stop>
      <h2>Корзина</h2>

      <div v-if="!cart.items.length">Корзина пуста</div>

      <div v-for="item in cart.items" :key="item.id" class="item">
        <img :src="item.image" />

        <div class="info">
          <p>{{ item.name }}</p>
          <small>{{ item.retail_price }} ₸</small>
        </div>

        <div class="qty">
          <button @click="cart.decreaseQty(item.id)">−</button>
          <span>{{ item.qty }}</span>
          <button @click="cart.increaseQty(item.id)">+</button>
        </div>

        <button class="delete" @click="cart.removeProduct(item.id)">✖</button>
      </div>

      <hr />

      <p class="total">Итого: {{ cart.totalPrice?.toFixed(2) || 0 }} ₸</p>

      <button class="close" @click="cart.closeCart()">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  width: 420px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 16px;
  border-radius: 16px;
}

.item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.info {
  flex: 1;
}

.qty {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qty button {
  width: 26px;
}

.delete {
  border: none;
  background: transparent;
}

.total {
  font-weight: bold;
}

.close {
  width: 100%;
  padding: 8px;
  background: #2f80ed;
  color: white;
  border: none;
  border-radius: 8px;
}
</style>
