"use strict";
const common_vendor = require("../../common/vendor.js");
const config_index = require("../../config/index.js");
const api_safeUserApi = require("../../api/safeUserApi.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_tag2 + _easycom_uni_card2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_tag + _easycom_uni_card + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    const loadUserInfo = async () => {
      try {
        const info = common_vendor.index.getStorageSync("userInfo");
        if (info) {
          userInfo.value = info;
        } else {
          const response = await api_safeUserApi.safeUserApi.getUserInfo();
          if (response) {
            userInfo.value = response;
            common_vendor.index.setStorageSync("userInfo", response);
          }
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/user.vue:126", "获取用户信息失败:", error);
      }
    };
    const changeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          res.tempFilePaths[0];
          common_vendor.index.showToast({
            title: "头像上传功能开发中",
            icon: "none"
          });
        }
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              await api_safeUserApi.safeUserApi.logout();
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/user/user.vue:158", "登出API调用失败:", error);
            } finally {
              common_vendor.index.removeStorageSync("token");
              common_vendor.index.removeStorageSync("userInfo");
              common_vendor.index.showToast({
                title: "已退出登录",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.redirectTo({
                  url: "/pages/login/login"
                });
              }, 1500);
            }
          }
        }
      });
    };
    const formatLoginTime = () => {
      const loginTime = common_vendor.index.getStorageSync("loginTime");
      if (loginTime) {
        const date = new Date(loginTime);
        return date.toLocaleString("zh-CN");
      }
      return "未知";
    };
    common_vendor.onMounted(() => {
      loadUserInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatar || "/static/c1.png",
        b: common_vendor.o(changeAvatar),
        c: common_vendor.p({
          type: "camera",
          size: "16",
          color: "white"
        }),
        d: common_vendor.t(userInfo.value.username || "未登录"),
        e: common_vendor.t(userInfo.value.email || "点击登录"),
        f: common_vendor.p({
          text: userInfo.value.status || "离线",
          type: userInfo.value.status === "在线" ? "success" : "warning"
        }),
        g: common_vendor.p({
          ["is-shadow"]: true,
          shadow: "0 8px 24px rgba(0,0,0,0.1)"
        }),
        h: common_vendor.p({
          type: "person",
          size: "20",
          color: "#667eea"
        }),
        i: common_vendor.p({
          title: "个人资料",
          link: true,
          to: "/pages/user/profile",
          showArrow: true,
          thumb: "/static/c1.png"
        }),
        j: common_vendor.p({
          type: "locked",
          size: "20",
          color: "#667eea"
        }),
        k: common_vendor.p({
          title: "修改密码",
          link: true,
          to: "/pages/user/change-password",
          showArrow: true,
          thumb: "/static/c2.png"
        }),
        l: common_vendor.p({
          type: "notification",
          size: "20",
          color: "#667eea"
        }),
        m: common_vendor.p({
          title: "消息通知",
          link: true,
          to: "/pages/user/notifications",
          showArrow: true,
          thumb: "/static/c3.png"
        }),
        n: common_vendor.p({
          type: "eye",
          size: "20",
          color: "#667eea"
        }),
        o: common_vendor.p({
          title: "隐私设置",
          link: true,
          to: "/pages/user/privacy",
          showArrow: true,
          thumb: "/static/c1.png"
        }),
        p: common_vendor.p({
          ["is-shadow"]: true,
          shadow: "0 4px 16px rgba(0,0,0,0.08)"
        }),
        q: common_vendor.p({
          type: "info",
          size: "18",
          color: "#666"
        }),
        r: common_vendor.t(common_vendor.unref(config_index.appSettings).name),
        s: common_vendor.t(common_vendor.unref(config_index.appSettings).version),
        t: common_vendor.t(common_vendor.unref(config_index.memoConfig).categories.length),
        v: common_vendor.t(formatLoginTime()),
        w: common_vendor.p({
          ["is-shadow"]: true,
          shadow: "0 4px 16px rgba(0,0,0,0.08)"
        }),
        x: common_vendor.p({
          type: "logout",
          size: "18",
          color: "white"
        }),
        y: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
