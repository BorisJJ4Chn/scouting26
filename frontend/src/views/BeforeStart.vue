<script setup>
import { COLORS, ALLIANCE } from '../constants'

const props = defineProps({
  alliance: {
    type: String,
    default: ALLIANCE.RED
  }
})

const emit = defineEmits(['start'])

// 获取按钮颜色
const getButtonColor = () => {
  return props.alliance === ALLIANCE.RED ? COLORS.RED : COLORS.BLUE
}

// 处理开始按钮点击
const handleStartClick = () => {
  emit('start')
}
</script>

<template>
  <div class="before-start-container">
    <button 
      class="start-button"
      :style="{ backgroundColor: getButtonColor() }"
      @click="handleStartClick"
    >
      比赛开始
    </button>
  </div>
</template>

<style scoped>
.before-start-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-button {
  width: 100%;
  height: 100%;
  font-size: 5vw;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.5s ease-in;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeIn 0.2s ease-in forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.start-button:hover {
  opacity: 0.9;
}

.start-button:active {
  transform: scale(0.98);
}
</style>