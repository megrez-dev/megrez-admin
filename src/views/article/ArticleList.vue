<template>
  <PageView>
    <template slot="content">
      <div class="article-list-container">
        <div class="card-container">
          <t-row justify="space-between">
            <div class="left-operation-container">
              <t-button @click="handleWrite">
                <add-icon slot="icon" />
                写文章
              </t-button>
            </div>
          </t-row>
          <t-table
            :data="articleList"
            :columns="columns"
            rowKey="property"
            verticalAlign="middle"
            :loading="isArticleListLoading"
            :pagination="pagination"
            @change="rehandleChange"
          >
            <template #title="{ row }">
              <a
                class="t-button-link"
                :href="'/article/' + row.id"
                target="_blank"
                >{{ row.title }}</a
              >
            </template>
            <template #status="{ row }">
              <span v-if="row.status === 0">
                <t-badge dot :offset="[8, -5]" color="green"> </t-badge
                >已发布</span
              >
              <span v-else-if="row.status === 1"
                ><t-badge dot :offset="[8, -5]" color="orange"> </t-badge
                >草稿</span
              >
              <span v-else>
                <t-badge dot :offset="[8, -5]" color="red"> </t-badge>未知</span
              >
            </template>
            <template #categories="{ row }">
              <t-tag
                v-for="(category, index) in row.categories"
                :key="index"
                size="small"
                theme="primary"
                variant="light"
                style="margin-bottom: 8px; margin-right: 8px"
              >
                {{ category.name }}
              </t-tag>
            </template>
            <template #tags="{ row }">
              <t-tag
                v-for="(tag, index) in row.tags"
                :key="index"
                size="small"
                theme="success"
                variant="light"
                style="margin-bottom: 8px; margin-right: 8px"
              >
                {{ tag.name }}
              </t-tag>
            </template>
            <template #commentsNum="{ row }">
              <t-badge
                :count="row.commentsNum"
                shape="round"
                :offset="[-14, -5]"
                showZero
              >
              </t-badge>
            </template>
            <template #visits="{ row }">
              <t-badge
                :count="row.visits"
                shape="round"
                color="#fcc524"
                :offset="[-20, -5]"
                showZero
              >
              </t-badge>
            </template>
            <template #op="slotProps">
              <a class="t-button-link" @click="handleClickDetail(slotProps)"
                >编辑</a
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
import { AddIcon } from "tdesign-icons-vue";
import { timeAgo } from "@/utils/datetime.js";
import PageView from "@/layouts/PageView";

export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      isArticleListLoading: false,
      columns: [
        {
          colKey: "title",
          title: "标题",
        },
        {
          colKey: "status",
          title: "状态",
          width: "100px",
        },
        {
          colKey: "categories",
          title: "分类",
        },
        {
          colKey: "tags",
          title: "标签",
        },
        {
          width: 80,
          colKey: "commentsNum",
          title: "评论",
        },
        {
          width: 90,
          colKey: "visits",
          title: "访问量",
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
    this.listArticles(this.pagination);
  },
  methods: {
    listArticles(pagination = this.pagination) {
      this.isArticleListLoading = true;
      const { current, pageSize } = pagination;
      this.$request
        .get("articles?pageNum=" + current + "&pageSize=" + pageSize)
        .then((res) => {
          this.articleList = res.data.list ? res.data.list : [];
          this.pagination = {
            ...pagination,
            total: res.data.total,
          };
        })
        .catch(() => {
          this.$message.error("获取文章列表失败");
        })
        .finally(() => {
          this.isArticleListLoading = false;
        });
    },
    rehandleChange(pageInfo) {
      this.pagination.current = pageInfo.pagination.current;
      this.pagination.pageSize = pageInfo.pagination.pageSize;
      this.listArticles(this.pagination);
    },
    handleWrite() {
      this.$router.push({ name: "ArticleEdit" });
    },
    handleClickDetail(slotProps) {
      this.$router.push({
        name: "ArticleEdit",
        query: { articleID: slotProps.row.id },
      });
    },
    handleClickDelete(slotProps) {
      this.$request
        .delete("article/" + slotProps.row.id)
        .then((res) => {
          if (res.status === 0) {
            for (var i = 0; i < this.articleList.length; i++) {
              if (this.articleList[i].id === slotProps.row.id) {
                this.articleList.splice(i, 1);
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
  components: { AddIcon, PageView },
};
</script>
<style lang="less">
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
// .t-table th,
// .t-table td {
//   padding: 8px 12px;
// }
</style>