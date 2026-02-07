<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getButtonPosition } from './ButtonPositionConfig.js'
import { useRobotStateStore } from '../store/RobotState.js'
import { STATES, STATES_TO_SHOW, COLORS } from '../constants.js'

const store = useRobotStateStore()

// 显示的时间
const displayTime = ref(0.0)

// 更新时间的定时器
let timeUpdateInterval = null

// 开始更新时间
const startUpdatingTime = () => {
  timeUpdateInterval = setInterval(() => {
    if (store.currentState === STATES.AUTO) {
      displayTime.value = 20.0 - store.timer.getTime() / 1000.0
    }
    else if (store.currentState === STATES.AUTO_PAUSE) {
      displayTime.value = 0.0
    }
    else {
      displayTime.value = 163.0 - store.timer.getTime() / 1000.0
    }
    store.toggleState(store.timer.getTime())
  }, 19) // 每19毫秒更新一次
}

const getStateDisplay = computed(() => {
  return '状态：' + STATES_TO_SHOW[store.currentState] || store.currentState
})

// 停止更新时间
const stopUpdatingTime = () => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
    timeUpdateInterval = null
  }
}

onMounted(() => {
  startUpdatingTime()
})

onUnmounted(() => {
  stopUpdatingTime()
})

</script>

<template>
  <!-- 状态显示 -->
  <div
    class="m-global-button"
    :style="{ ...getButtonPosition('当前状态'), fontSize: '1vw', backgroundColor: COLORS.BLACK_TRANSPARENT }"
  >
    {{ getStateDisplay }}
  </div>

  <!-- 计时器显示 -->
  <div
    class="m-global-button"
    :style="{ ...getButtonPosition('计时器'), fontSize: '1vw', backgroundColor: COLORS.BLACK_TRANSPARENT }"
  >
    {{ displayTime.toFixed(2) }} s
  </div>
</template>
