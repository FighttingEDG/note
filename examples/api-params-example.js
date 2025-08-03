/**
 * 示例：如何正确使用safeMemoApi并传递参数
 */

import { safeMemoApi } from '@/api/safeApi.js';

// 示例1：基本用法 - 传递参数对象
async function example1() {
  // 创建参数对象
  const params = {
    page: 1,
    pageSize: 10,
    sortBy: 'createTime',
    sortOrder: 'desc'
  };
  
  // 调用安全API，传递参数对象
  const data = await safeMemoApi.getMemoList(params);
  
  console.log('获取到的备忘录列表:', data);
  return data;
}

// 示例2：传递参数对象和自定义选项
async function example2() {
  // 创建参数对象
  const params = {
    page: 1,
    pageSize: 10
  };
  
  // 创建自定义选项对象
  const options = {
    loading: true,
    loadingText: '加载中...',
    errorMsg: '获取备忘录失败',
    onSuccess: (result) => {
      console.log('加载成功:', result);
    },
    onError: (error) => {
      console.error('加载失败:', error);
    }
  };
  
  // 调用安全API，传递参数对象和自定义选项
  const data = await safeMemoApi.getMemoList(params, options);
  
  console.log('获取到的备忘录列表:', data);
  return data;
}

// 示例3：搜索备忘录 - 传递参数对象
async function example3() {
  // 创建参数对象
  const params = {
    keyword: '测试',
    page: 1,
    pageSize: 10
  };
  
  // 调用安全API，传递参数对象
  const data = await safeMemoApi.searchMemo(params);
  
  console.log('搜索结果:', data);
  return data;
}

// 示例4：搜索备忘录 - 传递参数对象和自定义选项
async function example4() {
  // 创建参数对象
  const params = {
    keyword: '测试'
  };
  
  // 创建自定义选项对象
  const options = {
    loading: true,
    loadingText: '搜索中...',
    errorMsg: '搜索失败'
  };
  
  // 调用安全API，传递参数对象和自定义选项
  const data = await safeMemoApi.searchMemo(params, options);
  
  console.log('搜索结果:', data);
  return data;
}

// 示例5：错误示范 - 不要这样做！
async function badExample() {
  // ❌ 错误：将选项对象作为参数传递
  // 这里的对象会被视为API参数，而不是选项对象
  const data = await safeMemoApi.getMemoList({
    loading: true,  // 这会被当作API参数传给后端！
    errorMsg: '获取失败'  // 这会被当作API参数传给后端！
  });
  
  // ✅ 正确：分开传递参数对象和选项对象
  const correctData = await safeMemoApi.getMemoList(
    { page: 1, pageSize: 10 },  // 参数对象
    { loading: true, errorMsg: '获取失败' }  // 选项对象
  );
  
  return correctData;
}

export {
  example1,
  example2,
  example3,
  example4,
  badExample
};