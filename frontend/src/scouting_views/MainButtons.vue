<script setup>
import { COLORS, STATES } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import CountButton from '../components/CountButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'
import { request } from '../utils/request.js'

// 获取 store
const store = useRobotStateStore()

const handleBack = () => {
  store.setIsInState(true)
}

const handleOut = () => {
  store.setIsInState(false)
}

const handleReleaseBall = (position) => {
  let EngName = {
    'Hub下': 'below_hub',
    '线下': 'near_line',
    '靠塔': 'near_tower',
    '任意': 'other',
  }
  request.post('/api/count-button', {
    timestamp: store.timer.getTime(),
    type: 'release_ball',
    position: EngName[position],
    moving: '跑打' in store.groupActive.selectedOptions,
    defended: '被防守' in store.groupActive.selectedOptions,
  }).catch((err) => {
    console.error(err)
  })
  store.manager.deselectOptions('groupActive', store.groupActive.selectedOptions.slice())
}

</script>

<template>
  <!-- 第三组 -->
  <CountButton 
    name="吸中场"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸中场') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    @click="store.setFromMid(true)"
    :attachment="{ type: 'collect_ball', position: 'mid' }"
  />
  <CountButton 
    name="吸DEPOT"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸DEPOT') }"
    :disabled="!(store.getPreLoadEnded && store.isInState)"
    :attachment="{ type: 'collect_ball', position: 'depot' }"
  />
  <CountButton 
    name="吸OUTPOST"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸OUTPOST') }"
    :disabled="!(store.getPreLoadEnded && store.isInState)"
    :attachment="{ type: 'collect_ball', position: 'outpost' }"
  />

  <!-- 第四组 -->
  <CountButton 
    name="出程：洞"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：洞') }"
    @click="handleOut"
    :disabled="!(store.getPreLoadEnded && store.isInState)"
    :attachment="{ type: 'shuttle', direction: 'out', position: 'trench' }"
  />
  <CountButton 
    name="回程：洞"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：洞') }"
    @click="handleBack"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    :attachment="{ type: 'shuttle', direction: 'back', position: 'trench' }"
  />
  <CountButton 
    name="出程：坡"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：坡') }"
    @click="handleOut"
    :disabled="!(store.getPreLoadEnded && store.isInState)"
    :attachment="{ type: 'shuttle', direction: 'out', position: 'bump' }"
  />
  <CountButton 
    name="回程：坡"
    :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：坡') }"
    @click="handleBack"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    :attachment="{ type: 'shuttle', direction: 'back', position: 'bump' }"
  />

  <!-- 第六组 -->
  <CountButton 
    name="撞车"
    :style="{ backgroundColor: COLORS.VIOLET, ...getButtonPosition('撞车') }"
    :disabled="!(!store.isInState && store.getPreLoadEnded)"
    :attachment="{ type: 'collision' }"
  />

  <!-- 第八组 -->
  <CountButton 
    name="hub下"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('hub下') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.currentState !== STATES.INACTIVE
    )"
    @click="handleReleaseBall"
    :required="false"
  />

  <CountButton 
    name="线后"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('线后') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.currentState !== STATES.INACTIVE
    )"
    @click="handleReleaseBall"
    :required="false"
  />

  <CountButton 
    name="靠塔"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('靠塔') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.currentState !== STATES.INACTIVE
    )"
    @click="handleReleaseBall"
    :required="false"
  />

  <CountButton 
    name="任意"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('任意') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.isInState
      && store.currentState !== STATES.INACTIVE
    )"
    @click="handleReleaseBall"
    :required="false"
  />
</template>