<template>
  <div class="article-edit-container">
    <div class="article-edit-bar">
      <span class="article-edit-bar-title">{{
        articleTitle === "" ? "新文章" : articleTitle
      }}</span>
      <span class="article-edit-bar-operator">
        <span class="article-edit-bar-operator-item">
          <t-button theme="warning" variant="base" @click="saveDraft"
            >保存草稿</t-button
          >
        </span>
        <span class="article-edit-bar-operator-item">
          <t-button theme="primary" variant="base" @click="preview"
            >预览</t-button
          >
        </span>
        <span class="article-edit-bar-operator-item">
          <t-button theme="primary" variant="base" @click="openDrawer"
            >发布</t-button
          >
        </span>
      </span>
    </div>
    <div class="article-edit-title">
      <t-input size="large" placeholder="请输入标题" v-model="articleTitle" />
    </div>
    <div class="vditor-container">
      <Vditor></Vditor>
    </div>
    <div class="tdesign-demo-block-column-large">
      <t-tabs
        :value="settingTab"
        @change="(newValue) => (settingTab = newValue)"
      >
        <t-tab-panel value="basic">
          <template #label>
            <icon name="home" style="margin-right: 4px" /> 基本设置
          </template>
          <div class="basic-setting-form-container">
            <t-form
              :data="basicSetting"
              ref="form"
              labelAlign="top"
              :colon="true"
            >
              <t-form-item label="文章别名" name="slug">
                <t-input
                  v-model="basicSetting.slug"
                  placeholder="TODO 默认别名"
                ></t-input>
              </t-form-item>
              <t-form-item label="开启评论" name="allowedComment">
                <t-switch v-model="basicSetting.allowedComment"></t-switch>
              </t-form-item>
              <t-form-item label="是否置顶" name="isTop">
                <t-switch v-model="basicSetting.isTop"></t-switch>
              </t-form-item>
              <t-form-item label="分类" name="category">
                <t-radio-group v-model="basicSetting.category">
                  <t-radio
                    v-for="item in categoryOptions"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</t-radio
                  >
                </t-radio-group>
              </t-form-item>
              <t-form-item label="标签" name="tags">
                <t-select
                  v-model="basicSetting.tags"
                  creatable
                  filterable
                  multiple
                  :minCollapsedNum="3"
                  :options="tagOptions"
                  @create="createTag"
                />
              </t-form-item>
              <t-form-item label="摘要" name="digest">
                <t-textarea
                  v-model="basicSetting.digest"
                  placeholder="若不填写，将会从文章中自动截取"
                  name="digest"
                  :autosize="{ minRows: 5 }"
                />
              </t-form-item>
              <t-form-item label="封面图" name="cover">
                <div class="article-cover-setting">
                  <div class="article-cover-preview">
                    <img
                      :src="
                        basicSetting.cover === ''
                          ? 'http://119.91.26.252:8090/images/placeholder.jpg'
                          : basicSetting.cover
                      "
                    />
                  </div>
                  <div class="article-cover-input">
                    <t-input
                      clearable
                      v-model="basicSetting.cover"
                      placeholder="点击封面选择图片，或者输入外部链接"
                    ></t-input>
                  </div>
                </div>
              </t-form-item>
            </t-form>
          </div>
        </t-tab-panel>
        <t-tab-panel value="advanced">
          <template #label>
            <icon name="calendar" style="margin-right: 4px" /> 高级设置
          </template>
          <p style="padding: 25px">日程的内容</p>
        </t-tab-panel>
      </t-tabs>
    </div>
    <t-drawer
      header="基本设置"
      :visible="drawerVisible"
      size="480px"
      @cancel="drawerVisible = false"
      :onOverlayClick="() => (drawerVisible = false)"
      :onConfirm="() => (drawerVisible = false)"
      placement="right"
    >
      <p>抽屉的内容</p>
    </t-drawer>
  </div>
</template>

<script>
import Vditor from "@/components/vditor/Vditor.vue";
import { Icon } from "tdesign-icons-vue";

export default {
  name: "PostEdit",
  data() {
    return {
      articleTitle: "",
      drawerVisible: false,
      settingTab: "basic",
      basicSetting: {
        slug: "",
        allowedComment: true,
        isTop: false,
        category: 1,
        tags: [],
        digest: "",
        cover: "",
      },
      categoryOptions: [
        {
          id: 1,
          name: "默认分类",
        },
        {
          id: 2,
          name: "LeetCode",
        },
        {
          id: 3,
          name: "Kubernetes",
        },
      ],
      tagOptions: [
        { label: "Kubernetes", value: "Kubernetes" },
        { label: "Docker", value: "Docker" },
        { label: "LeetCode", value: "LeetCode" },
        { label: "中文1", value: "中文1" },
        { label: "中文2", value: "中文2" },
      ],
    };
  },
  methods: {
    saveDraft() {
      console.log("保存草稿");
    },
    preview() {
      console.log("预览");
    },
    openDrawer() {
      this.drawerVisible = true;
    },
    createTag(value) {
      this.tagOptions.push({
        value,
        label: value,
      });
    },
  },
  components: { Vditor, Icon },
};
</script>

<style lang="less" scoped>
.article-edit-container {
  margin-top: 10px;
  .article-edit-bar {
    height: 35px;
    margin-top: 20px;
    margin-bottom: 20px;
    .article-edit-bar-title {
      font-size: 30px;
      font-weight: 1500;
      text-align: center;
    }
    .article-edit-bar-operator {
      float: right;
      .article-edit-bar-operator-item {
        margin-left: 15px;
      }
    }
  }

  .article-edit-title {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .vditor-container {
    margin-bottom: 20px;
  }
  .basic-setting-form-container {
    padding: 30px 30px;
    max-width: 600px;
    .article-cover-setting {
      width: 100%;
      display: flex;
      flex-direction: column;
      .article-cover-preview {
        // height: 360px;
        width: 100%;
        cursor: pointer;
        border-radius: 4px;
        padding: auto;
        img {
          // vertical-align: middle;
          width: 100%;
          border-style: none;
        }
      }
      .article-cover-input {
        margin-top: 10px;
      }
    }
  }
}
</style>
