<template>
  <div>
    <t-dialog
      header="发布日志"
      :visible="visible"
      confirmBtn="发布"
      body="body"
      :cancelBtn="null"
      :onClose="close"
      :onConfirm="publishJournal"
    >
      <t-textarea
        v-model="journal.content"
        placeholder="暂不支持 Markdown 内容"
        :autosize="{ minRows: 5 }"
      ></t-textarea>
      <t-divider dashed></t-divider>
      <div class="uploaded-files-container">
        <div
          class="uploaded-files-item"
          v-for="(image, index) in journal.images"
          :key="image.name"
          @mouseenter="mouseEnter(image, index)"
          @mouseleave="mouseLeave(image, index)"
        >
          <img :src="'http://localhost:8080' + image" />
          <div class="uploaded-files-mask" v-show="maskVisible[index]">
            <BrowseIcon style="cursor: pointer" @click="handlePreview(index)" />
            <t-divider layout="vertical" />
            <DeleteIcon style="cursor: pointer" @click="handleDelete(index)" />
          </div>
        </div>
        <div
          class="new-upload-box"
          @click="openAttachSelectDrawer"
          v-if="journal.images.length < 9"
        >
          <div class="new-upload-box-icon"><AddIcon /></div>
          <div class="new-upload-box-text">选择附件</div>
        </div>
      </div>
    </t-dialog>
    <AttachSelectDrawer
      ref="attachSelectDrawer"
      mode="multiple"
      @select="selectAttaches"
    ></AttachSelectDrawer>
  </div>
</template>

<script>
import AttachSelectDrawer from "@/components/attachment/AttachSelectDrawer.vue";
import { BrowseIcon, DeleteIcon, AddIcon } from "tdesign-icons-vue";
export default {
  name: "NewJournalDialog",
  data() {
    return {
      visible: false,
      journal: {
        content: "",
        private: false,
        status: 0,
        images: [],
      },
      maskVisible: [],
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    publishJournal() {
      if (this.journal.content === "" && this.journal.images.length === 0) {
        this.$message.warning("请填写内容或者上传图片");
        return;
      }
      this.$request
        .post("/journal", this.journal)
        .then(() => {
          this.$message.success("发布成功");
          this.close();
          this.journal.content = "";
          this.journal.images = [];
        })
        .catch(() => {
          this.$message.error("发布失败");
        });
    },
    mouseEnter(image, index) {
      this.$set(this.maskVisible, index, true);
    },
    mouseLeave(image, index) {
      this.$set(this.maskVisible, index, false);
    },
    handlePreview(index) {
      this.$viewerApi({
        options: {
          initialViewIndex: index,
        },
        images: this.journal.images,
      });
    },
    handleDelete(index) {
      this.journal.images.splice(index, 1);
      this.maskVisible.splice(index, 1);
    },
    selectAttaches(attaches) {
      this.journal.images = this.journal.images.concat(
        attaches.map((attach) => attach.url)
      );
      this.maskVisible = this.journal.images.map(() => false);
    },
    openAttachSelectDrawer() {
      this.$refs.attachSelectDrawer.open();
    },
  },
  components: {
    AttachSelectDrawer,
    BrowseIcon,
    DeleteIcon,
    AddIcon,
  },
};
</script>

<style lang="less" scpoed>
@import "@/style/variables";
.uploaded-files-container {
  display: flex;
  flex-wrap: wrap;
  .uploaded-files-item {
    background-color: @bg-color-secondarycontainer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 10px 10px 0;
    border: 1px solid @border-level-2-color;
    img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
    .uploaded-files-mask {
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
  .new-upload-box {
    background-color: @bg-color-secondarycontainer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    border: 1px solid @border-level-2-color;
    .new-upload-box-icon {
      margin-bottom: 20px;
    }
  }
}
</style>