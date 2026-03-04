<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEditManagerStore } from '../store/EditManager.js'
import { COLORS } from '../constants.js'

const store = useEditManagerStore()

const axisRef = ref(null)

const widthPercent = computed(() => {
    // 每秒占10%
    return store.length / 1000 * 10
})

const onMouseDown = (e) => {
    if (!axisRef.value.contains(e.target)) {
        return
    }
    store.startDrag(e.clientX)
}
const onMouseMove = (e) => {
    store.moveDrag(e.clientX)
}
const onMouseUp = (e) => {
    store.endDrag()
}

const onTouchStart = (e) => {
    if (!axisRef.value.contains(e.target)) {
        return
    }
    if (e.touches.length > 1) {
        return
    }
    store.startDrag(e.touches[0].clientX)
}

const onTouchMove = (e) => {
    store.moveDrag(e.touches[0].clientX)
}

const onTouchEnd = (e) => {
    if (e.touches.length) {
        store.moveDrag(e.touches[0].clientX)
    }
    else {
        store.endDrag()
    }
}

const textToShow = computed(() => {
    if (store.showTimestamp < 20000) {
        return 'Auto ' + (store.showTimestamp / 1000).toFixed(2)
    }
    if (store.showTimestamp < 23000) {
        return 'Pause'
    }
    if (store.showTimestamp < 33000) {
        return 'Transition ' + ((store.showTimestamp - 23000) / 1000).toFixed(2)
    }
    for (let i = 0; i < 4; i++) {
        if (store.showTimestamp < 58000 + i * 25000) {
            return 'Teleop '
                + ((i & 1) == (store.data.info.alliance == store.data.behaviors.auto_winner) ? 'Active' : 'Inactive')
                + (i / 2 + 0.75).toFixed(0)
                + ' '
                + ((store.showTimestamp - (33000 + i * 25000)) / 1000).toFixed(2)
        }
    }
    return 'Endgame ' + ((store.showTimestamp - 133000) / 1000).toFixed(2)
})

const positionByTimestamp = computed(() => {
    return (timestamp) => {
        return 50 + (timestamp - store.showTimestamp) / 100
    }
})

const typeName = (type) => {
    let chnName = {
        'shuttle': '移动',
        'collect_ball': '吸球',
        'release_ball': '射球',
        'give_up': '放弃',
        'climb_start': '爬升开始',
        'climb_end': '爬升结束',
        'collision': '撞车',
    }
    return chnName[type] || type
}

const typeColor = (type) => {
    let color = {
        'shuttle': COLORS.PINK,
        'collect_ball': COLORS.CYAN,
        'release_ball': COLORS.LIME,
        'give_up': COLORS.LILAC,
        'climb_start': COLORS.RED,
        'climb_end': COLORS.RED,
        'collision': COLORS.AMBER,
    }
    return color[type] || '#fff'
}

onMounted(() => {
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchstart', onTouchStart)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
})

onUnmounted(() => {
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
})


</script>

<template>
    <div
        id="time-axis-container"
        ref="axisRef"
    >
        <div id="time-text">
            {{ textToShow }}
        </div>
        <div id="time-line" :style="{
            width: widthPercent + '%',
            left: positionByTimestamp(0) + '%',
            top: '79%',
        }"></div>
        <div
            v-for="i in Math.round(store.length / 1000) + 1"
            :style="{
                position: 'absolute',
                width: '0',
                left: positionByTimestamp((i - 1) * 1000) + '%',
                top: '76%',
                bottom: '21%',
                border: '1px solid #ffff00',
            }">
        </div>
        
        <template v-for="(action, idx) in store.data?.behaviors?.actions || []" :key="idx">
            <div class="action-vertical-line" :style="{
                left: positionByTimestamp(action.timestamp) + '%',
                borderColor: typeColor(action.type),
            }"></div>
            <div class="action-horizontal-area" :style="{
                left: positionByTimestamp(store.data?.behaviors?.actions[idx - 1]?.timestamp || 0) + '%',
                right: (100 - positionByTimestamp(action.timestamp)) + '%',
                backgroundColor: typeColor(action.type) + '80',
            }"></div>
            <div class="action-label" :style="{
                left: positionByTimestamp(action.timestamp) + '%',
                color: typeColor(action.type),
            }">{{ typeName(action.type) }}</div>
        </template>
        
        <div id="pointer" class="triangle"></div>
    </div>
</template>

<style scoped>
#time-text {
    font-size: 1.2vw;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -50%);
    color: #fff;
}
#time-axis-container {
    border: 1px solid #112257;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 3px #112257;
    background-color: #112257;
    position: absolute;
    left: 0%;
    right: 70%;
    top: 74%;
    bottom: 0%;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
#time-line {
    position: absolute;
    height: 0;
    border: 1px solid #fff;
}
#pointer {
    position: absolute;
    left: 50%;
    top: 81%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border: 2px solid transparent;
    border-bottom: 5px solid #fff;
}

.action-container {
    position: absolute;
    top: 81%;
    transform: translateX(-50%);
}

.action-vertical-line {
    position: absolute;
    width: 0;
    top: 70%;
    bottom: 21%;
    border: 1px solid;
}

.action-horizontal-area {
    position: absolute;
    top: 70%;
    bottom: 21%;
}

.action-label {
    position: absolute;
    font-size: 0.8vw;
    white-space: nowrap;
    bottom: 30%;
    transform-origin: left bottom;
    transform: rotate(-45deg) translateY(20%);
}
</style>