<template>
  <t-tabs>
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
                      <t-form-item>
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
            <t-input type="password" v-model="article.password" placeholder="">
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
</template>
<script>
export default {
  data() {
    return {
      themeConfig: {
        tabs: [],
      },
    };
  },
  beforeMount() {
    this.$request.get("/theme/config").then((res) => {
      this.themeConfig = res.data;
    });
  },
};
</script>

<style>
</style>