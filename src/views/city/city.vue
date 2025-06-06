<template>
  <div class="city">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action="true"
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854" line-heigth="2">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
      <div class="content">
        <!-- <city-group :group-data="currentGroup" /> -->
        <template v-for="(value, key) in allCities" :key="key">
        <city-group v-show="tabActive === key" :group-data="currentGroup" />

        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import cityGroup from "./cpns/city-group.vue";
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};
const tabActive = ref("");
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }

  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
