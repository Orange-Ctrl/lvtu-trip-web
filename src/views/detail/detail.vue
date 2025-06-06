<template>
  <div class="detail top" ref="detailRef">
    <tab-control
      v-show="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="main" v-if="mainPart" v-memo="[mainPart]">
    <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    <detailInfos
      :top-infos="mainPart.topModule"
      name="描述"
      :ref="getSectionRef"
    ></detailInfos>
    <detail-facility
      name="设施"
      :ref="getSectionRef"
      :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
    />
    <detail-landlord
      :landlord="mainPart.dynamicModule.landlordModule"
      name="房东"
      :ref="getSectionRef"
    />
    <detail-comment
      :comment="mainPart.dynamicModule.commentModule"
      name="评论"
      :ref="getSectionRef"
    />
    <detail-notice
      name="须知"
      :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      :ref="getSectionRef"
    />
    <detail-map
      name="周边"
      :position="mainPart.dynamicModule.positionModule"
      :ref="getSectionRef"
    />
    <detail-intro :price-intro="mainPart.introductionModule" />

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import detailSwipe from "./cpns/detail_01-swipe.vue";
import detailInfos from "./cpns/detail_02-infos.vue";
import detailFacility from "./cpns/detail_03-facility.vue";
import detailLandlord from "./cpns/detail_04-landlord.vue";
import detailComment from "./cpns/detail_05-comment.vue";
import detailNotice from "./cpns/detail_06-notice.vue";
import detailMap from "./cpns/detail_07-map.vue";
import DetailIntro from "./cpns/detail_08-intro.vue";
import useScroll from "@/hooks/useScroll";
import TabControl from "@/components/tab-control/TabControl.vue";

const route = useRoute();
const houseId = route.params.houseId;

const detailStore = useDetailStore();
detailStore.fetchDetailData(houseId);
const { detailInfo } = storeToRefs(detailStore);
const mainPart = computed(() => detailInfo.value.mainPart);
const onClickLeft = () => {
  router.back();
};

const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});
const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls);
});
const getSectionRef = (value) => {
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};

let isClick = false;
let currentDistance = -1;
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance = distance - 44;
  }

  isClick = true;
  currentDistance = distance;

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};
// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false;
  }
  if (isClick) return;

  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 44px;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
