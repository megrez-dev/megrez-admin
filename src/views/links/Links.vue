<template>
  <div class="links-container">
    <t-row>
      <t-col :flex="'39%'">
        <div class="card-container">
          <div class="card-title">
            <h2>添加友链</h2>
          </div>
          <div class="card-content">
            <t-form
              :data="formData"
              ref="form"
              @reset="onReset"
              @submit="onSubmit"
              labelAlign="top"
              :colon="true"
            >
              <t-form-item label="姓名" name="name">
                <t-input
                  v-model="formData.name"
                  placeholder="请输入内容"
                ></t-input>
              </t-form-item>
              <t-form-item label="手机号码" name="tel">
                <t-input
                  v-model="formData.tel"
                  placeholder="请输入内容"
                ></t-input>
              </t-form-item>
              <t-form-item label="接收短信" name="status">
                <t-switch v-model="formData.status"></t-switch>
              </t-form-item>
              <t-form-item label="性别" name="gender">
                <t-radio-group v-model="formData.gender">
                  <t-radio value="1">男</t-radio>
                  <t-radio value="2">女</t-radio>
                </t-radio-group>
              </t-form-item>
              <t-form-item label="课程" name="course">
                <t-checkbox-group
                  v-model="formData.course"
                  :options="courseOptions"
                ></t-checkbox-group>
              </t-form-item>
              <t-form-item>
                <t-button
                  theme="primary"
                  type="submit"
                  style="margin-right: 10px"
                  >提交</t-button
                >
                <t-button theme="default" variant="base" type="reset"
                  >重置</t-button
                >
              </t-form-item>
            </t-form>
          </div>
        </div>
      </t-col>
      <t-col :flex="'1%'"> </t-col>
      <t-col :flex="'60%'">
        <div class="card-container">
          <div class="card-title">
            <h2>所有友链</h2>
          </div>
          <div class="card-content">
            <t-table
              :data="data"
              :columns="columns"
              :rowKey="rowKey"
              :verticalAlign="verticalAlign"
              :loading="isLoading"
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
      </t-col>
    </t-row>
  </div>
</template>

<script>
const INITIAL_DATA = {
  name: "",
  tel: "",
  gender: "",
  course: [],
  status: false,
};

export default {
    name: 'Links',
  data() {
    return {
      formData: { ...INITIAL_DATA },
      courseOptions: [
        { label: "语文", value: "1" },
        { label: "数学", value: "2" },
        { label: "英语", value: "3" },
      ],
      // right
      data: [],
      isLoading: false,
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
  async mounted() {
    await this.fetchData(this.pagination);
  },

  methods: {
    onReset() {
      this.$message.success("重置成功");
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success("提交成功");
      } else {
        console.log("Errors: ", validateResult);
        this.$message.warning(firstError);
      }
    },
    async fetchData(pagination = this.pagination) {
      try {
        this.isLoading = true;
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
      this.isLoading = false;
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
    handleClickDetail() {
        this.$notification.success({title:'标题', content:'这是一条成功内容'});
    }
  },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";
.links-container {
  margin-top: 10px;
  .card-container {
    padding: 0 0 24px 0;
    margin-right: 10px;
    background-color: @bg-color-container;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .card-title {
      padding: 0 32px;
      border-bottom: 1px solid @border-level-1-color;
    }
    .card-content {
      padding: 24px 32px 0;
    }
  }
}

.t-button-link {
  color: @brand-color;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s cubic-bezier(0.38, 0, 0.24, 1);
}
</style>