/**
 * 基础配置文件
 * 包含网络请求、超时时间等基础配置
 */

const baseConfig = {
	// 网络请求配置
	request: {
		baseURL: 'http://192.168.31.171:8011/api', // 后端接口基础地址
		timeout: 10000, // 超时时间（毫秒）
		header: {
			'Content-Type': 'application/json'
		}
	},

	// 应用基础配置
	app: {
		name: '备忘录',
		version: '1.0.0',
		debug: true // 是否开启调试模式
	},

	// 存储配置
	storage: {
		// 用户token
		tokenKey: 'token',
		// 用户信息
		userInfoKey: 'userInfo',
		settingsKey: 'settings'
	},

	// 页面配置
	page: {
		pageSize: 20, // 分页大小
		defaultCategory: '默认分类'
	}
}

export default baseConfig