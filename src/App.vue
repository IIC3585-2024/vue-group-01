<script setup>
import { ref } from 'vue'
import Time from './components/Time.vue'
import { getRandomProject, getRandomTask } from './utils/randomData.js'

// Get a random id
const generateId = () => {
  return crypto.randomUUID()
}

// List of timers
const projects = ref([])

// Vars to store the inputs
const projectInput = ref('')
const taskInput = ref('')

// Function to delete a task
const deleteTask = (id) => {
  projects.value = projects.value.filter(task => task.id !== id)
}

// Add timer to list
const addTask = async () => {
  // Inputs not empty
  if (projectInput.value && taskInput.value) {
    const isDuplicate = projects.value.some(
      task => task.project === projectInput.value && task.task === taskInput.value
    )
    
    // Timer does not exist already
    if (!isDuplicate) {
      projects.value.push({
        id: generateId(),
        project: projectInput.value,
        task: taskInput.value,
      })
      projectInput.value = ''
      taskInput.value = ''
    } else {
      alert('Task already exists.')
    }
  }
}

const currentTimer = ref(0)

const stop_play = (id) => {
  currentTimer.value = id
}

const addRandomTask = async () => {
  const projectName = await getRandomProject();
  const taskName = await getRandomTask();
  projectInput.value = projectName;
  taskInput.value = taskName;
  addTask();
}

</script>

<template>
  <h1>Task Timer</h1>

  <div class="timer-container">
    <div class="controls">
      <input type="text" id="project" placeholder="Project" v-model="projectInput">
      <input type="text" id="task" placeholder="Task" v-model="taskInput">
      <div class="buttons">
        <button id="stop" @click="addTask"><span>Create Timer</span></button>
        <button id="random" @click="addRandomTask"><span>Create Random Timer</span></button>
      </div>
    </div>
    <table class="task-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Task</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Time
          v-for="task in projects" 
          :key="task.id" 
          :project="task.project" 
          :task="task.task" 
          :active="currentTimer.value === task.id" 
          :onDelete="() => deleteTask(task.id)"
          :taskId="task.id"
          @stop_play="stop_play"
          ref="childCompRef"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #ffffffaa);
  }

  .task-table {
    width: 100%;
    border-collapse: collapse;
  }

  th{
    border: 1px solid white;
    padding: 8px;
    text-align: left;
    background-color: #333;
    color: white;
  }
</style>
