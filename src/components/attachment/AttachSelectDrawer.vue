<template>
  <div>
    <t-drawer
      header="附件列表"
      :visible="visible"
      :onClose="close"
      :closeBtn="true"
      size="400px"
      :zIndex="2600"
      :onOverlayClick="close"
      placement="right"
    >
      <t-row :gutter="[10, 10]">
        <t-col>
          <t-input v-model="keywords" placeholder="通过关键词搜索"></t-input>
        </t-col>
      </t-row>
      <div class="images-wrapper">
        <div class="image-item" v-for="(attach, index) in attachments" :key="attach.id">
          <div class="select-mask" v-show="attach.selected" @click="unSelect(attach, index)"></div>
          <m-image fit="cover" :src="attach.url" @maskClick="handleSelect(attach, index)">
            <template slot="maskInner">
              <span style="cursor: pointer" @click.stop="previewImage(attach.url)">
                <BrowseIcon size="1.1em" /> 预览
              </span>
              <t-divider layout="vertical"></t-divider>
              <span style="cursor: pointer" @click.stop="previewAttach(attach)">
                <InfoCircleIcon size="1.1em" /> 详情
              </span>
            </template>
          </m-image>
        </div>
      </div>
      <template #footer>
        <t-button @click="onClickUpload">
          <UploadIcon slot="icon" />
          上传附件
        </t-button>
        <span class="complete-button" v-if="mode === 'multiple'">
          <t-button theme="danger" :disabled="selectedNum <= 0" @click="onClickComplete">完成</t-button>
        </span>
      </template>
    </t-drawer>
    <AttachDetailDrawer ref="attachDetailDrawer"></AttachDetailDrawer>
    <AttachUploadDialog ref="attachUploadDialog" @uploadSuccess="syncData"></AttachUploadDialog>
  </div>
</template>

<script>
import AttachUploadDialog from '@/components/attachment/AttachUploadDialog.vue';
import AttachDetailDrawer from '@/components/attachment/AttachDetailDrawer.vue';
import MImage from '@/components/image/Image.vue';
import { viewerOptions } from '@/components/image/constants';
import { UploadIcon, BrowseIcon, InfoCircleIcon } from 'tdesign-icons-vue';

export default {
  name: 'AttachSelectDrawer',
  components: {
    AttachUploadDialog,
    AttachDetailDrawer,
    MImage,
    UploadIcon,
    BrowseIcon,
    InfoCircleIcon,
  },
  data() {
    return {
      hasInit: false,
      keywords: '',
      attachments: [],
      selectedNum: 0,
      selectedAttaches: [],
    };
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'single',
    },
    // AttachSelectDrawer现在为受控组件，是否展示受控于父组件传递的visible属性
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxNum: Number,
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$emit('open');
        // 若未初始化，则请求数据，进行数据的初始化
        if (this.hasInit) return;
        this.hasInit = true;
        this.syncData();
      } else {
        this.$emit('close');
      }
    },
  },
  methods: {
    close() {
      // 同步更新visible值，需要父组件传参时添加.sync修饰符
      this.$emit('update:visible', false);
      this.$emit('close');
      this.selectedIndex = [];
      this.selectedAttaches = new Set();
    },
    onClickUpload() {
      this.$refs.attachUploadDialog.open();
    },
    syncData() {
      this.$request
        .get('attachments')
        .then((res) => {
          if (res.status === 0) {
            this.attachments = res.data.list
              ? res.data.list.map((item) => ({ ...item, selected: false }))
              : [];
          }
        })
        .catch(() => {
          this.$message.error('获取附件列表失败');
        });
    },
    previewAttach(attach) {
      this.$refs.attachDetailDrawer.open(attach);
    },
    previewImage(url) {
      this.$viewerApi({
        images: [url],
        options: viewerOptions,
      });
    },
    handleSelect(attach) {
      if (attach.selected) return;
      attach.selected = true;
      this.selectedNum++;
      if (this.mode === 'single') {
        this.$emit('select', attach);
        this.close();
        return;
      }
      if (this.maxNum != 0 && this.maxNum <= this.selectedNum) {
        this.$message.warning('最多只能选择' + this.maxNum + '个附件');
        return;
      }
    },
    unSelect(attach) {
      this.selectedNum--;
      attach.selected = false;
    },
    onClickComplete() {
      this.$emit('select', this.attachments.filter((item) => item.selected));
      this.close();
    },
  },
};
</script>

<style lang="less" scoped>
.images-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .select-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border: 3px solid @brand-color-5;
    z-index: 300;
  }
  .image-item {
    position: relative;
    flex: 1 1 160px;
    height: 170px;
    margin: 10px 5px;
    overflow: hidden;
    background-color: @bg-color-secondarycontainer;
  }
}
.complete-button {
  float: right;
}
</style>
