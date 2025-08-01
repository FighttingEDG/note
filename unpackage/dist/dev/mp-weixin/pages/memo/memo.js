"use strict";
const common_vendor = require("../../common/vendor.js");
const api_memo = require("../../api/memo.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_card2 + _easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_col + _easycom_uni_row)();
}
const _sfc_main = {
  __name: "memo",
  setup(__props) {
    const memoList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadMemoList = async () => {
      try {
        loading.value = true;
        const params = {
          pageNum: 1,
          pageSize: 10,
          uid: 1,
          keyword: ""
          // 可以留空或填关键词
        };
        const data = await api_memo.memoApi.getMemoList(params);
        memoList.value = (data == null ? void 0 : data.records) || [];
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/memo/memo.vue:48", "加载备忘录失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    common_vendor.onMounted(() => {
      loadMemoList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(memoList.value, (memo, k0, i0) => {
          return {
            a: "c0e26b37-2-" + i0 + "," + ("c0e26b37-1-" + i0),
            b: common_vendor.p({
              title: memo.title,
              extra: memo.updatedAt
            }),
            c: "c0e26b37-1-" + i0 + "," + ("c0e26b37-0-" + i0),
            d: memo.id,
            e: "c0e26b37-0-" + i0
          };
        }),
        b: common_vendor.p({
          span: 24
        }),
        c: common_vendor.p({
          width: _ctx.nvueWidth,
          margin: "0px"
        }),
        d: memoList.value.length === 0
      }, memoList.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c0e26b37"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/memo/memo.js.map
