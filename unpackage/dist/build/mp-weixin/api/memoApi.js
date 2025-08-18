"use strict";const t=require("../utils/request.js"),e={getMemoList:(e={})=>t.http.post("/memo/list",e),searchMemo:(e={})=>t.http.post("/memo/search",e)};exports.memoApi=e;
