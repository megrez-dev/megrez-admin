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
        v-for="image in images"
        :key="image.name"
      >
        <img :src="image.url" />
      </div>
    </div>
    <t-upload
      refs="upload"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      v-model="images"
      theme="custom"
      tips="最多上传 9 张图片"
      accept="image/*"
      multiple
      :max="9"
    ></t-upload>
  </t-dialog>
</template>

<script>
export default {
  name: "NewJournalDialog",
  data() {
    return {
      visible: false,
      journal: {
        content: "",
      },
      images: [],
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
      console.log(this.$refs.upload);
    },
    handlePreview({ file }) {
      this.$viewerApi({
        images: [file.url],
      });
    },
  },
};
</script>

<style lang="less" scpoed>
@import "@/style/variables";
.uploaded-files-container {
  display: flex;
  .uploaded-files-item {
    width: 130px;
    height: 130px;
    margin-bottom: 10px;
    margin: 0 10px 10px 0;
    border: 1px solid @border-level-2-color;
    &:hover {
      background-color: @text-color-secondary;
    }
    img {
      width: 100%;
      margin: auto;
    }
  }
}
</style>