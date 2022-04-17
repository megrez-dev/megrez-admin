<template>
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
        :rowKey="rowKey"
        :verticalAlign="verticalAlign"
        :loading="isArticleListLoading"
        :pagination="pagination"
        @change="rehandleChange"
      >
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

<script>
import { AddIcon } from "tdesign-icons-vue";
import { timeAgo } from "@/utils/datetime.js";

export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      isArticleListLoading: false,
      columns: [
        {
          // width: 200,
          colKey: "title",
          title: "标题",
          cell(h, { row: { title } }) {
            return title;
          },
        },
        {
          // width: 100,
          colKey: "status",
          title: "状态",
          cell(h, { row: { status } }) {
            if (status === 0) {
              return "已发布";
            }
            if (status === 1) {
              return "草稿";
            }
            return "未知";
          },
        },
        {
          // width: 200,
          colKey: "categories",
          title: "分类",
          cell(h, {  row: { categories } }) {
            return categories.map(({ name }) => name).join(",");
          },
        },
        {
          // width: 200,
          colKey: "tags",
          title: "标签",
          cell(h, {  row: { tags } }) {
             return tags.map(({ name }) => name).join(",");
            },
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
      rowKey: "property",
      tableLayout: "auto",
      verticalAlign: "top",
      rowClassName: "property-class",
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
          console.log(res.data);
          this.articleList = res.data.list;
          this.pagination = {
            ...pagination,
            total: res.data.total,
          };
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isArticleListLoading = false;
        });
    },
    rehandleChange(pageInfo) {
      console.log("pageInfo", pageInfo);
      this.pagination.current = pageInfo.pagination.current;
      this.pagination.pageSize = pageInfo.pagination.pageSize;
      this.listArticles(this.pagination);
    },
    handleWrite() {
      this.$router.push({ name: "ArticleEdit" });
    },
    handleClickDetail(slotProps) {
      console.log("slogProps", slotProps);
      this.$router.push({
        name: "ArticleEdit",
        query: { articleID: slotProps.row.id },
      });
      console.log("编辑");
    },
    handleClickDelete(slotProps) {
      this.$request
        .delete("article/" + slotProps.row.id)
        .then((res) => {
          if (res.status === 0) {
            for(var i=0;i<this.articleList.length;i++){
              if(this.articleList[i].id === slotProps.row.id){
                this.articleList.splice(i,1);
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
  components: { AddIcon },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";

.article-list-container {
  margin-top: 10px;
  .card-container {
    padding: 24px 32px;
    background-color: @bg-color-container;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .left-operation-container {
      padding: 0 0 6px 0;
      margin-bottom: 16px;
    }
    .t-button-link {
      color: @brand-color;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.38, 0, 0.24, 1);
    }
  }
}
</style>