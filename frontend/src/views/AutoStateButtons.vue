<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import OptionButton from '../components/OptionButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

const emit = defineEmits(['autoEnd'])

const timeNow = ref(0.0)

// 获取 store
const store = useRobotStateStore()

let timeUpdateInterval = null

// 开始更新时间
const startUpdatingTime = () => {
  timeUpdateInterval = setInterval(() => {
    timeNow.value = store.timer.getTime()
  }, 19) // 每19毫秒更新一次
}

onMounted(() => {
  startUpdatingTime()
})

onUnmounted(() => {
  clearInterval(timeUpdateInterval)
})

</script>

<template>
  <!-- 第五组：三个黄色按钮（中场方向） -->
  <OptionButton 
    class="_m_button"
    name="中切"
    groupName="group5"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('中切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />
  <OptionButton 
    class="_m_button"
    name="球阵角"
    groupName="group5"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('球阵角') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />
  <OptionButton 
    class="_m_button"
    name="边切"
    groupName="group5"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('边切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />

  <!-- 第七组：PreLoad 按钮 -->
  <OptionButton 
    class="_m_button"
    name="PreLoad没射"
    groupName="group7"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad没射') }"
  />

  <OptionButton 
    class="_m_button"
    name="PreLoad射丢"
    groupName="group7"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad射丢') }"
  />

  <OptionButton 
    class="_m_button"
    name="PreLoad全进"
    groupName="group7"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad全进') }"
  />
</template>

<style scoped>
.auto-state-container {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
}

._m_button {
  position: absolute;
  width: 10%;
  height: 6%;
  font-size: 1.1vw;
  border: none;
  border-radius: 1vw;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
}

._m_button:hover:not(:disabled) {
  transform: scale(1.05);
  opacity: 0.9;
}

._m_button:active:not(:disabled) {
  transform: scale(0.95);
}

._m_button.active {
  box-shadow: 0 0 0 0.3vw rgba(255, 255, 255, 0.8);
}

._m_button:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>