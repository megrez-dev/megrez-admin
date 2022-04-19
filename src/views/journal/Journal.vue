<template>
  <div class="article-list-container">
    <div class="card-container">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button>
            <add-icon slot="icon" />
            写日志
          </t-button>
        </div>
      </t-row>
      <t-list :split="true">
        <t-list-item v-for="(item, index) in commentsData" :key="index">
          <template #content>
            <t-comment
              :avatar="item.avatar"
              :author="item.author"
              :datetime="item.datetime"
              :content="item.content"
            >
              <template #actions>
                <span key="thumbUp">
                  <icon name="thumb-up" />
                  <span class="action-text">6</span>
                </span>
                <span key="chat">
                  <icon name="chat" />
                  <span class="action-text">回复</span>
                </span>
              </template>
            </t-comment>
          </template>
        </t-list-item>
      </t-list>
    </div>
  </div>
</template>

<script>
import { AddIcon } from "tdesign-icons-vue";
import { Icon } from 'tdesign-icons-vue';

export default {
  name: 'Journal',
  components: {
    Icon,AddIcon
  },
  data() {
    return {
      commentsData: [
        {
          id: 'A',
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          author: '评论作者名A',
          datetime: '今天16:38',
          content: '评论作者名A写的评论内容。',
        },
        {
          id: 'B',
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          author: '评论作者名B',
          datetime: '今天16:38',
          content: '评论作者名B写的评论内容。',
        },
        {
          id: 'C',
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          author: '评论作者名C',
          datetime: '今天16:38',
          content: '评论作者名C写的评论内容。',
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";

.article-list-container {
  margin-top: 10px;
  .card-container {
    padding: 16px 24px;
    background-color: @bg-color-container;
    border-radius: 2px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .left-operation-container {
      padding: 0 0 6px 0;
      margin-bottom: 16px;
    }
    .t-button-link {
      color: @brand-color;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.38, 0, 0.24, 1);
    }
  }
}
</style>