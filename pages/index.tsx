import React from 'react';
import Head from 'next/head';
import FileUploadForm from '@/components/FileUploadForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>CV Quality Review Tool</title>
        <meta name="description" content="CV品質チェック＆レビューツール" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">CV Quality Review Tool</h1>
            <p className="text-xl text-gray-600">PPT形式のCVを解析し、品質をチェックします</p>
          </div>
          <FileUploadForm />
        </div>
      </main>
    </>
  );
}
