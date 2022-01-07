<template>
  <div class="layout-container">
    <t-layout>
    <t-aside width="auto">
      <Aside></Aside>
    </t-aside>
    <t-layout>
        <t-header><Header></Header></t-header>
        <t-content class="content-layout">
          <BreadCrumb></BreadCrumb>
          <PostEdit></PostEdit>
        </t-content>
        <t-footer>Footer</t-footer>
    </t-layout>
    </t-layout>
</div>
</template>

<script>
import Aside from '@/layouts/Aside.vue' 
import Header from '@/layouts/Header.vue'
import BreadCrumb from '@/layouts/BreadCrumb.vue'
import PostEdit from '@/views/article/ArticleEdit.vue'
export default {
  name: 'BasicLayout',
  components: {Aside, Header, BreadCrumb, PostEdit}
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .content-layout {
    padding: 24px;
  }
}
</style>