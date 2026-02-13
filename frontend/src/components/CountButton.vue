<script setup>
import { useRobotStateStore } from '../store/RobotState.js'
import { ref } from 'vue'

// 获取 store
const store = useRobotStateStore()

// 按钮引用
const buttonRef = ref(null)

// 定义组件 props
const props = defineProps({
  // 按钮名称
  name: {
    type: String,
    required: true
  },
  // 按钮样式（背景颜色、位置、大小）
  style: {
    type: Object,
    default: () => ({})
  }
})

// 定义组件事件
const emit = defineEmits(['click'])

// 按钮点击事件处理
const handleClick = () => {
  // 获取当前时间
  const currentTime = store.timer.getTime()
  
  // 向控制台输出当前时间和按钮名称
  console.log(`[CountButton] ${props.name}: ${currentTime} ms`)
  
  // 触发点击事件
  emit('click', { name: props.name, time: currentTime })
  
  // 点击后失去焦点
  if (buttonRef.value) {
    setTimeout(() => {
      if (buttonRef.value) {
        buttonRef.value.blur()
      }
    }, 400)
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    class="m-global-button"
    :style="style"
    style="box-shadow: 0 0 0.3vw rgba(255, 215, 0, 0.5), 0 0 0.8vw rgba(255, 215, 0, 0.3);"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>