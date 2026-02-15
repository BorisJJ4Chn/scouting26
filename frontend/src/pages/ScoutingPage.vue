<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Init from '../scouting_views/Init.vue'
import PreMatch from '../scouting_views/PreMatch.vue'
import BeforeStart from '../scouting_views/BeforeStart.vue'
import AutoState from '../scouting_views/AutoStateButtons.vue'
import MainButtons from '../scouting_views/MainButtons.vue'
import TimerAndState from '../scouting_views/TimerAndState.vue'
import ActiveStateButtons from '../scouting_views/ActiveStateButtons.vue'
import ClimbPositionButtons from '../scouting_views/ClimbPositionButtons.vue'
import ClimbUpButtons from '../scouting_views/ClimbUpButtons.vue'
import TeleopStateCounters from '../scouting_views/TeleopStateCounters.vue'
import { ALLIANCE, STATES } from '../constants.js'
import { useRobotStateStore } from '../store/RobotState.js'
import AskTransition from '../scouting_views/AskTransition.vue'

const containerSize = ref({ width: 0, height: 0 })

const store = useRobotStateStore()
store.createOptionButtonGroups()
store.createCounters([
  '推球回家次数',
  '推球进outpost次数',
  '阻挡路线/pin次数',
  '冲撞射球次数',
  '普通犯规次数',
  '技术犯规次数',
  '中场运球次数',
  '前场运球次数',
])

const backgroundImage = computed(() => {
  return store.alliance === ALLIANCE.RED ? './red.png' : './blue.png'
})

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

watch(() => store.currentState, (newState) => {
  if (newState === STATES.AUTO) {
    store.timer.start()
  }
})

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)
  store.createOptionButtonGroups()
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
    <template v-if="store.currentState === STATES.INIT">
      <Init />
    </template>
    <template v-if="store.currentState === STATES.PREMATCH">
      <PreMatch />
    </template>
    <template v-if="store.currentState === STATES.BEFORE_START">
      <BeforeStart />
    </template>

    <template v-if="
      store.currentState === STATES.AUTO
        || store.currentState === STATES.AUTO_PAUSE
        || store.currentState === STATES.TRANSITION
        || store.currentState === STATES.TRANSITION_RESULT
        || store.currentState === STATES.ACTIVE
        || store.currentState === STATES.INACTIVE
        || store.currentState === STATES.ENDGAME
    ">
      <TimerAndState />
    </template>

    <template v-if="store.currentState === STATES.AUTO">
      <AutoState />
    </template>

    <template v-if="
      store.currentState === STATES.AUTO
        || store.currentState === STATES.AUTO_PAUSE
    ">
      <ClimbUpButtons />
    </template>

    <template v-if="
      store.currentState === STATES.TRANSITION
        || store.getTransitionAlready
        || store.currentState === STATES.ENDGAME
        || store.currentState === STATES.ACTIVE
        || store.currentState === STATES.INACTIVE
        || store.currentState === STATES.ENDGAME
    ">
      <ClimbUpButtons />
    </template>

    <template v-if="
      store.currentState === STATES.AUTO
        || store.currentState === STATES.TRANSITION
        || store.getTransitionAlready
        || store.currentState === STATES.ACTIVE
        || store.currentState === STATES.INACTIVE
        || store.currentState === STATES.ENDGAME
    ">
      <MainButtons />
    </template>

    <template v-if="
      store.currentState === STATES.TRANSITION_RESULT
        && !store.getTransitionAlready
    ">
      <AskTransition />
    </template>

    <template v-if="
      store.currentState === STATES.ACTIVE
        || store.currentState === STATES.ENDGAME
    ">
      <ActiveStateButtons />
    </template>

    <template v-if="
      store.currentState === STATES.TRANSITION
        || store.getTransitionAlready
        || store.currentState === STATES.ACTIVE
        || store.currentState === STATES.INACTIVE
        || store.currentState === STATES.ENDGAME
    ">
      <ClimbPositionButtons />
    </template>

    <template v-if="
      store.currentState === STATES.TRANSITION
        || store.getTransitionAlready
        || store.currentState === STATES.ACTIVE
        || store.currentState === STATES.INACTIVE
        || store.currentState === STATES.ENDGAME
    ">
      <TeleopStateCounters />
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
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  left: auto;
  border: 1px solid #fff;
}
</style>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000;
}

/* 确保容器在父元素中居中 */
#app {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.m-global-button {
  position: absolute;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  font-size: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  color: white;
  white-space: normal;
  word-wrap: break-word;
}

.m-global-button:hover:not(:disabled, .disabled, .active) {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
}

.m-global-button:active:not(:disabled, .disabled) {
  border: 2px solid #fff;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
  transform: scale(0.95);
}

.m-global-button.active {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8);
}

.m-global-button:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.m-global-button.disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>
