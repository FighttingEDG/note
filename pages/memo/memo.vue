<template>
	<view class="container">
		<button type="primary" class="btn" @click="loadMemoList">刷新列表</button>
		
		<uni-list>
			<uni-list-item 
				v-for="memo in memoList" 
				:key="memo.id"
				:title="memo.title" 
				:note="memo.content"
				:rightText="memo.createTime"
				clickable
				@click="handleMemoClick(memo)"
			>
				<template v-slot:footer>
					<uni-tag :text="memo.category" size="small" />
				</template>
			</uni-list-item>
		</uni-list>
		
		<view v-if="memoList.length === 0" class="empty">
			<text>暂无备忘录</text>
		</view>
		
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { memoApi } from '@/api/memo.js'
import { appSettings, memoConfig } from '@/config/index.js'

// 响应式数据
const memoList = ref([])
const loading = ref(false)

// 加载备忘录列表
const loadMemoList = async () => {
	try {
		loading.value = true
		const data = await memoApi.getMemoList()
		memoList.value = data || []
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
.container {
	padding: 40rpx;
}
.btn {
	margin-bottom: 20rpx;
}
.empty {
	text-align: center;
	padding: 100rpx 0;
	color: #999;
}
</style>