<template>
  <div class="install-card-container">
    <t-form
      :data="installForm"
      labelWidth="0"
      :rules="rules"
      @submit="onSubmit"
    >
      <t-divider align="left" dashed
        ><div style="font-size: 18px; font-weight: 400">
          管理员信息
        </div></t-divider
      >
      <t-form-item name="username">
        <t-input v-model="installForm.username" placeholder="用户名">
          <user-icon slot="prefix-icon"></user-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="nickname">
        <t-input v-model="installForm.nickname" placeholder="昵称">
          <user-icon slot="prefix-icon"></user-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input
          type="password"
          v-model="installForm.password"
          placeholder="密码"
        >
          <lock-on-icon slot="prefix-icon"></lock-on-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="confirmPassword">
        <t-input
          type="password"
          v-model="installForm.confirmPassword"
          placeholder="确认密码"
        >
          <lock-on-icon slot="prefix-icon"></lock-on-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="email">
        <t-input v-model="installForm.email" placeholder="邮箱">
          <mail-icon slot="prefix-icon"></mail-icon>
        </t-input>
      </t-form-item>
      <t-divider align="left" dashed
        ><div style="font-size: 18px; font-weight: 400">
          网站信息
        </div></t-divider
      >
      <t-form-item name="blogURL">
        <t-input v-model="installForm.blogURL" placeholder="博客 URL">
          <link-icon slot="prefix-icon"></link-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="blogTitle">
        <t-input v-model="installForm.blogTitle" placeholder="博客标题">
          <books-icon slot="prefix-icon"></books-icon>
        </t-input>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px"
          >提交</t-button
        >
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import {
  UserIcon,
  LockOnIcon,
  MailIcon,
  LinkIcon,
  BooksIcon,
} from "tdesign-icons-vue";
export default {
  components: {
    UserIcon,
    LockOnIcon,
    MailIcon,
    LinkIcon,
    BooksIcon,
  },

  data() {
    return {
      installForm: {
        username: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        email: "",
        blogURL: "",
        blogTitle: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        nickname: [{ required: true, message: "请输入用户昵称" }],
        email: [{ email: true, message: "请输入正确的邮箱" }],
        password: [
          {
            validator: (val) => val.length >= 5 && val.length <= 30,
            message: "密码长度必须在 5 到 30 个字符之间",
          },
        ],
        confirmPassword: [
          {
            validator: (val) => this.installForm.password === val,
            message: "两次密码不一致",
          },
        ],
        blogURL: [
          {
            validator: (val) => {
              return val.startsWith("http://") || val.startsWith("https://");
            },
            message: "请输入正确的网址",
          },
        ],
        blogTitle: [{ required: true, message: "请输入博客标题" }],
      },
    };
  },

  methods: {
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$request
        .post("install", this.installForm)
        .then(() => {
          this.$message.success("安装成功");
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          this.$message.error("安装失败");
        });
      } else {
        this.$message.warning(firstError);
      }
    },
  },

  mounted() {
    this.installForm.blogURL =
      window.location.protocol + "//" + window.location.host;
  },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";
.install-card-container {
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  max-width: 600px;
  padding: 24px 32px;
  margin: 50px auto;
  background-color: @bg-color-container;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
</style>
