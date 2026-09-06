import React from 'react';
import { GuidelineCheckResult } from '@/lib/types';

interface ReviewResultProps {
  checks: GuidelineCheckResult[];
  feedback: string;
  suggestions: string[];
  onReset: () => void;
}

export default function ReviewResult({
  checks,
  feedback,
  suggestions,
  onReset,
}: ReviewResultProps) {
  const okCount = checks.filter(c => c.status === 'ok').length;
  const ngCount = checks.filter(c => c.status === 'ng').length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
      {/* スコア */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">OK</p>
          <p className="text-3xl font-bold text-green-600">{okCount}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">NG</p>
          <p className="text-3xl font-bold text-red-600">{ngCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">スコア</p>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round((okCount / (okCount + ngCount)) * 100)}%
          </p>
        </div>
      </div>

      {/* チェック結果 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">チェック結果</h3>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                check.status === 'ok'
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        check.status === 'ok'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {check.status === 'ok' ? 'OK' : 'NG'}
                    </span>
                    <span className="font-semibold text-gray-800">{check.item}</span>
                    <span className="text-xs text-gray-500">({check.section})</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{check.message}</p>
                  {check.details && (
                    <p className="text-xs text-gray-600 mt-1">詳細: {check.details}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* フィードバック */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">レビューフィードバック</h3>
        <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-700">
          {feedback}
        </div>
      </div>

      {/* 改善提案 */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">改善提案</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-block w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* リセット */}
      <button
        onClick={onReset}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md
          hover:bg-indigo-700 transition-colors duration-200"
      >
        別のCVをレビュー
      </button>
    </div>
  );
}
