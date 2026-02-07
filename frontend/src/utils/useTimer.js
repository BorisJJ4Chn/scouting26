import { ref } from 'vue'

// 计时器 composable 函数
export function useTimer() {
  // 计时器状态
  const startTime = ref(null)

  // 开始计时
  const start = (offset = 0) => {
    startTime.value = Date.now() - offset
  }

  // 获取当前时间（毫秒）
  const getTime = () => {
    if (!startTime.value) return 0
    const ratio = 1.0
    return (Date.now() - startTime.value) * ratio
  }

  // 重置计时器
  const reset = () => {
    startTime.value = null
  }

  return {
    start,
    getTime,
    reset,
  }
}
