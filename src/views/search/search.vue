<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <z-navbar>
      <template #title>
        <div class="title-box">
          <div class="title-address">{{ route.query.currentCity }}</div>
          <div class="title-time_box">
            <div class="time-cell">
              <span class="time-cell_label">住</span>
              <span class="item-cell_value">{{
                formatMonthDay(route.query.startDate, "MM.DD")
              }}</span>
            </div>
            <div class="time-cell">
              <span class="time-cell_label">离</span>
              <span class="item-cell_value">{{
                formatMonthDay(route.query.endDate, "MM.DD")
              }}</span>
            </div>
          </div>
          <div class="title-desc over-one_ell" @click="toSearch">
            {{ searchStore.address || "搜索博尔塔拉的景点、地标、房源" }}
          </div>
        </div>
      </template>
    </z-navbar>
    <!-- 筛选栏 -->
    <van-dropdown-menu active-color="#ff9645">
      <van-dropdown-item v-model="filterFavor" ref="addressItemRef">
        <template #title>位置</template>
        <template #default>
          <van-tree-select
            v-model:active-id="filterAddress"
            v-model:main-active-index="addressIndex"
            :items="filterAddressInfo"
            @click-item="handleSearch"
          />
        </template>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="filterFavor"
        :options="filterFavorInfo"
      ></van-dropdown-item>
      <van-dropdown-item v-model="filterFavor" ref="filterItemRef">
        <template #title>筛选</template>
        <template #default>
          <van-tree-select
            v-model:active-id="filter"
            v-model:main-active-index="filterIndex"
            :items="filterInfo"
            @click-item="handleSearch"
          />
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 搜索结果展示 -->
    <div class="result-box">
      <item
        v-for="(info, subIndex) in searchResult"
        :key="subIndex"
        :info="info"
      ></item>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useSearch from "@/stores/modules/search";
import {
  getSearchKeyWord,
  getSearchResult,
} from "@/services/modules/search.js";
import { formatMonthDay } from "@/utils/format_date";

import zNavbar from "@/components/common/z-navbar.vue";
import item from "@/views/favor/cpns/item.vue";

const router = useRouter();
const route = useRoute();
const searchStore = useSearch();
const filterAddressInfo = ref([]);
const filterFavorInfo = ref([]);
const filterInfo = ref([]);
const searchResult = ref([]);
const filterAddress = ref();
const filterFavor = ref();
const filter = ref();
const addressIndex = ref(0);
const filterIndex = ref(0);
const filterItemRef = ref();
const addressItemRef = ref();

// 获取筛选数据
getSearchKeyWord()
  .then((res) => {
    if (!res?.data?.allConditions || res.data.allConditions.length < 3) {
      console.error("Invalid data structure", res);
      return;
    }

    // 解构时添加默认值
    const [
      addressCondition = { subGroups: [] },
      favorCondition = { items: [] },
      infoCondition = { subGroups: [] },
    ] = res.data.allConditions;

    // 处理地址筛选
    filterAddressInfo.value = addressCondition.subGroups.map((item) => ({
      text: item.itemTypeLabel || "区域",
      children: (item.items || []).map((subItem) => ({
        text: subItem.label || "未知区域",
        id: subItem.value || "",
      })),
    }));

    // 处理喜好筛选
    filterFavorInfo.value = favorCondition.items.map((item) => ({
      text: item.label || "未知类型",
      value: item.value || "",
    }));
    filterFavor.value = filterFavorInfo.value[0]?.value || "";

    // 处理关键信息筛选 (重点修复部分)
    filterInfo.value = infoCondition.subGroups.map((item) => ({
      text: item.label || "未知分类",
      children: (item.subGroups?.[0]?.items || []).map((subItem) => ({
        text: subItem.label || "未知选项",
        id: subItem.value || "",
      })),
    }));
  })
  .catch((err) => {
    console.error("加载筛选数据失败:", err);
    // 初始化空数据防止页面崩溃
    filterAddressInfo.value = [];
    filterFavorInfo.value = [];
    filterInfo.value = [];
  });

// 搜索结果
getSearchResult().then((res) => {
  searchResult.value = res.data.items;
});

function handleSearch() {
  filterItemRef.value.toggle(false);
  addressItemRef.value.toggle(false);
}

function toSearch() {
  router.push({
    path: "/search",
    query: {
      address: route.query.address,
      startDate: route.query.startDate,
      endDate: route.query.endDate,
    },
  });
}
</script>

<style lang="less" scoped>
.title-box {
  display: flex;
  align-items: stretch;
  width: 100%;
  font-size: 14px;
  color: #333;

  .title-address {
    padding: 7px;
    background: #f2f4f6;
  }
  .title-time_box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3px;
    margin-left: 3px;
    background: #f2f4f6;
    font-size: 10px;

    .time-cell_label {
      margin-right: 3px;
      color: #666;
    }
  }
  .title-desc {
    flex: 1;
    margin-left: 3px;
    padding: 5px;
    padding-top: 8px;
    text-align: left;
    color: #999;
    background: #f2f4f6;
  }
}
.result-box {
  margin-top: 20px;
}

:deep(.van-nav-bar) {
  line-height: 1 !important;
}
:deep(.van-nav-bar__title) {
  flex: 1;
}
</style>
