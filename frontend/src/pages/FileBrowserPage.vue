<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEditManagerStore } from '../store/EditManager.js'
import { request } from '../utils/request'

const router = useRouter()
const store = useEditManagerStore()
const currentPath = ref('')
const items = ref([])
const isLoading = ref(false)
const error = ref('')
const user = ref(null)
const isAdmin = ref(false)

// 获取当前用户信息
const getUserInfo = () => {
  request.get('/api/users/me').then(response => {
    if (response.data.code === 200) {
      user.value = response.data.data
      isAdmin.value = user.value.role === 'admin'
    }
  }).catch(err => {
    console.error('获取用户信息失败:', err)
  })
}

// 加载文件和文件夹列表
const loadItems = () => {
  isLoading.value = true
  error.value = ''
  
  request.get(`/api/file/${currentPath.value}`).then(response => {
    // console.log(response)
    const data = response.data.data

    currentPath.value = data.path
    
    items.value = data.files_and_dirs
  }).catch(err => {
    error.value = err.response?.data?.message || '加载文件列表失败'
  }).finally(() => {
    isLoading.value = false
  })
}

let itemClicked = ref(false)

// 处理项目单击事件
const handleItemClick = (item) => {
  if (!itemClicked.value && item.type === 'folder') {
    itemClicked.value = true
    // 点击文件夹，更新当前路径
    currentPath.value += `${item.name}/`
    loadItems()
    setTimeout(() => {
      itemClicked.value = false
    }, 300)
  }
  else {
    console.log(item) 
    const infos = item.name.split('_')
    const teamNumber = infos[0]
    const region = infos[1]
    const matchType = infos[2][0]
    const matchNumber = infos[2].substring(1).replace('.json', '')

    request.get(`/api/data/${teamNumber}/${region}/${matchType}/${matchNumber}/${item.owner}`)
    router.push({
      name: 'EditingPage',
    })
  }
}

// 处理回退按钮点击事件
const handleBack = () => {
  if (!currentPath.value) return
  
  // 返回到上一级目录
  const pathParts = currentPath.value.split('/').filter(Boolean)
  pathParts.pop()
  const newPath = pathParts.length > 0 ? pathParts.join('/') + '/' : ''
  
  currentPath.value = newPath
  loadItems()
}

// 处理删除文件/文件夹
const handleDelete = (item, event) => {
  event.stopPropagation() // 阻止事件冒泡
  
  if (confirm(`确定要删除 ${item.name} 吗？`)) {
    request.delete(`/api/file/${currentPath.value}${item.name}`).then(response => {
      if (response.data.code === 200) {
        loadItems() // 重新加载文件列表
      } else {
        error.value = response.data.message || '删除失败'
      }
      console.log(response)
    }).catch(err => {
      error.value = err.response?.data?.message || '删除时发生错误'
    })
  }
}

// 处理下载文件/文件夹
const handleDownload = (item, event) => {
  event.stopPropagation() // 阻止事件冒泡
  
  isLoading.value = true
  
  // 构建下载链接
  const downloadUrl = import.meta.env.VITE_API_URL + `/api/file/download/${currentPath.value}${item.name}`

  request.get(downloadUrl, {
    responseType: 'blob' // 重要：设置响应类型为blob
  }).then(response => {
    // 创建Blob对象
    const blob = new Blob([response.data], {
      type: item.type === 'folder' ? 'application/zip' : 'application/json'
    })
    
    // 创建下载链接
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = item.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 释放URL对象
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
  }).catch(err => {
    error.value = err.response?.data?.message || '下载时发生错误'
  }).finally(() => {
    isLoading.value = false
  })
}

// 上传文件
const handleUpload = () => {
  // 打开文件选择对话框
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadFile(file)
    }
  }
  input.click()
}

// 上传文件到服务器
const uploadFile = (file) => {
  isLoading.value = true
  
  const formData = new FormData()
  formData.append('file', file)
  
  request.post(`/api/upload/${currentPath.value}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    if (response.data.code === 200) {
      loadItems() // 重新加载文件列表
    } else {
      error.value = response.data.message || '上传失败'
    }
  }).catch(err => {
    error.value = err.response?.data?.message || '上传时发生错误'
  }).finally(() => {
    isLoading.value = false
  })
}

onMounted(() => {
  getUserInfo()
  loadItems()
})
</script>

<template>
  <div class="file-browse-container">
    <div class="file-browse-header">
      <div class="header-top">
        <button class="back-button" @click="handleBack" :disabled="isLoading || !currentPath">
          ← 回退
        </button>
        <h1>文件浏览</h1>
        <button v-if="isAdmin" class="upload-button" @click="handleUpload" :disabled="isLoading">
          上传文件
        </button>
      </div>
      <div class="current-path">
        当前路径: {{ currentPath }}
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div class="file-list">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="file-item"
        @click="handleItemClick(item)"
      >
        <div class="file-icon">
          {{ item.type === 'folder' ? '📁' : '📄' }}
        </div>
        <div class="file-info">
          <div class="file-name">{{ item.name }}</div>
          <div v-if="isAdmin" class="file-actions">
            <button class="action-button download-button" @click="handleDownload(item, $event)">
              下载
            </button>
            <button class="action-button delete-button" @click="handleDelete(item, $event)">
              删除
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="items.length === 0 && !isLoading" class="empty-message">
        当前目录为空
      </div>
      
      <div v-if="isLoading" class="loading-message">
        加载中...
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-browse-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #000;
  color: #fff;
  overflow: hidden;
}

.file-browse-header {
  padding: 1.5vw;
  background-color: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-top {
  display: flex;
  align-items: center;
  gap: 1.5vw;
  margin-bottom: 0.8vw;
}

.back-button {
  padding: 0.5vw 1.5vw;
  font-size: 1vw;
  position: absolute;
  top: 1.5vw;
  left: 1.5vw;
  color: #FFFFFF;
  background-color: rgba(40, 40, 40, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5vw;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.back-button:hover:not(:disabled) {
  background-color: rgba(50, 50, 50, 0.8);
  transform: translateX(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.back-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.upload-button {
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

.upload-button:hover:not(:disabled) {
  background-color: rgba(50, 50, 50, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.upload-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.file-browse-header h1 {
  margin: 0;
  font-size: 1.5vw;
  flex: 1;
  text-align: center;
}

.current-path {
  font-size: 1.5vw;
  color: #ccc;
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

.file-list {
  flex: 1;
  padding: 1.5vw;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 1.2vw;
  padding: 1.2vw;
  background-color: rgba(30, 30, 30, 0.8);
  border-radius: 0.6vw;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.file-item:hover {
  background-color: rgba(40, 40, 40, 0.8);
  transform: translateX(0.4vw);
  box-shadow: 0 0.3vw 0.9vw rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.file-icon {
  font-size: 1.5vw;
  min-width: 2.5vw;
}

.file-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-name {
  font-size: 1.5vw;
  font-weight: 500;
}

.file-actions {
  display: flex;
  gap: 0.5vw;
}

.action-button {
  padding: 0.3vw 0.8vw;
  font-size: 0.9vw;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3vw;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.download-button {
  background-color: rgba(40, 80, 120, 0.8);
}

.download-button:hover {
  background-color: rgba(50, 100, 140, 0.8);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.delete-button {
  background-color: rgba(120, 40, 40, 0.8);
}

.delete-button:hover {
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