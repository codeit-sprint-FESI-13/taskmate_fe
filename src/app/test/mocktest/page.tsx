"use client";

import { useEffect, useState } from "react";

import { postApi } from "@//features/post/api";
import type { Post } from "@//features/post/types";
import { ApiError } from "@//lib/api/types";

export default function Home() {
  const [data, setData] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    postApi
      .getById(1)
      .then(setData)
      .catch((err: unknown) => {
        const error = err as ApiError;

        if (error.code === "AUTH_REQUIRED") {
          setError("로그인이 필요한 서비스입니다.");
        } else {
          setError(error.message || "데이터를 불러오는데 실패했습니다.");
        }

        console.error(`[${error.code}] ${error.status}: ${error.message}`);
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">게시글 상세</h1>

      {data && (
        <article className="rounded-lg border p-4 shadow-sm">
          <h3 className="text-lg font-bold">
            {data.id}: {data.title}
          </h3>
          <p className="mt-2 text-gray-600">{data.body}</p>
        </article>
      )}

      {error && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-red-600">
          {error}
        </div>
      )}
    </main>
  );
}
