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
      placeholder="暂不支持 Markdown 评论"
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
        <transition name="fade" mode="out-in">
          <div class="uploaded-files-mask" v-show="items[index]">
            <BrowseIcon style="cursor: pointer" @click="handlePreview(image)" />
            <t-divider layout="vertical" />
            <DeleteIcon style="cursor: pointer" @click="handleDelete(index)" />
          </div>
        </transition>
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
    ></t-upload>
  </t-dialog>
</template>

<script>
import { BrowseIcon, DeleteIcon } from "tdesign-icons-vue";
export default {
  name: "NewJournalDialog",
  data() {
    return {
      visible: false,
      journal: {
        content: "",
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
      this.$message.info("未实现");
    },
    mouseEnter(image, index) {
      this.$set(this.items, index, true);
    },
    mouseLeave(image, index) {
      this.$set(this.items, index, false);
    },
    uploadSuccess() {
      this.items = this.images.map(() => {
        return false;
      });
    },
    handlePreview(image) {
      this.$viewerApi({
        images: [image.url],
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
  },
};
</script>

<style lang="less" scpoed>
@import "@/style/variables";
.uploaded-files-container {
  display: flex;
  flex-wrap: wrap;
  .uploaded-files-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 128px;
    height: 128px;
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
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opcaity: 0;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 2s;
}
.fade-leave-to {
  opcaity: 0;
}
</style>