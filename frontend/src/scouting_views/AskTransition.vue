<script setup>
import { computed, inject } from 'vue'
import { COLORS, ALLIANCE } from '../constants'
import CountButton from '../components/CountButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'

const store = useRobotStateStore()

// 获取当前联盟颜色
const getAllianceColor = (alliance) => {
  return alliance === ALLIANCE.RED ? COLORS.RED : COLORS.BLUE
}
const anotherAlliance = computed(() => {
  return store.alliance === ALLIANCE.RED ? ALLIANCE.BLUE : ALLIANCE.RED
})

const remainingCount = computed(() => {
  if (store.winner === null) {
    return '剩余3次'
  }
  if (store.winner === 1) {
    return '剩余2次'
  }
  return '按下后确认'
})

</script>

<template>
  <div
    class="m-global-button"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('询问Hub闪烁'), fontSize: '5vw' }"
  >
    是否看见本方Hub闪烁<br>（{{remainingCount}}）
  </div>
  <CountButton 
      name="是"
      :style="{ backgroundColor: getAllianceColor(store.alliance), ...getButtonPosition(store.alliance + '-Hub闪烁'), fontSize: '5vw' }"
      @click="store.updateWinner(store.alliance)"
      :required="false"
  />
  <CountButton 
      name="否"
      :style="{ backgroundColor: getAllianceColor(anotherAlliance), ...getButtonPosition(anotherAlliance + '-Hub闪烁'), fontSize: '5vw' }"
      @click="store.updateWinner(anotherAlliance)"
      :required="false"
  />
</template>
