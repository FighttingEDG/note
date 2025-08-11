# 全局错误处理机制使用指南

## 概述

本项目实现了全局错误处理机制，避免在每个API调用处都写try-catch代码块。这种机制有以下优点：

1. 代码更简洁，不需要重复编写错误处理逻辑
2. 统一的错误处理方式，保持一致的用户体验
3. 可以集中管理和定制错误提示
4. 便于后期维护和扩展

## 使用方法

### 1. 使用安全API（推荐）

我们为常用API创建了安全包装器，使用时无需编写try-catch：

```javascript
import { safeMemoApi } from '@/api/safeApi.js'

// 使用安全API，自动处理错误
const loadData = async () => {
  const data = await safeMemoApi.getMemoList(params)
  
  // 如果请求成功，data会有值；如果失败，data为null
  if (data) {
    // 处理成功的情况
    console.log(data)
  }
  // 错误已经被自动处理，不需要catch
}
```

#### 传递自定义选项

你可以在调用安全API时传递自定义选项，覆盖默认配置：

```javascript
// 传递自定义选项
const data = await safeMemoApi.getMemoList(params, {
  loading: true,
  loadingText: '加载备忘录中...',
  errorMsg: '获取备忘录列表失败',
  onSuccess: (result) => {
    console.log('加载成功:', result)
  },
  onError: (error) => {
    console.error('加载失败:', error)
  }
})
```

**重要说明**：

1. 自定义选项必须作为最后一个参数传递，且会与默认选项合并
2. 自定义选项必须包含以下至少一个属性才会被识别为选项对象：
   - `showError`：是否显示错误提示
   - `errorMsg`：自定义错误提示
   - `onError`：错误回调函数
   - `onSuccess`：成功回调函数
   - `rethrow`：是否重新抛出错误
   - `loading`：是否显示加载提示
   - `loadingText`：加载提示文本
3. 如果你需要传递的对象不包含上述属性，系统会将其视为API参数而非选项对象

例如，以下调用中的对象会被视为API参数而非选项对象：

```javascript
// 这里的对象会被视为API参数，而非选项对象
const data = await safeMemoApi.searchMemo({ keyword: '测试' })

// 如果需要同时传递参数和选项，可以这样写：
const data = await safeMemoApi.searchMemo({ keyword: '测试' }, {
  loading: true,
  errorMsg: '搜索失败'
})
```

### 2. 使用handleAsync包装任意异步函数

对于自定义的异步操作，可以使用`handleAsync`函数包装：

```javascript
import { handleAsync } from '@/utils/errorHandler.js'

// 包装异步函数
const doSomething = () => {
  handleAsync(
    async () => {
      // 这里是异步操作
      const result = await someAsyncFunction()
      return result
    },
    {
      // 配置选项
      showError: true, // 是否显示错误提示
      errorMsg: '操作失败', // 自定义错误提示
      loading: true, // 是否显示加载提示
      loadingText: '加载中...', // 加载提示文本
      onSuccess: (result) => {
        // 成功回调
        console.log('操作成功:', result)
      },
      onError: (error) => {
        // 错误回调
        console.error('操作失败:', error)
      },
      rethrow: false // 是否重新抛出错误
    }
  )
}
```

### 3. 创建自定义安全API

如果需要为新的API创建安全包装器，可以使用`createSafeApi`函数：

```javascript
import { createSafeApi } from '@/utils/errorHandler.js'
import { someApi } from './someApi.js'

// 创建安全API
export const safeSomeApi = createSafeApi(someApi, {
  // 默认配置
  showError: true,
  errorMsg: '操作失败',
  loading: true,
  loadingText: '加载中...'
})
```

## 错误处理流程

1. API请求发生错误时，`request.js`的`responseInterceptor`会捕获错误并创建包含后端错误信息的Error对象
2. 对于网络错误，`request.js`的`errorHandler`会创建包含具体网络错误信息的Error对象
3. 然后在`errorHandler.js`的`handleAsync`函数中显示错误提示（优先使用后端返回的错误信息）并执行错误回调
4. 最后返回`null`表示操作失败，调用方可以根据返回值判断操作是否成功

## 后端错误信息显示

系统会自动显示后端返回的错误信息，无需手动处理。错误信息的优先级如下：

1. 后端返回的错误信息（`error.message`）
2. 自定义错误信息（`errorMsg`选项）

