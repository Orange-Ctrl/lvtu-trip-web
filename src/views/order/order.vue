<template>
  <div class="order">
    <van-sticky>
      <nav-bar title="订单列表"></nav-bar>
      <van-tabs color="#ff9645" v-model="active" @change="onChange">
        <van-tab name="all" title="全部订单"></van-tab>
        <van-tab name="recent" title="近期订单"></van-tab>
        <van-tab name="pend" title="待支付"></van-tab>
      </van-tabs>
    </van-sticky>
    <item
      v-for="item in orderData?.orders"
      :key="item.orderId"
      :info="item"
    ></item>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useOrderStore from "@/stores/modules/order";
import navBar from "@/components/common/z-navbar.vue";
import item from "./cpns/item.vue";
import { storeToRefs } from "pinia";

const active = ref("all");
const orderStore = useOrderStore();
const { orderInfo } = storeToRefs(orderStore);
const orderData = computed(() => orderInfo.value.data);
function onChange(e) {
  active.value = e;
  orderStore.fetchOrderList(e);
}
</script>

<style lang="less" scoped>
.order {
  padding-bottom: 50px;
}
</style>
