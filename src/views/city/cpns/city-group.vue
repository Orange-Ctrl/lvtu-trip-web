<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group, index) in groupData?.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <van-cell
              :title="city.cityName"
              @click="cityClick(city)"
            ></van-cell>
          </template>
        </div>
      </template>
    </van-index-bar>
    <!-- 
    <template v-for="(group, index) in groupData?.cities" :key="index">
      <div class="group-item">
        <h2>{{ group.group }}</h2>
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <div class="city">{{ city.cityName }}</div>
          </template>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({
      cities: [], // ✅ 默认空数组
      hotCities: [],
    }),
  },
});
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});
//监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  console.log(city);
  cityStore.currentCity = city
  //返回上一级
  router.back();
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>
