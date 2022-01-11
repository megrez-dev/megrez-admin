<template>
  <t-layout class="megrez-layout">
    <t-content class="megrez-content-layout">
    <BreadCrumb></BreadCrumb>
    <transition name="fade" mode="out-in">
      <div class="page-component-wrapper">
        <router-view />
      </div>
    </transition>
    </t-content>
    <t-footer style="text-align: center"
      >Megrez designed by AlkaidChen</t-footer
    >
  </t-layout>
</template>

<script>
import BreadCrumb from "@/layouts/BreadCrumb.vue";
export default {
  name: "Content",
  components: { BreadCrumb },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";

.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page-component-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>