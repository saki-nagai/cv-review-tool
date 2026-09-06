// PPT解析結果の型定義
export interface TextElement {
  content: string;
  fontSize: number;
  fontName: string;
  alignment: 'left' | 'center' | 'right';
  lineCount: number;
  position: 'top' | 'bottom' | 'middle';
}

export interface PPTAnalysisResult {
  topSection: TextElement[];
  bottomSection: TextElement[];
  totalSlides: number;
}

// ガイドラインチェック結果の型定義
export interface GuidelineCheckResult {
  section: 'top' | 'bottom';
  item: string;
  status: 'ok' | 'ng';
  message: string;
  details?: string;
}

export interface ReviewResult {
  cvAnalysis: PPTAnalysisResult;
  guidelineChecks: GuidelineCheckResult[];
  suggestions: string[];
  feedback: string;
}

// CV ガイドラインルール
export interface CVGuideline {
  topSection: {
    fontSize: number;
    maxLines: number;
    alignment: 'left' | 'center' | 'right';
  };
  bottomSection: {
    headingFontSize: number;
    detailFontSize: number;
    blockCount: [number, number]; // min, max
  };
}
