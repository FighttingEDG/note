/**
 * 备忘录相关 API
 */
import { http } from '@/utils/request.js'

export const memoApi = {
  // 获取备忘录列表
  getMemoList(params = {}) {
    return http.get('/memo/list', params)
  },
  
  // 获取备忘录详情
  getMemoDetail(id) {
    return http.get(`/memo/${id}`)
  },
  
  // 创建备忘录
  createMemo(data) {
    return http.post('/memo/create', data)
  },
  
  // 更新备忘录
  updateMemo(id, data) {
    return http.put(`/memo/${id}`, data)
  },
  
  // 删除备忘录
  deleteMemo(id) {
    return http.delete(`/memo/${id}`)
  },
  
  // 搜索备忘录
  searchMemo(keyword) {
    return http.get('/memo/search', { keyword })
  }
} 