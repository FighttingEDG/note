<template>
	<view class="user-container">
		<!-- 用户信息卡片 -->
		<uni-card class="user-card" :is-shadow="true" shadow="0 8px 24px rgba(0,0,0,0.1)">
			<view class="user-header">
				<view class="avatar-section">
					<image :src="userInfo.avatar || '/static/c1.png'" class="user-avatar" mode="aspectFill"
						@click="changeAvatar"></image>
					<view class="avatar-edit">
						<uni-icons type="camera" size="16" color="white"></uni-icons>
					</view>
				</view>
				<view class="user-details">
					<text class="username">{{ userInfo.username || '未登录' }}</text>
					<text class="user-email">{{ userInfo.email || '点击登录' }}</text>
				</view>
				<view class="user-status">
					<uni-tag :text="userInfo.status || '离线'"
						:type="userInfo.status === '在线' ? 'success' : 'warning'"></uni-tag>
				</view>
			</view>
		</uni-card>

		<!-- 功能菜单 -->
		<uni-card class="menu-card" :is-shadow="true" shadow="0 4px 16px rgba(0,0,0,0.08)">
			<uni-list>
				<uni-list-item title="个人资料" link to="/pages/user/profile" showArrow thumb="/static/c1.png">
					<template v-slot:header>
						<uni-icons type="person" size="20" color="#667eea"></uni-icons>
					</template>
				</uni-list-item>

				<uni-list-item title="修改密码" link to="/pages/user/change-password" showArrow thumb="/static/c2.png">
					<template v-slot:header>
						<uni-icons type="locked" size="20" color="#667eea"></uni-icons>
					</template>
				</uni-list-item>

				<uni-list-item title="消息通知" link to="/pages/user/notifications" showArrow thumb="/static/c3.png">
					<template v-slot:header>
						<uni-icons type="notification" size="20" color="#667eea"></uni-icons>
					</template>
				</uni-list-item>

				<uni-list-item title="隐私设置" link to="/pages/user/privacy" showArrow thumb="/static/c1.png">
					<template v-slot:header>
						<uni-icons type="eye" size="20" color="#667eea"></uni-icons>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-card>

		<!-- 应用信息 -->
		<uni-card class="info-card" :is-shadow="true" shadow="0 4px 16px rgba(0,0,0,0.08)">
			<view class="card-title">
				<uni-icons type="info" size="18" color="#666"></uni-icons>
				<text class="title-text">应用信息</text>
			</view>

			<view class="info-list">
				<view class="info-item">
					<text class="info-label">当前应用:</text>
					<text class="info-value">{{ appSettings.name }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">版本:</text>
					<text class="info-value">{{ appSettings.version }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">分类数量:</text>
					<text class="info-value">{{ memoConfig.categories.length }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">登录时间:</text>
					<text class="info-value">{{ formatLoginTime() }}</text>
				</view>
			</view>
		</uni-card>

		<!-- 退出登录按钮 -->
		<view class="logout-section">
			<button class="logout-btn" @click="handleLogout">
				<uni-icons type="logout" size="18" color="white"></uni-icons>
				<text class="logout-text">退出登录</text>
			</button>
		</view>

		<!-- 底部安全提示 -->
		<view class="bottom-tips">
			<text class="tip-text">为了您的账户安全，请及时退出登录</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		appSettings,
		memoConfig
	} from '@/config/index.js'
	import {
		safeUserApi
	} from '@/api/safeUserApi.js'

	// 响应式数据
	const userInfo = ref({})

	// 获取用户信息
	const loadUserInfo = async () => {
		try {
			const info = uni.getStorageSync('userInfo')
			if (info) {
				userInfo.value = info
			} else {
				// 如果没有本地用户信息，尝试从API获取
				const response = await safeUserApi.getUserInfo()
				if (response) {
					userInfo.value = response
					uni.setStorageSync('userInfo', response)
				}
			}
		} catch (error) {
			console.error('获取用户信息失败:', error)
		}
	}

	// 修改头像
	const changeAvatar = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				const tempFilePath = res.tempFilePaths[0]
				// 这里可以调用上传头像的API
				uni.showToast({
					title: '头像上传功能开发中',
					icon: 'none'
				})
			}
		})
	}

	// 退出登录
	const handleLogout = () => {
		uni.showModal({
			title: '确认退出',
			content: '确定要退出登录吗？',
			success: async (res) => {
				if (res.confirm) {
					try {
						// 调用后端登出API
						await safeUserApi.logout()
					} catch (error) {
						console.error('登出API调用失败:', error)
					} finally {
						// 无论API是否成功，都清除本地数据
						uni.removeStorageSync('token')
						uni.removeStorageSync('userInfo')

						uni.showToast({
							title: '已退出登录',
							icon: 'success'
						})

						// 跳转到登录页
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/login/login'
							})
						}, 1500)
					}
				}
			}
		})
	}

	// 格式化登录时间
	const formatLoginTime = () => {
		const loginTime = uni.getStorageSync('loginTime')
		if (loginTime) {
			const date = new Date(loginTime)
			return date.toLocaleString('zh-CN')
		}
		return '未知'
	}

	// 页面加载时获取用户信息
	onMounted(() => {
		loadUserInfo()
	})
</script>

<style scoped>
	.user-container {
		min-height: 100vh;
		background: #f5f7fa;
		padding: 20rpx;
	}

	/* 用户卡片 */
	.user-card {
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.user-header {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
	}

	.avatar-section {
		position: relative;
		margin-right: 30rpx;
	}

	.user-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 4rpx solid #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.avatar-edit {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 36rpx;
		height: 36rpx;
		background: #667eea;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid #fff;
	}

	.user-details {
		flex: 1;
	}

	.username {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.user-email {
		display: block;
		font-size: 26rpx;
		color: #666;
	}

	.user-status {
		margin-left: 20rpx;
	}

	/* 菜单卡片 */
	.menu-card {
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	/* 信息卡片 */
	.info-card {
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.card-title {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.title-text {
		margin-left: 16rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}

	.info-list {
		padding: 0 20rpx;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.info-label {
		font-size: 28rpx;
		color: #666;
	}

	.info-value {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	/* 退出登录 */
	.logout-section {
		padding: 40rpx 20rpx;
	}

	.logout-btn {
		width: 100%;
		height: 88rpx;
		background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
		border: none;
		border-radius: 44rpx;
		color: white;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
		transition: all 0.3s ease;
	}

	.logout-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
	}

	.logout-text {
		margin-left: 16rpx;
	}

	/* 底部提示 */
	.bottom-tips {
		text-align: center;
		padding: 40rpx 20rpx;
	}

	.tip-text {
		color: #999;
		font-size: 24rpx;
	}
</style>