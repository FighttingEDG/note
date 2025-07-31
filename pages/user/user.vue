<template>
	<view class="container">
		<!-- 展示配置信息 -->
		<view class="config-info">
			<text>当前应用: {{ appSettings.name }}</text>
			<text>版本: {{ appSettings.version }}</text>
			<text>分类数量: {{ memoConfig.categories.length }}</text>
		</view>
	</view>
</template>

<script setup>
import { appSettings, memoConfig } from '@/config/index.js'
</script>

<style scoped>
.container {
	padding: 40rpx;
}
.config-info {
	margin-top: 40rpx;
	padding: 20rpx;
	background: #f5f5f5;
	border-radius: 10rpx;
}
.config-info text {
	display: block;
	margin-bottom: 10rpx;
	font-size: 24rpx;
	color: #666;
}
</style> 