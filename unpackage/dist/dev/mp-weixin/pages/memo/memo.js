"use strict";
const common_vendor = require("../../common/vendor.js");
const api_memo = require("../../api/memo.js");
require("../../config/app_config.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "memo",
  setup(__props) {
    const memoList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadMemoList = async () => {
      try {
        loading.value = true;
        const data = await api_memo.memoApi.getMemoList();
        memoList.value = data || [];
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/memo/memo.vue:44", "加载备忘录失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleMemoClick = (memo) => {
      common_vendor.index.__f__("log", "at pages/memo/memo.vue:56", "点击了备忘录:", memo.title);
      common_vendor.index.showToast({
        title: `点击了: ${memo.title}`,
        icon: "none"
      });
    };
    common_vendor.onMounted(() => {
      loadMemoList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(loadMemoList),
        b: common_vendor.f(memoList.value, (memo, k0, i0) => {
          return {
            a: "c0e26b37-2-" + i0 + "," + ("c0e26b37-1-" + i0),
            b: common_vendor.p({
              text: memo.category,
              size: "small"
            }),
            c: memo.id,
            d: common_vendor.o(($event) => handleMemoClick(memo), memo.id),
            e: "c0e26b37-1-" + i0 + ",c0e26b37-0",
            f: common_vendor.p({
              title: memo.title,
              note: memo.content,
              rightText: memo.createTime,
              clickable: true
            })
          };
        }),
        c: memoList.value.length === 0
      }, memoList.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c0e26b37"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/memo/memo.js.map
