<script setup>
import { reactive, onMounted, defineExpose } from 'vue'
import { useEditManagerStore } from '../../store/EditManager.js'

const store = useEditManagerStore()
const newAction = reactive({
    type: 'release_ball',
    timestamp: null,
    position: null,
    precise: null,
})

defineExpose({
    newAction
})

onMounted(() => {
    newAction.timestamp = store.actionThisTime.timestamp
    newAction.position = store.actionThisTime.position
    if (newAction.timestamp < 23000 && newAction.position === 'mid') {
        newAction.precise = store.actionThisTime?.precise
    }
})
</script>

<template>
    <div class="action-editing">
        <h2>吸球</h2>
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
                <option class="action-option" value="mid">中场</option>
                <option class="action-option" value="depot">DEPOT</option>
                <option class="action-option" value="outpost">OUTPOST</option>
            </select>
        </div>
        <div class="action-item" v-if="newAction.timestamp < 23000 && newAction.position === 'mid'">
            <label class="action-label">中场位置</label>
            <select class="action-select" v-model="newAction.precise">
                <option class="action-option" value="mid">中切</option>
                <option class="action-option" value="edge">边切</option>
                <option class="action-option" value="corner">球阵角</option>
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
