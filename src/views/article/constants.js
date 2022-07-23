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
};

export const skeletonRowCol = [
  { width: '30%', },
  1, 1,
  { width: '30%' },
  1, 1, 1,
  { width: '80%' },
  1,
  { width: '60%' },
  1, 1, 1, 1,
  { width: '80%' },
  { width: '10%' },
]

export const articleStatusMap = {
  0: {
    color: 'green',
    text: '已发布',
    theme: 'primary',
  },
  1: {
    color: 'orange',
    text: '草稿',
    theme: 'warning',
  },
};