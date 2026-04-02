import AsyncBoundary from "@/components/common/AsyncBoundary";

import { InvitationPageClient } from "./InvitationPageClient";

export default function TeamInvitationPage() {
  return (
    <AsyncBoundary>
      <InvitationPageClient />
    </AsyncBoundary>
  );
}
