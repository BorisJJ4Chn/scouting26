<script setup>
import { ref, reactive, computed, inject, onMounted, onUnmounted } from 'vue'
import { COLORS, ALLIANCE } from '../constants'
import { positions } from './AutoStateConfig'
import OptionButton from '../components/OptionButton.vue'
import CountButton from '../components/CountButton.vue'
import { useOptionButtonManager } from '../components/OptionButtonGroupManager.js'

// 注入全局计时器功能
const timer = inject('timer')

// 显示的时间
const displayTime = ref(20.0)

// 更新时间的定时器
let timeUpdateInterval = null

// 开始更新时间
const startUpdatingTime = () => {
  timeUpdateInterval = setInterval(() => {
  if (timer.getTime() >= 23.0 * 1000) {
    emit('autoEnd')
  }
    displayTime.value = 20.0 - timer.getTime() / 1000.0
  }, 19) // 每100毫秒更新一次
}

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

const props = defineProps({
  alliance: {
    type: String,
    default: ALLIANCE.RED
  }
})

const emit = defineEmits(['autoEnd'])

// 获取按钮位置
const getButtonPosition = (buttonName) => {
  return positions[props.alliance][buttonName] || { top: '0%', left: '0%' }
}

const optionButtonManager = useOptionButtonManager()

// 删除旧分组
optionButtonManager.deleteGroupIfExist('group1')
optionButtonManager.deleteGroupIfExist('group2')
optionButtonManager.deleteGroupIfExist('group5')
optionButtonManager.deleteGroupIfExist('group7')

// 第一组：4个互斥按钮（爬升位置）
const group1 = optionButtonManager.createGroup('group1', 1)

// 第二组：2个互斥按钮（爬升结果）
const group2 = optionButtonManager.createGroup('group2', 1)

// 第三组：3个计次按钮（吸球位置）

// 第四.1组：2个计次按钮（出程位置）

// 第四.2组：2个计次按钮（回程位置）

// 第五组：3个计次按钮（中场方向）
const group5 = optionButtonManager.createGroup('group5', 1)

// 第六组：单个按钮（撞车）

// 第七组：2个互斥按钮（PreLoad）
const group7 = optionButtonManager.createGroup('group7', 1)

// 第八组：4个计次按钮（吸球后射球）



const preLoadEnded = computed(() => {
  return group7.selected()
})

const isInState = ref(true)

const stateForGroup5 = reactive({
  fromMid: null,
  outCount: 0,
})
const needChooseGroup5 = computed(() => {
  return stateForGroup5.fromMid !== null && stateForGroup5.outCount === 1
})

const handleInOut = (op) => {
  isInState.value = op === 'back'
  if (op === 'out') {
    stateForGroup5.outCount++
  }
}

const hasBall = ref(false)
const handleGetBall = () => {
  hasBall.value = true
}
const handleMid = () => {
  stateForGroup5.fromMid = true
}
const handleReleaseBall = () => {
  hasBall.value = false
}

const climbStarted = ref(false)
const handleClimbStart = () => {
  climbStarted.value = true
}


</script>

