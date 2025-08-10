<script setup>
import { onLaunch, onShow } from '@dcloudio/uni-app'

// 检查是否已登录
const checkLogin = () => {
  const token = uni.getStorageSync('token')
  if (!token) {
    // 获取当前页面路径
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const currentPath = currentPage ? currentPage.route : ''
    
    // 如果不在登录页，则跳转到登录页
    if (currentPath !== 'pages/login/login') {
       // 使用 reLaunch 而不是 redirectTo，避免导航冲突
      uni.reLaunch({ 
        url: '/pages/login/login',
        success: () => {
          console.log('跳转到登录页成功')
        },
        fail: (err) => {
          console.error('跳转失败:', err)
        }
      })
      return false
    }
  }
  return true
}

// 应用启动时检查登录状态
onLaunch(() => {
  console.log('App Launch')
  // 延迟检查，确保页面已加载
  setTimeout(() => {
    checkLogin()
  }, 500) // 增加延迟时间
})

// 应用显示时检查登录状态
onShow(() => {
  console.log('App Show')
  // 延迟检查，确保页面已加载
  setTimeout(() => {
    checkLogin()
  }, 500) // 增加延迟时间
})
</script>

<style>
/* 全局样式 */
page {
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* 通用按钮样式 */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 44rpx;
  font-weight: bold;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  border-radius: 44rpx;
  font-weight: bold;
  box-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
}

/* 通用卡片样式 */
.card-common {
  background: white;
  border-radius: 20rpx;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  margin-bottom: 20rpx;
}

/* 通用输入框样式 */
.input-common {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 20rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.input-common:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
}
</style>