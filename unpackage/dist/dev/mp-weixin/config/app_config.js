"use strict";
const appConfig = {
  // 备忘录分类配置
  memo: {
    categories: [
      { id: 1, name: "工作", color: "#007aff" },
      { id: 2, name: "生活", color: "#5ac725" },
      { id: 3, name: "学习", color: "#f9ae3d" },
      { id: 4, name: "其他", color: "#909399" }
    ],
    defaultCategory: "其他"
  },
  // 代办状态配置
  todo: {
    status: [
      { id: 0, name: "待办", color: "#f56c6c" },
      { id: 1, name: "进行中", color: "#f9ae3d" },
      { id: 2, name: "已完成", color: "#5ac725" }
    ],
    priority: [
      { id: 1, name: "低", color: "#909399" },
      { id: 2, name: "中", color: "#f9ae3d" },
      { id: 3, name: "高", color: "#f56c6c" }
    ]
  },
  // 用户设置配置
  settings: {
    theme: {
      primary: "#007aff",
      success: "#5ac725",
      warning: "#f9ae3d",
      error: "#f56c6c",
      info: "#909399"
    },
    notification: {
      enabled: true,
      sound: true,
      vibration: true
    }
  },
  // 时间配置
  time: {
    // 时间选择器最小可选择时间
    minDate: new Date(2020, 0, 1).getTime(),
    // 2020.1.1
    // 时间选择器最大可选择时间
    maxDate: new Date(2030, 11, 31).getTime(),
    // 2030.12.31
    // 默认提醒时间（分钟）
    defaultReminder: 30
  }
};
exports.appConfig = appConfig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/config/app_config.js.map
