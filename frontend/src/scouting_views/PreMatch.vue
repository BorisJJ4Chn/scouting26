<script setup>
import { COLORS, ALLIANCE } from '../constants'
import { getButtonPosition } from '../utils/ButtonPositionConfig'
import OptionButton from '../components/OptionButton.vue'
import CountButton from '../components/CountButton.vue'
import { useRobotStateStore } from '../store/RobotState'
import { request } from '../utils/request'


const store = useRobotStateStore()

// 获取按钮颜色
const getButtonColor = () => {
  return store.alliance === ALLIANCE.RED ? COLORS.RED : COLORS.BLUE
}

const optionButtonManager = store.manager

// 删除旧分组
optionButtonManager.deleteGroupIfExist('platformGroup')
optionButtonManager.deleteGroupIfExist('positionGroup')

// 创建平台分组
const platformGroup = optionButtonManager.createGroupIfNotExist('platformGroup', 1)

// 创建位置分组
const positionGroup = optionButtonManager.createGroupIfNotExist('positionGroup', 1)

const PostPreMatch = async () => {
  store.toggleState()
  let EngName = {
    '左台': 'left',
    '中台': 'mid',
    '右台': 'right',
    '左洞': 'left_trench',
    '左坡': 'left_bump',
    'Hub': 'hub',
    '右坡': 'right_bump',
    '右洞': 'right_trench',
  }
  request.post('/api/pre_match', {
    operator_platform: EngName[platformGroup.selectedOptions[0]],
    start_position: EngName[positionGroup.selectedOptions[0]],
  }).catch((err) => {
    console.error(err)
  })
}


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
    @click="PostPreMatch"
    :disabled="!platformGroup.selected() || !positionGroup.selected()"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('confirm') }"
    :required="false"
  >
  </CountButton>
</template>