// ./stores/city.js
import { defineStore } from 'pinia';
import { getDetailInfos } from "@/services";

export const useDetailStore = defineStore("detail", {
  state: () => ({
    detailInfo: {},
  }),
  actions: {
    async fetchDetailData(houseId) {
      const res = await getDetailInfos(houseId);
      this.detailInfo = res.data;
    }
  }
});
export default useDetailStore