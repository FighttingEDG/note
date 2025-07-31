"use strict";
const baseConfig = {
  // 网络请求配置
  request: {
    baseURL: "http://localhost:8011/api",
    // 后端接口基础地址
    timeout: 1e4,
    // 超时时间（毫秒）
    header: {
      "Content-Type": "application/json"
    }
  },
  // 应用基础配置
  app: {
    name: "备忘录",
    version: "1.0.0",
    debug: true
    // 是否开启调试模式
  },
  // 存储配置
  storage: {
    tokenKey: "token",
    userInfoKey: "userInfo",
    settingsKey: "settings"
  },
  // 页面配置
  page: {
    pageSize: 20,
    // 分页大小
    defaultCategory: "默认分类"
  }
};
exports.baseConfig = baseConfig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/base_config.js.map
