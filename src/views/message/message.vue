<template>
  <div class="message">
    <z-navbar title="消息中心"></z-navbar>

    <!-- 消息列表 -->
    <div class="message-list" v-if="messages.length">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message-item"
        :class="{ unread: !message.read }"
        @click="handleMessageClick(message)"
      >
        <img :src="message.icon" class="message-icon" />
        <div class="message-content">
          <div class="message-title">{{ message.title }}</div>
          <div class="message-text">{{ message.content }}</div>
          <div class="message-time">{{ formatTime(message.time) }}</div>
        </div>
        <div class="message-status" v-if="!message.read">
          <div class="unread-dot"></div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-box" v-else>
      <img class="empty-img" src="@/assets/img/message/icon_message.png" />
      <div class="empty-text">暂无聊天消息</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useMessageStore } from "@/stores/modules/message";
import { storeToRefs } from "pinia";
import zNavbar from "@/components/common/z-navbar.vue";
import websocket from "@/services/websocket";
import { formatTime } from "@/utils/format_time";

const messageStore = useMessageStore();
const { messages, unreadCount } = storeToRefs(messageStore);

onMounted(() => {
  messageStore.fetchMessages();
});

onUnmounted(() => {
  // 清理监听器
  websocket.removeListener("message", messageStore.handleNewMessage);
  websocket.removeListener("connection", messageStore.handleConnection);
});

const handleMessageClick = (message) => {
  if (!message.read) {
    messageStore.markAsRead(message.id);
  }
};
</script>

<style lang="less" scoped>
.message {
  padding-bottom: 50px;

  .message-list {
    padding: 10px;
  }

  .message-item {
    display: flex;
    align-items: flex-start;
    padding: 15px;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 8px;
    position: relative;

    &.unread {
      background: #f8f8f8;
    }

    .message-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .message-content {
      flex: 1;
      overflow: hidden;

      .message-title {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
      }

      .message-text {
        font-size: 14px;
        color: #666;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .message-time {
        font-size: 12px;
        color: #999;
      }
    }

    .message-status {
      position: absolute;
      top: 15px;
      right: 15px;

      .unread-dot {
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
      }
    }
  }
}

.empty-box {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 360px;
  width: 330px;
  margin: auto auto;

  .empty-img {
    width: 330px;
    height: 260px;
  }
  .empty-text {
    text-align: center;
  }
}
</style>
