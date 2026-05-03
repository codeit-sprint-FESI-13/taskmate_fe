"use client";

import dynamic from "next/dynamic";

const AsyncBoundary = dynamic(() => import("./AsyncBoundary"), { ssr: false });

export default AsyncBoundary;
