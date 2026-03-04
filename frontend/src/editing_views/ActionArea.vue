<script setup>
import { ref } from 'vue'
import { useEditManagerStore } from '../store/EditManager.js'

import ShuttleAction from './action_area_views/ShuttleAction.vue'
import ReleaseBallAction from './action_area_views/ReleaseBallAction.vue'
import CollectBallAction from './action_area_views/CollectBallAction.vue'
import ClimbStartAction from './action_area_views/ClimbStartAction.vue'
import ClimbEndAction from './action_area_views/ClimbEndAction.vue'
import GiveUpAction from './action_area_views/GiveUpAction.vue'
import CollisionAction from './action_area_views/CollisionAction.vue'


const store = useEditManagerStore()
const actionComponent = ref(null)

const actionsMap = {
    'shuttle': ShuttleAction,
    'release_ball': ReleaseBallAction,
    'collect_ball': CollectBallAction,
    'climb_start': ClimbStartAction,
    'climb_end': ClimbEndAction,
    'give_up': GiveUpAction,
    'collision': CollisionAction,
}

const onConfirm = () => {
    store.updateAction(actionComponent.value.newAction)
}
</script>

<template>
    <div class="action-area">
        <component ref="actionComponent" v-if="store.actionThisTime?.type" :is="actionsMap[store.actionThisTime.type]" :key="store.actionThisTime.timestamp" />
        <button class="confirm-button" @click="onConfirm">确认</button>
    </div>
</template>

<style scoped>
.action-area {
    position: absolute;
    left: 32%;
    right: 0%;
    top: 0%;
    bottom: 28%;
    background-color: #112257;
}
</style>