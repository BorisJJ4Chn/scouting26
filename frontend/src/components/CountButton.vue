<script setup>
import { useRobotStateStore } from '../store/RobotState.js'
import { ref } from 'vue'
import { request } from '../utils/request.js'

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
  },
  attachment: {
    type: Object,
    default: () => ({})
  },
  // 按钮是否需要
  required: {
    type: Boolean,
    default: true
  },
  showInTimer: {
    type: Boolean,
    default: true
  }
})

// 定义组件事件
const emit = defineEmits(['click'])

// 按钮点击事件处理
const handleClick = () => {
  // 获取当前时间
  const currentTime = store.timer.getTime()

  if (props.showInTimer) {
    store.triggeredButtons.push({
      name: props.name,
      time: currentTime,
      backgroundColor: window.getComputedStyle(buttonRef.value).backgroundColor
    })
  }
  
  // 向控制台输出当前时间和按钮名称 如果按钮需要
  if (props.required) {
    // 发送请求
    request.post('/api/count-button', {
      timestamp: currentTime,
      ...props.attachment
    }).catch((err) => {
      console.error(err)
    })
  }
  buttonRef.value.classList.remove('no-hover')
  setTimeout(() => {
    buttonRef.value.classList.add('no-hover')
    buttonRef.value.blur()
  }, 300)
  
  // 触发点击事件
  emit('click', { name: props.name, time: currentTime })
}

</script>

<template>
  <button
    ref="buttonRef"
    class="m-global-button"
    :style="style"
    style="border: 0.3vw solid #FFD700;"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>