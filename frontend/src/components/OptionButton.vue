<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {useRobotStateStore} from '../store/RobotState.js'

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
  // 分组名称
  groupName: {
    type: String,
    required: true
  },
  canDeselect: {
    type: Boolean,
    default: false
  },
  // 按钮样式（背景颜色、位置、大小）
  style: {
    type: Object,
    default: () => ({})
  }
})

// 定义组件事件
const emit = defineEmits(['select', 'deselect'])

// 获取全局选项按钮组实例
const optionButtonGroupManager = store.manager

// 计算属性，用于响应式更新选中状态
const isSelected = computed(() => {
  return optionButtonGroupManager.getGroup(props.groupName).getIfSelected(props.name)
})

// 按钮点击事件处理
const handleClick = () => {
  if (isSelected.value) {

    if (!props.canDeselect) {
      return
    }

    // 取消选择
    const success = optionButtonGroupManager.deselectOption(props.groupName, props.name)
    if (success) {
      emit('deselect', props.name)
    }
  } else {
    // 选择
    const success = optionButtonGroupManager.selectOption(props.groupName, props.name)
    if (success) {
      emit('select', props.name)
    }
  }
}

// 暴露方法给父组件
defineExpose({
  isSelected: () => selected.value
})

// 组件挂载时初始化
onMounted(() => {})

// 组件卸载时清理
onUnmounted(() => {
  // 如果按钮被选中，从分组中移除
  if (isSelected.value) {
    optionButtonGroupManager.deselectOption(props.groupName, props.name)
  }
})
</script>

<template>
  <button
    ref="buttonRef"
    class="m-global-button"
    :class="{ active: isSelected }"
    :style="style"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>