<template>
  <div class="auto-state-container">
    <!-- 计时器显示 -->
    <div
      class="timer-display"
      :style="{ ...getButtonPosition('计时器'), fontSize: '1vw' }"
    >
      {{ displayTime.toFixed(2) }} s
    </div>
    <!-- 第一组 -->
    <CountButton 
      class="auto-button"
      name="爬升开始"
      groupName="group1"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('爬升开始') }"
      :disabled="!(preLoadEnded && isInState && !climbStarted)"
      @click="handleClimbStart"
    />
    <OptionButton 
      class="auto-button"
      name="左爬"
      groupName="group1"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('左爬') }"
      :disabled="!(preLoadEnded && isInState && climbStarted)"
    />
    <OptionButton 
      class="auto-button"
      name="中爬"
      groupName="group1"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('中爬') }"
      :disabled="!(preLoadEnded && isInState && climbStarted)"
    />
    <OptionButton 
      class="auto-button"
      name="右爬"
      groupName="group1"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('右爬') }"
      :disabled="!(preLoadEnded && isInState && climbStarted)"
    />

    <!-- 第二组 -->
    <OptionButton 
      class="auto-button"
      name="成功"
      groupName="group2"
      :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('成功') }"
      :disabled="!(preLoadEnded && isInState && climbStarted && group1.selected())"
    />
    <OptionButton 
      class="auto-button"
      name="失败"
      groupName="group2"
      :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('失败') }"
      :disabled="!(preLoadEnded && isInState && climbStarted && group1.selected())"
    />

    <!-- 第三组 -->
    <CountButton 
      class="auto-button"
      name="吸中场"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸中场') }"
      :disabled="!(preLoadEnded && !isInState && !hasBall)"
      @click="handleGetBall(), handleMid()"
    />
    <CountButton 
      class="auto-button"
      name="吸DEPOT"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸DEPOT') }"
      :disabled="!(preLoadEnded && isInState && !hasBall)"
      @click="handleGetBall"
    />
    <CountButton 
      class="auto-button"
      name="吸OUTPOST"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸OUTPOST') }"
      :disabled="!(preLoadEnded && isInState && !hasBall)"
      @click="handleGetBall"
    />

    <!-- 第四组 -->
    <CountButton 
      class="auto-button"
      name="出程：洞"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：洞') }"
      @click="handleInOut('out')"
      :disabled="!(preLoadEnded && isInState)"
    />
    <CountButton 
      class="auto-button"
      name="回程：洞"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：洞') }"
      @click="handleInOut('back')"
      :disabled="!(preLoadEnded && !isInState)"
    />
    <CountButton 
      class="auto-button"
      name="出程：坡"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('出程：坡') }"
      @click="handleInOut('out')"
      :disabled="!(preLoadEnded && isInState)"
    />
    <CountButton 
      class="auto-button"
      name="回程：坡"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：坡') }"
      @click="handleInOut('back')"
      :disabled="!(preLoadEnded && !isInState)"
    />

    <!-- 第五组 -->
    <OptionButton 
      class="auto-button"
      name="中切"
      groupName="group5"
      :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('中切') }"
      :disabled="!(preLoadEnded && !isInState && needChooseGroup5)"
    />
    <OptionButton 
      class="auto-button"
      name="球阵角"
      groupName="group5"
      :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('球阵角') }"
      :disabled="!(preLoadEnded && !isInState && needChooseGroup5)"
    />
    <OptionButton 
      class="auto-button"
      name="边切"
      groupName="group5"
      :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('边切') }"
      :disabled="!(preLoadEnded && !isInState && needChooseGroup5)"
    />

    <!-- 第六组 -->
    <CountButton 
      class="auto-button"
      name="撞车"
      :style="{ backgroundColor: COLORS.VIOLET, ...getButtonPosition('撞车') }"
      :disabled="!(!isInState && preLoadEnded)"
    />

    <!-- 第七组 -->
    <OptionButton 
      class="auto-button"
      name="PreLoad没射"
      groupName="group7"
      :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad没射') }"
    />

    <OptionButton 
      class="auto-button"
      name="PreLoad射丢"
      groupName="group7"
      :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad射丢') }"
    />

    <OptionButton 
      class="auto-button"
      name="PreLoad全进"
      groupName="group7"
      :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad全进') }"
    />

    <!-- 第八组 -->
    <CountButton 
      class="auto-button"
      name="hub下"
      :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('hub下') }"
      :disabled="!(preLoadEnded && isInState && hasBall)"
      @click="handleReleaseBall"
    />

    <CountButton 
      class="auto-button"
      name="线后"
      :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('线后') }"
      :disabled="!(preLoadEnded && isInState && hasBall)"
      @click="handleReleaseBall"
    />

    <CountButton 
      class="auto-button"
      name="靠塔"
      :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('靠塔') }"
      :disabled="!(preLoadEnded && isInState && hasBall)"
      @click="handleReleaseBall"
    />

    <CountButton 
      class="auto-button"
      name="任意"
      :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('任意') }"
      :disabled="!(preLoadEnded && isInState && hasBall)"
      @click="handleReleaseBall"
    />

    <!-- 下一阶段 -->
    <button 
      class="auto-button"
      :style="{ backgroundColor: COLORS.BLACK, ...getButtonPosition('自动结束') }"
      :disabled="timer.getTime() < 20.0 * 1000"
      @click="emit('autoEnd')"
    >
      自动结束
    </button>
  </div>
</template>

<style scoped>
.auto-state-container {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
}

.timer-display {
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1vw;
  border-radius: 1vw;
  z-index: 200;
}

.auto-button {
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

.auto-button:hover:not(:disabled) {
  transform: scale(1.05);
  opacity: 0.9;
}

.auto-button:active:not(:disabled) {
  transform: scale(0.95);
}

.auto-button.active {
  box-shadow: 0 0 0 0.3vw rgba(255, 255, 255, 0.8);
}

.auto-button:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>