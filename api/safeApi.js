/**
 * 安全API调用包装器
 * 自动处理错误，避免每次调用API都写try-catch
 */

import { createSafeApi } from '@/utils/errorHandler.js';
import { memoApi } from './memoApi.js';
import { userApi } from './userApi.js';

// 创建安全的用户API
export const safeUserApi = createSafeApi(userApi, {
  // 默认配置
  showError: true,
  errorMsg: '操作失败',
  loading: false, // 用户操作一般不需要全局loading
  onError: (error) => {
    console.error('用户API错误:', error);
    // 这里可以添加其他错误处理逻辑，如错误上报等
  }
});
// 创建安全的备忘录API
export const safeMemoApi = createSafeApi(memoApi, {
  // 默认配置
  showError: true,
  errorMsg: '获取备忘录失败', // 这将作为后备错误信息，优先使用后端返回的错误信息
  loading: true,
  loadingText: '加载中...',
  // 可以添加错误回调函数，用于记录错误日志或执行其他操作
  onError: (error) => {
    console.error('备忘录API错误:', error);
    // 这里可以添加其他错误处理逻辑，如错误上报等
  }
});
// 特殊配置的登录API
export const safeLoginApi = {
  login: (loginData, options = {}) => {
    return createSafeApi(userApi, {
      showError: true,
      errorMsg: '登录失败',
      loading: true,
      loadingText: '登录中...',
      onError: (error) => {
        console.error('登录API错误:', error);
      }
    }).login(loginData, options);
  }
};