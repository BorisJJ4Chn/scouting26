<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { COLORS, ALLIANCE } from '../constants'
import { positions } from './AutoStateConfig'

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

// 第一组：4个互斥按钮（爬升位置）
const group1 = ref('')

// 第二组：2个互斥按钮（爬升结果）
const group2 = ref('')

// 第三组：3个互斥按钮（吸球位置）
const group3 = ref('')

// 第四组：2组互斥按钮（回程位置）
const group4 = ref('')

// 第五组：2个互斥按钮（中场方向）
const group5 = ref('')

// 第六组：单个按钮
const group6 = ref(false)

// 处理第一组按钮点击
const handleGroup1Click = (value) => {
  group1.value = value
  if (value === '未爬') {
    group2.value = ''
  }
}

// 处理第二组按钮点击
const handleGroup2Click = (value) => {
  group2.value = value
}

// 处理第三组按钮点击
const handleGroup3Click = (value) => {
  group3.value = value
  if (value !== '首吸中场') {
    group4.value = ''
    group5.value = ''
  }
}

// 处理第四组按钮点击
const handleGroup4Click = (value) => {
  group4.value = value
}

// 处理第五组按钮点击
const handleGroup5Click = (value) => {
  group5.value = value
}

// 处理第六组按钮点击
const handleGroup6Click = () => {
  group6.value = !group6.value
}

// 检查第二组按钮是否应该被禁用
const isGroup2Disabled = computed(() => {
  return group1.value === '未爬'
})

// 检查第四组按钮是否应该被禁用
const isGroup4Disabled = computed(() => {
  return group3.value !== '首吸中场'
})

// 检查第五组按钮是否应该被禁用
const isGroup5Disabled = computed(() => {
  return group3.value !== '首吸中场'
})
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
    <button 
      class="auto-button"
      :class="{ active: group1 === '未爬' }"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('未爬') }"
      @click="handleGroup1Click('未爬')"
    >
      未爬
    </button>
    <button 
      class="auto-button"
      :class="{ active: group1 === '左爬' }"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('左爬') }"
      @click="handleGroup1Click('左爬')"
    >
      左爬
    </button>
    <button 
      class="auto-button"
      :class="{ active: group1 === '中爬' }"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('中爬') }"
      @click="handleGroup1Click('中爬')"
    >
      中爬
    </button>
    <button 
      class="auto-button"
      :class="{ active: group1 === '右爬' }"
      :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('右爬') }"
      @click="handleGroup1Click('右爬')"
    >
      右爬
    </button>

    <!-- 第二组 -->
    <!-- 前提：第一组结果非“未爬” -->
    <button 
      class="auto-button"
      :class="{ active: group2 === '成功' }"
      :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('成功') }"
      :disabled="isGroup2Disabled"
      @click="handleGroup2Click('成功')"
    >
      成功
    </button>
    <button 
      class="auto-button"
      :class="{ active: group2 === '失败' }"
      :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('失败') }"
      :disabled="isGroup2Disabled"
      @click="handleGroup2Click('失败')"
    >
      失败
    </button>

    <!-- 第三组 -->
    <button 
      class="auto-button"
      :class="{ active: group3 === '首吸中场' }"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('首吸中场') }"
      @click="handleGroup3Click('首吸中场')"
    >
      首吸中场
    </button>
    <button 
      class="auto-button"
      :class="{ active: group3 === '首吸DEPOT' }"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('首吸DEPOT') }"
      @click="handleGroup3Click('首吸DEPOT')"
    >
      首吸DEPOT
    </button>
    <button 
      class="auto-button"
      :class="{ active: group3 === '首吸OUTPOST' }"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('首吸OUTPOST') }"
      @click="handleGroup3Click('首吸OUTPOST')"
    >
      首吸OUTPOST
    </button>
    <button 
      class="auto-button"
      :class="{ active: group3 === '无首吸' }"
      :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('无首吸') }"
      @click="handleGroup3Click('无首吸')"
    >
      无首吸
    </button>

    <!-- 第四组 -->
    <!-- 前提：第三组结果为“首吸中场” -->
    <button 
      class="auto-button"
      :class="{ active: group4 === '回程：洞' }"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：洞上') }"
      :disabled="isGroup4Disabled"
      @click="handleGroup4Click('回程：洞')"
    >
      回程：洞
    </button>
    <button 
      class="auto-button"
      :class="{ active: group4 === '回程：洞' }"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：洞下') }"
      :disabled="isGroup4Disabled"
      @click="handleGroup4Click('回程：洞')"
    >
      回程：洞
    </button>
    <button 
      class="auto-button"
      :class="{ active: group4 === '回程：坡' }"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：坡上') }"
      :disabled="isGroup4Disabled"
      @click="handleGroup4Click('回程：坡')"
    >
      回程：坡
    </button>
    <button 
      class="auto-button"
      :class="{ active: group4 === '回程：坡' }"
      :style="{ backgroundColor: COLORS.PINK, ...getButtonPosition('回程：坡下') }"
      :disabled="isGroup4Disabled"
      @click="handleGroup4Click('回程：坡')"
    >
      回程：坡
    </button>

    <!-- 第五组 -->
    <!-- 前提：第三组结果为“首吸中场” -->
    <button 
      class="auto-button"
      :class="{ active: group5 === '中切' }"
      :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('中切') }"
      :disabled="isGroup5Disabled"
      @click="handleGroup5Click('中切')"
    >
      中切
    </button>
    <button 
      class="auto-button"
      :class="{ active: group5 === '球阵角' }"
      :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('球阵角') }"
      :disabled="isGroup5Disabled"
      @click="handleGroup5Click('球阵角')"
    >
      球阵角
    </button>
    <button 
      class="auto-button"
      :class="{ active: group5 === '边切' }"
      :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('边切') }"
      :disabled="isGroup5Disabled"
      @click="handleGroup5Click('边切')"
    >
      边切
    </button>

    <!-- 第六组 -->
    <button 
      class="auto-button"
      :class="{ active: group6 }"
      :style="{ backgroundColor: COLORS.PURPLE, ...getButtonPosition('撞车') }"
      @click="handleGroup6Click()"
    >
      撞车
    </button>

    <!-- 下一阶段 -->
    <button 
      class="auto-button"
      :class="{ active: group7 === '计时器' }"
      :style="{ backgroundColor: COLORS.ORANGE, ...getButtonPosition('自动结束') }"
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
  opacity: 0.5;
  cursor: not-allowed;
}
</style>