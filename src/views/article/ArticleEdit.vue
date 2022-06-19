<template>
  <PageView>
    <t-row
      class="article-edit-bar"
      slot="header"
      justify="space-between"
      align="middle"
      :gutter="[0, 10]"
    >
      <t-col flex="auto">
        <h1>
          {{ article.title === '' ? '新文章' : article.title }}
        </h1>
      </t-col>
      <t-col flex="auto">
        <t-row justify="end">
          <t-button
            class="article-edit-bar-operator-item"
            theme="warning"
            variant="dashed"
            @click="openAttachesSelectDrawer"
          >
            附件
          </t-button>
          <t-button
            class="article-edit-bar-operator-item"
            :loading="saving"
            :disabled="publishing"
            theme="danger"
            variant="base"
            @click="saveDraft"
          >
            {{ article.status != 1 ? '存为草稿' : '保存草稿' }}
          </t-button>
          <t-button
            class="article-edit-bar-operator-item"
            theme="primary"
            variant="base"
            :loading="publishing"
            :disabled="saving"
            @click="handlePublish"
          >
            {{ editMode === 1 && article.status === 0 ? '更新' : '发布' }}
          </t-button>
        </t-row>
      </t-col>
    </t-row>
    <div class="article-edit-container" slot="content">
      <div class="article-edit-title">
        <t-input size="large" placeholder="请输入标题" v-model="article.title" />
      </div>
      <div class="vditor-container">
        <Vditor ref="vditor" v-model="article.originalContent" :loading="articleLoading" @countWord="countWord"></Vditor>
      </div>
      <t-tabs defaultValue="basic">
        <t-tab-panel value="basic">
          <template #label> <icon name="setting" style="margin-right: 4px" /> 基本设置 </template>
          <t-form class="form-container" ref="form" labelAlign="top" colon>
            <t-row :gutter="[20, 20]" align="middle">
              <t-col :span="4">
                <t-form-item
                  label="文章别名"
                  name="slug"
                  :help="`${origin}/article/${article.slug || '{slug}'}`"
                >
                  <t-input
                    v-model="article.slug"
                    placeholder="不填写则会默认使用标题拼音或文章id"
                  ></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="2">
                <t-form-item label="开启评论" name="allowedComment" labelAlign="left">
                  <t-switch v-model="article.allowedComment"></t-switch>
                </t-form-item>
              </t-col>
              <t-col :span="2">
                <t-form-item label="是否置顶" name="isTop" labelAlign="left">
                  <t-switch v-model="article.isTop"></t-switch>
                </t-form-item>
              </t-col>
            </t-row>
            <t-divider></t-divider>
            <t-row :gutter="[20, 20]">
              <t-col :span="4">
                <t-form-item label="分类" name="categories">
                  <t-select
                    v-model="article.categories"
                    filterable
                    multiple
                    :minCollapsedNum="5"
                    :options="categoryOptions"
                  />
                  <t-button theme="primary" @click="triggerAddCategoryForm(true)">
                    新建分类
                  </t-button>
                </t-form-item>
                <t-dialog
                  :visible="showAddCategoryForm"
                  header="新建分类"
                  @close="triggerAddCategoryForm(false)"
                  @confirm="handleCreateCategory"
                >
                  <t-form :data="newCategory" labelAlign="top" colon>
                    <t-form-item label="分类名称" name="name">
                      <t-input v-model="newCategory.name" placeholder="分类名称"></t-input>
                    </t-form-item>
                    <t-form-item
                      label="分类别名"
                      name="slug"
                      :help="`${origin}/category/${newCategory.slug || '{slug}'}`"
                    >
                      <t-input v-model="newCategory.slug" placeholder="分类别名"></t-input>
                    </t-form-item>
                  </t-form>
                </t-dialog>
              </t-col>
              <t-col :span="4">
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
              </t-col>
            </t-row>
            <t-divider></t-divider>
            <t-row :gutter="[20, 20]">
              <t-col :span="4">
                <t-form-item label="摘要" name="summary">
                  <t-textarea
                    v-model="article.summary"
                    placeholder="若不填写，将会从文章中自动截取"
                    name="summary"
                    :autosize="{ minRows: 6 }"
                  />
                </t-form-item>
              </t-col>
              <t-col :span="4">
                <t-form-item label="封面图" name="cover">
                  <t-input
                    clearable
                    block
                    v-model="article.cover"
                    placeholder="点击封面选择图片，或者输入外部链接"
                  ></t-input>
                  <div class="article-cover">
                    <img @click="openCoverSelectDrawer" :src="coverUrl"/>
                  </div>
                </t-form-item>
              </t-col>
            </t-row>
          </t-form>
        </t-tab-panel>
        <t-tab-panel value="advanced">
          <template #label> <icon name="internet" style="margin-right: 4px" /> 高级设置 </template>
          <t-form class="form-container" ref="form" labelAlign="top" :colon="true">
            <t-row :gutter="10">
              <t-col :span="3">
                <t-form-item label="访问密码" name="password">
                  <t-input type="password" v-model="article.password" placeholder=""> </t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
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
              </t-col>
              <t-col :span="9">
                <t-form-item label="SEO 描述" name="description">
                  <t-textarea
                    v-model="article.seoDescription"
                    placeholder="若不填写，将使用摘要作为描述"
                    name="seoDescription"
                    :autosize="{ minRows: 6 }"
                  />
                </t-form-item>
              </t-col>
            </t-row>
          </t-form>
        </t-tab-panel>
      </t-tabs>
      <AttachSelectDrawer
        ref="attachesSelectDrawer"
        mode="multiple"
        @select="handleAttachSelect"
      ></AttachSelectDrawer>
      <AttachSelectDrawer
        ref="coverSelectDrawer"
        mode="single"
        @select="handleCoverSelect"
      ></AttachSelectDrawer>
    </div>
  </PageView>
