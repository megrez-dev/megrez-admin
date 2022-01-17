<template>
  <div class="article-list-container">
    <div class="card-container">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button>
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
          <a class="t-button-link" @click="handleClickDetail()">编辑</a>
          <t-divider layout="vertical" />
          <a class="t-button-link" @click="handleClickRecyle(slotProps)"
            >回收站</a
          >
        </template>
      </t-table>
    </div>
  </div>
</template>

<script>
import { AddIcon } from "tdesign-icons-vue";

export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      isArticleListLoading: false,
      columns: [
        {
          width: 200,
          colKey: "title",
          title: "标题",
          render(h, { row: { title } }) {
            return title;
          },
        },
        {
          width: 200,
          colKey: "status",
          title: "状态",
        },
        {
          width: 200,
          colKey: "categories",
          title: "分类",
          render(h, { row: { categories } }) {
            var categoriesStr = ''
            categories.forEach(category => {
              if (categoriesStr === '') {
                categoriesStr = category.name
              }else {
                categoriesStr = categoriesStr + "," + category.name
              }
            });
            return categoriesStr;
          },
        },
        {
          width: 200,
          colKey: "tags",
          title: "标签",
          render(h, { row: { tags } }) {
            var tagsStr = ''
            tags.forEach(tag => {
              if (tagsStr === '') {
                tagsStr = tag.name
              }else {
                tagsStr = tagsStr + "," + tag.name
              }
            });
            return tagsStr;
          },
        },
        {
          width: 200,
          colKey: "comments",
          title: "评论",
        },
        {
          width: 200,
          colKey: "visits",
          title: "访问量",
        },
        {
          width: 200,
          colKey: "publishTime",
          title: "发布时间",
        },
        {
          fixed: "right",
          width: 200,
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
          console.log(res.data)
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
    handleClickDetail(slotProps) {
      console.log("slogProps", slotProps)
      console.log("编辑");
    },
    handleClickRecyle(slotProps) {
      console.log("slogProps", slotProps)
      console.log("回收站")
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