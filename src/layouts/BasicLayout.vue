<template>
  <t-layout style="height: 100vh">
    <t-aside width="auto">
      <Aside></Aside>
    </t-aside>
    <t-layout>
      <t-header style="position: sticky; top: 0; z-index: 1">
        <Header></Header>
      </t-header>
      <t-content style="padding: 24px">
        <BreadCrumb></BreadCrumb>
        <router-view></router-view>
      </t-content>
      <t-footer style="text-align:center;">Megrez designed by AlkaidChen</t-footer>
    </t-layout>
  </t-layout>
</template>

<script>
import Aside from "@/layouts/Aside.vue";
import Header from "@/layouts/Header.vue";
import BreadCrumb from "@/layouts/BreadCrumb.vue";

export default {
  name: "BasicLayout",
  components: { Aside, Header, BreadCrumb },
};
</script>