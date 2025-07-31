"use strict";
const common_vendor = require("../common/vendor.js");
const config_index = require("../config/index.js");
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
  const { statusCode, data } = response;
  if (statusCode === 200) {
    if (data.code === 200 || data.code === 0) {
      return data.data || data;
    } else {
      common_vendor.index.showToast({
        title: data.message || "请求失败",
        icon: "none"
      });
      return Promise.reject(data);
    }
  } else {
    common_vendor.index.showToast({
      title: `网络错误: ${statusCode}`,
      icon: "none"
    });
    return Promise.reject(response);
  }
};
const errorHandler = (error) => {
  common_vendor.index.__f__("error", "at utils/request.js:53", "请求错误:", error);
  if (error.errMsg && error.errMsg.includes("timeout")) {
    common_vendor.index.showToast({
      title: "请求超时",
      icon: "none"
    });
  } else if (error.errMsg && error.errMsg.includes("fail")) {
    common_vendor.index.showToast({
      title: "网络连接失败",
      icon: "none"
    });
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
const http = {
  // GET 请求
  get(url, params = {}, options = {}) {
    return request({
      url,
      method: "GET",
      data: params,
      ...options
    });
  },
  // POST 请求
  post(url, data = {}, options = {}) {
    return request({
      url,
      method: "POST",
      data,
      ...options
    });
  },
  // PUT 请求
  put(url, data = {}, options = {}) {
    return request({
      url,
      method: "PUT",
      data,
      ...options
    });
  },
  // DELETE 请求
  delete(url, params = {}, options = {}) {
    return request({
      url,
      method: "DELETE",
      data: params,
      ...options
    });
  }
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
