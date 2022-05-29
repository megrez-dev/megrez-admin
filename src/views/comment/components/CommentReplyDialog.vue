<template>
  <t-dialog
    header="回复评论"
    :visible="visible"
    confirmBtn="回复"
    :cancelBtn="null"
    :onClose="close"
    :onConfirm="replyComment"
  >
    <t-textarea
      v-model="content"
      placeholder="暂不支持 Markdown 评论"
      :autosize="{ minRows: 10 }"
    ></t-textarea>
  </t-dialog>
</template>

<script>
export default {
  name: "CommentReplyDialog",
  data() {
    return {
      visible: false,
      content: "",
    };
  },
  props: {
    comment: {
      required: true,
    },
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    replyComment() {
      this.$message.info("回复评论");
      console.log(this.comment);
    },
  },
};
</script>
<style>
</style>