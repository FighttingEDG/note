"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_safeUserApi = require("../../api/safeUserApi.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_data_checkbox2 + _easycom_uni_load_more2 + _easycom_uni_card2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_data_checkbox + _easycom_uni_load_more + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const loginForm = common_vendor.reactive({
      username: "",
      password: "",
      remember: "false"
    });
    const rememberOptions = [
      {
        value: "false",
        text: "不记住"
      },
      {
        value: "true",
        text: "记住密码"
      }
    ];
    const inputStyles = {
      color: "#333",
      fontSize: "16px",
      backgroundColor: "#f8f9fa"
    };
    const loadingText = {
      contentdown: "登录中...",
      contentrefresh: "登录中...",
      contentnomore: "登录中..."
    };
    const handleLogin = async () => {
      if (!loginForm.username.trim()) {
        common_vendor.index.showToast({
          title: "请输入用户名",
          icon: "none"
        });
        return;
      }
      if (!loginForm.password.trim()) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      isLoading.value = true;
      const response = await api_safeUserApi.safeLoginApi.login({
        username: loginForm.username.trim(),
        password: loginForm.password
      });
      common_vendor.index.__f__("log", "at pages/login/login.vue:148", response);
      if (response) {
        common_vendor.index.setStorageSync("token", response.token);
        common_vendor.index.setStorageSync("userInfo", response.userInfo);
        if (loginForm.remember === "true") {
          common_vendor.index.setStorageSync("rememberedUser", {
            username: loginForm.username,
            password: loginForm.password
          });
        } else {
          common_vendor.index.removeStorageSync("rememberedUser");
        }
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        common_vendor.index.switchTab({
          url: "/pages/memo/memo",
          success: () => {
            common_vendor.index.__f__("log", "at pages/login/login.vue:174", "跳转到首页成功");
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/login/login.vue:177", "跳转失败:", err);
            common_vendor.index.reLaunch({
              url: "/pages/memo/memo"
            });
          }
        });
      }
      isLoading.value = false;
    };
    const goToRegister = () => {
      common_vendor.index.showToast({
        title: "注册功能开发中",
        icon: "none"
      });
    };
    const forgotPassword = () => {
      common_vendor.index.showToast({
        title: "密码重置功能开发中",
        icon: "none"
      });
    };
    const showTerms = () => {
      common_vendor.index.showToast({
        title: "用户协议功能开发中",
        icon: "none"
      });
    };
    const showPrivacy = () => {
      common_vendor.index.showToast({
        title: "隐私政策功能开发中",
        icon: "none"
      });
    };
    common_vendor.onLoad(() => {
      const rememberedUser = common_vendor.index.getStorageSync("rememberedUser");
      if (rememberedUser) {
        loginForm.username = rememberedUser.username;
        loginForm.password = rememberedUser.password;
        loginForm.remember = "true";
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.p({
          type: "person",
          size: "18",
          color: "#666"
        }),
        c: common_vendor.o(($event) => loginForm.username = $event),
        d: common_vendor.p({
          placeholder: "请输入用户名",
          clearable: true,
          inputBorder: false,
          styles: inputStyles,
          modelValue: loginForm.username
        }),
        e: common_vendor.p({
          type: "locked",
          size: "18",
          color: "#666"
        }),
        f: common_vendor.o(($event) => loginForm.password = $event),
        g: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          clearable: true,
          inputBorder: false,
          styles: inputStyles,
          modelValue: loginForm.password
        }),
        h: common_vendor.o(($event) => loginForm.remember = $event),
        i: common_vendor.p({
          localdata: rememberOptions,
          mode: "tag",
          modelValue: loginForm.remember
        }),
        j: !isLoading.value
      }, !isLoading.value ? {
        k: common_vendor.p({
          type: "forward",
          size: "18",
          color: "white"
        })
      } : {
        l: common_vendor.p({
          status: "loading",
          ["content-text"]: loadingText
        })
      }, {
        m: common_vendor.t(isLoading.value ? "登录中..." : "立即登录"),
        n: isLoading.value ? 1 : "",
        o: isLoading.value,
        p: common_vendor.o(handleLogin),
        q: common_vendor.o(goToRegister),
        r: common_vendor.o(forgotPassword),
        s: common_vendor.p({
          ["is-shadow"]: true,
          shadow: "0 8px 24px rgba(0,0,0,0.1)"
        }),
        t: common_vendor.o(showTerms),
        v: common_vendor.o(showPrivacy)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
