"use strict";
const common_vendor = require("../common/vendor.js");
const handleAsync = async (asyncFunc, options = {}) => {
  const {
    showError = true,
    errorMsg = "操作失败",
    onError,
    onSuccess,
    rethrow = false,
    loading = false,
    loadingText = "加载中..."
  } = options;
  try {
    if (loading) {
      common_vendor.index.showLoading({
        title: loadingText,
        mask: true
      });
    }
    const result = await asyncFunc();
    if (loading) {
      common_vendor.index.hideLoading();
    }
    if (typeof onSuccess === "function") {
      onSuccess(result);
    }
    return result;
  } catch (error) {
    if (loading) {
      common_vendor.index.hideLoading();
    }
    if (showError && !error.handled) {
      const errorMessage = error.message || errorMsg;
      common_vendor.index.showToast({
        title: errorMessage,
        icon: "none"
      });
      error.handled = true;
    }
    if (typeof onError === "function") {
      onError(error);
    }
    if (rethrow) {
      throw error;
    }
    return null;
  }
};
const createSafeApi = (api, defaultOptions = {}) => {
  const safeApi = {};
  for (const key in api) {
    if (typeof api[key] === "function") {
      safeApi[key] = (...args) => {
        const lastArg = args[args.length - 1];
        const hasOptions = lastArg && typeof lastArg === "object" && !Array.isArray(lastArg) && !(lastArg instanceof Date) && (lastArg.showError !== void 0 || lastArg.errorMsg !== void 0 || lastArg.onError !== void 0 || lastArg.onSuccess !== void 0 || lastArg.rethrow !== void 0 || lastArg.loading !== void 0 || lastArg.loadingText !== void 0);
        if (hasOptions && args.length > 0) {
          const apiArgs = args.slice(0, -1);
          const customOptions = args[args.length - 1];
          const mergedOptions = { ...defaultOptions, ...customOptions };
          return handleAsync(() => api[key](...apiArgs), mergedOptions);
        } else {
          return handleAsync(() => api[key](...args), defaultOptions);
        }
      };
    } else {
      safeApi[key] = api[key];
    }
  }
  return safeApi;
};
exports.createSafeApi = createSafeApi;
exports.handleAsync = handleAsync;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/errorHandler.js.map
