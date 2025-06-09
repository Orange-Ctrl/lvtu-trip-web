// ./stores/city.js
import { defineStore } from 'pinia';
import { getOrderList } from "@/services";

const useOrderStore = defineStore("order", {
  state: () => ({
    orderInfo: {},
  }),
  actions: {
    async fetchOrderList(type = 'all') {
      try {
        const res = await getOrderList(type);
        console.log('订单数据:', res.data); // 添加调试日志
        this.orderInfo = res.data;
      } catch (error) {
        console.error('获取订单列表失败:', error);
      }
    }
  }
});

export default useOrderStore;