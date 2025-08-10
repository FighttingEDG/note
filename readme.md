# 备忘录应用前端

## 技术栈

- **框架**: uniapp
- **UI组件**: uni-ui
- **开发语言**: Vue 3 + JavaScript

## 项目特点

### 1. 全局错误处理机制

本项目实现了全局错误处理机制，避免在每个API调用处都写try-catch代码块。详细说明请查看 [错误处理文档](./docs/error-handling.md)。

主要优点：
- 代码更简洁，不需要重复编写错误处理逻辑
- 统一的错误处理方式，保持一致的用户体验
- 可以集中管理和定制错误提示

使用示例：

```javascript
// 使用安全API，自动处理错误
const data = await safeMemoApi.getMemoList(params)

// 如果请求成功，data会有值；如果失败，data为null
if (data) {
  // 处理成功的情况
}
```

### 2. 组件化开发

使用uni-ui组件库，实现了高效的组件化开发。

### 3. 响应式设计

适配多种设备和屏幕尺寸。

## 项目结构

```
├── api/            # API接口
├── config/         # 配置文件
├── docs/           # 文档
├── pages/          # 页面
├── static/         # 静态资源
├── uni_modules/    # uni扩展组件
└── utils/          # 工具函数
```

## 开发指南

1. 克隆项目
2. 安装依赖: `npm install`
3. 开发运行: `npm run dev:h5` 或其他平台
4. 构建: `npm run build`


### 需要用户操作的接口需要传bearer token