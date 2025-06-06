import { getCategries, getHotSuggests, getHouselist } from '@/services';
import { defineStore } from 'pinia';

export const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests:[],
    categories:[],
    houselist:[],
    currentPage:1
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData(){
      const res = await getCategries()
      this.categories=res.data
    },
    async fetchHouselistData(){
      const res = await getHouselist(this.currentPage++)
      this.houselist.push(...res.data)
    },
  }
});
export default useHomeStore