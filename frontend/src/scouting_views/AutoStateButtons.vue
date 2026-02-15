<script setup>
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import OptionButton from '../components/OptionButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

// 获取 store
const store = useRobotStateStore()

</script>

<template>
  <!-- 第五组：三个黄色按钮（中场方向） -->
  <OptionButton 
    name="中切"
    groupName="groupMidPosition"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('中切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />
  <OptionButton 
    name="球阵角"
    groupName="groupMidPosition"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('球阵角') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />
  <OptionButton 
    name="边切"
    groupName="groupMidPosition"
    :style="{ backgroundColor: COLORS.YELLOW, ...getButtonPosition('边切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState && store.fromMid)"
  />

  <!-- 第七组：PreLoad 按钮 -->
  <OptionButton 
    name="PreLoad没射"
    groupName="groupPreload"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad没射') }"
  />

  <OptionButton 
    name="PreLoad射丢"
    groupName="groupPreload"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad射丢') }"
  />

  <OptionButton 
    name="PreLoad全进"
    groupName="groupPreload"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('PreLoad全进') }"
  />
</template>