/**
 * 备忘录相关 API
 */
import { http } from '@/utils/request.js'

export const memoApi = {
  // 获取备忘录列表
  getMemoList(params = {}) {
    return http.get('/memo/list', params)
  },
  
  // 搜索备忘录
  searchMemo(keyword) {
    return http.get('/memo/search', { keyword })
  }
} 