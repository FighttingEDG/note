<template>
	<view class="container">
		<uni-row class="content-row" margin="0px" v-for="memo in memoList" :key="memo.id">
			<uni-col :span="24">
				<uni-card :title="memo.title" :extra="memo.updatedAt">
					<text class="uni-body">{{memo.content}}</text>
				</uni-card>
			</uni-col>
		</uni-row>
		<!-- 无长度的情况 -->
		<view v-if="memoList.length === 0" class="empty">
			<text>暂无备忘录</text>
		</view>
		<!-- 分页器放底部 -->
		<view class="pagination-wrapper">
			<uni-pagination class="pagination" :show-icon="true" :total="total" :current="pageNum" :page-size="pageSize"
				@change="handlePageChange" />
			<view class="pagination-right">总条数：{{total}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		safeMemoApi
	} from '@/api/safeApi.js'
	import {
		handleAsync
	} from '@/utils/errorHandler.js'

	// 响应式数据
	const memoList = ref([]) // memo列表
	const loading = ref(false) // 加载状态
	const total = ref(0) // 总条数
	const pageNum = ref(1) // 分页器当前页数
	const pageSize = ref(10) // 分页器一页条数

	// 加载备忘录列表
	const loadMemoList = async () => {
		loading.value = true
		const params = {
			pageNum: pageNum.value,
			pageSize: pageSize.value,
			// 后端从jwt获取用户ID，不再传uid
			categoryIds: "1,2",
			keyword: '' // 可以留空或填关键词
		}

		const data = await safeMemoApi.getMemoList(params)
		// 自动处理报错
		if (data) {
			total.value = data.total
			console.log(data)
			memoList.value = data?.records || [] // ⚠️ 注意分页结果在 data.records
		}
		loading.value = false
	}
	
	// 点击备忘录
	const handleMemoClick = (memo) => {
		// 使用handleAsync包装异步操作
		handleAsync(
			async () => {
				console.log('点击了备忘录:', memo.title)
				// 这里可以是任何异步操作，比如获取详情、更新状态等
				// 模拟异步操作
				await new Promise(resolve => setTimeout(resolve, 100))
				return memo
			}, {
				showError: true,
				errorMsg: '操作失败',
				loading: false,
				onSuccess: (result) => {
					// 成功回调
					uni.showToast({
						title: `点击了: ${result.title}`,
						icon: 'none'
					})
				}
			}
		)
	}

	// 处理分页变化
	const handlePageChange = (e) => {
		pageNum.value = e.current
		// 使用handleAsync包装异步操作
		handleAsync(
			async () => {
				await loadMemoList()
				return {
					success: true
				}
			}, {
				showError: true,
				errorMsg: '加载分页数据失败',
				loading: false
			}
		)
	}

	// 页面加载时获取数据
	onMounted(() => {
		loadMemoList()
	})
</script>

<style scoped>
	.container {
		min-height: calc(100vh);
	}

	/* 列表 */
	.container .content-row {
		flex: 1;
		overflow: auto;
	}

	/* 分页器 */
	.pagination-wrapper {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 99;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		padding: 0rpx 20rpx;

		/* 使用安全区适配底部 */
		bottom: calc(env(safe-area-inset-bottom));
	}

	.container .pagination-wrapper .pagination {
		width: 60%;
		display: flex;
		align-items: center;
	}

	/* 内部样式改变 */
	.container .pagination-wrapper .pagination :deep(.uni-pagination) {
		width: 100%;
	}

	.container .pagination-wrapper .pagination-right {
		display: flex;
		align-items: center;
		font-size: 14px;
	}


	.empty {
		text-align: center;
		padding: 100rpx 0;
		color: #999;
	}
</style>