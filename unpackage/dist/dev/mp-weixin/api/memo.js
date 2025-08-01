"use strict";
const utils_request = require("../utils/request.js");
const memoApi = {
  // 获取备忘录列表
  getMemoList(params = {}) {
    return utils_request.http.get("/memo/list", params);
  },
  // 搜索备忘录
  searchMemo(keyword) {
    return utils_request.http.get("/memo/search", { keyword });
  }
};
exports.memoApi = memoApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/memo.js.map
