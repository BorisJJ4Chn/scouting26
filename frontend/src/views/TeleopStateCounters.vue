<script setup>
import CounterBar from '../components/CounterBar.vue'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import CountButton from '../components/CountButton.vue'
import { COLORS } from '../constants.js'
import { useRobotStateStore } from '../store/RobotState.js'

const store = useRobotStateStore()
</script>

<template>
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'推球回家次数'"
        :style="{
            ...getButtonPosition('推球回家次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'推球进outpost次数'"
        :style="{
            ...getButtonPosition('推球进outpost次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'阻挡路线/pin次数'"
        :style="{
            ...getButtonPosition('阻挡路线/pin次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'冲撞射球次数'"
        :style="{
            ...getButtonPosition('冲撞射球次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'普通犯规次数'"
        :style="{
            ...getButtonPosition('普通犯规次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'技术犯规次数'"
        :style="{
            ...getButtonPosition('技术犯规次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'中场运球次数'"
        :style="{
            ...getButtonPosition('中场运球次数')
        }"
    />
    <CounterBar
        :initial="0"
        :min="0"
        :max="Infinity"
        :step="1"
        :label="'前场运球次数'"
        :style="{
            ...getButtonPosition('前场运球次数')
        }"
    />

  <CountButton 
    name="弃球"
    :style="{ backgroundColor: COLORS.LIME, ...getButtonPosition('弃球') }"
    :disabled="!(
      store.getPreLoadEnded
      && store.hasBall
    )"
    @click="handleReleaseBall"
  />
</template>
