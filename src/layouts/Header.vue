<template>
  <t-head-menu theme="light" v-model="menu1Value" @change="changeHandler">
    <template #logo>
      <div class="header-operator-left">
        <t-button
          theme="default"
          shape="square"
          variant="text"
          @click="changeCollapsed"
        >
          <t-icon class="collapsed-icon" name="menu-unfold" />
        </t-button>
      </div>
    </template>
    <template #operations>
      <div class="header-operator-right">
        <!-- 搜索框 -->
        <search v-if="layout !== 'side'" :layout="layout" />

        <!-- 全局通知 -->
        <notice />

        <t-tooltip placement="bottom" content="代码仓库">
          <t-button
            theme="default"
            shape="square"
            variant="text"
            @click="navToGitHub"
          >
            <t-icon name="logo-github" />
          </t-button>
        </t-tooltip>
        <t-tooltip placement="bottom" content="帮助文档">
          <t-button
            theme="default"
            shape="square"
            variant="text"
            @click="navToHelper"
          >
            <t-icon name="help-circle" />
          </t-button>
        </t-tooltip>
        <div class="theme-tab">
          <t-radio-group
            variant="default-filled"
            size="small"
            default-value="light"
            @change="changeTheme"
          >
            <t-radio-button value="light"><icon name="heart-filled" style="color: orange"/></t-radio-button>
            <t-radio-button value="dark"><icon name="star-filled" style="color: gray"/></t-radio-button>
          </t-radio-group>
        </div>
      </div>
    </template>
  </t-head-menu>
</template>

<script>
import { Icon } from "tdesign-icons-vue";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: true,
    };
  },
  computed: {
    // iconName() {
    //   return this.collapsed ? "chevron-right" : "chevron-left";
    // },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
    changeTheme(value) {
      if (value === "light") {
        document.documentElement.removeAttribute('theme-mode');
      }
      if (value === "dark") {
        document.documentElement.setAttribute('theme-mode', 'dark');
      }
    }
  },
};
</script>
<style lang="less" scoped>
.header-operator-left {
  display: flex;
  margin-left: 20px;
  align-items: normal;
  line-height: 0;

  .collapsed-icon {
    font-size: 20px;
  }
}

.header-operator-right {
  display: flex;
  align-items: center;
  margin-right: 20px;

  .t-button {
    margin: 0 8px;
    &.header-user-btn {
      margin: 0;
    }
  }

  .t-icon {
    font-size: 20px;
    &.general {
      margin-right: 16px;
    }
  }

  .theme-tab {
    display: flex;
    align-items: center;
    width: 60px;
    height: 32px;
    margin-left: 12px;

    .t-radio-group {
      height: 32px;
      .t-radio-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        height: 28px;
        width: 28px;
        .t-icon {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
