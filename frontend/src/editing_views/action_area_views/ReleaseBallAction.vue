<script setup>
import { reactive, onMounted, defineExpose } from 'vue'
import { useEditManagerStore } from '../../store/EditManager.js'

const store = useEditManagerStore()
const newAction = reactive({
    type: 'release_ball',
    timestamp: null,
    position: null,
    moving: null,
    defended: null,
})

defineExpose({
    newAction
})

onMounted(() => {
    newAction.timestamp = store.actionThisTime.timestamp
    newAction.position = store.actionThisTime.position
    newAction.moving = store.actionThisTime.moving
    newAction.defended = store.actionThisTime.defended
})
</script>

<template>
    <div class="action-editing">
        <h2>射球</h2>
        <div class="action-item">
            <label class="action-label">时间戳</label>
            <span>
                <input class="action-number" v-model="newAction.timestamp" type="number" />
                ms
            </span>
        </div>
        <div class="action-item">
            <label class="action-label">位置</label>
            <select class="action-select" v-model="newAction.position">
                <option value="below_hub">Hub下</option>
                <option value="near_line">线后</option>
                <option value="near_tower">靠塔</option>
                <option value="other">任意</option>
            </select>
        </div>
        <div class="action-item">
            <label class="action-label">跑打</label>
            <select class="action-select" v-model="newAction.moving">
                <option value=true>是</option>
                <option value=false>否</option>
            </select>
        </div>
        <div class="action-item">
            <label class="action-label">被防守</label>
            <select class="action-select" v-model="newAction.defended">
                <option :value=true>是</option>
                <option :value=false>否</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.action-editing {
    display: flex;
    flex-direction: column;
    gap: 4%;
    padding: 4%;
}

.action-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5vw;
    gap: 2vw;
}

.action-label {
    color: #FFFFFF;
    font-size: 1.2vw;
}

.action-select {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
.action-option {
    font-size: 1.2vw;
}

.action-number {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
</style>