</template>

<script>
import Vditor from '@/views/article/components/Vditor.vue';
import AttachSelectDrawer from '@/components/attachment/AttachSelectDrawer.vue';
import PageView from '@/layouts/PageView';
import { Icon } from 'tdesign-icons-vue';
import { editMode, defaultCoverUrl } from '@/views/article/constants';

export default {
  name: 'ArticleEdit',
  components: { Vditor, AttachSelectDrawer, Icon, PageView },
  data() {
    return {
      articleLoading: true,
      origin: location.origin,
      publishing: false, // 表示正在上传或正在更新
      saving: false, // 表示正在存草稿
      article: {
        title: '',
        originalContent: ' ',
        formatContent: '',
        slug: '',
        allowedComment: true,
        isTop: false,
        categories: [],
        tags: [],
        summary: '',
        cover: '',
        password: '',
        wordCount: 0,
        seoKeywords: [],
        seoDescription: '',
        status: 0,
      },
      categoryOptions: [],
      tagOptions: [],
      seoKeywordOptions: [],
      showAddCategoryForm: false,
      newCategory: {
        name: '',
        slug: '',
      },
    };
  },
  watch: {
    // 在文章编辑页跳转，只改变路由参数而不改变路由时，也需要更新默认的文章
    $route() {
      this.initData();
      this.setDefultArticle();
    },
  },
  computed: {
    articleID() {
      return this.$route.query.articleID;
    },
    editMode() {
      return this.articleID === undefined ? editMode.CREATE : editMode.EDIT;
    },
    coverUrl() {
      return this.article.cover || defaultCoverUrl;
    },
  },
  methods: {
    initData() {
      this.publishing = false;
      this.saving = false;
      this.article = {
        title: '',
        originalContent: ' ', // 如果初始化时value为空或undefined，vditor会给一个默认值。
        formatContent: '',
        slug: '',
        allowedComment: true,
        isTop: false,
        categories: [],
        tags: [],
        summary: '',
        cover: '',
        password: '',
        wordCount: 0,
        seoKeywords: [],
        seoDescription: '',
        status: 0,
      };
      this.categoryOptions = [];
      this.tagOptions = [];
      this.seoKeywordOptions = [];
      this.showAddCategoryForm = false;
      this.newCategory = {
        name: '',
        slug: '',
      };
    },
    // get article from server
    setDefultArticle() {
      this.articleLoading = true;
      if (!this.articleID) {
        this.articleLoading = false;
        this.$nextTick(() => {
          this.$refs.vditor.initViditor();
        });
        return;
      }
      this.$request
        .get(`article/${this.articleID}`)
        .then((res) => {
          this.article = res.data;
          this.articleLoading = false;
          // 由于data的更新是异步的，所以需要在nextTick中执行，确保获取到最新的article
          this.$nextTick(() => {
            this.$refs.vditor.initViditor();
          });
        })
        .catch(() => {
          this.$message.warning('获取文章详情失败');
        });
    },
    // get word count from sub component Vditor
    countWord(length) {
      this.article.wordCount = length;
    },
    getFormatContent() {
      return this.$refs.vditor.contentEditor.getHTML();
    },
    saveDraft() {
      //validate
      if (this.article.title === '') {
        this.$message.warning('文章标题不能为空');
        return;
      }
      this.saving = true;
      this.article.formatContent = this.getFormatContent();
      this.article.status = 1;
      if (this.editMode === editMode.CREATE) {
        this.$request
          .post('article', this.article)
          .then((res) => {
            if (res.status === 0) {
              this.$message.success('保存成功');
              this.$router.push({ name: 'ArticleList' });
            }
          })
          .catch(() => {
            this.$message.warning('保存失败');
          })
          .finally(() => {
            this.saving = false;
          });
      } else {
        this.$request
          .put('article/' + this.article.id, this.article)
          .then((res) => {
            if (res.status === 0) {
              this.$message.success('保存成功');
              this.$router.push({ name: 'ArticleList' });
            }
          })
          .catch(() => {
            this.$message.warning('保存失败');
          })
          .finally(() => {
            this.saving = false;
          });
      }
    },
    handlePublish() {
      //validate
      if (this.article.title === '') {
        this.$message.warning('文章标题不能为空');
        return;
      }
      this.publishing = true;
      this.article.formatContent = this.getFormatContent();
      this.article.status = 0;
      // create
      if (this.editMode === editMode.CREATE) {
        this.$request
          .post('article', this.article)
          .then((res) => {
            if (res.status === 0) {
              this.$message.success('发布成功');
              this.$router.push({ name: 'ArticleList' });
            }
          })
          .catch(() => {
            this.$message.warning('发布失败');
          })
          .finally(() => {
            this.publishing = false;
          });
      } else {
        // edit
        this.$request
          .put('article/' + this.article.id, this.article)
          .then((res) => {
            if (res.status === 0) {
              this.$message.success('更新成功');
              this.$router.push({ name: 'ArticleList' });
            }
          })
          .catch(() => {
            this.$message.warning('更新失败');
          })
          .finally(() => {
            this.publishing = false;
          });
      }
    },
    triggerAddCategoryForm(ifShow = false) {
      this.showAddCategoryForm = ifShow;
    },
    openAttachesSelectDrawer() {
      this.$refs.attachesSelectDrawer.open();
    },
    openCoverSelectDrawer() {
      this.$refs.coverSelectDrawer.open();
    },
    handleCreateCategory() {
      // remove whitespace
      this.newCategory.name = this.newCategory.name.replace(/\s*/g, '');
      this.newCategory.slug = this.newCategory.slug.replace(/\s*/g, '');
      if (this.newCategory.name === '') {
        this.$message.warning('分类名称不能为空');
        return;
      }
      if (this.newCategory.slug === '') {
        this.$message.warning('分类别名不能为空');
        return;
      }
      this.$request
        .post('category', this.newCategory)
        .then((res) => {
          if (res.status === 0) {
            this.$message.success('创建分类成功');
            this.categoryOptions.unshift({
              value: res.data.id,
              label: res.data.name,
            });
            this.cancelCreateCategory();
          }
        })
        .catch(() => {
          this.$message.warning('创建分类失败');
        });
    },
    cancelCreateCategory() {
      this.newCategory.name = '';
      this.newCategory.slug = '';
      this.showAddCategoryForm = false;
    },
    handleCreateTag(value) {
      value = value.replace(/\s*/g, '');
      if (value === '') {
        this.$message.warning('标签不能为空');
        return;
      }
      var newTag = {
        name: value,
        slug: value,
      };
      this.$request
        .post('tag', newTag)
        .then((res) => {
          this.$message.success('创建标签成功');
          this.tagOptions.push({
            value: res.data.id,
            label: res.data.name,
          });
          this.article.tags.splice(this.article.tags.indexOf(value), 1);
          this.article.tags.push(res.data.id);
        })
        .catch(() => {
          this.article.tags.splice(this.article.tags.indexOf(value), 1);
          this.$message.error('创建标签失败');
        });
    },
    createSEOKeyword(value) {
      this.seoKeywordOptions.push({
        value,
        label: value,
      });
    },
    handleAttachSelect(attaches) {
      this.$refs.vditor.append('\n');
      this.$refs.vditor.append(
        attaches
          .map((attach) => {
            return `![${attach.fileName}](${attach.url})`;
          })
          .join('\n')
      );
      this.$refs.vditor.append('\n');
    },
    handleCoverSelect(attach) {
      this.article.cover = attach.url;
    },
  },

  mounted() {
    // list categories
    this.$request.get('categories').then((res) => {
      res.data.forEach((category) => {
        this.categoryOptions.push({
          value: category.id,
          label: category.name,
        });
      });
    });

    // list tags
    this.$request.get('tags').then((res) => {
      res.data.forEach((tag) => {
        this.tagOptions.push({
          value: tag.id,
          label: tag.name,
        });
      });
    });
    this.setDefultArticle();
  },
};
</script>

<style lang="less" scoped>
.article-edit-container {
  .article-edit-title {
    margin-bottom: 20px;
  }
  .vditor-container {
    background-color: var(--td-bg-color-container);
    margin-bottom: 20px;
  }
  .form-container {
    padding: 30px 30px;
  }
}
.article-edit-bar {
  margin-bottom: 10px;
}
</style>
