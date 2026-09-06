import { PPTAnalysisResult, GuidelineCheckResult, CVGuideline } from '../types';
import { CV_GUIDELINE } from '../constants/guidelines';

/**
 * CV ガイドラインに基づいてチェック実行
 * @param analysis PPT解析結果
 * @param guideline ガイドラインルール
 * @returns チェック結果の配列
 */
export function checkCVGuideline(
  analysis: PPTAnalysisResult,
  guideline: CVGuideline = CV_GUIDELINE
): GuidelineCheckResult[] {
  const results: GuidelineCheckResult[] = [];

  // 上部セクション（略歴）のチェック
  results.push(...checkTopSection(analysis.topSection, guideline));

  // 下部セクション（詳細）のチェック
  results.push(...checkBottomSection(analysis.bottomSection, guideline));

  return results;
}

/**
 * 上部セクション（略歴）のチェック
 */
function checkTopSection(
  topElements: any[],
  guideline: CVGuideline
): GuidelineCheckResult[] {
  const results: GuidelineCheckResult[] = [];

  // フォントサイズチェック
  const fontSizeOK = topElements.every(el => el.fontSize === guideline.topSection.fontSize);
  results.push({
    section: 'top',
    item: 'フォントサイズ',
    status: fontSizeOK ? 'ok' : 'ng',
    message: `フォントサイズは ${guideline.topSection.fontSize}pt で統一してください`,
    details: fontSizeOK ? undefined : topElements.map(el => `${el.fontSize}pt`).join(', '),
  });

  // 行数チェック
  const linesOK = topElements.every(el => el.lineCount <= guideline.topSection.maxLines);
  results.push({
    section: 'top',
    item: '行数',
    status: linesOK ? 'ok' : 'ng',
    message: `${guideline.topSection.maxLines}行以内で記載してください`,
    details: linesOK ? undefined : topElements.map(el => `${el.lineCount}行`).join(', '),
  });

  // 配置チェック
  const alignmentOK = topElements.every(el => el.alignment === guideline.topSection.alignment);
  results.push({
    section: 'top',
    item: '配置',
    status: alignmentOK ? 'ok' : 'ng',
    message: `${guideline.topSection.alignment === 'center' ? '中央' : '左側'}に揃えてください`,
  });

  return results;
}

/**
 * 下部セクション（詳細）のチェック
 */
function checkBottomSection(
  bottomElements: any[],
  guideline: CVGuideline
): GuidelineCheckResult[] {
  const results: GuidelineCheckResult[] = [];

  if (bottomElements.length === 0) {
    return results;
  }

  // 小見出しのフォントサイズチェック
  const headingOK = bottomElements.every(el => el.fontSize === guideline.bottomSection.headingFontSize);
  results.push({
    section: 'bottom',
    item: '小見出しフォントサイズ',
    status: headingOK ? 'ok' : 'ng',
    message: `小見出しは ${guideline.bottomSection.headingFontSize}pt で統一してください`,
  });

  // ブロック数チェック
  const [minBlocks, maxBlocks] = guideline.bottomSection.blockCount;
  const blockCount = bottomElements.length;
  const blockCountOK = blockCount >= minBlocks && blockCount <= maxBlocks;
  results.push({
    section: 'bottom',
    item: 'ブロック数',
    status: blockCountOK ? 'ok' : 'ng',
    message: `${minBlocks}～${maxBlocks}ブロックの構成で記載してください`,
    details: `現在: ${blockCount}ブロック`,
  });

  return results;
}
