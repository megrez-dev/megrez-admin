<template>
  <!-- 不能用骨架屏包裹vditor，因为包裹之后vditor挂载时会找不到#vditor元素 -->
  <div id="vditor">
    <!-- 因此骨架屏单独写在此处，仅用于占位，当vditor挂在后会替换它，无需关心loading何时结束 -->
    <t-skeleton
      class="vditor-skeleton"
      :rowCol="skeletonRowCol"
      loading
      animation="gradient"
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
      delayTime: 500,
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
    initViditor(cb) {
      const { isDark, value } = this;
      const theme = isDark ? 'dark' : 'classic';
      // 为了防止闪屏抖动，延迟500ms挂载vditor
      setTimeout(() => {
        this.contentEditor = new Vditor('vditor', {
          ...vditorBaseConfigs,
          input: this.contentChange,
          theme,
          preview: {
            theme: {
              current: theme
            }
          },
          value,
          counter: {
            enable: true,
            type: 'text',
            after: (length) => {
              this.countWord(length);
              cb();
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
