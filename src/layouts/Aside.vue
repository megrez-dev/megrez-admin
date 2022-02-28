<template>
  <t-menu :theme="theme" :collapsed="collapsed">
    <template #logo>
      <div class="aside-title-container">
        <span class="aside-title-logo">M</span>
        <!-- <span class="aside-title-text" v-show="!collapsed">Megrez</span> -->
      </div>
    </template>
    <div class="menu-root-item" v-for="rootItem in menu" :key="rootItem.name">
      <t-menu-item :value="rootItem.name" :to="{name: rootItem.name}" v-if="!rootItem.children">
        <template #icon>
          <icon :name="rootItem.meta.icon" />
        </template>
        {{ rootItem.meta.title }}
      </t-menu-item>
      <t-submenu :value="rootItem.name" mode="popup" v-else>
        <template #icon>
          <icon :name="rootItem.meta.icon" />
        </template>
        <span slot="title">{{ rootItem.meta.title }}</span>
        <div
          class="menu-sub-item"
          v-for="subItem in rootItem.children"
          :key="subItem.name"
        >
          <t-menu-item :value="subItem.path" :to="{name: subItem.name}">
            <template #icon>
              <icon :name="subItem.meta.icon" />
            </template>
            <span>{{ subItem.meta.title }}</span>
          </t-menu-item>
        </div>
      </t-submenu>
    </div>
  </t-menu>
</template>

<script>
import { Icon } from "tdesign-icons-vue";
import { menuRoutes } from "@/config/routes.js";

export default {
  components: { Icon },
  computed: {
    collapsed() {
      return this.$store.state.app.collapsed;
    },
    theme() {
      if (this.$store.state.app.isDark) {
        return "dark";
      } else {
        return "light";
      }
    },
    menu() {
      return menuRoutes.find(item => item.path === '/').children;
    },
  },
};
</script>
<style lang="less">
aside {
  position: fixed;
  top: 0;
  z-index: 1;
}
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
