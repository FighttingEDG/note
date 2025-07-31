/**
 * 配置统一导出文件
 * 组合所有的配置并统一导出
 */

import baseConfig from './base_config.js'
import appConfig from './app_config.js'

// 合并所有配置
const config = {
  ...baseConfig,
  ...appConfig
}

// 统一导出
export default config

// 也可以按需导出
export { baseConfig, appConfig }

// 导出常用配置的快捷方式
export const requestConfig = config.request
export const appSettings = config.app
export const memoConfig = config.memo
export const todoConfig = config.todo
export const settingsConfig = config.settings
export const timeConfig = config.time 