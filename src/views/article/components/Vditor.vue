<template>
  <div id="vditor">
    <t-skeleton 
      class="vditor-skeleton"
      :rowCol="skeletonRowCol"
      loading 
      animation="gradient" 
      :delay="delayTime"
    ></t-skeleton>
  </div>
</template>

<script>
import Vditor from 'vditor';
import { vditorBaseConfigs, skeletonRowCol } from '@/views/article/constants';
import 'vditor/dist/index.css';

export default {
  props: {
    value: {
      type: String,
      require: false,
      default: '',
    },
    loading: {
      type: Boolean,
      require: false,
      default: true,
    },
  },  
  computed: {
    isDark() {
      return this.$store.state.app.isDark;
    },
  },
  watch: {
    // 监听 store里面的数据
    isDark(isDark) {
      isDark
        ? this.contentEditor?.setTheme('dark', 'dark')
        : this.contentEditor?.setTheme('classic', 'light');
    },
  },
  data() {
    return {
      contentEditor: null,
      delayTime: 800,
      skeletonRowCol: skeletonRowCol,
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
      setTimeout(() => {
        this.contentEditor = new Vditor('vditor', { 
          ...vditorBaseConfigs, 
          input: this.contentChange,
          theme: isDark ? 'dark' : 'classic',
          value,
          counter: {
            enable: true,
            type: 'text',
            after: (length) => {
              this.countWord(length);
            },
          },
        });
      }, this.delayTime);
    },
  },
};
</script>

<style lang="less" scoped>
.vditor-skeleton {
  padding: 20px;
  height: 600px;
}
</style>
