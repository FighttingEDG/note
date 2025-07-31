<template>
	<view class="top">
		占位
	</view>
	<uni-card title="基础卡片" :isFull="true" sub-title="副标题" extra="额外信息" :thumbnail="avatar">
		<text class="uni-body">这是一个通栏卡片 ，通栏没有外边距，左右会贴合父元素。</text>
	</uni-card>
</template>

<script setup>
	// 这里可以引入后续逻辑
</script>

<style scoped>
	.top {
		display: flex;
		justify-content: center;
	}
</style>