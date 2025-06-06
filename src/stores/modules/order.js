// ./stores/city.js
import { defineStore } from 'pinia';
import { getOrderList } from "@/services";

const useOrderStore = defineStore("order", {
  state: () => ({
    orderInfo: {},
  }),
  actions: {
    async fetchOrderList(type= 'all') {
      const res = await getOrderList(type);
      this.orderInfo = res.data;
    }
  }
});
export default useOrderStore