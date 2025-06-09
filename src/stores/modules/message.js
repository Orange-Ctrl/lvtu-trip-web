import { defineStore } from 'pinia'
import { getMessageList, markMessageAsRead } from '@/services/modules/message'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
    unreadCount: 0,
    total: 0
  }),

  actions: {
    async fetchMessages() {
      const res = await getMessageList()
      this.messages = res.data.messages
      this.unreadCount = res.data.unreadCount
      this.total = res.data.total
    },

    async markAsRead(messageId) {
      await markMessageAsRead(messageId)
      const message = this.messages.find(msg => msg.id === messageId)
      if (message && !message.read) {
        message.read = true
        this.unreadCount--
      }
    }
  }
}) 