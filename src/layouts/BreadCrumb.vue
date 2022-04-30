<template>
  <div class="breadcrumb-container">
    <t-breadcrumb :maxItemWidth="'150'">
      <t-breadcrumbItem v-for="item in this.breadcrumbItems" :key="item.name">
        <icon :name="icon" v-if="item.name === 'Index'" />
        {{ item.meta.title }}</t-breadcrumbItem
      >
    </t-breadcrumb>
  </div>
</template>

<script>
import { Icon } from "tdesign-icons-vue";
export default {
  name: "BreadCrumb",
  data() {
    return {
      icon: "",
    };
  },
  computed: {
    breadcrumbItems() {
      let items = [];
      this.$route.matched.forEach((item) => {
        items.push(item);
        if (item.meta.icon) {
          this.icon = item.meta.icon;
        }
      });
      return items;
    },
  },
  components: {
    Icon,
  },
};
</script>
<style lang="less" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 48px;
}
</style>