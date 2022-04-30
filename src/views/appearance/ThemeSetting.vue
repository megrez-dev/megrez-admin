<template>
  <PageView>
    <template slot="content">
      <div class="theme-setting-container">
        <t-tabs
          :defaultValue="themeConfig.tabs[0].key"
          v-if="themeConfig.tabs.length != 0"
        >
          <t-tab-panel
            :value="tab.key"
            v-for="tab in themeConfig.tabs"
            :key="tab.key"
          >
            <template #label>
              <icon name="setting" style="margin-right: 4px" /> {{ tab.name }}
            </template>
            <div class="setting-form-container">
              <t-form ref="form" labelAlign="top" :colon="true">
                <t-form-item
                  :label="item.name"
                  :name="item.key"
                  :help="item.description"
                  v-for="item in tab.items"
                  :key="item.key"
                >
                  <t-input
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    v-if="item.type === 'input'"
                  ></t-input>
                  <t-textarea
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    :name="item.key"
                    :autosize="{ minRows: 6 }"
                    v-if="item.type === 'textarea'"
                  />
                  <t-select
                    v-model="item.value"
                    :options="item.options"
                    v-if="item.type === 'select'"
                  />
                  <t-select
                    v-model="item.value"
                    multiple
                    :minCollapsedNum="3"
                    :options="item.options"
                    v-if="item.type === 'multiSelect'"
                  />
                  <t-switch
                    v-model="item.value"
                    v-if="item.type === 'switch'"
                  ></t-switch>
                  <t-tag-input
                    v-model="item.value"
                    clearable
                    v-if="item.type === 'tags'"
                  />
                  <!-- <t-input
                v-model="item.values"
                :placeholder="item.placeholder"
                v-if="item.type === 'tags'"
              ></t-input> -->

                  <t-input-group separate v-if="item.type === 'image'">
                    <t-input
                      v-model="item.value"
                      :placeholder="item.placeholder"
                      :style="{ width: '500px' }"
                    ></t-input>
                    <t-button
                      theme="primary"
                      shape="square"
                      variant="outline"
                      @click="openAttachDrawer"
                      ><image-icon slot="icon"
                    /></t-button>
                  </t-input-group>
                </t-form-item>
              </t-form>
            </div>
          </t-tab-panel>
        </t-tabs>
        <AttachListDrawer></AttachListDrawer>
      </div>
    </template>
  </PageView>
</template>
<script>
import { Icon, ImageIcon } from "tdesign-icons-vue";
import AttachListDrawer from "@/components/attachment/AttachListDrawer.vue";
import PageView from "@/layouts/PageView";
export default {
  name: "ThemeSetting",
  data() {
    return {
      themeConfig: {
        tabs: [],
      },
    };
  },
  methods: {
    openAttachDrawer() {
      this.$store.commit("OPEN_ATTACH_LIST_DRAWER");
    },
  },
  beforeMount() {
    this.$request.get("/theme/config").then((res) => {
      this.themeConfig = res.data;
      for (let i = 0; i < this.themeConfig.tabs.length; i++) {
        for (let j = 0; j < this.themeConfig.tabs[i].items.length; j++) {
          if (
            this.themeConfig.tabs[i].items[j].type === "multiSelect" ||
            this.themeConfig.tabs[i].items[j].type === "tags"
          ) {
            this.themeConfig.tabs[i].items[j].value = [];
          }
        }
      }
      console.log(this.themeConfig);
    });
  },
  components: {
    Icon,
    ImageIcon,
    AttachListDrawer,
    PageView,
  },
};
</script>

<style lang="less" scoped>
.theme-setting-container {
  .setting-form-container {
    padding: 30px 30px;
    max-width: 600px;
  }
}
</style>