"use strict";
const utils_request = require("../utils/request.js");
const memoApi = {
  // 获取备忘录列表
  getMemoList(params = {}) {
    return utils_request.http.get("/memo/list", params);
  },
  // 获取备忘录详情
  getMemoDetail(id) {
    return utils_request.http.get(`/memo/${id}`);
  },
  // 创建备忘录
  createMemo(data) {
    return utils_request.http.post("/memo/create", data);
  },
  // 更新备忘录
  updateMemo(id, data) {
    return utils_request.http.put(`/memo/${id}`, data);
  },
  // 删除备忘录
  deleteMemo(id) {
    return utils_request.http.delete(`/memo/${id}`);
  },
  // 搜索备忘录
  searchMemo(keyword) {
    return utils_request.http.get("/memo/search", { keyword });
  }
};
exports.memoApi = memoApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/memo.js.map
