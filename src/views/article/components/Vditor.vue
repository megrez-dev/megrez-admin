<template>
  <div id="vditor"></div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default {
  props: {
    value: {
      type: String,
      require: false,
      default: '',
    },
  },
  computed: {
    isDark() {
      return this.$store.state.app.isDark;
    }
  },
  watch: {
    // 监听 store里面的数据
    isDark(isDark) {
      isDark
        ? this.contentEditor.setTheme('dark', 'dark')
        : this.contentEditor.setTheme('classic', 'light');
    },
  },
  data() {
    return {
      contentEditor: null,
    };
  },
  methods: {
    contentChange() {
      this.$emit('input', this.contentEditor.getValue());
    },
    countWord(length) {
      this.$emit('countWord', length);
    },
    append(content) {
      this.contentEditor.insertValue(content);
    },
    initViditor() {
      const { isDark, value } = this;
      this.contentEditor = new Vditor('vditor', {
        height: 600,
        icon: 'material',
        mode: 'wysiwyg',
        input: this.contentChange,
        counter: {
          enable: true,
          type: 'text',
          after: (length) => {
            this.countWord(length);
          },
        },
        theme: isDark ? 'dark' : 'classic',
        preview: {
          delay: 50,
        },
        outline: {
          enable: true,
        },
        cache: {
          enable: false,
        },
        value,
      });
    },
  },
};
</script>

<style></style>
