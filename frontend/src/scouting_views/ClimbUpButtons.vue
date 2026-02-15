<script setup>
import { onUnmounted } from 'vue'
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import CountButton from '../components/CountButton.vue'
import OptionButton from '../components/OptionButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

const store = useRobotStateStore()

</script>

<template>
  <!-- 第一组 -->
  <CountButton 
    name="爬升开始"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('爬升开始') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && !store.climbStarted)"
    @click="store.setClimbStarted(true)"
    :attachment="{ type: 'climb_start' }"
  />
  <OptionButton 
    name="左爬"
    groupName="groupClimbPosition"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('左爬') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStarted)"
  />
  <OptionButton 
    name="中爬"
    groupName="groupClimbPosition"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('中爬') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStarted)"
  />
  <OptionButton 
    name="右爬"
    groupName="groupClimbPosition"
    :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('右爬') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStarted)"
  />

  <!-- 第二组 -->
  <OptionButton 
    name="成功"
    groupName="groupClimbSuccess"
    :style="{ backgroundColor: COLORS.CYAN, ...getButtonPosition('成功') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStarted)"
  />
  <OptionButton 
    name="失败"
    groupName="groupClimbSuccess"
    :style="{ backgroundColor: COLORS.CYAN, ...getButtonPosition('失败') }"
    :disabled="!(store.getPreLoadEnded && store.isInState && store.climbStarted)"
  />
</template>
