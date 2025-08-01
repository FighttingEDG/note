<template>
	<view class="container">
		<uni-row class="demo-uni-row" :width="nvueWidth" margin="0px" v-for="memo in memoList" :key="memo.id">
			<uni-col :span="24">
				<uni-card :title="memo.title" :extra="memo.updatedAt">
					<text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
				</uni-card>
			</uni-col>
		</uni-row>
		<!-- 无长度的情况 -->
		<view v-if="memoList.length === 0" class="empty">
			<text>暂无备忘录</text>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		memoApi
	} from '@/api/memo.js'
	import {
		appSettings,
		memoConfig
	} from '@/config/index.js'

	// 响应式数据
	const memoList = ref([])
	const loading = ref(false)

	// 加载备忘录列表
	const loadMemoList = async () => {
		try {
			loading.value = true
			const params = {
				pageNum: 1,
				pageSize: 10,
				uid: 1,
				keyword: '' // 可以留空或填关键词
			}
			const data = await memoApi.getMemoList(params)
			memoList.value = data?.records || [] // ⚠️ 注意分页结果在 data.records
		} catch (error) {
			console.error('加载备忘录失败:', error)
			uni.showToast({
				title: '加载失败',
				icon: 'none'
			})
		} finally {
			loading.value = false
		}
	}

	// 点击备忘录
	const handleMemoClick = (memo) => {
		console.log('点击了备忘录:', memo.title)
		// 这里可以跳转到详情页或编辑页
		uni.showToast({
			title: `点击了: ${memo.title}`,
			icon: 'none'
		})
	}

	// 页面加载时获取数据
	onMounted(() => {
		loadMemoList()
	})
</script>

<style scoped>
	.container {}

	.empty {
		text-align: center;
		padding: 100rpx 0;
		color: #999;
	}
</style>