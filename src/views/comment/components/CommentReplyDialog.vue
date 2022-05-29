<template>
  <t-dialog
    :visible="visible"
    :header="null"
    :confirmBtn="null"
    :cancelBtn="null"
    :onClose="close"
  >
    <t-textarea
      v-model="content"
      placeholder="暂不支持 Markdown 评论"
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
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>
<style>
</style>