<script setup>
import { ref, watch } from 'vue'
import { COLORS, ALLIANCE } from '../constants'

const emit = defineEmits(['confirm', 'allianceChange'])

const teamNumber = ref('')
const alliance = ref('')

watch(alliance, (newValue) => {
  emit('allianceChange', newValue)
})

const handleConfirm = () => {
  emit('confirm', {
    teamNumber: teamNumber.value,
    alliance: alliance.value
  })
}
</script>

<template>
  <div class="init-container">
    <div class="team-input">
      <input 
        type="number" 
        v-model="teamNumber" 
        class="team-input-field"
        placeholder="队号"
      />
    </div>
    <div class="alliance-selector">
      <label class="alliance-option">
        <input 
          type="radio" 
          name="alliance" 
          :value="ALLIANCE.RED" 
          v-model="alliance"
          class="alliance-radio"
        />
        <span class="alliance-label" :style="{ backgroundColor: COLORS.RED }"></span>
      </label>
      <label class="alliance-option">
        <input 
          type="radio" 
          name="alliance" 
          :value="ALLIANCE.BLUE" 
          v-model="alliance"
          class="alliance-radio"
        />
        <span class="alliance-label" :style="{ backgroundColor: COLORS.BLUE }"></span>
      </label>
    </div>
    <button class="confirm-button" @click="handleConfirm" :disabled="!teamNumber || !alliance">确认</button>
  </div>
</template>

<style scoped>
.init-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  padding: 2vw;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1vw;
  backdrop-filter: blur(10px);
}

.team-input {
  width: 100%;
  display: flex;
  justify-content: center;
}

.team-input-field {
  width: 100%;
  padding: 1.5vw;
  font-size: 2vw;
  border: 0.3vw solid #333;
  border-radius: 0.5vw;
  text-align: center;
}

.team-input-field:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 0.2vw rgba(100, 108, 255, 0.3);
}

.alliance-selector {
  display: flex;
  gap: 2vw;
  align-items: center;
}

.alliance-option {
  position: relative;
  cursor: pointer;
}

.alliance-radio {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.alliance-label {
  display: block;
  width: 8vw;
  height: 8vw;
  border: none;
  border-radius: 0.5vw;
  position: relative;
}

.alliance-radio:checked + .alliance-label {
  box-shadow: 0 0 0 0.3vw rgba(0, 0, 0, 0.5);
}

.alliance-radio:checked + .alliance-label::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4vw;
  height: 4vw;
  background-color: #fff;
  border-radius: 0.2vw;
}

.confirm-button {
  padding: 1.5vw 3vw;
  font-size: 2vw;
  border-radius: 1vw;
  border: none;
  background-color: #FFFF00;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
}

.confirm-button:hover {
  background-color: #FF9900;
  transform: scale(1.05);
}

.confirm-button:active {
  transform: scale(0.95);
}

.confirm-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  transform: none;
}

.confirm-button:disabled:hover {
  background-color: #ccc;
  transform: none;
}
</style>