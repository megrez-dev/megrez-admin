<template>
  <div class="article-edit-container">
    <div class="article-edit-bar">
      <span class="article-edit-bar-title">{{
        article.title === "" ? "新文章" : article.title
      }}</span>
      <span class="article-edit-bar-operator">
        <span class="article-edit-bar-operator-item">
          <t-button theme="warning" variant="dashed" @click="openDrawer"
            >附件</t-button
          >
        </span>
        <span class="article-edit-bar-operator-item">
          <t-button theme="danger" variant="base" @click="saveDraft"
            >保存草稿</t-button
          >
        </span>
        <span class="article-edit-bar-operator-item">
          <t-button theme="primary" variant="base" @click="preview"
            >预览</t-button
          >
        </span>
        <span class="article-edit-bar-operator-item">
          <t-button theme="primary" variant="base" @click="publish"
            >发布</t-button
          >
        </span>
      </span>
    </div>
    <div class="article-edit-title">
      <t-input size="large" placeholder="请输入标题" v-model="article.title" />
    </div>
    <div class="vditor-container">
      <Vditor
        :originalContent="article.originalContent"
        @contentChange="onContentChange"
      ></Vditor>
    </div>
    <t-tabs defaultValue="basic">
      <t-tab-panel value="basic">
        <template #label>
          <icon name="setting" style="margin-right: 4px" /> 基本设置
        </template>
        <div class="basic-setting-form-container">
          <t-form ref="form" labelAlign="top" :colon="true">
            <t-form-item
              label="文章别名"
              name="slug"
              :help="'http://alkaidchen.com/article/' + (article.slug === '' ? '{slug}' : article.slug)"
            >
              <t-input
                v-model="article.slug"
                placeholder="不填写则会默认使用标题拼音或文章id"
              ></t-input>
            </t-form-item>
            <t-form-item label="开启评论" name="allowedComment">
              <t-switch v-model="article.allowedComment"></t-switch>
            </t-form-item>
            <t-form-item label="是否置顶" name="isTop">
              <t-switch v-model="article.isTop"></t-switch>
            </t-form-item>
            <t-divider></t-divider>
            <t-form-item label="分类" name="category">
              <div class="category-container">
                <t-radio-group v-model="article.category">
                  <t-radio
                    v-for="item in categoryOptions"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</t-radio
                  >
                </t-radio-group>
                <div class="create-category-container">
                  <div class="create-category-button-container">
                    <t-button
                      theme="primary"
                      @click="showAddCategoryForm = true"
                      v-show="!showAddCategoryForm"
                    >
                      <add-icon slot="icon" size="200px" />
                      新建
                    </t-button>
                  </div>
                  <div class="create-category-form-container">
                    <t-form
                      :data="newCategory"
                      ref="form"
                      v-show="showAddCategoryForm"
                      scrollToFirstError="smooth"
                      labelWidth="0"
                    >
                      <div class="create-category-form-item">
                        <t-form-item name="name">
                          <t-input
                            v-model="newCategory.name"
                            placeholder="分类名称"
                          ></t-input>
                        </t-form-item>
                      </div>
                      <div class="create-category-form-item">
                        <t-form-item
                          name="slug"
                          :help="'http://alkaidchen.com/category/' + (newCategory.slug === '' ? '{slug}' : newCategory.slug)"
                        >
                          <t-input
                            v-model="newCategory.slug"
                            placeholder="分类别名"
                          ></t-input>
                        </t-form-item>
                      </div>
                      <div class="create-category-form-item">
                        <t-form-item style="padding-top: 8px">
                          <t-button
                            theme="primary"
                            style="margin-right: 10px"
                            @click="submitCreateCategory"
                            >保存</t-button
                          >
                          <t-button
                            theme="default"
                            variant="base"
                            style="margin-right: 10px"
                            @click="cancelCreateCategory"
                            >取消</t-button
                          >
                        </t-form-item>
                      </div>
                    </t-form>
                  </div>
                </div>
              </div>
            </t-form-item>
            <t-divider></t-divider>
            <t-form-item label="标签" name="tags">
              <t-select
                v-model="article.tags"
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
                v-model="article.digest"
                placeholder="若不填写，将会从文章中自动截取"
                name="digest"
                :autosize="{ minRows: 6 }"
              />
            </t-form-item>
            <t-form-item label="封面图" name="cover">
              <div class="article-cover-setting">
                <div class="article-cover-preview">
                  <img
                    :src="
                      article.cover === ''
                        ? 'http://119.91.26.252:8090/images/placeholder.jpg'
                        : article.cover
                    "
                  />
                </div>
                <div class="article-cover-input">
                  <t-input
                    clearable
                    v-model="article.cover"
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
          <icon name="internet" style="margin-right: 4px" /> 高级设置
        </template>
        <div class="advanced-setting-form-container">
          <t-form ref="form" labelAlign="top" :colon="true">
            <t-form-item label="访问密码" name="password">
              <t-input
                type="password"
                v-model="article.password"
                placeholder=""
              >
              </t-input>
            </t-form-item>
            <t-form-item label="SEO 关键字" name="keywords">
              <t-select
                v-model="article.tags"
                creatable
                filterable
                multiple
                placeholder="若不填写，将使用标签作为关键字"
                :options="seoKeywordOptions"
                :minCollapsedNum="3"
                @create="createSEOKeyword"
              />
            </t-form-item>
            <t-form-item label="SEO 描述" name="description">
              <t-textarea
                v-model="article.digest"
                placeholder="若不填写，将使用摘要作为描述"
                name="digest"
                :autosize="{ minRows: 6 }"
              />
            </t-form-item>
          </t-form>
        </div>
      </t-tab-panel>
    </t-tabs>
    <t-drawer
      header="基本设置"
      :visible="attachDrawerVisible"
      size="480px"
      @cancel="attachDrawerVisible = false"
      :onOverlayClick="() => (attachDrawerVisible = false)"
      :onConfirm="() => (attachDrawerVisible = false)"
      placement="right"
    >
      <p>抽屉的内容</p>
    </t-drawer>
  </div>
