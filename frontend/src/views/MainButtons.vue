<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { COLORS, ALLIANCE, STATES } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import OptionButton from '../components/OptionButton.vue'
import CountButton from '../components/CountButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

// 获取 store
const store = useRobotStateStore()

const handleBack = () => {
  store.setIsInState(true)
}

const handleOut = () => {
  store.setIsInState(false)
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

const accuracy = ref(50.0)

</script>

<template>
  <!-- 第三组 -->
  <CountButton 
    name="吸中场"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸中场') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && !store.hasBall)"
    @click="handleGetBallOut"
  />
  <CountButton 
    name="吸DEPOT"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸DEPOT') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && !store.hasBall)"
    @click="handleGetBallIn"
  />
  <CountButton 
    name="吸OUTPOST"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸OUTPOST') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && !store.hasBall)"
    @click="handleGetBallIn"
  />

  <!-- 第四组 -->
  <CountButton 
    name="出程：洞"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：洞') }"
    @click="handleOut"
    :disabled="!(store.getPreLoadEnded && store.isInState)"
  />
  <CountButton 
    name="回程：洞"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：洞') }"
    @click="handleBack"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
  />
  <CountButton 
    name="出程：坡"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：坡') }"
    @click="handleOut"
    :disabled="!(store.getPreLoadEnded && store.isInState)"
  />
  <CountButton 
    name="回程：坡"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：坡') }"
    @click="handleBack"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
  />

  <!-- 第六组 -->
  <CountButton 
    name="撞车"
    :style="{ backgroundColor: COLORS.VIOLET, ...getButtonPosition('撞车') }"
    :disabled="!(!store.isInState && store.getPreLoadEnded)"
  />

  <!-- 第八组 -->
  <CountButton 
    name="hub下"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('hub下') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.hasBall
      && store.currentState !== STATES.INACTIVE
      && store.groupAccuracy.selected()
    )"
    @click="handleReleaseBall"
  />

  <CountButton 
    name="线后"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('线后') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.hasBall
      && store.currentState !== STATES.INACTIVE
      && store.groupAccuracy.selected()
    )"
    @click="handleReleaseBall"
  />

  <CountButton 
    name="靠塔"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('靠塔') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.hasBall
      && store.currentState !== STATES.INACTIVE
      && store.groupAccuracy.selected()
    )"
    @click="handleReleaseBall"
  />

  <CountButton 
    name="任意"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('任意') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.hasBall
      && store.currentState !== STATES.INACTIVE
      && store.groupAccuracy.selected()
    )"
    @click="handleReleaseBall"
  />
  <!-- 滑动条部分 -->
  <OptionButton
    name="确认"
    groupName="groupAccuracy"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('准确率') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.hasBall && store.currentState !== STATES.INACTIVE)"
  />
  <div
    class='m-global-button'
    :style="{ background: COLORS.YELLOW, ...getButtonPosition('滑动条'), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1vw' }"
    :class="{'disabled': !store.getPreLoadEnded || !store.isInState || !store.hasBall || store.currentState === STATES.INACTIVE}"
    >
    <div 
      class="m-global-button"
      :style="{ textAlign: 'center', marginBottom: '0.5vw' }"
      :class="{'disabled': !store.getPreLoadEnded || !store.isInState || !store.hasBall || store.currentState === STATES.INACTIVE}"
    >
      准确率：{{ accuracy.toFixed(0) }}%
    </div>
    <div style="width: 90%; align-items: center;">
      <input 
        type="range" 
        min="0" 
        max="100" 
        step="0.1"
        class="m-global-button"
        :style="{ center: 'center', width: '80%', height: '60%' }"
        @input="(e) => { accuracy = parseFloat(e.target.value) }"
        :disabled="!store.getPreLoadEnded || !store.isInState || !store.hasBall || store.currentState === STATES.INACTIVE"
      />
    </div>
  </div>
</template>