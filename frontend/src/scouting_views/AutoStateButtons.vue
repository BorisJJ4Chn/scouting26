<script setup>
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import OptionButton from '../components/OptionButton.vue'
import CountButton from '../components/CountButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

// 获取 store
const store = useRobotStateStore()

</script>

<template>
  <!-- 第五组：三个黄色按钮（中场方向） -->
  <CountButton 
    name="吸中切"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸中切') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
  />
  <CountButton 
    name="吸球阵角"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸球阵角1') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    :attachment="{ type: 'collect_ball', position: 'mid', precise: 'corner' }"
  />
  <CountButton 
    name="吸球阵角"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸球阵角2') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    :attachment="{ type: 'collect_ball', position: 'mid', precise: 'corner' }"
  />
  <CountButton 
    name="吸边切"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸边切1') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    :attachment="{ type: 'collect_ball', position: 'mid', precise: 'edge' }"
  />
  <CountButton 
    name="吸边切"
    :style="{ backgroundColor: COLORS.BLUE, ...getButtonPosition('吸边切2') }"
    :disabled="!(store.getPreLoadEnded && !store.isInState)"
    :attachment="{ type: 'collect_ball', position: 'mid', precise: 'edge' }"
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

  <!-- 第六组 -->
  <CountButton 
    name="撞车"
    :style="{ backgroundColor: COLORS.VIOLET, ...getButtonPosition('撞车') }"
    :disabled="!(!store.isInState && store.getPreLoadEnded)"
    :attachment="{ type: 'collision' }"
  />
</template>