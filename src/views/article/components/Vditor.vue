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
    // 当value时，更新vditor的Value
    value(value) {
      this.contentEditor.setValue(value);
    },
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
      this.$emit('change', this.contentEditor.getValue());
    },
    countWord(length) {
      this.$emit('countWord', length);
    },
    append(content) {
      this.contentEditor.insertValue(content);
    },
    initViditor() {
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
        theme: this.isDark ? 'dark' : 'classic',
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
          // 由于存在异步请求与vditor的挂载先后顺序的问题，在vditor挂载完成之后再请求数据。
          this.$emit('vditorMounted');
        },
      });
    },
  },
  mounted() {
    this.initViditor();
  },
};
</script>

<style></style>
