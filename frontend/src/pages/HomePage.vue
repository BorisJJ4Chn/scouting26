<script setup>
import { ref } from 'vue'
import { request } from '../utils/request'

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

const role = ref('未登录')

const refreshLoginStatus = () => {
  request.get('/api/users/me').then(response => {
    if (response.data.code === 200) {
      role.value = response.data.data.role
    }
  }).catch(err => {
    role.value = '未登录'
  })
}
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1>FRC 6907 Scouting 2026</h1>
    <router-link class="link-label" to="/scout">开始 Scouting</router-link>
    <router-link class="link-label" to="/edit">编辑 Scouting 数据</router-link>
    <router-link class="link-label" to="/files">管理数据</router-link>

    <div class="link-label" style=" position: absolute; top: 4vh; left: 4vw;" @click="refreshLoginStatus">
      刷新登陆状态
    </div>
    <div class="link-label" style=" position: absolute; top: 10vh; left: 4vw;">
      当前角色：{{ role }}
    </div>
    <router-link class="link-label" style=" position: absolute; top: 4vh; right: 4vw;" to="/login">
      登录
    </router-link>
    <label class="link-label" style=" position: absolute; top: 10vh; right: 4vw;" @click="logout">
      注销
    </label>
    <router-link v-if="role === 'admin'" class="link-label" style=" position: absolute; top: 16vh; right: 4vw;" to="/admin">
      管理员
    </router-link>
  </div>
</template>

<style scoped>
.link-label {
  cursor: pointer;
  font-size: 2vw;
}
</style>