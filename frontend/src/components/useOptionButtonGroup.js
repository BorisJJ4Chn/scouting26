import { provide, inject } from 'vue'

// 选项按钮组管理类
export class OptionButtonGroup {
  constructor() {
    this.groups = {}
    this.counter = 0
  }

  // 获取或创建分组
  getGroup(groupName) {
    if (!this.groups[groupName]) {
      this.groups[groupName] = {
        selectedOptions: [],
        maxSelections: -1
      }
    }
    return this.groups[groupName]
  }

  // 设置分组最大选择项数
  setMaxSelections(groupName, maxSelections) {
    const group = this.getGroup(groupName)
    group.maxSelections = maxSelections
  }

  // 选择选项
  selectOption(groupName, optionName) {
    const group = this.getGroup(groupName)

    // 检查是否已经选中
    if (group.selectedOptions.includes(optionName)) {
      return false
    }

    // 检查是否达到最大选择项数
    if (group.maxSelections !== -1 && group.selectedOptions.length >= group.maxSelections) {
      return false
    }

    // 添加到选中列表
    group.selectedOptions.push(optionName)
    return true
  }

  // 取消选择选项
  deselectOption(groupName, optionName) {
    const group = this.getGroup(groupName)
    const index = group.selectedOptions.indexOf(optionName)

    if (index > -1) {
      group.selectedOptions.splice(index, 1)
      return true
    }

    return false
  }

  // 检查选项是否选中
  isOptionSelected(groupName, optionName) {
    const group = this.getGroup(groupName)
    return group.selectedOptions.includes(optionName)
  }

  // 获取分组中选中的选项
  getSelectedOptions(groupName) {
    const group = this.getGroup(groupName)
    return [...group.selectedOptions]
  }
}

// 全局选项按钮组实例
const globalOptionButtonGroup = new OptionButtonGroup()

// 提供全局选项按钮组实例
export function provideOptionButtonGroup() {
  provide('optionButtonGroup', globalOptionButtonGroup)
}

// 注入全局选项按钮组实例
export function useOptionButtonGroup() {
  const optionButtonGroup = inject('optionButtonGroup', globalOptionButtonGroup)
  return optionButtonGroup
}