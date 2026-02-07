import { provide, inject, reactive } from 'vue'

class OptionButtonGroup {
  constructor(groupName, maxSelections = -1) {
    this.groupName = groupName
    this.selectedOptions = reactive([])
    this.maxSelections = maxSelections
  }

  selected() {
    return this.selectedOptions.length > 0
  }

  getIfSelected(optionName) {
    return this.selectedOptions.includes(optionName)
  }
}

// 选项按钮管理器类
export class OptionButtonGroupManager {
  constructor() {
    this.groups = {}
  }

  // 创建分组
  createGroupIfNotExist(groupName, maxSelections = -1) {
    if (!(groupName in this.groups)) {
      this.groups[groupName] = new OptionButtonGroup(groupName, maxSelections)
    }
    return this.groups[groupName]
  }

  // 删除分组
  deleteGroupIfExist(groupName) {
    if (groupName in this.groups) {
      delete this.groups[groupName]
    }
  }

  // 获取分组
  getGroup(groupName) {
    if (!(groupName in this.groups)) {
      throw new Error(`分组 ${groupName} 不存在`)
    }
    return this.groups[groupName]
  }

  // 选择选项
  selectOption(groupName, optionName) {
    const group = this.getGroup(groupName)

    // 检查是否已经选中
    if (group.getIfSelected(optionName)) {
      return false
    }

    // 添加到选中列表
    group.selectedOptions.push(optionName)
    if (group.maxSelections !== -1 && group.selectedOptions.length > group.maxSelections) {
      group.selectedOptions.splice(0, 1)
    }
    return true
  }

  // 取消选择选项
  deselectOption(groupName, optionName) {
    const group = this.getGroup(groupName)

    // 检查是否已经取消选中
    if (!group.getIfSelected(optionName)) {
      return false
    }

    const index = group.selectedOptions.indexOf(optionName)

    if (index > -1) {
      group.selectedOptions.splice(index, 1)
      return true
    }

    return false
  }

  // 取消选择所有选项
  deselectOptions(groupName, optionNames) {
    const group = this.getGroup(groupName)
    for (const optionName of optionNames) {
      this.deselectOption(groupName, optionName)
    }
  }
}