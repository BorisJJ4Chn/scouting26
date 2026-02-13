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
    name="中切"
    groupName="group5"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('中切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />
  <OptionButton 
    name="球阵角"
    groupName="group5"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('球阵角') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />
  <OptionButton 
    name="边切"
    groupName="group5"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('边切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />

  <!-- 第七组：PreLoad 按钮 -->
  <OptionButton 
    name="PreLoad没射"
    groupName="group7"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad没射') }"
  />

  <OptionButton 
    name="PreLoad射丢"
    groupName="group7"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad射丢') }"
  />

  <OptionButton 
    name="PreLoad全进"
    groupName="group7"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad全进') }"
  />
</template>