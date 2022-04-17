<template>
  <div class="links-container">
    <div class="card-container">
      <div class="card-title">
        <h2>统计</h2>
      </div>
      <div class="card-content">
          <h3>未实现</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistic",
  data() {
    return {};
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
      height: 400px;
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