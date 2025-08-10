"use strict";
const common_vendor = require("../../common/vendor.js");
const api_safeApi = require("../../api/safeApi.js");
const utils_errorHandler = require("../../utils/errorHandler.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_card2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_pagination2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_col + _easycom_uni_row + _easycom_uni_pagination)();
}
const _sfc_main = {
  __name: "memo",
  setup(__props) {
    const memoList = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const total = common_vendor.ref(0);
    const pageNum = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const loadMemoList = async () => {
      loading.value = true;
      const params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        // 后端从jwt获取用户ID，不再传uid
        categoryIds: "1,2",
        keyword: ""
        // 可以留空或填关键词
      };
      const data = await api_safeApi.safeMemoApi.getMemoList(params);
      if (data) {
        total.value = data.total;
        common_vendor.index.__f__("log", "at pages/memo/memo.vue:61", data);
        memoList.value = (data == null ? void 0 : data.records) || [];
      }
      loading.value = false;
    };
    const handlePageChange = (e) => {
      pageNum.value = e.current;
      utils_errorHandler.handleAsync(
        async () => {
          await loadMemoList();
          return {
            success: true
          };
        },
        {
          showError: true,
          errorMsg: "加载分页数据失败",
          loading: false
        }
      );
    };
    common_vendor.onMounted(() => {
      loadMemoList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(memoList.value, (memo, k0, i0) => {
          return {
            a: common_vendor.t(memo.content),
            b: "c0e26b37-2-" + i0 + "," + ("c0e26b37-1-" + i0),
            c: common_vendor.p({
              title: memo.title,
              extra: memo.updatedAt
            }),
            d: "c0e26b37-1-" + i0 + "," + ("c0e26b37-0-" + i0),
            e: memo.id,
            f: "c0e26b37-0-" + i0
          };
        }),
        b: common_vendor.p({
          span: 24
        }),
        c: common_vendor.p({
          margin: "0px"
        }),
        d: memoList.value.length === 0
      }, memoList.value.length === 0 ? {} : {}, {
        e: common_vendor.o(handlePageChange),
        f: common_vendor.p({
          ["show-icon"]: true,
          total: total.value,
          current: pageNum.value,
          ["page-size"]: pageSize.value
        }),
        g: common_vendor.t(total.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c0e26b37"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/memo/memo.js.map
