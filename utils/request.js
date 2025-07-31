/**
 * 网络请求封装
 * 基于 uni.request 实现跨平台请求
 */

import { requestConfig } from '@/config/index.js'

// 请求拦截器
const requestInterceptor = (options) => {
  // 添加 token
  const token = uni.getStorageSync('token')
  if (token) {
    options.header.Authorization = `Bearer ${token}`
  }
  
  // 添加时间戳防止缓存
  if (options.method === 'GET') {
    options.url += (options.url.includes('?') ? '&' : '?') + `_t=${Date.now()}`
  }
  
  return options
}

// 响应拦截器
const responseInterceptor = (response) => {
  const { statusCode, data } = response
  
  // 请求成功
  if (statusCode === 200) {
    // 这里可以根据后端的响应格式调整
    if (data.code === 200 || data.code === 0) {
      return data.data || data
    } else {
      // 业务错误
      uni.showToast({
        title: data.message || '请求失败',
        icon: 'none'
      })
      return Promise.reject(data)
    }
  } else {
    // HTTP 错误
    uni.showToast({
      title: `网络错误: ${statusCode}`,
      icon: 'none'
    })
    return Promise.reject(response)
  }
}

// 错误处理
const errorHandler = (error) => {
  console.error('请求错误:', error)
  
  // 网络错误
  if (error.errMsg && error.errMsg.includes('timeout')) {
    uni.showToast({
      title: '请求超时',
      icon: 'none'
    })
  } else if (error.errMsg && error.errMsg.includes('fail')) {
    uni.showToast({
      title: '网络连接失败',
      icon: 'none'
    })
  }
  
  return Promise.reject(error)
}

// 核心请求方法
const request = (options) => {
  return new Promise((resolve, reject) => {
    // 合并配置
    const requestOptions = {
      url: requestConfig.baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        ...requestConfig.header,
        ...options.header
      },
      timeout: options.timeout || requestConfig.timeout,
      success: (res) => {
        try {
          const result = responseInterceptor(res)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail: (err) => {
        const error = errorHandler(err)
        reject(error)
      }
    }
    
    // 执行请求拦截器
    const finalOptions = requestInterceptor(requestOptions)
    
    // 发起请求
    uni.request(finalOptions)
  })
}

// 便捷方法
export const http = {
  // GET 请求
  get(url, params = {}, options = {}) {
    return request({
      url,
      method: 'GET',
      data: params,
      ...options
    })
  },
  
  // POST 请求
  post(url, data = {}, options = {}) {
    return request({
      url,
      method: 'POST',
      data,
      ...options
    })
  },
  
  // PUT 请求
  put(url, data = {}, options = {}) {
    return request({
      url,
      method: 'PUT',
      data,
      ...options
    })
  },
  
  // DELETE 请求
  delete(url, params = {}, options = {}) {
    return request({
      url,
      method: 'DELETE',
      data: params,
      ...options
    })
  }
}

// 导出原始请求方法（如果需要）
export { request } 