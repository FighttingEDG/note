<template>
	<view class="login-container">
		<!-- 顶部装饰 -->
		<view class="top-decoration">
			<view class="circle circle-1"></view>
			<view class="circle circle-2"></view>
			<view class="circle circle-3"></view>
		</view>

		<!-- 标题区域 -->
		<view class="header-section">
			<view class="app-logo">
				<image src="/static/c1.png" class="logo-image" mode="aspectFit"></image>
			</view>
			<text class="app-title">备忘录</text>
			<text class="app-subtitle">记录生活，管理时间</text>
		</view>

		<!-- 登录表单 -->
		<view class="form-section">
			<uni-card class="login-card" :is-shadow="true" shadow="0 8px 24px rgba(0,0,0,0.1)">
				<view class="form-title">用户登录</view>

				<!-- 用户名输入 -->
				<view class="input-group">
					<view class="input-label">
						<uni-icons type="person" size="18" color="#666"></uni-icons>
						<text class="label-text">用户名</text>
					</view>
					<uni-easyinput v-model="loginForm.username" placeholder="请输入用户名" :clearable="true"
						class="custom-input" :inputBorder="false" :styles="inputStyles"></uni-easyinput>
				</view>

				<!-- 密码输入 -->
				<view class="input-group">
					<view class="input-label">
						<uni-icons type="locked" size="18" color="#666"></uni-icons>
						<text class="label-text">密码</text>
					</view>
					<uni-easyinput v-model="loginForm.password" type="password" placeholder="请输入密码" :clearable="true"
						class="custom-input" :inputBorder="false" :styles="inputStyles"></uni-easyinput>
				</view>

				<!-- 记住密码选项 -->
				<view class="remember-section">
					<uni-data-checkbox v-model="loginForm.remember" :localdata="rememberOptions" mode="tag"
						class="remember-checkbox"></uni-data-checkbox>
				</view>

				<!-- 登录按钮 -->
				<button class="login-btn" :class="{ 'loading': isLoading }" :disabled="isLoading" @click="handleLogin">
					<uni-icons v-if="!isLoading" type="forward" size="18" color="white"></uni-icons>
					<uni-load-more v-else status="loading" :content-text="loadingText"></uni-load-more>
					<text class="btn-text">{{ isLoading ? '登录中...' : '立即登录' }}</text>
				</button>

				<!-- 其他操作 -->
				<view class="other-actions">
					<text class="action-link" @click="goToRegister">注册账号</text>
					<text class="action-divider">|</text>
					<text class="action-link" @click="forgotPassword">忘记密码</text>
				</view>
			</uni-card>
		</view>

		<!-- 底部提示 -->
		<view class="bottom-tips">
			<text class="tip-text">登录即表示同意</text>
			<text class="tip-link" @click="showTerms">用户协议</text>
			<text class="tip-text">和</text>
			<text class="tip-link" @click="showPrivacy">隐私政策</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		safeLoginApi
	} from '@/api/safeUserApi.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	// 响应式数据
	const isLoading = ref(false)
	const loginForm = reactive({
		username: '',
		password: '',
		remember: 'false'
	})

	// 记住密码选项
	const rememberOptions = [

		{
			value: 'false',
			text: '不记住'
		},
		{
			value: 'true',
			text: '记住密码'
		}
	]

	// 输入框样式
	const inputStyles = {
		color: '#333',
		fontSize: '16px',
		backgroundColor: '#f8f9fa'
	}

	// 加载提示文字
	const loadingText = {
		contentdown: '登录中...',
		contentrefresh: '登录中...',
		contentnomore: '登录中...'
	}

	// 登录处理
	const handleLogin = async () => {
		// 表单验证
		if (!loginForm.username.trim()) {
			uni.showToast({
				title: '请输入用户名',
				icon: 'none'
			})
			return
		}

		if (!loginForm.password.trim()) {
			uni.showToast({
				title: '请输入密码',
				icon: 'none'
			})
			return
		}

		isLoading.value = true

		// 使用安全API，不需要try-catch
		const response = await safeLoginApi.login({
			username: loginForm.username.trim(),
			password: loginForm.password
		})
		console.log(response)

		if (response) {
			// 存储 token
			uni.setStorageSync('token', response.token)
			// 存储用户信息
			uni.setStorageSync('userInfo', response.userInfo)
			// 记住密码 - 注意这里需要转换类型
			if (loginForm.remember === 'true') { // 改为字符串比较
				uni.setStorageSync('rememberedUser', {
					username: loginForm.username,
					password: loginForm.password
				})
			} else {
				uni.removeStorageSync('rememberedUser')
			}

			// 显示成功提示
			uni.showToast({
				title: '登录成功',
				icon: 'success'
			})

			uni.switchTab({
				url: '/pages/memo/memo',
				success: () => {
					console.log('跳转到首页成功')
				},
				fail: (err) => {
					console.error('跳转失败:', err)
					// 如果 switchTab 失败，尝试使用 reLaunch
					uni.reLaunch({
						url: '/pages/memo/memo'
					})
				}
			})
		
		}

		// 无论成功失败，都需要重置loading状态
		isLoading.value = false
	}

	// 注册页面
	const goToRegister = () => {
		uni.showToast({
			title: '注册功能开发中',
			icon: 'none'
		})
	}

	// 忘记密码
	const forgotPassword = () => {
		uni.showToast({
			title: '密码重置功能开发中',
			icon: 'none'
		})
	}

	// 用户协议
	const showTerms = () => {
		uni.showToast({
			title: '用户协议功能开发中',
			icon: 'none'
		})
	}

	// 隐私政策
	const showPrivacy = () => {
		uni.showToast({
			title: '隐私政策功能开发中',
			icon: 'none'
		})
	}

	// 页面加载时检查是否有记住的用户信息
	onLoad(() => {
		const rememberedUser = uni.getStorageSync('rememberedUser')
		if (rememberedUser) {
			loginForm.username = rememberedUser.username
			loginForm.password = rememberedUser.password
			loginForm.remember = 'true'
		}
	})
