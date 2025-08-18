"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/memo/memo.js";
  "./pages/todo/todo.js";
  "./pages/category/category.js";
  "./pages/user/user.js";
  "./pages/view/memoDetail/memoDetail.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const checkLogin = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const currentPath = currentPage ? currentPage.route : "";
        if (currentPath !== "pages/login/login") {
          common_vendor.index.reLaunch({
            url: "/pages/login/login",
            success: () => {
              common_vendor.index.__f__("log", "at App.vue:19", "跳转到登录页成功");
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at App.vue:22", "跳转失败:", err);
            }
          });
          return false;
        }
      }
      return true;
    };
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:33", "App Launch");
      setTimeout(() => {
        checkLogin();
      }, 500);
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:42", "App Show");
      setTimeout(() => {
        checkLogin();
      }, 500);
    });
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
