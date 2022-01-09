<template>
  <div id="vditor"></div>
</template>

<script>
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  data() {
    return {
      contentEditor: null,
    };
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 800,
      icon: 'material',
      toolbarConfig: {
        pin: false,
      },
      counter: {
        enable: true,
        type: "markdown",
      },
      preview: {
        delay: 200,
      },
      outline: {
        enable: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        if (this.$store.state.app.isDark) {
          this.contentEditor.setTheme("dark", "dark");
        } else {
          this.contentEditor.setTheme("classic", "light");
        }
      },
    });
  },
  watch: {
    // 监听 store里面的数据
    "$store.state.app.isDark": {
      deep: true,
      handler: function (newValue) {
        // result为true，则表示是全部选中
        if (newValue) {
          this.contentEditor.setTheme("dark", "dark");
        } else {
          this.contentEditor.setTheme("classic", "light");
        }
      },
    },
  },
};
</script>

<style></style>