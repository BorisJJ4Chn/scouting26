<script setup>
import { ref } from 'vue'
import { COLORS, ALLIANCE } from '../constants'
import { prematchPositions } from './PreMatchConfig'

const props = defineProps({
  alliance: {
    type: String,
    default: ALLIANCE.RED
  }
})

const emit = defineEmits(['confirm'])

// 前三个按钮互斥组
const platformGroup = ref('')

// 后五个按钮互斥组
const positionGroup = ref('')

// 按钮点击处理函数
const handlePlatformClick = (value) => {
  platformGroup.value = value
}

const handlePositionClick = (value) => {
  positionGroup.value = value
}

// 获取按钮颜色
const getButtonColor = () => {
  return props.alliance === ALLIANCE.RED ? COLORS.RED : COLORS.BLUE
}

// 获取按钮位置
const getButtonPosition = (buttonName) => {
  return prematchPositions[props.alliance][buttonName] || { top: '0%', left: '0%' }
}
</script>

<template>
  <div class="prematch-container">
    <!-- 前三个按钮：左台、中台、右台 -->
    <button 
      class="prematch-button"
      :class="{ active: platformGroup === '左台' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左台') }"
      @click="handlePlatformClick('左台')"
    >
      左台
    </button>
    
    <button 
      class="prematch-button"
      :class="{ active: platformGroup === '中台' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('中台') }"
      @click="handlePlatformClick('中台')"
    >
      中台
    </button>
    
    <button 
      class="prematch-button"
      :class="{ active: platformGroup === '右台' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右台') }"
      @click="handlePlatformClick('右台')"
    >
      右台
    </button>
    
    <!-- 后五个按钮：左洞、左坡、Hub、右坡、右洞 -->
    <button 
      class="prematch-button"
      :class="{ active: positionGroup === '左洞' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左洞') }"
      @click="handlePositionClick('左洞')"
    >
      左洞
    </button>
    
    <button 
      class="prematch-button"
      :class="{ active: positionGroup === '左坡' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左坡') }"
      @click="handlePositionClick('左坡')"
    >
      左坡
    </button>
    
    <button 
      class="prematch-button"
      :class="{ active: positionGroup === 'Hub' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('Hub') }"
      @click="handlePositionClick('Hub')"
    >
      Hub
    </button>
    
    <button 
      class="prematch-button"
      :class="{ active: positionGroup === '右坡' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右坡') }"
      @click="handlePositionClick('右坡')"
    >
      右坡
    </button>
    
    <button 
      class="prematch-button"
      :class="{ active: positionGroup === '右洞' }"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右洞') }"
      @click="handlePositionClick('右洞')"
    >
      右洞
    </button>
    
    <!-- 确认按钮 -->
    <button 
      class="confirm-button"
      @click="emit('confirm')" :disabled="!platformGroup || !positionGroup"
      :style="{ ...getButtonPosition('confirm') }"
    >
      确认
    </button>
  </div>
</template>

<style scoped>
.prematch-container {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
}

.prematch-button {
  position: absolute;
  width: 6%;
  height: 15%;
  font-size: 1.2vw;
  border-radius: 1vw;
  border: none;
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

.prematch-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.prematch-button:active {
  transform: scale(0.95);
}

.prematch-button.active {
  box-shadow: 0 0 0 0.3vw rgba(255, 255, 255, 0.8);
}

.confirm-button {
  padding: 1.5vw 3vw;
  font-size: 2vw;
  border-radius: 1vw;
  border: none;
  background-color: #ffd93d;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  position: absolute;
}

.confirm-button:hover {
  background-color: #ffc107;
  transform: scale(1.05);
}

.confirm-button:active {
  transform: scale(0.95);
}

.confirm-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  transform: none;
}

.confirm-button:disabled:hover {
  background-color: #ccc;
  transform: none;
}
</style>