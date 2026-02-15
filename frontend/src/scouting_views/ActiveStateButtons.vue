<script setup>
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import CountButton from '../components/CountButton.vue'
import OptionButton from '../components/OptionButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

const store = useRobotStateStore()
</script>

<template>
  <CountButton 
    name="放弃"
    :style="{ backgroundColor: COLORS.GREEN, ...getButtonPosition('放弃') }"
    @click="store.manager.deselectOptions('groupActive', store.groupActive.selectedOptions.slice())"
    :attachment="{type: 'give up'}"
  />

  <OptionButton 
    name="被防守"
    groupName="groupActive"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('被防守') }"
    :disabled="!(store.isInState)"
    :canDeselect="true"
  />

  <OptionButton 
    name="跑打"
    groupName="groupActive"
    :style="{ backgroundColor: COLORS.AMBER, ...getButtonPosition('跑打') }"
    :disabled="!(store.isInState)"
    :canDeselect="true"
  />
</template>