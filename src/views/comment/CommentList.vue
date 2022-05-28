<template>
  <PageView>
    <template slot="content">
      <div class="article-list-container">
        <div class="card-container">
          <t-table
            :data="commentList"
            :columns="columns"
            rowKey="property"
            verticalAlign="middle"
            :loading="isCommentListLoading"
            :pagination="pagination"
            @change="rehandleChange"
          >
            <template #title="{ row }">
              <a
                class="t-button-link"
                :href="'/article/' + row.id"
                target="_blank"
                v-if="row.type === 1"
                >{{ row.article.title }}</a
              >
              <a
                class="t-button-link"
                :href="'/' + row.page.slug"
                target="_blank"
                v-else
                >{{ row.page.name }}</a
              >
            </template>
            <template #status="{ row }">
              <span v-if="row.status === 0">
                <t-badge dot :offset="[8, -5]" color="green"> </t-badge
                >已发布</span
              >
              <span v-else-if="row.status === 1"
                ><t-badge dot :offset="[8, -5]" color="orange"> </t-badge
                >待审核</span
              >
              <span v-else>
                <t-badge dot :offset="[8, -5]" color="red"> </t-badge>未知</span
              >
            </template>
            <template #op="slotProps">
              <a class="t-button-link" @click="handleClickReply(slotProps)"
                >回复</a
              >
              <t-divider layout="vertical" />
              <a class="t-button-link" @click="handleClickDelete(slotProps)"
                >删除</a
              >
            </template>
          </t-table>
        </div>
      </div>
    </template>
  </PageView>
</template>

<script>
import { timeAgo } from "@/utils/datetime.js";
import PageView from "@/layouts/PageView";

export default {
  name: "CommentList",
  data() {
    return {
      commentList: [],
      isCommentListLoading: false,
      columns: [
        {
          colKey: "title",
          title: "文章/页面",
        },
        {
          colKey: "content",
          title: "内容",
        },
        {
          colKey: "status",
          title: "状态",
          width: "100px",
        },
        {
          colKey: "publishTime",
          title: "发布时间",
          cell(h, { row: { publishTime } }) {
            return timeAgo(publishTime);
          },
        },
        {
          fixed: "right",
          colKey: "op",
          title: "操作",
        },
      ],
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.fetchComments(this.pagination);
  },
  methods: {
    fetchComments(pagination = this.pagination) {
      this.isCommentListLoading = true;
      const { current, pageSize } = pagination;
      this.$request
        .get("comments?pageNum=" + current + "&pageSize=" + pageSize)
        .then((res) => {
          this.commentList = res.data.list;
          this.pagination = {
            ...pagination,
            total: res.data.total,
          };
        })
        .catch(() => {
          this.$message.error("获取评论列表失败");
        })
        .finally(() => {
          this.isCommentListLoading = false;
        });
    },
    rehandleChange(pageInfo) {
      this.pagination.current = pageInfo.pagination.current;
      this.pagination.pageSize = pageInfo.pagination.pageSize;
      this.fetchComments(this.pagination);
    },
    handleClickDetail() {
      this.$message.info("未实现");
    },
    handleClickDelete(slotProps) {
      this.$request
        .delete("comment/" + slotProps.row.id)
        .then((res) => {
          if (res.status === 0) {
            for (var i = 0; i < this.commentList.length; i++) {
              if (this.commentList[i].id === slotProps.row.id) {
                this.commentList.splice(i, 1);
                break;
              }
            }
            this.$message.success("删除成功");
          }
        })
        .catch(() => {
          this.$message.warning("删除失败");
          // TODO: 换成修改按钮状态
        });
    },
  },
  components: { PageView },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";
@import "@/style/index";

.article-list-container {
  .card-container {
    padding: 16px 24px;
    background-color: @bg-color-container;
    border-radius: 2px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .left-operation-container {
      padding: 0 0 6px 0;
      margin-bottom: 16px;
    }
  }
}
</style>