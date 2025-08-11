/**
 * 安全用户API调用包装器
 * 自动处理错误，避免每次调用API都写try-catch
 */

import { createSafeApi } from '@/utils/errorHandler.js';
import { userApi } from './userApi.js';

// 安全的用户API
export const safeUserApi = createSafeApi(userApi, {
    // 默认配置
    showError: true,
    errorMsg: '操作失败',
    loading: false, // 用户操作一般不需要全局loading
    onError: (error) => {
      console.error('用户API错误:', error);
      // 这里可以添加其他错误处理逻辑，如错误上报
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