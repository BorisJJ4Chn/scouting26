<script setup>
import { inject, ref } from 'vue'

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

// 注入全局计时器
const timer = inject('timer', {
  getTime: () => 0
})

// 按钮点击事件处理
const handleClick = () => {
  // 获取当前时间
  const currentTime = timer.getTime()
  
  // 向控制台输出当前时间和按钮名称
  console.log(`[CountButton] ${props.name}: ${currentTime} ms`)
  
  // 触发点击事件
  emit('click', { name: props.name, time: currentTime })
  
  // 点击后失去焦点
  if (buttonRef.value) {
    buttonRef.value.blur()
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    class="count-button"
    :style="style"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>

<style scoped>
.count-button {
  position: absolute;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  font-size: 1.5vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.count-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>