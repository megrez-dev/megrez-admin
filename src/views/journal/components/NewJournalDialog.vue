<template>
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
        v-for="(image, index) in images"
        :key="image.name"
        @mouseenter="mouseEnter(image, index)"
        @mouseleave="mouseLeave(image, index)"
      >
        <img :src="image.url" />
        <div class="uploaded-files-mask" v-show="items[index]">
          <BrowseIcon style="cursor: pointer" @click="handlePreview(index)" />
          <t-divider layout="vertical" />
          <DeleteIcon style="cursor: pointer" @click="handleDelete(index)" />
        </div>
      </div>
      <t-upload
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        v-model="images"
        theme="custom"
        tips="最多上传 9 张图片"
        accept="image/*"
        multiple
        :onSuccess="uploadSuccess"
        :max="9"
        v-if="images.length < 9"
      >
        <div class="new-upload-box">
          <div class="new-upload-box-icon"><AddIcon /></div>
          <div class="new-upload-box-text">上传图片</div>
        </div>
      </t-upload>
    </div>
  </t-dialog>
</template>

<script>
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
      },
      images: [],
      items: [],
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
      if (this.journal.content === "" && this.images.length === 0) {
        this.$message.warning("请填写内容或者上传图片");
        return;
      }
      this.journal.images = this.images.map((image) => image.url);
      this.$request
        .post("/journal", this.journal)
        .then(() => {
          this.$message.success("发布成功");
          this.close();
          this.journal.content = "";
          this.images = [];
        })
        .catch(() => {
          this.$message.error("发布失败");
        });
    },
    mouseEnter(image, index) {
      this.$set(this.items, index, true);
    },
    mouseLeave(image, index) {
      this.$set(this.items, index, false);
    },
    uploadSuccess() {
      this.items = this.images.map(() => false);
    },
    handlePreview(index) {
      this.$viewerApi({
        options: {
          initialViewIndex: index,
        },
        images: this.images.map((image) => image.url),
      });
    },
    handleDelete(index) {
      console.log(index);
      this.images.splice(index, 1);
      this.items.splice(index, 1);
    },
  },
  components: {
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
      width: 100%;
      margin: auto;
    }
    .uploaded-files-mask {
      background-color: @text-color-secondary;
      color: @bg-color-container;
      transition: opacity 0.5s ease-in-out;
      will-change: transform;
      opacity: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
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