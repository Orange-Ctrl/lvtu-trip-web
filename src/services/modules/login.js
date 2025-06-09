import http from '@/services/request'

// 模拟登录接口
export function login(data) {
  return new Promise((resolve) => {
    // 模拟网络请求延迟
    setTimeout(() => {
      // 模拟验证用户名和密码
      if (data.username === 'admin' && data.password === '123456') {
        resolve({
          data: {
            token: 'mock_token_' + Date.now(),
            userInfo: {
              username: data.username,
              nickname: '管理员'
            }
          }
        })
      } else {
        // 模拟登录失败
        throw new Error('用户名或密码错误')
      }
    }, 1000)
  })
}

// 模拟登出接口
export function logout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: '登出成功' } })
    }, 500)
  })
} 