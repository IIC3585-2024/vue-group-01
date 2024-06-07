<script setup>
import { ref, computed, defineProps} from 'vue'

const props = defineProps({
  project: String,
  task: String,
  onDelete: Function,
  taskId: String
})

const h = ref(0)
const m = ref(0)
const s = ref(0)

const formattedTime = computed(() => {
  const pad = (num) => num.toString().padStart(2, '0')
  return `${pad(h.value)}:${pad(m.value)}:${pad(s.value)}`
})

const isActive = ref(false)

const togglePlay = () => {
  isActive.value = !isActive.value;
  if (isActive.value) {
    startCounter();
  } else {
    clearInterval(timer);
  }
}

const playButton = computed(() => {
  return isActive.value ? '&#9724;' : '▶' ;
})

let timer;

const startCounter = () => {
  timer = setInterval(() => {
    s.value++;
    if(s.value>59){
      s.value = 0;
      m.value++;
    }
    if(m.value>59){
      m.value = 0;
      h.value++
    }
  }, 1000);
}


</script>

<template>
  <tr>
    <td>{{ project }}</td>
    <td>{{ task }}</td>
    <td>{{ formattedTime }}</td>
    <td>
      <button class="play" @click="togglePlay" v-html=playButton></button>
      <button class="delete" @click="onDelete">🗑</button>
    </td>
  </tr>
</template>

<style scoped>
  td {
  background-color: #444;
  color: white;
  }

  th, td {
    border: 1px solid white;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #333;
    color: white;
  }
</style>