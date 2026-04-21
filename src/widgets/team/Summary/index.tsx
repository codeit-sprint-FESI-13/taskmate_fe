"use client";

import SummaryError from "./Error";
import SummaryLoading from "./Loading";
import SummaryComponent from "./Summary";

export const Summary = Object.assign(SummaryComponent, {
  Error: SummaryError,
  Loading: SummaryLoading,
});
