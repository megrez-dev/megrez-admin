<template>
  <div>
    <t-drawer
      header="附件列表"
      :visible="visible"
      :onClose="close"
      :closeBtn="true"
      size="400px"
      :onOverlayClick="close"
      placement="right"
    >
      <!-- 抽屉内容从这里开始 -->
      <t-list async-loading="load-more" @load-more="loadMore">
        <t-list-item v-for="attach in attachments" :key="attach.id">
          <div class="image-wrapper" @click="openDetailDrawer(attach)">
            <a href="javascript:;">
              <img :src="'http://localhost:8080'+attach.thumbURL" />
            </a>
          </div>
        </t-list-item>
      </t-list>
      <template #footer>
        <t-button @click="upload">上传附件</t-button>
      </template>
    </t-drawer>
    <AttachDetailDrawer
    :attachment="selectedAttachment"
    ></AttachDetailDrawer>
    <AttachUploadDialog @uploadSuccess="syncData"></AttachUploadDialog>
  </div>
</template>

<script>
import AttachUploadDialog from "@/components/attachment/AttachUploadDialog.vue";
import AttachDetailDrawer from "@/components/attachment/AttachDetailDrawer.vue";
// import { EditIcon, DownloadIcon } from "tdesign-icons-vue";
export default {
  name: "AttachListDrawer",
  data() {
    return {
      attachments: [],
      selectedAttachment: null,
    };
  },
  computed: {
    visible() {
      return this.$store.state.app.attachListDrawerVisible;
    },
  },
  methods: {
    close() {
      this.$store.commit("CLOSE_ATTACH_LIST_DRAWER");
    },
    upload() {
      this.$store.commit("OPEN_ATTACH_UPLOAD_DIALOG");
    },
    // 点击加载更多，状态切换为「加载中」
    loadMore() {
      this.$message.info("未实现");
      this.asyncLoadingRadio = "loading";
    },
    openDetailDrawer(attach) {
      this.selectedAttachment = attach
      this.$store.commit("OPEN_ATTACH_DETAIL_DRAWER");
    },
    syncData() {
      this.$request
      .get("attachments")
      .then((res) => {
        if (res.status === 0) {
          this.attachments = res.data.list;
        }
      })
      .catch(() => {
        this.$message.error("获取附件列表失败");
      });
    }
  },
  watch: {
    // 也可以使用插槽自定义加载内容
    asyncLoadingRadio(val) {
      if (val === "loading-custom") {
        this.asyncLoading = () => <div> 没有更多数据了 </div>;
      } else {
        this.asyncLoading = this.asyncLoadingRadio;
      }
    },
    "$store.state.app.attachListDrawerVisible": {
      handler: function (newVal) {
        if (newVal) {
          this.syncData();
        }
      },
    },
  },
  components: { AttachUploadDialog, AttachDetailDrawer },
};
</script>

<style lang="less" scoped>
.image-wrapper {
  margin: 0 auto;
  justify-content: center;
  img {
    height: 175px;
    align-items: center;
    margin: 0 auto;
    border-radius: 2px;
  }
}
</style>