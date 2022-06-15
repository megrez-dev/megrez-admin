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
    originalContent: {
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
    countWord(length) {
      this.$emit("countWord", length);
    },
    append(content) {
      this.contentEditor.insertValue(content);
    },
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 600,
      icon: "material",
      mode: "wysiwyg",
      input: this.contentChange,
      counter: {
        enable: true,
        type: "text",
        after: (length) => {
          this.countWord(length);
        },
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
        this.contentEditor.setValue(this.originalContent);
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