例如，如果后端返回了"用户名已存在"的错误信息，系统会直接显示这个信息，而不是显示自定义的通用错误信息。

### 避免重复显示错误提示

如果你在`onError`回调中已经处理了错误（例如显示了自定义提示或执行了特定操作），可以通过设置`error.handled = true`来阻止系统显示默认的错误提示：

```javascript
onError: (error) => {
  // 自定义错误处理
  if (error.data && error.data.code === 401) {
    uni.showModal({
      title: '登录已过期',
      content: '请重新登录',
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
    
    // 标记错误已处理，阻止系统显示默认错误提示
    error.handled = true
  }
}
```

## 注意事项

1. 安全API返回`null`表示操作失败，请务必检查返回值
2. 如果需要获取详细错误信息，请使用`onError`回调函数
3. 对于需要自定义加载提示的场景，可以设置`loading`和`loadingText`选项
4. 如果不希望显示错误提示，可以设置`showError: false`
5. 后端返回的错误信息会自动显示，无需手动处理
6. 如果需要自定义错误处理逻辑，可以使用`onError`回调函数
7. 使用`error.handled = true`可以阻止系统显示默认错误提示，避免重复提示
8. 在`safeApi.js`中可以设置全局错误处理逻辑，适用于所有API调用

## 示例：处理特定错误

有时候你可能需要针对特定的错误进行特殊处理，例如用户未登录时跳转到登录页面：

### 方法1：使用handleAsync的onError回调

```javascript
import { memoApi } from '@/api/memoApi.js'
import { handleAsync } from '@/utils/errorHandler.js'

// 使用onError回调处理特定错误
const loadData = async () => {
  await handleAsync(
    async () => {
      const result = await memoApi.getMemoList(params)
      return result
    },
    {
      errorMsg: '加载失败',
      onError: (error) => {
        // 检查是否是未登录错误
        if (error.data && error.data.code === 401) {
          // 跳转到登录页
          uni.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    }
  )
}
```

### 方法2：使用safeMemoApi的onError回调

```javascript
import { safeMemoApi } from '@/api/safeApi.js'

// 在组件中使用
export default {
  data() {
    return {
      memoList: [],
      loading: false
    }
  },
  methods: {
    async loadMemoList() {
      // 自定义onError回调处理特定错误
      const options = {
        onError: (error) => {
          // 检查是否是未登录错误
          if (error.data && error.data.code === 401) {
            // 跳转到登录页
            uni.navigateTo({
              url: '/pages/login/login'
            })
          }
          // 其他错误处理...
        }
      }
      
      // 调用安全API，传入自定义选项
      const data = await safeMemoApi.getMemoList(params, options)
      
      if (data) {
        this.memoList = data.list
      }
    }
  }
}
```

### 方法3：在safeApi.js中统一处理特定错误

```javascript
// 在 api/safeApi.js 中
export const safeMemoApi = createSafeApi(memoApi, {
  showError: true,
  errorMsg: '获取备忘录失败',
  loading: true,
  loadingText: '加载中...',
  onError: (error) => {
    console.error('备忘录API错误:', error);
    
    // 统一处理未登录错误
    if (error.data && error.data.code === 401) {
      // 清除本地token
      uni.removeStorageSync('token')
      // 跳转到登录页
      uni.navigateTo({
        url: '/pages/login/login'
      })
      // 标记错误已处理，避免重复提示
      error.handled = true
    }
  }
});
```

## 完整示例

我们提供了以下示例，展示了如何在实际项目中使用全局错误处理机制：

### 1. 错误处理示例组件

- 文件路径：`/examples/error-handling-example.vue`
- 包含的功能：
  - 使用`safeMemoApi`加载备忘录列表
  - 使用`handleAsync`包装异步函数
  - 处理特定错误码（如401未登录）
  - 自定义错误提示和加载状态
  - 使用`error.handled`标记避免重复提示

### 2. API参数传递示例

- 文件路径：`/examples/api-params-example.js`
- 包含的功能：
  - 如何正确传递参数对象给安全API
  - 如何同时传递参数对象和自定义选项
  - 常见错误示范和正确用法对比

这个示例特别关注如何正确传递参数，避免参数丢失的问题。请注意，自定义选项必须包含特定属性（如`loading`、`errorMsg`等）才会被识别为选项对象，否则会被视为API参数。

你可以参考这些示例来实现自己的错误处理逻辑。