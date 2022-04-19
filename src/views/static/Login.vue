<template>
  <div class="login-card-container">
    <h1 style="text-align: center">Megrez</h1>
    <t-form
      :data="loginForm"
      ref="loginForm"
      labelWidth="0"
      :rules="rules"
      @submit="onSubmit"
    >
      <t-form-item name="username">
        <t-input
          v-model="loginForm.username"
          placeholder="用户名"
          @enter="handleLogin"
        >
          <user-icon slot="prefix-icon"></user-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input
          type="password"
          v-model="loginForm.password"
          placeholder="密码"
          @enter="handleLogin"
        >
          <lock-on-icon slot="prefix-icon"></lock-on-icon>
        </t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" style="width: 100%"
          >登录</t-button
        >
      </t-form-item>
      <t-divider dashed></t-divider>
    </t-form>
  </div>
</template>
<script>
import { UserIcon, LockOnIcon } from "tdesign-icons-vue";
export default {
  components: {
    UserIcon,
    LockOnIcon,
  },

  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名/邮箱不能为空" }],
        password: [{ required: true, message: "密码不能为空" }],
      },
    };
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.submit();
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$request.post("login", this.loginForm).then((res) => {
          this.$message.success("登录成功");
          this.$store.commit("SET_TOKEN", res.data);
          this.$router.push({ name: "Overview" });
        });
      } else {
        this.$message.error(firstError);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";
.login-card-container {
  box-shadow: -4px 7px 46px 2px rgb(0 0 0 / 10%);
  width: 320px;
  padding: 16px 24px;
  position: absolute;
  margin: -160px 0 0 -160px;
  top: 45%;
  left: 50%;
  background-color: @bg-color-container;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
}
</style>
