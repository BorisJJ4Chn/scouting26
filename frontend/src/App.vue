<script setup>
import { ref } from 'vue'

const leftTop = ref(0)
const leftBottom = ref(0)
const rightTop = ref(0)
const rightBottom = ref(0)
const centerResult = ref('')

const incrementLeftTop = () => {
  leftTop.value++
}

const incrementLeftBottom = () => {
  leftBottom.value++
}

const incrementRightTop = () => {
  rightTop.value++
}

const incrementRightBottom = () => {
  rightBottom.value++
}

import request from './utils/request'

const getRandomInt = async () => {
  try {
    const response = await request.get('/api/utils/randint')
    centerResult.value = response.data.result || response.data
  } catch (error) {
    centerResult.value = 'Error'
  }
}
</script>

<template>
  <div class="container">
    <div class="left-column">
      <button class="button" @click="incrementLeftTop">{{ leftTop }}</button>
      <button class="button" @click="incrementLeftBottom">{{ leftBottom }}</button>
    </div>
    <div class="center-column">
      <button class="button" @click="getRandomInt">{{ centerResult || 'Click' }}</button>
    </div>
    <div class="right-column">
      <button class="button" @click="incrementRightTop">{{ rightTop }}</button>
      <button class="button" @click="incrementRightBottom">{{ rightBottom }}</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2vw;
  width: 100vw;
  height: 100vh;
  padding: 2vw;
  box-sizing: border-box;
}

.left-column {
  grid-column: 1;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: center;
}

.center-column {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-column {
  grid-column: 3;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: center;
}

.button {
  width: 15vw;
  height: 15vw;
  font-size: 3vw;
  border-radius: 1vw;
  border: 0.3vw solid #333;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.button:hover {
  background-color: #3aa876;
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.95);
}

.center-column .button {
  width: 20vw;
  height: 20vw;
  font-size: 4vw;
  background-color: #646cff;
}

.center-column .button:hover {
  background-color: #535bf2;
}
</style>
