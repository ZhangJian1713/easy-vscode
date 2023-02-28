import { K, Locale } from '../constants'

const locale: Locale = {
  // Controller
  [K.OPEN_FOLDER_TIPS]: '请在执行 “查看图片” 前打开任意文件夹',
  [K.IMAGES_VIEWER]: '图片查看器',

  // UI
  [K.TYPE]: '类型',
  [K.BACKGROUND]: '背景',
  [K.TOTAL_COUNT]: '总数',
  [K.SIZE]: '大小',
  [K.FILTERED_COUNT]: '匹配数',
  [K.EXPAND_ALL]: '展开全部',
  [K.COLLAPSE_ALL]: '折叠全部',
  [K.COLLAPSE_TOOLTIP]: '当匹配数超过 {{limitOfTooMany}} 张图片时，默认折叠所有目录。',
  [K.NO_IMAGES_FOUND]: '未找到图片',
  [K.COPY_BASE64_SUCCESSFULLY]: '成功复制图片的 Base64 编码',
  [K.DELETE_SUCCESSFULLY]: '删除成功',
  [K.COPY_TEXT_SUCCESSFULLY]: '成功复制 "{{copyText}}"',
  [K.COPY_TEXT]: '复制 "{{text}}"',
  [K.COPY_BASE64]: '复制图片的 Base64 编码',
  [K.DELETE_FILE]: '删除文件'
}

export default locale
