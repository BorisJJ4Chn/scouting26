<script setup>
import { reactive, onMounted, defineExpose } from 'vue'
import { useEditManagerStore } from "../../store/EditManager.js"

const store = useEditManagerStore()
const newAction = reactive({
  type: 'shuttle',
  timestamp: null,
  direction: null,
  position: null,
})

defineExpose({
    newAction
})

onMounted(() => {
  newAction.timestamp = store.actionThisTime.timestamp
  newAction.direction = store.actionThisTime.direction
  newAction.position = store.actionThisTime.position
})
</script>

<template>
  <div class="action-editing">
    <h2>移动</h2>
    <div class="action-item">
      <label class="action-label">时间戳：</label>
      <span>
        <input class="action-number" type="number" v-model="newAction.timestamp" />
        ms
      </span>
    </div>
    <div class="action-item">
      <label class="action-label">移动方向：</label>
      <select class="action-select" v-model="newAction.direction">
        <option class="action-option" value="out">出程</option>
        <option class="action-option" value="back">回程</option>
      </select>
    </div>
    <div class="action-item">
      <label class="action-label">移动位置：</label>
      <select class="action-select" v-model="newAction.position">
        <option class="action-option" value="trench">洞</option>
        <option class="action-option" value="bump">坡</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.action-editing {
    display: flex;
    flex-direction: column;
    gap: 4%;
    padding: 4%;
}

.action-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5vw;
    gap: 2vw;
}

.action-label {
    color: #FFFFFF;
    font-size: 1.2vw;
}

.action-select {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
.action-option {
    font-size: 1.2vw;
}

.action-number {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
</style>
