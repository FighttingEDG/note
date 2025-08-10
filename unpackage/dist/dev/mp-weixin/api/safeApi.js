"use strict";
const common_vendor = require("../common/vendor.js");
const utils_errorHandler = require("../utils/errorHandler.js");
const api_memo = require("./memo.js");
const api_userApi = require("./userApi.js");
utils_errorHandler.createSafeApi(api_userApi.userApi, {
  // 默认配置
  showError: true,
  errorMsg: "操作失败",
  loading: false,
  // 用户操作一般不需要全局loading
  onError: (error) => {
    common_vendor.index.__f__("error", "at api/safeApi.js:17", "用户API错误:", error);
  }
});
const safeMemoApi = utils_errorHandler.createSafeApi(api_memo.memoApi, {
  // 默认配置
  showError: true,
  errorMsg: "获取备忘录失败",
  // 这将作为后备错误信息，优先使用后端返回的错误信息
  loading: true,
  loadingText: "加载中...",
  // 可以添加错误回调函数，用于记录错误日志或执行其他操作
  onError: (error) => {
    common_vendor.index.__f__("error", "at api/safeApi.js:30", "备忘录API错误:", error);
  }
});
exports.safeMemoApi = safeMemoApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/safeApi.js.map
