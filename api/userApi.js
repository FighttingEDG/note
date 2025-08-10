import { http } from '@/utils/request.js'

export const userApi = {
  // 用户登录
  login(loginData) {
    return http.post('/user/login', loginData)
  },
  
  // 用户注册
  register(registerData) {
    return http.post('/user/register', registerData)
  },
  // 用户登出
  logout() {
    return http.post('/user/logout')
  }
}