<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" route>
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path" :icon="item.icon">
          <span>{{ item.text }}</span>
        </van-tabbar-item>
      </template>
    </van-tabbar>

    <!-- <template v-for="(item, index) in tabbarData" :key="index">
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
    </template> -->
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { generateCodeFrame } from "vue/compiler-sfc";
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
  --van-tabbar-item-icon-size: 20px !important;
  img {
    width: 36px;
    height: 36px;
  }
}
</style>
