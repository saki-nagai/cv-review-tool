import { PPTAnalysisResult, TextElement } from '../types';

/**
 * PPT ファイルを解析してテキスト要素を抽出
 * @param file PPT ファイル
 * @returns PPT解析結果
 */
export async function parsePPT(file: File): Promise<PPTAnalysisResult> {
  // TODO: pptxjs ライブラリを使用して実装
  // 現在はダミー実装
  
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        
        // PPT解析ロジック（後で実装）
        const result: PPTAnalysisResult = {
          topSection: [],
          bottomSection: [],
          totalSlides: 0,
        };
        
        resolve(result);
      } catch (error) {
        reject(new Error('PPT解析に失敗しました'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイル読み込みに失敗しました'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * PPT ファイルが正しいフォーマットか確認
 * @param file ファイル
 * @returns 有効な場合 true
 */
export function isValidPPTFile(file: File): boolean {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
  ];
  
  return validTypes.includes(file.type) || file.name.endsWith('.pptx') || file.name.endsWith('.ppt');
}