</script>

<style scoped>
	.login-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		position: relative;
		overflow: hidden;
	}

	/* 顶部装饰 */
	.top-decoration {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 300rpx;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
	}

	.circle-1 {
		width: 200rpx;
		height: 200rpx;
		top: -100rpx;
		right: -50rpx;
	}

	.circle-2 {
		width: 150rpx;
		height: 150rpx;
		top: 50rpx;
		left: -75rpx;
	}

	.circle-3 {
		width: 100rpx;
		height: 100rpx;
		top: 150rpx;
		right: 100rpx;
	}

	/* 标题区域 */
	.header-section {
		text-align: center;
		padding: 120rpx 40rpx 80rpx;
		position: relative;
		z-index: 2;
	}

	.app-logo {
		margin-bottom: 30rpx;
	}

	.logo-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	.app-title {
		display: block;
		font-size: 48rpx;
		font-weight: bold;
		color: white;
		margin-bottom: 20rpx;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.app-subtitle {
		display: block;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 300;
	}

	/* 表单区域 */
	.form-section {
		padding: 0 40rpx;
		position: relative;
		z-index: 2;
	}

	.login-card {
		background: white;
		border-radius: 24rpx;
		padding: 60rpx 40rpx;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.form-title {
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 60rpx;
	}

	.input-group {
		margin-bottom: 40rpx;
	}

	.input-label {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.label-text {
		margin-left: 16rpx;
		font-size: 28rpx;
		color: #666;
		font-weight: 500;
	}

	.custom-input {
		background: #f8f9fa;
		border-radius: 16rpx;
		padding: 8rpx;
	}

	/* 记住密码 */
	.remember-section {
		margin-bottom: 50rpx;
	}

	.remember-checkbox {
		justify-content: center;
	}

	/* 登录按钮 */
	.login-btn {
		width: 100%;
		height: 88rpx;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border: none;
		border-radius: 44rpx;
		color: white;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
		transition: all 0.3s ease;
		margin-bottom: 40rpx;
	}

	.login-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	.login-btn.loading {
		opacity: 0.8;
	}

	.btn-text {
		margin-left: 16rpx;
	}

	/* 其他操作 */
	.other-actions {
		text-align: center;
		margin-bottom: 40rpx;
	}

	.action-link {
		color: #667eea;
		font-size: 28rpx;
		padding: 0 20rpx;
	}

	.action-divider {
		color: #ddd;
		font-size: 28rpx;
	}

	/* 底部提示 */
	.bottom-tips {
		text-align: center;
		padding: 40rpx;
		position: relative;
		z-index: 2;
	}

	.tip-text {
		color: rgba(255, 255, 255, 0.7);
		font-size: 24rpx;
	}

	.tip-link {
		color: rgba(255, 255, 255, 0.9);
		font-size: 24rpx;
		text-decoration: underline;
		margin: 0 8rpx;
	}
</style>