"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const _sfc_main = {
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(config_index.appSettings).name),
        b: common_vendor.t(common_vendor.unref(config_index.appSettings).version),
        c: common_vendor.t(common_vendor.unref(config_index.memoConfig).categories.length)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
