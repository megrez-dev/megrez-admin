<template>
  <t-menu
    theme="light"
    defaultValue="2-1"
    :collapsed="collapsed"
    height="550px"
  >
    <template #logo>
      <div class="aside-title-wrapper">
        <span class="aside-title-logo">M</span>
        <!-- <span class="aside-title-text" v-show="!collapsed">Megrez</span> -->
      </div>
    </template>
    <t-menu-item value="item1">
      <template #icon>
        <icon name="dashboard" />
      </template>
      总览
    </t-menu-item>
    <t-submenu value="1" mode="popup">
      <template #icon>
        <icon name="chart" />
      </template>
      <span slot="title">统计</span>
      <t-menu-item value="1-1">
        <template #icon>
          <icon name="chart" />
        </template>
        <span>访问量</span>
      </t-menu-item>
      <t-menu-item value="1-2">
        <template #icon>
          <icon name="chart" />
        </template>
        <span>阅读量</span>
      </t-menu-item>
    </t-submenu>
    <t-submenu value="2" mode="popup">
      <template #icon>
        <icon name="view-module" />
      </template>
      <span slot="title">文章</span>
      <t-menu-item value="2-1">
        <template #icon>
          <icon name="view-module" />
        </template>
        <span>所有文章</span>
      </t-menu-item>
      <t-menu-item value="2-2">
        <template #icon>
          <icon name="view-module" />
        </template>
        <span>写文章</span>
      </t-menu-item>
    </t-submenu>
    <t-menu-item value="item3">
      <template #icon>
        <icon name="link" />
      </template>
      友链
    </t-menu-item>
    <t-menu-item value="item4" :disabled="true">
      <template #icon>
        <icon name="edit-1" />
      </template>
      日志
    </t-menu-item>
    <t-menu-item value="item5">
      <template #icon>
        <icon name="user-talk" />
      </template>
      评论
    </t-menu-item>
    <template #operations>
      <icon
        class="t-menu__operations-icon"
        :name="iconName"
        @click.native="changeCollapsed"
      />
    </template>
  </t-menu>
</template>

<script>
import { Icon } from "tdesign-icons-vue";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    iconName() {
      return this.collapsed ? "chevron-right" : "chevron-left";
    },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style lang="less" scoped>
.aside-title-wrapper {
  text-align: center;
  flex: 1;
}
.aside-title-logo {
  font-size: 35px;
  font-weight: 1000;
  color: #0052d9;
}
.aside-title-text {
  font-size: 30px;
  font-weight: 500;
}
</style>
