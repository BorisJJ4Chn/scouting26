<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useOptionButtonGroup } from './useOptionButtonGroup'

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
  // 最大选择项数（-1表示任意）
  maxSelections: {
    type: Number,
    default: null
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
const optionButtonGroup = useOptionButtonGroup()

// 按钮选中状态
const isSelected = ref(false)

// 按钮点击事件处理
const handleClick = () => {
  if (isSelected.value) {
    // 取消选择
    const success = optionButtonGroup.deselectOption(props.groupName, props.name)
    if (success) {
      isSelected.value = false
      emit('deselect', props.name)
    }
  } else {
    // 选择
    const success = optionButtonGroup.selectOption(props.groupName, props.name)
    if (success) {
      isSelected.value = true
      emit('select', props.name)
    }
  }
  
  // 点击后失去焦点
  if (buttonRef.value) {
    buttonRef.value.blur()
  }
}

// 获取当前分组中选中的选项
const getSelectedOptions = () => {
  return optionButtonGroup.getSelectedOptions(props.groupName)
}

// 暴露方法给父组件
defineExpose({
  getSelectedOptions,
  isSelected: () => isSelected.value
})

// 组件挂载时初始化
onMounted(() => {
  // 设置分组最大选择项数
  if (props.maxSelections !== null) {
    optionButtonGroup.setMaxSelections(props.groupName, props.maxSelections)
  }
})

// 组件卸载时清理
onUnmounted(() => {
  // 如果按钮被选中，从分组中移除
  if (isSelected.value) {
    optionButtonGroup.deselectOption(props.groupName, props.name)
  }
})
</script>

<template>
  <button
    ref="buttonRef"
    class="option-button"
    :class="{ 'selected': isSelected }"
    :style="style"
    @click="handleClick"
  >
    {{ name }}
  </button>
</template>

<style scoped>
.option-button {
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

.option-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.option-button.selected {
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}
</style>