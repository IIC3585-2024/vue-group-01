<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  h: Number,
  m: Number,
  s: Number,
  goal: Number
})

const progressPercentage = computed(() => {
  const totalSeconds = props.h * 3600 + props.m * 60 + props.s
  const percentage = (totalSeconds / props.goal) * 100
  return Math.min(percentage, 100) // Ensure the percentage does not exceed 100
})
</script>

<template>
  <td>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </td>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  background-color: #555;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 10px;
  background-color: #4caf50;
  width: 0;
}
</style>
