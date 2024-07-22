export const CONSTANTS = {
  // ページネーション関連
  PICTURES_PER_PAGE: 6,
  MAX_PAGE_SIZE: 100,

  // アップロード関連
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],

  // S3関連
  S3_ACL: 'public-read',
  S3_CONTENT_TYPE: 'image/webp',

  // データベース関連
  MAX_TITLE_LENGTH: 100,
  MAX_COMMENT_LENGTH: 500,

  // API関連
  API_RATE_LIMIT: 100,
  API_TIMEOUT: 30000,

  // エラーメッセージ
  ERROR_MESSAGES: {
    INVALID_INPUT: '無効な入力です',
    FILE_TOO_LARGE: 'ファイルサイズが超過しています',
    UNSUPPORTED_FILE_TYPE: 'サポートされていないファイル形式です',
    NOT_FOUND: 'お探しの情報が見つかりません',
    UNAUTHORIZED: '認証が失敗しました',
    INTERNAL_SERVER_ERROR: 'サーバーエラーが発生しました',
  },

  DEFAULT_THEME: 'default',
  MAX_TAGS_PER_PICTURE: 5,
}
