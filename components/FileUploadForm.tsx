'use client';

import React, { useState } from 'react';
import { isValidPPTFile, parsePPT } from '@/lib/utils/pptParser';
import { checkCVGuideline } from '@/lib/utils/cvChecker';
import { generateFeedback, generateSuggestions } from '@/lib/utils/feedbackGenerator';
import ReviewResult from './ReviewResult';
import { PPTAnalysisResult, GuidelineCheckResult } from '@/lib/types';

interface ReviewState {
  loading: boolean;
  error: string | null;
  guidelineChecks: GuidelineCheckResult[] | null;
  feedback: string | null;
  suggestions: string[] | null;
}

export default function FileUploadForm() {
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [reviewState, setReviewState] = useState<ReviewState>({
    loading: false,
    error: null,
    guidelineChecks: null,
    feedback: null,
    suggestions: null,
  });

  const handlePptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidPPTFile(file)) {
      setPptFile(file);
      setReviewState(prev => ({ ...prev, error: null }));
    } else {
      setReviewState(prev => ({
        ...prev,
        error: '有効なPPTファイルを選択してください（.ppt, .pptx）',
      }));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pptFile) {
      setReviewState(prev => ({
        ...prev,
        error: 'PPTファイルを選択してください',
      }));
      return;
    }

    setReviewState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // PPT解析
      const analysis = await parsePPT(pptFile);

      // ガイドラインチェック
      const checks = checkCVGuideline(analysis);

      // フィードバック生成
      const feedback = generateFeedback(checks, []);
      const suggestions = generateSuggestions(checks);

      setReviewState(prev => ({
        ...prev,
        loading: false,
        guidelineChecks: checks,
        feedback,
        suggestions,
      }));
    } catch (error) {
      setReviewState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '処理中にエラーが発生しました',
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!reviewState.feedback ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CV（PowerPoint ファイル） *
            </label>
            <input
              type="file"
              accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={handlePptChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {pptFile && (
              <p className="mt-2 text-sm text-green-600">✓ {pptFile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              職務経歴書（参考資料）
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleResumeChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100"
            />
            {resumeFile && (
              <p className="mt-2 text-sm text-green-600">✓ {resumeFile.name}</p>
            )}
          </div>

          {reviewState.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-700">{reviewState.error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={reviewState.loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md
              hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed
              transition-colors duration-200"
          >
            {reviewState.loading ? 'レビュー中...' : 'CV をレビュー'}
          </button>
        </form>
      ) : (
        <ReviewResult
          checks={reviewState.guidelineChecks || []}
          feedback={reviewState.feedback}
          suggestions={reviewState.suggestions || []}
          onReset={() => {
            setPptFile(null);
            setResumeFile(null);
            setReviewState({
              loading: false,
              error: null,
              guidelineChecks: null,
              feedback: null,
              suggestions: null,
            });
          }}
        />
      )}
    </div>
  );
}
