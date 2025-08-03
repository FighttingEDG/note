<template>
  <view class="container">
    <view class="header">
      <text class="title">备忘录列表</text>
      <button class="refresh-btn" @click="loadMemoList">刷新</button>
    </view>
    
    <view class="memo-list" v-if="memoList.length > 0">
      <view 
        class="memo-item" 
        v-for="(memo, index) in memoList" 
        :key="memo.id"
        @click="handleMemoClick(memo)"
      >
        <text class="memo-title">{{ memo.title }}</text>
        <text class="memo-content">{{ memo.content }}</text>
        <text class="memo-time">{{ memo.createTime }}</text>
      </view>
    </view>
    
    <view class="empty-state" v-else>
      <text>暂无备忘录</text>
    </view>
  </view>
</template>

<script>
import { safeMemoApi } from '@/api/safeApi.js';
import { handleAsync } from '@/utils/errorHandler.js';

export default {
  data() {
    return {
      memoList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    };
  },
  onLoad() {
    this.loadMemoList();
  },
  methods: {
    /**
     * 加载备忘录列表 - 使用safeMemoApi
     * 自动处理错误，无需try-catch
     */
    async loadMemoList() {
      const params = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      
      // 使用safeMemoApi，自动处理错误
      const data = await safeMemoApi.getMemoList(params);
      
      // 如果请求成功，data会有值；如果失败，data为null
      if (data) {
        this.memoList = data.list || [];
        this.total = data.total || 0;
      }
    },
    
    /**
     * 处理备忘录点击 - 使用handleAsync包装
     * 自定义错误处理和成功回调
     */
    handleMemoClick(memo) {
      handleAsync(
        async () => {
          // 模拟异步操作
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // 跳转到详情页
          uni.navigateTo({
            url: `/pages/memo/detail?id=${memo.id}`
          });
          
          return memo;
        },
        {
          loading: true,
          loadingText: '加载中...',
          errorMsg: '打开备忘录失败',
          onSuccess: (result) => {
            console.log('成功打开备忘录:', result.title);
          },
          onError: (error) => {
            console.error('打开备忘录失败:', error);
          }
        }
      );
    },
    
    /**
     * 处理分页变化 - 使用handleAsync包装
     * 自定义错误处理，处理特定错误码
     */
    handlePageChange(page) {
      handleAsync(
        async () => {
          this.currentPage = page;
          const params = {
            page: this.currentPage,
            pageSize: this.pageSize
          };
          
          // 直接使用原始API，由handleAsync处理错误
          const data = await safeMemoApi.getMemoList(params);
          
          if (data) {
            this.memoList = data.list || [];
            this.total = data.total || 0;
          }
          
          return data;
        },
        {
          loading: true,
          loadingText: '加载中...',
          errorMsg: '加载失败',
          onError: (error) => {
            // 处理特定错误
            if (error.data && error.data.code === 401) {
              // 显示自定义提示
              uni.showModal({
                title: '登录已过期',
                content: '请重新登录',
                success: (res) => {
                  if (res.confirm) {
                    uni.navigateTo({
                      url: '/pages/login/login'
                    });
                  }
                }
              });
              
              // 标记错误已处理，阻止系统显示默认错误提示
              error.handled = true;
            }
          }
        }
      );
    },
    
    /**
     * 搜索备忘录 - 使用safeMemoApi并传入自定义选项
     */
    async searchMemo(keyword) {
      // 自定义选项
      const options = {
        loading: true,
        loadingText: '搜索中...',
        errorMsg: '搜索失败',
        onError: (error) => {
          // 自定义错误处理
          console.error('搜索失败:', error);
        }
      };
      
      // 调用safeMemoApi并传入自定义选项
      // 注意：第一个参数是API参数，第二个参数是handleAsync选项
      const data = await safeMemoApi.searchMemo({ keyword }, options);
      
      if (data) {
        this.memoList = data.list || [];
        this.total = data.total || 0;
      }
    }
  }
};
</script>

<style>
.container {
  padding: 20rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

.refresh-btn {
  font-size: 28rpx;
  padding: 10rpx 20rpx;
}

.memo-list {
  margin-top: 20rpx;
}

.memo-item {
  background-color: #f8f8f8;
  padding: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}

.memo-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.memo-content {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
  display: block;
}

.memo-time {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.empty-state {
  text-align: center;
  padding: 100rpx 0;
  color: #999;
}
</style>