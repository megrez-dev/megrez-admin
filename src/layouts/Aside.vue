<template>
  <t-menu
    :theme="theme"
    defaultValue="2-1"
    :collapsed="isCollapse"
    height="550px"
  >
    <template #logo>
      <div class="aside-title-container">
        <span class="aside-title-logo">M</span>
        <!-- <span class="aside-title-text" v-show="!collapsed">Megrez</span> -->
      </div>
    </template>
    <div class="menu-root-item" v-for="rootItem in menu" :key="rootItem.name">
      <t-menu-item :value="rootItem.url" v-if="!rootItem.children">
        <template #icon>
          <icon :name="rootItem.icon" />
        </template>
        {{ rootItem.label }}
      </t-menu-item>
      <t-submenu :value="rootItem.url" mode="popup" v-else>
        <template #icon>
          <icon :name="rootItem.icon" />
        </template>
        <span slot="title">{{ rootItem.label }}</span>
        <div
          class="menu-sub-item"
          v-for="subItem in rootItem.children"
          :key="subItem.name"
        >
          <t-menu-item :value="subItem.path">
            <template #icon>
              <icon :name="subItem.icon" />
            </template>
            <span>{{ subItem.label }}</span>
          </t-menu-item>
        </div>
      </t-submenu>
    </div>
  </t-menu>
</template>

<script>
import { Icon } from "tdesign-icons-vue";

export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "overview",
          label: "总览",
          icon: "dashboard",
          url: "/overview",
        },
        {
          path: "/static",
          name: "static",
          label: "统计",
          icon: "chart",
          url: "/static",
        },
        {
          label: "文章",
          icon: "view-module",
          children: [
            {
              path: "/list",
              name: "list",
              label: "所有文章",
              icon: "view-module",
              url: "/article/list",
            },
            {
              path: "/edit",
              name: "edit",
              label: "写文章",
              icon: "view-module",
              url: "/article/edit",
            },
          ],
        },
        {
          path: "/link",
          name: "link",
          label: "友链",
          icon: "link",
          url: "/link",
        },
        {
          path: "/journal",
          name: "journal",
          label: "日志",
          icon: "edit-1",
          url: "/journal",
        },
        {
          path: "/comment",
          name: "comment",
          label: "评论",
          icon: "edit-1",
          url: "/comment",
        },
      ],
    };
  },
  components: {
    Icon,
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse;
    },
    theme() {
      if (this.$store.state.app.isDark) {
        return "dark";
      } else {
        return "light";
      }
    },
  },
};
</script>
<style lang="less" scoped>

.aside-title-container {
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
