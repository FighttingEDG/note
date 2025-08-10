"use strict";
const common_vendor = require("../common/vendor.js");
const utils_errorHandler = require("../utils/errorHandler.js");
const api_userApi = require("./userApi.js");
const safeUserApi = utils_errorHandler.createSafeApi(api_userApi.userApi, {
  // 默认配置
  showError: true,
  errorMsg: "操作失败",
  loading: false,
  // 用户操作一般不需要全局loading
  onError: (error) => {
    common_vendor.index.__f__("error", "at api/safeUserApi.js:16", "用户API错误:", error);
  }
});
const safeLoginApi = {
  login: (loginData, options = {}) => {
    return utils_errorHandler.createSafeApi(api_userApi.userApi, {
      showError: true,
      errorMsg: "登录失败",
      loading: true,
      loadingText: "登录中...",
      onError: (error) => {
        common_vendor.index.__f__("error", "at api/safeUserApi.js:30", "登录API错误:", error);
      }
    }).login(loginData, options);
  }
};
exports.safeLoginApi = safeLoginApi;
exports.safeUserApi = safeUserApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/safeUserApi.js.map