</template>

<script>
import Vditor from "@/components/vditor/Vditor.vue";
import { Icon, AddIcon } from "tdesign-icons-vue";

export default {
  name: "ArticleEdit",
  data() {
    return {
      attachDrawerVisible: false,
      article: {
        title: "",
        originalContent: "",
        formatContent: "",
        slug: "",
        allowedComment: true,
        isTop: false,
        category: 1,
        tags: [],
        // TODO: 直接用这个 tag 提交会有问题，只有新增没有删除
        digest: "",
        cover: "",
        password: "",
        seoKeywords: [],
        seoDescription: "",
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
      seoKeywordOptions: [],
      showAddCategoryForm: false,
      newCategory: {
        name: "",
        slug: "",
      },
    };
  },
  methods: {
    onContentChange(originalContent, formatContent) {
      this.article.originalContent = originalContent;
      this.article.formatContent = formatContent;
      console.log(this.article.originalContent);
      console.log(this.article.formatContent);
    },
    saveDraft() {
      console.log("保存草稿");
    },
    preview() {
      console.log("预览");
    },
    openDrawer() {
      this.attachDrawerVisible = true;
    },
    publish() {
      //validate
      if (this.article.title === "") {
        this.$message.warning("文章标题不能为空");
      }
    },
    createTag(value) {
      this.tagOptions.push({
        value,
        label: value,
      });
    },
    createSEOKeyword(value) {
      this.seoKeywordOptions.push({
        value,
        label: value,
      });
    },
    submitCreateCategory() {
      this.categoryOptions.push({
        id: 5,
        name: this.newCategory.name,
      });
      this.showAddCategoryForm = false;
    },
    cancelCreateCategory() {
      this.showAddCategoryForm = false;
    },
  },
  components: { Vditor, Icon, AddIcon },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";

.article-edit-container {
  margin-top: 10px;
  .article-edit-bar {
    height: 35px;
    margin-top: 20px;
    margin-bottom: 20px;
    .article-edit-bar-title {
      font-size: 30px;
      font-weight: 1000;
      text-align: center;
      // color: @brand-color-1;
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
    .category-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      .create-category-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        .create-category-button-container {
          margin: 15px 0;
        }
        .create-category-form-container {
          width: 100%;
          margin: 15px 0;
          .create-category-form-item {
            width: 100%;
            margin: 15px 0;
          }
        }
      }
    }

    .article-cover-setting {
      width: 100%;
      display: flex;
      flex-direction: column;
      .article-cover-preview {
        width: 100%;
        cursor: pointer;
        border-radius: 4px;
        img {
          vertical-align: middle;
          width: 100%;
          border-style: none;
        }
      }
      .article-cover-input {
        margin-top: 10px;
      }
    }
  }
  .advanced-setting-form-container {
    padding: 30px 30px;
    max-width: 600px;
  }
}
</style>
