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
          <t-button theme="primary" variant="base" @click="handlePublish"
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
        @countWord="countWord"
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
              :help="
                'http://alkaidchen.com/article/' +
                (article.slug === '' ? '{slug}' : article.slug)
              "
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
                <t-checkbox-group
                  v-model="article.categories"
                  :options="categoryOptions"
                ></t-checkbox-group>
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
                          :help="
                            'http://alkaidchen.com/category/' +
                            (newCategory.slug === ''
                              ? '{slug}'
                              : newCategory.slug)
                          "
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
                            @click="handleCreateCategory"
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
                @create="handleCreateTag"
              />
            </t-form-item>
            <t-form-item label="摘要" name="summary">
              <t-textarea
                v-model="article.summary"
                placeholder="若不填写，将会从文章中自动截取"
                name="summary"
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
                v-model="article.seoKeywords"
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
                v-model="article.seoDescription"
                placeholder="若不填写，将使用摘要作为描述"
                name="seoDescription"
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
        categories: [],
        tags: [],
        summary: "",
        cover: "",
        password: "",
        wordCount: 0,
        seoKeywords: [],
        seoDescription: "",
        status: 0,
      },
      categoryOptions: [],
      tagOptions: [],
      seoKeywordOptions: [],
      showAddCategoryForm: false,
      newCategory: {
        name: "",
        slug: "",
      },
    };
  },
  methods: {
    // get content from sub component Vditor
    onContentChange(originalContent, formatContent) {
      this.article.originalContent = originalContent;
      this.article.formatContent = formatContent;
    },
    // get word count from sub component Vditor
    countWord(length) {
      this.article.wordCount = length;
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
    handlePublish() {
      //validate
      if (this.article.title === "") {
        this.$message.warning("文章标题不能为空");
        return;
      }
      this.$request
        .post("article", this.article)
        .then((res) => {
          if (res.status === 0) {
            this.$message.success("发布成功");
            this.$router.push({ name: "ArticleList" });
          }
        })
        .catch(() => {
          this.$message.warning("发布失败");
        });
    },
    handleCreateCategory() {
      // remove whitespace
      this.newCategory.name = this.newCategory.name.replace(/\s*/g, "");
      this.newCategory.slug = this.newCategory.slug.replace(/\s*/g, "");
      if (this.newCategory.name === "") {
        this.$message.warning("分类名称不能为空");
        return;
      }
      if (this.newCategory.slug === "") {
        this.$message.warning("分类别名不能为空");
        return;
      }
      this.$request
        .post("category", this.newCategory)
        .then((res) => {
          if (res.status === 0) {
            this.$message.success("创建分类成功");
            this.categoryOptions.push({
              value: res.data.id,
              label: res.data.name,
            });
            this.cancelCreateCategory();
          }
        })
        .catch(() => {
          this.$message.warning("创建分类失败");
        });
    },
    cancelCreateCategory() {
      this.newCategory.name = "";
      this.newCategory.slug = "";
      this.showAddCategoryForm = false;
    },
    handleCreateTag(value) {
      value = value.replace(/\s*/g, "");
      if (value === "") {
        this.$message.warning("标签不能为空");
        return;
      }
      var newTag = {
        name: value,
        slug: value,
      };
      this.$request
        .post("tag", newTag)
        .then((res) => {
          this.$message.success("创建标签成功");
          this.tagOptions.push({
            value: res.data.id,
            label: res.data.name,
          });
        })
        .catch(() => {
          this.article.tags.splice(this.article.tags.indexOf(value), 1);
          this.$message.success("创建标签失败");
        });
    },
    createSEOKeyword(value) {
      this.seoKeywordOptions.push({
        value,
        label: value,
      });
    },
  },
  components: { Vditor, Icon, AddIcon },
  mounted() {
    // list categories
    this.$request.get("categories").then((res) => {
      res.data.forEach((category) => {
        this.categoryOptions.push({
          value: category.id,
          label: category.name,
        });
      });
    });

    // list tags
    this.$request.get("tags").then((res) => {
      res.data.forEach((tag) => {
        this.tagOptions.push({
          value: tag.id,
          label: tag.name,
        });
      });
    });
  },
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
