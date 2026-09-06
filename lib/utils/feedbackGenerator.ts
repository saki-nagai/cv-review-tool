import { PPTAnalysisResult, GuidelineCheckResult } from '../types';

/**
 * チェック結果からフィードバックコメントを生成
 * @param checks チェック結果の配列
 * @param jobKeywords 職務経歴から抽出したキーワード
 * @returns フィードバックコメント
 */
export function generateFeedback(
  checks: GuidelineCheckResult[],
  jobKeywords: string[] = []
): string {
  const ngItems = checks.filter(c => c.status === 'ng');
  
  if (ngItems.length === 0) {
    return 'CVが全てのガイドラインをクリアしています。素晴らしい！';
  }

  let feedback = 'CV修正の推奨事項:\n\n';

  // セクション別にフィードバックを整理
  const topIssues = ngItems.filter(c => c.section === 'top');
  const bottomIssues = ngItems.filter(c => c.section === 'bottom');

  if (topIssues.length > 0) {
    feedback += '【上部セクション（略歴）】\n';
    topIssues.forEach((issue, index) => {
      feedback += `${index + 1}. ${issue.item}: ${issue.message}\n`;
      if (issue.details) {
        feedback += `   詳細: ${issue.details}\n`;
      }
    });
    feedback += '\n';
  }

  if (bottomIssues.length > 0) {
    feedback += '【下部セクション（詳細）】\n';
    bottomIssues.forEach((issue, index) => {
      feedback += `${index + 1}. ${issue.item}: ${issue.message}\n`;
      if (issue.details) {
        feedback += `   詳細: ${issue.details}\n`;
      }
    });
    feedback += '\n';
  }

  // キーワード提案
  if (jobKeywords.length > 0) {
    feedback += '【追加推奨キーワード】\n';
    jobKeywords.forEach((keyword, index) => {
      feedback += `${index + 1}. ${keyword}\n`;
    });
  }

  return feedback;
}

/**
 * 改善提案を生成
 */
export function generateSuggestions(
  checks: GuidelineCheckResult[]
): string[] {
  const suggestions: string[] = [];

  checks.forEach(check => {
    if (check.status === 'ng') {
      suggestions.push(`${check.item}を修正してください: ${check.message}`);
    }
  });

  return suggestions;
}
