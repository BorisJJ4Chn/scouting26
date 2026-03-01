<script setup>
import { computed, ref } from 'vue'
import { useEditManagerStore } from '../store/EditManager.js'
import { request } from '../utils/request.js'
import { useRouter } from 'vue-router'

const store = useEditManagerStore()
const router = useRouter()

const matchNumber = computed(() => {
    return (store.data?.info?.match_type + store.data?.info?.match_number) || 'UNKNOWN'
})
const alliance = computed(() => {
    let chnName = {
        'red': '红',
        'blue': '蓝'
    }
    return chnName[store.data?.info?.alliance] || 'UNKNOWN'
})
const autoWinner = computed(() => {
    let chnName = {
        'red': '红',
        'blue': '蓝',
    }
    return chnName[store.data?.behaviors?.auto_winner] || 'UNKNOWN'
})

// 打开数据的表单
const openForm = ref({
    teamNumber: '',
    region: '',
    matchNumber: '',
    matchType: ''
})

const isLoading = ref(false)
const error = ref('')
const showOpenModal = ref(false)

// 关闭弹窗
const closeOpenModal = () => {
    showOpenModal.value = false
    error.value = ''
}

// 保存数据
const handleSave = async () => {
    error.value = ''
    isLoading.value = true
    
    try {
        // 使用已打开的数据构建路径
        const { team_number, region, match_type, match_number } = store.data?.info || {}
        
        if (!team_number || !region || !match_type || !match_number) {
            error.value = '请先打开数据'
            return
        }
        
        // 调用API
        const response = await request.post(`/api/data/${team_number}/${region}/${match_type[0]}/${match_number}`, store.data)
        
        if (response.data.code === 200) {
            // 保存成功
            alert('保存成功')
        } else {
            error.value = response.data.message || '保存数据失败'
        }
    } catch (err) {
        error.value = err.response?.data?.message || '保存数据时发生错误'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="info-area">
        <div class="info-item">
            <button class="button-open" @click="router.push('/files')" :disabled="isLoading">打开</button>
            <button class="button-save" @click="handleSave" :disabled="isLoading">保存</button>
        </div>
        
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        
        <div class="info-item">
            <div class="info-label">区域：{{ store.data?.info?.region || 'UNKNOWN' }}</div>
            <div class="info-label">场次号：{{ matchNumber }}</div>
        </div>
        <div class="info-item">
            <div class="info-label">队伍号：{{ store.data?.info?.team_number || 'UNKNOWN' }}</div>
            <div class="info-label">联盟：{{ alliance }}</div>
            <div class="info-label">自动胜方：{{ autoWinner }}</div>
        </div>
        <div class="info-item">
            <div class="info-label">操作台</div>
            <select class="info-select" v-if="store.data?.behaviors?.operator_platform" v-model="store.data.behaviors.operator_platform">
                <option class="info-option" value="left">左台</option>
                <option class="info-option" value="mid">中台</option>
                <option class="info-option" value="right">右台</option>
            </select>
        </div>
        <div class="info-item">
            <div class="info-label">起步位置</div>
            <select class="info-select" v-if="store.data?.behaviors?.start_position" v-model="store.data.behaviors.start_position">
                <option class="info-option" value="left_trench">左洞</option>
                <option class="info-option" value="left_bump">左坡</option>
                <option class="info-option" value="hub">Hub下</option>
                <option class="info-option" value="right_bump">右坡</option>
                <option class="info-option" value="right_trench">右洞</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.info-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0%;
    bottom: 28%;
    left: 0%;
    right: 70%;
    background-color: #112257;

    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.info-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5vw;
    gap: 2vw;
}

.info-label {
    color: #FFFFFF;
    font-size: 1.2vw;
}

.button-open, .button-save {
    padding: 0.5vh 3vw;
    font-size: 1.2vw;
    color: #FFFFFF;
    border: none;
    border-radius: 0.5vw;
    cursor: pointer;
}
.button-open {
    background-color: #224488;
}
.button-save {
    background-color: #448822;
}
.button-open:hover {
    background-color: #3366CC;
    transition: transform 0.3s ease;
    transform: scale(1.05);
}
.button-save:hover {
    background-color: #669944;
    transition: transform 0.3s ease;
    transform: scale(1.05);
}

.info-select {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
.info-option {
    font-size: 1.2vw;
}

.info-number {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
.info-text {
    width: 10vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}

.error-message {
    background-color: rgba(220, 53, 69, 0.2);
    color: #dc3545;
    padding: 0.5vw;
    border-radius: 0.5vw;
    margin: 0.5vw;
    font-size: 1.2vw;
    text-align: center;
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: #112257;
    border-radius: 1vw;
    padding: 2vw;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.modal-content h2 {
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 2vw;
    font-size: 1.5vw;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
}

.form-group {
    display: flex;
    align-items: center;
    gap: 1vw;
}

.form-group label {
    color: #FFFFFF;
    font-size: 1.2vw;
    min-width: 80px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1vw;
    margin-top: 1vw;
}

.button-cancel, .button-confirm {
    padding: 0.5vh 3vw;
    font-size: 1.2vw;
    color: #FFFFFF;
    border: none;
    border-radius: 0.5vw;
    cursor: pointer;
    transition: all 0.3s ease;
}

.button-cancel {
    background-color: #882244;
}

.button-confirm {
    background-color: #224488;
}

.button-cancel:hover:not(:disabled) {
    background-color: #AA3366;
    transition: transform 0.3s ease;
    transform: scale(1.05);
}

.button-confirm:hover:not(:disabled) {
    background-color: #3366CC;
    transition: transform 0.3s ease;
    transform: scale(1.05);
}

.button-cancel:disabled, .button-confirm:disabled {
    background-color: #666666;
    cursor: not-allowed;
    opacity: 0.7;
}
</style>
