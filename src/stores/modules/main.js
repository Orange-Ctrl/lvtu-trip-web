import { defineStore } from "pinia";

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate()+1)

// 从本地存储获取初始状态
const getInitialState = () => {
  const storedState = localStorage.getItem('mainStore')
  if (storedState) {
    const parsedState = JSON.parse(storedState)
    // 确保日期值存在
    return {
      ...parsedState,
      startDate: parsedState.startDate ? new Date(parsedState.startDate) : startDate,
      endDate: parsedState.endDate ? new Date(parsedState.endDate) : endDate,
    }
  }
  return {
    token: '',
    userInfo: null,
    startDate: startDate,
    endDate: endDate,
    isLoading: false
  }
}

const useMainStore = defineStore("main", {
  state: () => getInitialState(),
  
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.saveToLocal()
    },
    
    // 设置 token
    setToken(token) {
      this.token = token
      this.saveToLocal()
    },
    
    // 清除用户信息
    clearUserInfo() {
      this.token = ''
      this.userInfo = null
      this.saveToLocal()
    },
    
    // 保存到本地存储
    saveToLocal() {
      localStorage.setItem('mainStore', JSON.stringify({
        token: this.token,
        userInfo: this.userInfo,
        startDate: this.startDate,
        endDate: this.endDate
      }))
    }
  }
})

export default useMainStore