import { K, Locale } from '../constants'

const locale: Locale = {
  // Controller
  [K.OPEN_FOLDER_TIPS]: 'Please open any folder before executing "View Images"',
  [K.IMAGES_VIEWER]: 'Images Viewer',

  // UI
  [K.TYPE]: 'Type',
  [K.BACKGROUND]: 'Background',
  [K.TOTAL_COUNT]: 'Total count',
  [K.SIZE]: 'Size',
  [K.FILTERED_COUNT]: 'Filtered count',
  [K.EXPAND_ALL]: 'Expand All',
  [K.COLLAPSE_ALL]: 'Collapse All',
  [K.COLLAPSE_TOOLTIP]: 'When there are more than {{limitOfTooMany}} images(after being filtered) being displayed, all directories are collapsed by default.',
  [K.NO_IMAGES_FOUND]: 'No images found',
  [K.COPY_BASE64_SUCCESSFULLY]: 'Successfully copied Base64 encoding of the image',
  [K.DELETE_SUCCESSFULLY]: 'Successfully deleted',
  [K.COPY_TEXT_SUCCESSFULLY]: 'Successfully copied "{{copyText}}"',
  [K.COPY_TEXT]: 'Copy "{{text}}"',
  [K.COPY_BASE64]: 'Copy Base64 encoding of this image',
  [K.DELETE_FILE]: 'Delete File'
}

export default locale
