<script setup>
import { ref, computed } from 'vue'
import CountButton from './CountButton.vue'
import { COLORS } from '../constants.js'

// 定义组件 props
const props = defineProps({
  // 初始值
  initial: {
    type: Number,
    default: 0
  },
  // 最小值
  min: {
    type: Number,
    default: 0
  },
  // 最大值
  max: {
    type: Number,
    default: 100
  },
  // 步长
  step: {
    type: Number,
    default: 1
  },
  // 显示文本
  label: {
    type: String,
    default: ''
  },
  // 样式
  style: {
    type: Object,
    default: () => ({})
  }
})

// 计数器值
const count = ref(props.initial)

// 计算属性：是否可以减少
const canDecrease = computed(() => {
  return count.value > props.min
})

// 计算属性：是否可以增加
const canIncrease = computed(() => {
  return count.value < props.max
})

// 减少计数
const handleDecrease = () => {
  if (canDecrease.value) {
    count.value -= props.step
  }
}

// 增加计数
const handleIncrease = () => {
  if (canIncrease.value) {
    count.value += props.step
  }
}

</script>

<template>
  <div class="counter-bar-container" :style="style" style="position: absolute;">
    <!-- 减号按钮 -->
    <CountButton
      name="-"
      :style="{
        backgroundColor: COLORS.RED,
        left: '0%',
        right: '80%',
        top: '0%',
        bottom: '0%',
        margin: 0,
        borderRadius: '1vw 0 0 1vw'
      }"
      @click="handleDecrease"
      :disabled="!canDecrease"
    />
    
    <!-- 中间信息展示栏 -->
    <div class="counter-bar-text" >
      <template v-if="label">
        {{ label }}: {{ count }}
      </template>
      <template v-else>
        {{ count }}
      </template>
    </div>
    
    <!-- 加号按钮 -->
    <CountButton 
      name="+"
      :style="{
        backgroundColor: COLORS.GREEN,
        left: '80%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        margin: 0,
        borderRadius: '0 1vw 1vw 0'
      }"
      @click="handleIncrease"
      :disabled="!canIncrease"
    />
  </div>
</template>

<style scoped>
.counter-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1vw;
  overflow: hidden;
}

.counter-bar-text {
  font-size: 1vw;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 20%;
  right: 20%;
  top: 0%;
  bottom: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
