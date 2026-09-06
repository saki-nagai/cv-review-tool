import { CVGuideline } from '../types';

// CV ガイドラインルール定義
export const CV_GUIDELINE: CVGuideline = {
  topSection: {
    fontSize: 16,
    maxLines: 2,
    alignment: 'center',
  },
  bottomSection: {
    headingFontSize: 16,
    detailFontSize: 14,
    blockCount: [2, 3],
  },
};

// 案件カテゴリとキーワード
export const PROJECT_CATEGORIES = {
  planning: {
    label: 'プランニング',
    subcategories: [
      { name: '戦略', keywords: ['中期経営計画', '事業戦略', '市場分析', '競争分析', 'ポジショニング'] },
      { name: 'オペレーション企画/改革', keywords: ['業務改革', '業務効率化', 'プロセス改善', 'コスト削減'] },
      { name: 'IT戦略', keywords: ['ITコスト削減検査', 'ITアセスメント', 'IT投資検証'] },
      { name: 'DX', keywords: ['先端技術', 'AI', 'メタバース', 'ユースケース検討'] },
    ],
  },
  execution: {
    label: 'エグゼキューション',
    subcategories: [
      { name: 'ビジネスPMO', keywords: ['事務局運営支援', '制度検討', '導入支援'] },
      { name: 'オペレーション推進', keywords: ['マーケット・拡販支援', '営業・提案支援', '火事場の業務代替'] },
      { name: 'ITPMO', keywords: ['システム開発PM', 'PMO', 'リスク管理'] },
      { name: 'SI', keywords: ['システム化構想', '要件定義', 'アプリ開発', 'インフラ構築'] },
    ],
  },
};

// 職位別の略称
export const POSITION_ABBREVIATIONS: Record<string, string> = {
  'エグゼクティブパートナー': 'EP',
  'パートナー': 'PT',
  'チーフエキスパート': 'CE',
  'アソシエイトパートナー': 'AP',
  'シニアマネージャー': 'SM',
  'シニアエキスパート': 'SE',
  'マネージャー': 'MG',
  'エキスパート': 'EX',
  'シニアコンサルタント': 'SC',
  'コンサルタント': 'CN',
  'アナリスト': 'AN',
};
