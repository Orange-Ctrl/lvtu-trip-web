import hyRequest from '../request'

// 模拟消息数据
const mockMessages = [
  {
    id: 1,
    type: 'system',
    title: '系统通知',
    content: '欢迎使用弘源旅途，祝您旅途愉快！',
    time: new Date().toISOString(),
    read: false,
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    id: 2,
    type: 'order',
    title: '订单消息',
    content: '您的订单已确认，订单号：202403150001',
    time: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    id: 3,
    type: 'payment',
    title: '支付消息',
    content: '您的订单已支付成功，金额：¥299',
    time: new Date(Date.now() - 7200000).toISOString(),
    read: true,
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  }
]

// 获取消息列表
export function getMessageList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          messages: mockMessages,
          total: mockMessages.length,
          unreadCount: mockMessages.filter(msg => !msg.read).length
        }
      })
    }, 500)
  })
}

// 标记消息为已读
export function markMessageAsRead(messageId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = mockMessages.find(msg => msg.id === messageId)
      if (message) {
        message.read = true
      }
      resolve({
        data: {
          success: true,
          message: '标记已读成功'
        }
      })
    }, 300)
  })
} 