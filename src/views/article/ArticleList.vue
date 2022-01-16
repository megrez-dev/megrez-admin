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
        :data="data"
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
            <a class="t-button-link" @click="handleClickRecyle(slotProps)">回收站</a>
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
      data: [],
      isArticleListLoading: false,
      columns: [
        {
          width: 200,
          colKey: "name",
          title: "姓名",
          render(h, { row: { name } }) {
            return name ? `${name.first} ${name.last}` : "UNKNOW_USER";
          },
        },
        {
          width: 200,
          colKey: "gender",
          title: "性别",
        },
        {
          width: 200,
          colKey: "phone",
          title: "联系方式",
          render(h, { row: { phone } }) {
            return phone;
          },
        },
        {
          width: 260,
          colKey: "email",
          title: "邮箱",
        },
        {
          fixed: 'right',
          width: 200,
          colKey: 'op',
          title: '操作',
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
  async mounted() {
    await this.fetchData(this.pagination);
  },
  methods: {
    async fetchData(pagination = this.pagination) {
      try {
        this.isArticleListLoading = true;
        const { current, pageSize } = pagination;
        // 请求可能存在跨域问题
        const url = new URL("https://randomuser.me/api");
        const params = { page: current, results: pageSize };
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
        const response = await fetch(url).then((x) => x.json());
        this.data = response.results;
        this.pagination = {
          ...pagination,
          total: 120,
        };
      } catch (err) {
        this.data = [];
      }
      this.isArticleListLoading = false;
    },
    // 也可以使用 page-change 事件
    async rehandleChange(changeParams, triggerAndData) {
      console.log(
        "分页、排序、过滤等发生变化时会触发 change 事件：",
        changeParams,
        triggerAndData
      );
      const { current, pageSize } = changeParams.pagination;
      const pagination = { current, pageSize };
      await this.fetchData(pagination);
    },
  },
  components: {AddIcon}
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
        transition: color .2s cubic-bezier(.38,0,.24,1);
    }
  }
}
</style>