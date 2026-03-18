"use client";

import { useEffect, useState } from "react";

import { postsApi } from "@/lib/api/endpoints";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [data, setData] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    postsApi
      .getById(1)
      .then(setData)
      .catch(() => setError("데이터를 불러오는데 실패했습니다."));
  }, []);

  return (
    <ul>
      {data && (
        <li
          key={data.id}
          className="border p-4"
        >
          <h3 className="font-bold">
            {data.id}: {data.title}
          </h3>
          <p>{data.body}</p>
        </li>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </ul>
  );
}
