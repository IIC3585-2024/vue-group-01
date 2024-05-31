<script setup>
import { ref, computed } from 'vue'

defineProps({
  project: String,
  task: String,
})

const h = ref(0)
const m = ref(0)
const s = ref(0)

const formattedTime = computed(() => {
  const pad = (num) => num.toString().padStart(2, '0')
  return `${pad(h.value)}:${pad(m.value)}:${pad(s.value)}`
})
</script>

<template>
  <tr>
    <td>{{ project }}</td>
    <td>{{ task }}</td>
    <td>{{ formattedTime }}</td>
    <td>
      <button class="play">▶</button>
      <button class="edit">✎</button>
      <button class="delete">🗑</button>
    </td>
  </tr>
</template>