export const editMode = {
  CREATE: 0,
  EDIT: 1,
};
// TODO: 修改 placeholder 图片
export const defaultCoverUrl = 'http://119.91.26.252:8090/images/placeholder.jpg';

export const vditorBaseConfigs = {
  height: 600,
  icon: 'material',
  mode: 'wysiwyg',
  preview: {
    delay: 50,
  },
  outline: {
    enable: true,
  },
  cache: {
    enable: false,
  },
}

export const articleStatusMap = {
  0: {
    color: 'green',
    text: '已发布',
  },
  1: {
    color: 'orange',
    text: '草稿',
  },
};