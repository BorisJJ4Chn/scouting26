<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '../utils/request'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const error = ref('')
const isLoading = ref(false)
const requirePassword = ref(false)

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  request.post('/api/login', form).then(res => {
    if (res.data.code === 200) {
      // 存储token和用户名
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('username', res.data.data.username)
      
      // 跳转到首页
      router.push('/')
    } else {
      error.value = res.data.message || 'Login failed'
    }
  }).catch((err) => {
    error.value = err.response?.data?.message || '登录时发生错误'
    if (err.response?.status === 401) {
      // 管理员账号需要密码
      requirePassword.value = true
    }
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h1>登录</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            required 
            placeholder="请输入用户名"
            style="box-sizing: border-box;"
            autocomplete="off"
          >
        </div>
        
        <div v-if="requirePassword" class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required 
            placeholder="请输入密码"
            style="box-sizing: border-box;"
            autocomplete="off"
          >
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button 
          type="submit" 
          class="login-button" 
          :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000;
}

.login-form {
  background-color: rgba(30, 30, 30, 0.8);
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
  text-align: center;
  color: #fff;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 2vh;
}

label {
  display: block;
  margin-bottom: 1vh;
  color: #ccc;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.15);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.error-message {
  background-color: rgba(220, 53, 69, 0.2);
  color: #dc3545;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
  background-color: #0069d9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
}

.login-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #ccc;
  font-size: 0.9rem;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #0069d9;
  text-decoration: underline;
}
</style>