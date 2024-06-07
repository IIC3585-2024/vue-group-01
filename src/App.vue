<script setup>
import { ref, computed } from 'vue'
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
const goalInput = ref(600)

// Search term for filtering
const searchTerm = ref('')

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
        goal: goalInput.value,
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
  goalInput.value = Math.floor(Math.random() * 600) + 1;
  addTask();
}

// Computed property to filter projects
const filteredProjects = computed(() => {
  if (!searchTerm.value) {
    return projects.value;
  }
  return projects.value.filter(project =>
    project.project.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    project.task.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

</script>

<template>
  <h1>Task Timer</h1>

  <div class="timer-container">
    <div class="controls">
      <input type="text" id="project" placeholder="Project" v-model="projectInput">
      <input type="text" id="task" placeholder="Task" v-model="taskInput">
      <input type="number" id="goal" placeholder="Goal (in seconds)" v-model="goalInput">
    </div>
    <div class="buttons">
        <button id="stop" @click="addTask"><span>Create Timer</span></button>
        <button id="random" @click="addRandomTask"><span>Create Random Timer</span></button>
      </div>
    <div class="search">
      <input type="text" placeholder="Search..." v-model="searchTerm">
    </div>
    <table class="task-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Task</th>
          <th>Remaining</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Time
          v-for="task in filteredProjects" 
          :key="task.id" 
          :project="task.project" 
          :task="task.task"
          :goal="task.goal"
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
  .timer-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .search {
    margin-bottom: 20px;
  }

  .search input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
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
