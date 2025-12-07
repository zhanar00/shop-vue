<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])

const mode = ref('login')
const phone = ref('')
const password = ref('')
const firstName = ref('')
const lastname = ref('')
const email = ref('')

const register = () => {
  if (!phone.value || !password.value) {
    alert('Заполните телефон и пароль')
    return
  }
  const user = {
    phone: phone.value,
    password: password.value,
    first_name: firstName.value,
    last_name: lastname.value,
    email: email.value,
  }
  localStorage.setItem('user', JSON.stringify(user))
  alert('Регистрация успешна!')
  emit('close')
}

const login = () => {
  const savedUser = JSON.parse(localStorage.getItem('user'))
  if (!savedUser) {
    alert('Пользователь не найден, зарегистрируйтесь')
    return
  }
  if (savedUser.phone === phone.value && savedUser.password === password.value) {
    alert('Вход успешен!')
    emit('close')
  } else {
    alert('Неверный телефон или пароль')
  }
}

const submit = () => {
  mode.value === 'login' ? login() : register()
}
</script>
<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <button class="close" @click="$emit('close')">x</button>

      <h2>{{ mode === 'login' ? 'Вход' : 'Регистрация' }}</h2>

      <input v-model="phone" placeholder="Телефон" type="tel" />
      <input v-model="password" placeholder="Пароль" type="password" />

      <template v-if="mode === 'register'">
        <input v-model="firstName" placeholder="Имя" />
        <input v-model="lastName" placeholder="Фамилия" />
        <input v-model="email" placeholder="Email" />
      </template>

      <button class="main-btn" @click="submit">
        {{ mode === 'login' ? 'Войти' : 'Зарегистрироваться' }}
      </button>

      <button class="switch" @click="mode = mode === 'login' ? 'register' : 'login'">
        {{ mode === 'login' ? 'Регистрация' : 'Назад к входу' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: relative;
  width: 320px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal input {
  height: 36px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 0 12px;
}

.main-btn {
  background: #6fb15c;
  color: white;
  border: none;
  border-radius: 10px;
  height: 40px;
  cursor: pointer;
  margin-top: 6px;
}

.switch {
  background: none;
  border: none;
  color: #2f80ed;
  cursor: pointer;
}

.close {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
