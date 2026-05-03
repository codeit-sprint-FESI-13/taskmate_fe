import AsyncBoundary from "@/shared/ui/AsyncBoundary";

import { InvitationPageClient } from "./InvitationPageClient";

export default function TeamInvitationPage() {
  return (
    <AsyncBoundary>
      <InvitationPageClient />
    </AsyncBoundary>
  );
}
