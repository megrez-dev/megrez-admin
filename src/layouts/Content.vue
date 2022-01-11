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
    <t-footer class="megrez-footer-layout">
      <Footer></Footer>
    </t-footer>
  </t-layout>
</template>

<script>
import BreadCrumb from "@/layouts/BreadCrumb.vue";
import Footer from "@/layouts/Footer.vue";
export default {
  name: "Content",
  components: { BreadCrumb,Footer },
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
</style>