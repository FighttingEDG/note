"use strict";
const config_base_config = require("./base_config.js");
const config_app_config = require("./app_config.js");
const config = {
  ...config_base_config.baseConfig,
  ...config_app_config.appConfig
};
const requestConfig = config.request;
const appSettings = config.app;
const memoConfig = config.memo;
exports.appSettings = appSettings;
exports.memoConfig = memoConfig;
exports.requestConfig = requestConfig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/index.js.map
