<script setup>
import { useEditManagerStore } from '../store/EditManager'
const store = useEditManagerStore()

const counters = [
    {
        name: '推球回家次数',
        key: 'push_home_count',
    },
    {
        name: '推球进outpost次数',
        key: 'push_outpost_count',
    },
    {
        name: '阻挡路线/pin次数',
        key: 'block_count',
    },
    {
        name: '冲撞射球次数',
        key: 'strike_opponent_count',
    },
    {
        name: '普通犯规次数',
        key: 'normal_foul_count',
    },
    {
        name: '技术犯规次数',
        key: 'tech_foul_count',
    },
    {
        name: '中场运球次数',
        key: 'mid_dribble_count',
    },
    {
        name: '前场运球次数',
        key: 'front_dribble_count',
    },
]
</script>

<template>
    <div class="counter-area">
        <div class="info-item" v-for="(value, idx) in counters" :key="idx">            
            <div class="info-label">{{ value.name }}</div>
            <input class="info-number" v-if="store.data?.behaviors?.counters?.[value.key] !== undefined" type="number" v-model="store.data.behaviors.counters[value.key]">
        </div>
    </div>
</template>

<style scoped>
.counter-area {
    position: absolute;
    left: 32%;
    right: 0%;
    top: 74%;
    bottom: 0%;
    background-color: #112257;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.info-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5vw;
    gap: 0.5vw;
}

.info-label {
    color: #FFFFFF;
    font-size: 1.2vw;
}
.info-number {
    width: 5vw;
    height: 3vh;
    font-size: 1.2vw;
    border-radius: 0.5vw;
    border: none;
    text-align: center;
}
</style>