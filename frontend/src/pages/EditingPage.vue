<script setup>
import { onMounted } from 'vue'
import {request} from '../utils/request.js'
import { useEditManagerStore } from '../store/EditManager.js'
import TimeAxis from '../editing_views/TimeAxis.vue'
import InfoArea from '../editing_views/InfoArea.vue'
import CounterArea from '../editing_views/CounterArea.vue'
import ActionArea from '../editing_views/ActionArea.vue'

const store = useEditManagerStore()

onMounted(() => {
  request.get('/api/all').then(res => {
    store.init(res.data.data)
  })
  store.length = 163000
})

</script>

<template>
  <div class="editing-page-container">
    <InfoArea />
    <TimeAxis />
    <CounterArea />
    <ActionArea />
  </div>
</template>

<style scoped>

.editing-page-container {
  width: 100%;
  height: 100%;
  background-color: #162D73;
}
</style>