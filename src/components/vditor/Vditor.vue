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
  props: {
    origionContent: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    contentChange() {
      this.$emit(
        "contentChange",
        this.contentEditor.getValue(),
        this.contentEditor.getHTML()
      );
    },
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 800,
      icon: "material",
      input: this.contentChange,
      counter: {
        enable: true,
        type: "markdown",
      },
      preview: {
        delay: 50,
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
        this.contentEditor.insertValue(this.origionContent);
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