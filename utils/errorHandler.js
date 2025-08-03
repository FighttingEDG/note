/**
 * 全局错误处理工具
 * 用于包装API调用，避免每次都写try-catch
 */

/**
 * 包装异步函数调用，统一处理错误
 * @param {Function} asyncFunc - 异步函数
 * @param {Object} options - 配置选项
 * @param {Boolean} options.showError - 是否显示错误提示，默认为true
 * @param {String} options.errorMsg - 自定义错误提示
 * @param {Function} options.onError - 错误回调函数
 * @param {Function} options.onSuccess - 成功回调函数
 * @param {Boolean} options.rethrow - 是否重新抛出错误，默认为false
 * @returns {Promise} 处理后的Promise
 */
export const handleAsync = async (asyncFunc, options = {}) => {
  const {
    showError = true,
    errorMsg = '操作失败',
    onError,
    onSuccess,
    rethrow = false,
    loading = false,
    loadingText = '加载中...',
  } = options;
  
  try {
    // 显示加载提示
    if (loading) {
      uni.showLoading({
        title: loadingText,
        mask: true
      });
    }
    
    // 执行异步函数
    const result = await asyncFunc();
    
    // 隐藏加载提示
    if (loading) {
      uni.hideLoading();
    }
    
    // 调用成功回调
    if (typeof onSuccess === 'function') {
      onSuccess(result);
    }
    
    return result;
  } catch (error) {
    // 隐藏加载提示
    if (loading) {
      uni.hideLoading();
    }
    
    // 显示错误提示
    if (showError && !error.handled) {
      // 优先使用后端返回的错误信息
      const errorMessage = error.message || errorMsg;
      uni.showToast({
        title: errorMessage,
        icon: 'none'
      });
      
      // 标记错误已显示提示
      error.handled = true;
    }
    
    // 调用错误回调
    if (typeof onError === 'function') {
      onError(error);
    }
    
    // 是否重新抛出错误
    if (rethrow) {
      throw error;
    }
    
    // 返回null表示操作失败
    return null;
  }
};

/**
 * 创建一个包装后的API对象，所有方法都自动处理错误
 * @param {Object} api - 原始API对象
 * @param {Object} defaultOptions - 默认配置选项
 * @returns {Object} 包装后的API对象
 */
export const createSafeApi = (api, defaultOptions = {}) => {
  const safeApi = {};
  
  for (const key in api) {
    if (typeof api[key] === 'function') {
      safeApi[key] = (...args) => {
        // 检查最后一个参数是否为选项对象（自定义handleAsync选项）
        const lastArg = args[args.length - 1];
        const hasOptions = lastArg && typeof lastArg === 'object' && 
                          !Array.isArray(lastArg) && 
                          !(lastArg instanceof Date) &&
                          (lastArg.showError !== undefined || 
                           lastArg.errorMsg !== undefined || 
                           lastArg.onError !== undefined || 
                           lastArg.onSuccess !== undefined || 
                           lastArg.rethrow !== undefined || 
                           lastArg.loading !== undefined || 
                           lastArg.loadingText !== undefined);
        
        if (hasOptions && args.length > 0) {
          // 如果最后一个参数是handleAsync选项对象，则从参数中移除
          const apiArgs = args.slice(0, -1);
          const customOptions = args[args.length - 1];
          
          // 合并默认选项和自定义选项
          const mergedOptions = { ...defaultOptions, ...customOptions };
          
          return handleAsync(() => api[key](...apiArgs), mergedOptions);
        } else {
          // 否则使用默认选项，将所有参数传递给原始API
          return handleAsync(() => api[key](...args), defaultOptions);
        }
      };
    } else {
      safeApi[key] = api[key];
    }
  }
  
  return safeApi;
};