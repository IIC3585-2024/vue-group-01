<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Time from './components/Time.vue'
</script>

<template>
  <h1>Task Timer</h1>
  <img src="./assets/icon.png" class="logo" alt="Icon"/>

  <div class="timer-container">
    <div class="controls">
      <input type="text" id="project" placeholder="Project" value="Project 1">
      <input type="text" id="task" placeholder="Task" value="Task 2">
      <div class="buttons">
        <button id="stop"><span>&#9724;</span></button>
        <button id="pause"><span>&#10074;&#10074;</span></button>
        <span id="timer">00:00:00</span>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Task</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Time project="Project 1" task="Task 1" />
        <Time project="Project 2" task="Task 1" />
        <Time project="Project 2" task="Task 2" />
        <Time project="Project 2" task="Task 3" />
        <Time project="Project 3" task="Task 1" />
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
</style>
