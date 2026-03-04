<script setup>
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import CountButton from '../components/CountButton.vue'
import OptionButton from '../components/OptionButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'
import { request } from '../utils/request.js'

const store = useRobotStateStore()

function handleClimbEnd() {
  store.climbStatus = 'after'
  
  let EngName = {
      '左爬': 'left',
      '中爬': 'mid',
      '右爬': 'right',
      '高杆': 'high',
      '中杆': 'mid',
      '低杆': 'low'
  }
  if (store.timer.getTime() <= 23000) {
    request.post('/api/climb', {
      timestamp: store.timer.getTime(),
      type: 'climb_end',
      success: store.groupClimbSuccess.selectedOptions[0] === '成功',
      position: EngName[store.groupClimbPosition.selectedOptions[0]],
    }).catch((err) => {
        console.error(err)
    })
  }
  else {
    request.post('/api/climb', {
      timestamp: store.timer.getTime(),
      type: 'climb_end',
      success: store.groupClimbSuccess.selectedOptions[0] === '成功',
      position: EngName[store.groupClimbPosition.selectedOptions[0]],
      height: EngName[store.groupClimbHeight.selectedOptions[0]],
    }).catch((err) => {
        console.error(err)
    })
  }
}

</script>

<template>
  <!-- 第一组 -->
  <CountButton 
    name="爬升开始"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('爬升开始') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStatus === 'before')"
    @click="store.climbStatus = 'climbing'"
    :attachment="{ type: 'climb_start' }"
  />
  <OptionButton 
    name="左爬"
    groupName="groupClimbPosition"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('左爬') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStatus !== 'before')"
  />
  <OptionButton 
    name="中爬"
    groupName="groupClimbPosition"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('中爬') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStatus !== 'before')"
  />
  <OptionButton 
    name="右爬"
    groupName="groupClimbPosition"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('右爬') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStatus !== 'before')"
  />

  <!-- 第二组 -->
  <CountButton 
    name="成功"
    :style="{ backgroundColor: COLORS.CYAN, ...getButtonPosition('成功') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStatus === 'climbing')"
    :required="false"
    @click="handleClimbEnd"
  />
  <CountButton 
    name="失败"
    :style="{ backgroundColor: COLORS.CYAN, ...getButtonPosition('失败') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStatus === 'climbing')"
    :required="false"
    @click="handleClimbEnd"
  />
</template>
