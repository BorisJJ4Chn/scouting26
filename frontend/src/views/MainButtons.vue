<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { COLORS, ALLIANCE } from '../constants.js'
import { getButtonPosition } from './ButtonPositionConfig.js'
import OptionButton from '../components/OptionButton.vue'
import CountButton from '../components/CountButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

const props = defineProps({
  alliance: {
    type: String,
    default: ALLIANCE.RED
  }
})

// 获取 store
const store = useRobotStateStore()

const handleBack = () => {
  store.setIsInState(true)
}

const handleOut = () => {
  store.setIsInState(false)
  store.increaseOutCount()
}

const handleGetBallIn = () => {
  store.setHasBall(true)
}
const handleGetBallOut = () => {
  store.setHasBall(true)
  store.setFromMid(true)
}
const handleReleaseBall = () => {
  store.setHasBall(false)
}

const handleClimbStart = () => {
  store.setClimbStarted(true)
}

</script>

<template>
  <!-- 第一组 -->
  <CountButton 
    name="爬升开始"
    groupName="group1"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('爬升开始') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && !store.getClimbStarted)"
    @click="handleClimbStart"
  />
  <OptionButton 
    name="左爬"
    groupName="group1"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('左爬') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getClimbStarted)"
  />
  <OptionButton 
    name="中爬"
    groupName="group1"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('中爬') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getClimbStarted)"
  />
  <OptionButton 
    name="右爬"
    groupName="group1"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('右爬') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getClimbStarted)"
  />

  <!-- 第二组 -->
  <OptionButton 
    name="成功"
    groupName="group2"
    :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('成功') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getClimbStarted && store.group1.selected())"
  />
  <OptionButton 
    name="失败"
    groupName="group2"
    :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('失败') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getClimbStarted && store.group1.selected())"
  />

  <!-- 第三组 -->
  <CountButton 
    name="吸中场"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸中场') }"
    :disabled="!(store.getPreLoadEnded && !store.getIsInState && !store.getHasBall)"
    @click="handleGetBallOut"
  />
  <CountButton 
    name="吸DEPOT"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸DEPOT') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && !store.getHasBall)"
    @click="handleGetBallIn"
  />
  <CountButton 
    name="吸OUTPOST"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸OUTPOST') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && !store.getHasBall)"
    @click="handleGetBallIn"
  />

  <!-- 第四组 -->
  <CountButton 
    name="出程：洞"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：洞') }"
    @click="handleOut"
    :disabled="!(store.getPreLoadEnded && store.getIsInState)"
  />
  <CountButton 
    name="回程：洞"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：洞') }"
    @click="handleBack"
    :disabled="!(store.getPreLoadEnded && !store.getIsInState)"
  />
  <CountButton 
    name="出程：坡"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：坡') }"
    @click="handleOut"
    :disabled="!(store.getPreLoadEnded && store.getIsInState)"
  />
  <CountButton 
    name="回程：坡"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：坡') }"
    @click="handleBack"
    :disabled="!(store.getPreLoadEnded && !store.getIsInState)"
  />

  <!-- 第六组 -->
  <CountButton 
    name="撞车"
    :style="{ backgroundColor: COLORS.VIOLET, ...getButtonPosition('撞车') }"
    :disabled="!(!store.getIsInState && store.getPreLoadEnded)"
  />

  <!-- 第八组 -->
  <CountButton 
    name="hub下"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('hub下') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getHasBall)"
    @click="handleReleaseBall"
  />

  <CountButton 
    name="线后"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('线后') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getHasBall)"
    @click="handleReleaseBall"
  />

  <CountButton 
    name="靠塔"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('靠塔') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getHasBall)"
    @click="handleReleaseBall"
  />

  <CountButton 
    name="任意"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('任意') }"
    :disabled="!(store.getPreLoadEnded && store.getIsInState && store.getHasBall)"
    @click="handleReleaseBall"
  />
</template>