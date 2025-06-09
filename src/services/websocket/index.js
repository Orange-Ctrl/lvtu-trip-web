class MockWebSocket {
  constructor() {
    this.listeners = {};
    this.connected = false;
    this.mockTimer = null;
  }

  connect() {
    this.connected = true;
    this.emit('open');
    // 模拟定时推送消息
    this.mockTimer = setInterval(() => {
      const msg = {
        id: Date.now(),
        type: 'system',
        title: '模拟推送',
        content: '这是一条模拟的 WebSocket 消息',
        time: new Date().toISOString(),
        read: false,
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
      };
      this.emit('message', msg);
    }, 10000); // 每10秒推送一条
  }

  disconnect() {
    this.connected = false;
    this.emit('close');
    if (this.mockTimer) {
      clearInterval(this.mockTimer);
      this.mockTimer = null;
    }
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event].add(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}

const websocket = new MockWebSocket();
export default websocket; 