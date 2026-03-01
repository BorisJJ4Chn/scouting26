<script setup>
import { reactive, onMounted, defineExpose } from 'vue'
import { useEditManagerStore } from '../../store/EditManager.js'

const store = useEditManagerStore()
const newAction = reactive({
    type: 'give_up',
    timestamp: null,
})

defineExpose({
    newAction
})

onMounted(() => {
    newAction.timestamp = store.actionThisTime.timestamp
})
</script>

<template>
    <div class="action-editing">
        <h2>放弃</h2>
        <div class="action-item">
            <label class="action-label">时间戳</label>
            <span>
                <input class="action-number" v-model="newAction.timestamp" type="number" />
                ms
            </span>
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

.action-number {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
</style>
