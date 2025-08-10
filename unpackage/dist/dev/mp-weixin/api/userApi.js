"use strict";
const utils_request = require("../utils/request.js");
const userApi = {
  // 用户登录
  login(loginData) {
    return utils_request.http.post("/user/login", loginData);
  },
  // 用户注册
  register(registerData) {
    return utils_request.http.post("/user/register", registerData);
  },
  // 用户登出
  logout() {
    return utils_request.http.post("/user/logout");
  }
};
exports.userApi = userApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/userApi.js.map
