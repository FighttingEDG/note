/**
 * 网络请求封装
 * 基于 uni.request 实现跨平台请求
 * 增加全局错误处理，避免每个请求都写try-catch
 */

import {
	requestConfig
} from '@/config/index.js'
// 工具函数：将对象转为查询字符串
function serializeParams(params = {}) {
	return Object.keys(params)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join('&')
}
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
	const {
		statusCode,
		data
	} = response

	// 请求成功
	if (statusCode === 200) {
		// 这里可以根据后端的响应格式调整
		if (data.code === 200 || data.code === 0) {
			return data.data || data
		} else {
			// 业务错误 - 不在这里显示错误提示，而是传递给errorHandler.js处理
			// 创建一个包含message的错误对象
			const error = new Error(data.message || '请求失败');
			error.data = data; // 保存原始数据，以便错误处理函数可以访问
			return Promise.reject(error);
		}
	} else {
		// HTTP 错误 - 不在这里显示错误提示，而是传递给errorHandler.js处理
		const error = new Error(`网络错误: ${statusCode}`);
		error.statusCode = statusCode;
		error.response = response;
		return Promise.reject(error);
	}
}

// 错误处理
const errorHandler = (error) => {
	console.error('请求错误:', error)

	// 处理网络错误
	if (error.errMsg) {
		if (error.errMsg.includes('timeout')) {
			// 创建一个包含message的错误对象
			const timeoutError = new Error('请求超时');
			timeoutError.originalError = error;
			return Promise.reject(timeoutError);
		} else if (error.errMsg.includes('fail')) {
			// 创建一个包含message的错误对象
			const networkError = new Error('网络连接失败');
			networkError.originalError = error;
			return Promise.reject(networkError);
		}
	}

	// 如果已经是Error对象（来自responseInterceptor），直接返回
	return Promise.reject(error);
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

// 全局错误处理包装函数
const withErrorHandler = (requestPromise) => {
	return requestPromise.catch(error => {
		// 错误已经在 errorHandler 和 responseInterceptor 中处理过
		// 这里只需要返回一个被拒绝的 Promise，让调用链继续
		return Promise.reject(error);
	});
};

// 便捷方法
export const http = {
	// GET 请求
	get(url, params = {}, options = {}) {
		const query = serializeParams(params)
		if (query) {
			url += (url.includes('?') ? '&' : '?') + query
		}
		return withErrorHandler(request({
			url,
			method: 'GET',
			...options
		}));
	},

	// POST 请求
	post(url, data = {}, options = {}) {
		return withErrorHandler(request({
			url,
			method: 'POST',
			data,
			...options
		}));
	},

	// PUT 请求
	put(url, data = {}, options = {}) {
		return withErrorHandler(request({
			url,
			method: 'PUT',
			data,
			...options
		}));
	},

	// DELETE 请求
	delete(url, params = {}, options = {}) {
		return withErrorHandler(request({
			url,
			method: 'DELETE',
			data: params,
			...options
		}));
	}
}

// 导出原始请求方法（如果需要）
export {
	request
}