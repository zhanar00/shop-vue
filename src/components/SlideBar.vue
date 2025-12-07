<script setup>
defineProps({
  categories: Array,
  activeId: Number,
})

defineEmits(['select'])
</script>

<template>
  <aside class="sidebar">
    <div v-for="parent in categories" :key="parent.id" class="category">
      <div class="parent">{{ parent.name }}</div>

      <div class="children">
        <button
          v-for="child in parent.children"
          :key="child.id"
          class="child"
          :class="{ active: child.id === activeId }"
          @click="$emit('select', child.id)"
        >
          {{ child.name }}
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  border-right: 1px solid #eee;
}

.parent {
  font-weight: 600;
  margin: 12px 0 6px;
}
.category {
  padding: 0 12px;
  margin-left: 50px;
}
.child {
  display: flex;
  padding: 4px 10px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.child.active {
  background: #2f80ed;
  color: #fff;
}
</style>
