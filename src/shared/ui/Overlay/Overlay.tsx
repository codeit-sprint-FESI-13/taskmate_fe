"use client";

import { OVERLAY_ZINDEX_BASE } from "@/shared/constants/styles/zIndex";
import { useOverlayStore } from "@/shared/store/overlay/useOverlay.store";

export default function Overlay() {
  const layer = useOverlayStore((s) => s.layer);

  if (layer.length === 0) return null;

  return (
    <>
      {layer.map(({ id, element }, index) => (
        <div
          key={id}
          className="absolute inset-0"
          style={{ zIndex: OVERLAY_ZINDEX_BASE + index }}
        >
          {element}
        </div>
      ))}
    </>
  );
}
