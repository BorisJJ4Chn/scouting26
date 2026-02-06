<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import Init from './views/Init.vue'
import PreMatch from './views/PreMatch.vue'
import BeforeStart from './views/BeforeStart.vue'
import AutoState from './views/AutoState.vue'
import OptionButton from './components/OptionButton.vue'
import CountButton from './components/CountButton.vue'
import { COLORS, ALLIANCE } from './constants'

// 状态机状态定义
const STATES = {
  INIT: 'init',
  PREMATCH: 'prematch',
  BEFORE_START: 'beforeStart',
  AUTO: 'auto',
  TRANSITION: 'transition',
  ON: 'on',
  OFF: 'off',
  ENDGAME: 'endgame'
}

const currentState = ref(STATES.INIT)
const alliance = ref(ALLIANCE.RED)
const containerSize = ref({ width: 0, height: 0 })

// 计时器状态
const startTime = ref(null)

// 开始计时
const startTimer = () => {
  startTime.value = Date.now()
}

// 获取当前时间（毫秒）
const getCurrentTime = () => {
  if (!startTime.value) return 0
  return Date.now() - startTime.value
}

// 提供全局计时器功能
provide('timer', {
  start: startTimer,
  getTime: getCurrentTime
})

const backgroundImage = computed(() => {
  return alliance.value === ALLIANCE.RED ? '/red.png' : '/blue.png'
})

const handleConfirm = (data) => {
  alliance.value = data.alliance
  currentState.value = STATES.PREMATCH
  updateContainerSize()
}

const handleAllianceChange = (newAlliance) => {
  alliance.value = newAlliance
  updateContainerSize()
}

const handlePreMatchConfirm = () => {
  currentState.value = STATES.BEFORE_START
}

const handleStart = () => {
  startTimer()
  currentState.value = STATES.AUTO
}

const handleAutoEnd = () => {
  currentState.value = STATES.TRANSITION
}

// 计算并更新容器大小以匹配背景图片
const updateContainerSize = () => {
  const img = new Image()
  img.src = backgroundImage.value
  img.onload = () => {
    const imgWidth = img.width
    const imgHeight = img.height
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    // 计算图片在屏幕中的最大显示尺寸（保持宽高比）
    const scale = Math.min(
      windowWidth / imgWidth,
      windowHeight / imgHeight
    )
    
    containerSize.value = {
      width: imgWidth * scale,
      height: imgHeight * scale
    }
  }
}

// 监听窗口大小变化
const handleResize = () => {
  updateContainerSize()
}

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <div 
    class="container" 
    :style="{
      backgroundImage: `url(${backgroundImage})`,
      width: containerSize.width + 'px',
      height: containerSize.height + 'px'
    }"
  >
    <template v-if="currentState === STATES.INIT">
      <div class="init-section">
        <Init @confirm="handleConfirm" @allianceChange="handleAllianceChange" />
      </div>
    </template>
    <template v-else-if="currentState === STATES.PREMATCH">
      <div class="buttons-section">
        <PreMatch :alliance="alliance" @confirm="handlePreMatchConfirm" />
      </div>
    </template>
    <template v-else-if="currentState === STATES.BEFORE_START">
      <div class="buttons-section">
        <BeforeStart :alliance="alliance" @start="handleStart" />
      </div>
    </template>
    <template v-else-if="currentState === STATES.AUTO">
      <div class="buttons-section">
        <AutoState :alliance="alliance" @autoEnd="handleAutoEnd" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  margin: 0;
  left: 0;
  border: 1px solid #fff;
}

.init-section,
.buttons-section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}
</style>
