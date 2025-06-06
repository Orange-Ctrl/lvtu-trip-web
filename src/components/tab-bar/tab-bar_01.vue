<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="index">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img
          v-if="currentIndex !== index"
          :src="getAssetURL(item.image)"
          alt=""
        />
        <img v-else alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { getAssetURL } from "@/utils/load_assets";
const currentIndex = ref(0);
const router = useRouter();
const itemClick = (index, item) => {
  currentIndex.value = index;
  router.push(item.path);
};
const getAssetURL = (image) => {
  console.log("image: ", image);
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  const url = new URL(`/src/assets/img/${image}`, import.meta.url).href;
  return url;
};
</script>

<style lang="less" scoped>
.tab-bar {

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;

  border-top: 1px solid #f3f3f3;
  &.active {
    color: var(--primary-color);
  }
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
