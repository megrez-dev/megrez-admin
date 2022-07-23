<template>
  <PageView>
    <template slot="content">
      <t-card title="仪表盘" :bordered="false"> 未实现 </t-card>
    </template>
  </PageView>
</template>

<script>
import PageView from "@/layouts/PageView";
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {
    clickHandler() {
      this.$$message.info("未实现");
    },
  },
  components: {
    PageView,
  },
};
</script>

<style lang="less" scoped>
.links-container {
  .card-container {
    padding: 0 0 24px 0;
    margin-right: 10px;
    background-color: @bg-color-container;
    border-radius: 2px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .card-title {
      padding: 0 24px;
      border-bottom: 1px solid @border-level-1-color;
    }
    .card-content {
      padding: 16px 24px 0;
      height: 400px;
    }
  }
}
</style>