<script setup>
import { ref } from 'vue'
import { COLORS, ALLIANCE } from '../constants'
import { prematchPositions } from './PreMatchConfig'
import OptionButton from '../components/OptionButton.vue'
import { useOptionButtonManager } from '../components/OptionButtonGroupManager'

const props = defineProps({
  alliance: {
    type: String,
    default: ALLIANCE.RED
  }
})

const emit = defineEmits(['confirm'])

// 获取按钮颜色
const getButtonColor = () => {
  return props.alliance === ALLIANCE.RED ? COLORS.RED : COLORS.BLUE
}

// 获取按钮位置
const getButtonPosition = (buttonName) => {
  return prematchPositions[props.alliance][buttonName] || { top: '0%', left: '0%' }
}

const optionButtonManager = useOptionButtonManager()

// 删除旧分组
optionButtonManager.deleteGroupIfExist('platformGroup')
optionButtonManager.deleteGroupIfExist('positionGroup')

// 创建平台分组
const platformGroup = optionButtonManager.createGroup('platformGroup', 1)

// 创建位置分组
const positionGroup = optionButtonManager.createGroup('positionGroup', 1)

</script>

<template>
  <div class="prematch-container">
    <!-- 前三个按钮：左台、中台、右台 -->
    <OptionButton 
      class="prematch-button"
      name="左台"
      groupName="platformGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左台') }"
    />
    
    <OptionButton 
      class="prematch-button"
      name="中台"
      groupName="platformGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('中台') }"
    />
    
    <OptionButton 
      class="prematch-button"
      name="右台"
      groupName="platformGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右台') }"
    />
    
    <!-- 后五个按钮：左洞、左坡、Hub、右坡、右洞 -->
    <OptionButton 
      class="prematch-button"
      name="左洞"
      groupName="positionGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左洞') }"
    />
    
    <OptionButton 
      class="prematch-button"
      name="左坡"
      groupName="positionGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('左坡') }"
    />
    
    <OptionButton 
      class="prematch-button"
      name="Hub"
      groupName="positionGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('Hub') }"
    />
    
    <OptionButton 
      class="prematch-button"
      name="右坡"
      groupName="positionGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右坡') }"
    />
    
    <OptionButton 
      class="prematch-button"
      name="右洞"
      groupName="positionGroup"
      :style="{ backgroundColor: getButtonColor(), ...getButtonPosition('右洞') }"
    />
    
    <!-- 确认按钮 -->
    <button 
      class="confirm-button"
      @click="emit('confirm')"
      :disabled="!platformGroup.selected() || !positionGroup.selected()"
      :style="{ ...getButtonPosition('confirm') }"
    >
      确认
    </button>
  </div>
</template>

<style scoped>
.prematch-container {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
}

.prematch-button {
  position: absolute;
  width: 6%;
  height: 15%;
  font-size: 1.2vw;
  border-radius: 1vw;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
}

.prematch-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.prematch-button:active {
  transform: scale(0.95);
}

.prematch-button.active {
  box-shadow: 0 0 0 0.3vw rgba(255, 255, 255, 0.8);
}

.confirm-button {
  padding: 1.5vw 3vw;
  font-size: 2vw;
  border-radius: 1vw;
  border: none;
  background-color: #ffd93d;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  position: absolute;
}

.confirm-button:hover {
  background-color: #ffc107;
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