<script setup>
import { COLORS, ALLIANCE } from '../constants'
import { getButtonPosition } from './ButtonPositionConfig'
import OptionButton from '../components/OptionButton.vue'
import CountButton from '../components/CountButton.vue'
import { useOptionButtonGroupManager } from '../components/OptionButtonGroupManager'
import { useRobotStateStore } from '../store/RobotState'

const store = useRobotStateStore()

// 获取按钮颜色
const getButtonColor = () => {
  return store.alliance === ALLIANCE.RED ? COLORS.RED : COLORS.BLUE
}

const optionButtonManager = useOptionButtonGroupManager()

// 删除旧分组
optionButtonManager.deleteGroupIfExist('platformGroup')
optionButtonManager.deleteGroupIfExist('positionGroup')

// 创建平台分组
const platformGroup = optionButtonManager.createGroupIfNotExist('platformGroup', 1)

// 创建位置分组
const positionGroup = optionButtonManager.createGroupIfNotExist('positionGroup', 1)


</script>

<template>
  <!-- 前三个按钮：左台、中台、右台 -->
  <OptionButton 
    name="左台"
    groupName="platformGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左台') }"
  />
  
  <OptionButton 
    name="中台"
    groupName="platformGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('中台') }"
  />
  
  <OptionButton 
    name="右台"
    groupName="platformGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右台') }"
  />
  
  <!-- 后五个按钮：左洞、左坡、Hub、右坡、右洞 -->
  <OptionButton 
    name="左洞"
    groupName="positionGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左洞') }"
  />
  
  <OptionButton 
    name="左坡"
    groupName="positionGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左坡') }"
  />
  
  <OptionButton 
    name="Hub"
    groupName="positionGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('Hub') }"
  />
  
  <OptionButton 
    name="右坡"
    groupName="positionGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右坡') }"
  />
  
  <OptionButton 
    name="右洞"
    groupName="positionGroup"
    :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右洞') }"
  />
  
  <!-- 确认按钮 -->
  <CountButton 
    name="确认"
    @click="store.toggleState()"
    :disabled="!platformGroup.selected() || !positionGroup.selected()"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('confirm') }"
  >
  </CountButton>
</template>