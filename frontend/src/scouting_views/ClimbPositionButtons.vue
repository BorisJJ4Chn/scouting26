<script setup>
import { COLORS } from '../constants.js'
import { getButtonPosition } from '../utils/ButtonPositionConfig.js'
import OptionButton from '../components/OptionButton.vue'
import { useRobotStateStore } from '../store/RobotState.js'

// 获取 store
const store = useRobotStateStore()
</script>

<template>
    <OptionButton 
        name="高杆"
        groupName="groupClimbHeight"
        :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('高杆') }"
        :disabled="!(store.isInState && store.climbStarted)"
    />
    <OptionButton 
        name="中杆"
        groupName="groupClimbHeight"
        :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('中杆') }"
        :disabled="!(store.isInState && store.climbStarted)"
    />
    <OptionButton 
        name="低杆"
        groupName="groupClimbHeight"
        :style="{ backgroundColor: COLORS.RED, ...getButtonPosition('低杆') }"
        :disabled="!(store.isInState && store.climbStarted)"
    />
</template>
