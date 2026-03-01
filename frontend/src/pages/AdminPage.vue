<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../utils/request'

const users = ref([])
const isLoading = ref(false)
const error = ref('')
const newUser = ref('')
const newUserRole = ref('scout')
const showAddForm = ref(false)

// 加载所有用户
const loadUsers = () => {
  isLoading.value = true
  error.value = ''
  
  request.get('/api/users/all').then(response => {
    if (response.data.code === 200) {
      users.value = response.data.data.users
    } else {
      error.value = response.data.message || '加载用户列表失败'
    }
  }).catch(err => {
    error.value = err.response?.data?.message || '加载用户列表时发生错误'
  }).finally(() => {
    isLoading.value = false
  })
}

// 新增用户
const handleAddUser = () => {
  if (!newUser.value) {
    error.value = '请输入用户名'
    return
  }
  
  isLoading.value = true
  error.value = ''
  
  request.post(`/api/users/${newUser.value}`, {
    role: newUserRole.value
  }).then(response => {
    if (response.data.code === 200) {
      // 重新加载用户列表
      loadUsers()
      // 重置表单
      newUser.value = ''
      newUserRole.value = 'scout'
      showAddForm.value = false
    } else {
      error.value = response.data.message || '新增用户失败'
    }
  }).catch(err => {
    error.value = err.response?.data?.message || '新增用户时发生错误'
  }).finally(() => {
    isLoading.value = false
  })
}

// 删除用户
const handleDeleteUser = (username) => {
  if (confirm(`确定要删除用户 ${username} 吗？`)) {
    isLoading.value = true
    error.value = ''
    
    request.delete(`/api/users/${username}`).then(response => {
      if (response.data.code === 200) {
        // 重新加载用户列表
        loadUsers()
      } else {
        error.value = response.data.message || '删除用户失败'
      }
    }).catch(err => {
      error.value = err.response?.data?.message || '删除用户时发生错误'
    }).finally(() => {
      isLoading.value = false
    })
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>用户管理</h1>
      <div class="header-actions">
        <button v-if="!showAddForm" class="add-button" @click="showAddForm = true" :disabled="isLoading">
          新增用户
        </button>
        <div v-else class="add-form">
          <input 
            type="text" 
            v-model="newUser" 
            placeholder="输入用户名" 
            class="user-input"
          >
          <select v-model="newUserRole" class="role-select">
            <option value="scout">scout</option>
            <option value="captain">captain</option>
            <option value="admin">admin</option>
          </select>
          <button class="confirm-button" @click="handleAddUser" :disabled="isLoading">
            确定
          </button>
          <button class="cancel-button" @click="showAddForm = false" :disabled="isLoading">
            取消
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div class="user-list">
      <div 
        v-for="user in users" 
        :key="user.username"
        class="user-item"
      >
        <div class="user-info">
          <div class="user-name">{{ user.username }}</div>
          <div class="user-role">{{ user.role }}</div>
        </div>
        <div class="user-actions">
          <button class="delete-button" @click="handleDeleteUser(user.username)" :disabled="isLoading">
            删除
          </button>
        </div>
      </div>
      
      <div v-if="users.length === 0 && !isLoading" class="empty-message">
        暂无用户
      </div>
      
      <div v-if="isLoading" class="loading-message">
        加载中...
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #000;
  color: #fff;
  overflow: hidden;
}

.admin-header {
  padding: 1.5vw;
  background-color: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  margin: 0;
  font-size: 1.5vw;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1vw;
}

.add-button {
  padding: 0.5vw 1.5vw;
  font-size: 1vw;
  color: #FFFFFF;
  background-color: rgba(40, 40, 40, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5vw;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-button:hover:not(:disabled) {
  background-color: rgba(50, 50, 50, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.add-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-form {
  display: flex;
  align-items: center;
  gap: 0.8vw;
}

.user-input {
  padding: 0.5vw;
  font-size: 1vw;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3vw;
  color: #fff;
  min-width: 150px;
}

.role-select {
  padding: 0.5vw;
  font-size: 1vw;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3vw;
  color: #fff;
}

.role-select option {
    color: #000
}

.confirm-button, .cancel-button {
  padding: 0.5vw 1vw;
  font-size: 1vw;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3vw;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-button {
  background-color: rgba(40, 80, 120, 0.8);
}

.confirm-button:hover:not(:disabled) {
  background-color: rgba(50, 100, 140, 0.8);
}

.cancel-button {
  background-color: rgba(120, 40, 40, 0.8);
}

.cancel-button:hover:not(:disabled) {
  background-color: rgba(140, 50, 50, 0.8);
}

.error-message {
  padding: 1.2vw;
  margin: 0.8vw;
  background-color: rgba(220, 53, 69, 0.2);
  color: #dc3545;
  border-radius: 0.5vw;
  text-align: center;
  font-size: 1vw;
}

.user-list {
  flex: 1;
  padding: 1.5vw;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2vw;
  background-color: rgba(30, 30, 30, 0.8);
  border-radius: 0.6vw;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-item:hover {
  background-color: rgba(40, 40, 40, 0.8);
  transform: translateX(0.4vw);
  box-shadow: 0 0.3vw 0.9vw rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.user-info {
  display: flex;
  gap: 2vw;
  align-items: center;
}

.user-name {
  font-size: 1.2vw;
  font-weight: 500;
}

.user-role {
  font-size: 1vw;
  color: #ccc;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.3vw 0.8vw;
  border-radius: 1vw;
}

.user-actions {
  display: flex;
  gap: 0.5vw;
}

.delete-button {
  padding: 0.3vw 0.8vw;
  font-size: 0.9vw;
  color: #FFFFFF;
  background-color: rgba(120, 40, 40, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3vw;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-button:hover:not(:disabled) {
  background-color: rgba(140, 50, 50, 0.8);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.empty-message,
.loading-message {
  text-align: center;
  padding: 3vw;
  color: #ccc;
  font-size: 1.1vw;
}

</style>