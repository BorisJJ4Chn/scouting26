<script setup>
import { reactive, onMounted, defineExpose } from 'vue'
import { useEditManagerStore } from '../../store/EditManager.js'

const store = useEditManagerStore()
const newAction = reactive({
    type: 'climb_end',
    timestamp: null,
    success: null,
    position: null,
    height: null,
})

defineExpose({
    newAction
})

onMounted(() => {
    newAction.timestamp = store.actionThisTime.timestamp
    newAction.success = store.actionThisTime.success
    newAction.position = store.actionThisTime.position
    if (store.actionThisTime.timestamp > 23000) {
        newAction.height = store.actionThisTime.height
    }
    console.log(newAction)
})
</script>

<template>
    <div class="action-editing">
        <h2>爬升结束</h2>
        <div class="action-item">
            <label class="action-label">时间戳</label>
            <span>
                <input class="action-number" v-model="newAction.timestamp" type="number" />
                ms
            </span>
        </div>
        <div class="action-item">
            <label class="action-label">结果</label>
            <span>
                <select class="action-select" v-model="newAction.success">
                    <option :value="true">成功</option>
                    <option :value="false">失败</option>
                </select>
            </span>
        </div>
        <div class="action-item">
            <label class="action-label">左右</label>
            <span>
                <select class="action-select" v-model="newAction.position">
                    <option value="left">左爬</option>
                    <option value="mid">中爬</option>
                    <option value="right">右爬</option>
                </select>
            </span>
        </div>
        <div class="action-item" v-if="store.showTimestamp > 23000">
            <label class="action-label">上下</label>
            <span>
                <select class="action-select" v-model="newAction.height">
                    <option value="high">高杆</option>
                    <option value="mid">中杆</option>
                    <option value="low">低杆</option>
                </select>
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
