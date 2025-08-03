"use strict";
const common_vendor = require("../common/vendor.js");
const config_index = require("../config/index.js");
function serializeParams(params = {}) {
  return Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
}
const requestInterceptor = (options) => {
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    options.header.Authorization = `Bearer ${token}`;
  }
  if (options.method === "GET") {
    options.url += (options.url.includes("?") ? "&" : "?") + `_t=${Date.now()}`;
  }
  return options;
};
const responseInterceptor = (response) => {
  const {
    statusCode,
    data
  } = response;
  if (statusCode === 200) {
    if (data.code === 200 || data.code === 0) {
      return data.data || data;
    } else {
      const error = new Error(data.message || "请求失败");
      error.data = data;
      return Promise.reject(error);
    }
  } else {
    const error = new Error(`网络错误: ${statusCode}`);
    error.statusCode = statusCode;
    error.response = response;
    return Promise.reject(error);
  }
};
const errorHandler = (error) => {
  common_vendor.index.__f__("error", "at utils/request.js:62", "请求错误:", error);
  if (error.errMsg) {
    if (error.errMsg.includes("timeout")) {
      const timeoutError = new Error("请求超时");
      timeoutError.originalError = error;
      return Promise.reject(timeoutError);
    } else if (error.errMsg.includes("fail")) {
      const networkError = new Error("网络连接失败");
      networkError.originalError = error;
      return Promise.reject(networkError);
    }
  }
  return Promise.reject(error);
};
const request = (options) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      url: config_index.requestConfig.baseURL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        ...config_index.requestConfig.header,
        ...options.header
      },
      timeout: options.timeout || config_index.requestConfig.timeout,
      success: (res) => {
        try {
          const result = responseInterceptor(res);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      fail: (err) => {
        const error = errorHandler(err);
        reject(error);
      }
    };
    const finalOptions = requestInterceptor(requestOptions);
    common_vendor.index.request(finalOptions);
  });
};
const withErrorHandler = (requestPromise) => {
  return requestPromise.catch((error) => {
    return Promise.reject(error);
  });
};
const http = {
  // GET 请求
  get(url, params = {}, options = {}) {
    const query = serializeParams(params);
    if (query) {
      url += (url.includes("?") ? "&" : "?") + query;
    }
    return withErrorHandler(request({
      url,
      method: "GET",
      ...options
    }));
  },
  // POST 请求
  post(url, data = {}, options = {}) {
    return withErrorHandler(request({
      url,
      method: "POST",
      data,
      ...options
    }));
  },
  // PUT 请求
  put(url, data = {}, options = {}) {
    return withErrorHandler(request({
      url,
      method: "PUT",
      data,
      ...options
    }));
  },
  // DELETE 请求
  delete(url, params = {}, options = {}) {
    return withErrorHandler(request({
      url,
      method: "DELETE",
      data: params,
      ...options
    }));
  }
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
