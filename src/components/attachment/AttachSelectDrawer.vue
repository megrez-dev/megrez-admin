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
      <div class="images-wrapper">
        <div
          class="image-item"
          :style="selectedIndex[index] ? { border: '5px solid #1890ff' } : {}"
          v-for="(attach, index) in attachments"
          :key="attach.id"
          @click="handleSelect(attach, index)"
          @mouseenter="mouseEnter(index)"
          @mouseleave="mouseLeave(index)"
        >
          <img :src="attach.url" />
          <div class="image-item-mask" v-show="maskVisible[index]">
            <div @click.stop="handlePreview(attach)">
              <BrowseIcon style="cursor: pointer" />
            </div>
            <t-divider layout="vertical" />
            <div @click.stop="handleDetail(attach)">
              <InfoCircleIcon style="cursor: pointer" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <t-button @click="onClickUpload">
          <UploadIcon slot="icon" />
          上传附件
        </t-button>
        <span class="complete-button" v-if="mode === 'multiple'">
          <t-button
            theme="danger"
            @click="onClickComplete"
            v-if="selectedAttaches.length > 0"
          >
            完成
          </t-button>
          <t-button theme="danger" v-else disabled>完成</t-button>
        </span>
      </template>
    </t-drawer>
    <AttachDetailDrawer ref="attachDetailDrawer"></AttachDetailDrawer>
    <AttachUploadDialog
      ref="attachUploadDialog"
      @uploadSuccess="syncData"
    ></AttachUploadDialog>
  </div>
</template>

<script>
import AttachUploadDialog from "@/components/attachment/AttachUploadDialog.vue";
import AttachDetailDrawer from "@/components/attachment/AttachDetailDrawer.vue";
import { InfoCircleIcon, BrowseIcon, UploadIcon } from "tdesign-icons-vue";
export default {
  name: "AttachSelectDrawer",
  data() {
    return {
      num: 0,
      visible: false,
      attachments: [],
      maskVisible: [],
      selectedIndex: [],
      selectedAttaches: [],
    };
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: "single",
    },
  },
  methods: {
    open(num = 0) {
      this.num = num;
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.selectedIndex = this.selectedIndex.map(() => false);
      this.selectedAttaches = [];
    },
    onClickUpload() {
      this.$refs.attachUploadDialog.open();
    },
    syncData() {
      this.$request
        .get("attachments")
        .then((res) => {
          if (res.status === 0) {
            this.attachments = res.data.list ? res.data.list : [];
          }
          this.maskVisible = this.attachments.map(() => false);
          this.selectedIndex = this.attachments.map(() => false);
        })
        .catch(() => {
          this.$message.error("获取附件列表失败");
        });
    },
    mouseEnter(index) {
      this.$set(this.maskVisible, index, true);
    },
    mouseLeave(index) {
      this.$set(this.maskVisible, index, false);
    },
    handleDetail(attach) {
      this.$refs.attachDetailDrawer.open(attach);
    },
    handlePreview(attach) {
      this.$viewerApi({
        images: [attach.url],
      });
    },
    handleSelect(attach, index) {
      if (this.mode === "single") {
        this.$emit("select", attach);
        this.close();
      }
      if (this.num != 0 && this.num <= this.selectedAttaches.length) {
        this.$message.warning("最多只能选择" + this.num + "个附件");
        return;
      }
      this.$set(this.selectedIndex, index, !this.selectedIndex[index]);
      if (this.selectedIndex[index]) {
        this.selectedAttaches.push(attach);
      } else {
        this.selectedAttaches.splice(this.selectedAttaches.indexOf(attach), 1);
      }
    },
    onClickComplete() {
      this.$emit("select", this.selectedAttaches);
      this.close();
    },
  },
  mounted() {
    this.syncData();
  },
  components: {
    AttachUploadDialog,
    AttachDetailDrawer,
    InfoCircleIcon,
    BrowseIcon,
    UploadIcon,
  },
};
</script>

<style lang="less" scoped>
.images-wrapper {
  display: flex;
  flex-wrap: wrap;
  .image-item {
    background-color: @bg-color-secondarycontainer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 10px 20px 10px;
    border: 1px solid @border-level-2-color;
    img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
    .image-item-mask {
      background-color: @text-color-secondary;
      color: @bg-color-container;
      transition: all 0.2s linear;
      will-change: transform;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      &:hover {
        opacity: 1;
      }
    }
  }
}

.complete-button {
  float: right;
}
</style>