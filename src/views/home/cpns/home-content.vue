<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houselist" :key="item.data.houseId">
        <house-Item-v9
          v-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="clickItem(item.data)"
        ></house-Item-v9>
        <house-Item-v3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="clickItem(item.data)"
        ></house-Item-v3>
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import houseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import router from "@/router";
const homeStore = useHomeStore();
const { houselist } = storeToRefs(homeStore);

const clickItem = (item) => {
  router.push(`/detail/${item.houseId}`);
};
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
