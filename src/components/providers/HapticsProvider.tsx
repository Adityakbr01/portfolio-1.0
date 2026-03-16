"use client";

/**
 * HapticsProvider.tsx
 *
 * Wraps the app in global haptic feedback using web-haptics.
 * Uses SEMANTIC PRESETS instead of raw ms values so the vibration
 * pattern actually matches the weight of the interaction on device.
 *
 * PRESET GUIDE (from web-haptics docs):
 * ──────────────────────────────────────
 * Impact      → "light" | "medium" | "heavy"
 * Notification → "success" | "warning" | "error"
 * Selection   → "selection"   (for pickers/sliders/steppers)
 * Extra       → "soft" | "rigid" | "nudge" | "buzz"
 *
 * MAPPING STRATEGY (match intensity to action weight):
 * ─────────────────────────────────────────────────────
 * Nav links / anchor tags     → "light"   (minor navigation)
 * Regular buttons             → "medium"  (standard press)
 * CTA / submit buttons        → "medium"  (standard press)
 * Social / external links     → "light"   (soft outbound tap)
 * Role=button / role=link     → "light"   (custom interactive)
 *
 * NOTE: web-haptics silently no-ops on desktop / unsupported
 * devices, so no try/catch or feature detection is needed.
 */

import { useEffect } from "react";
import { useWebHaptics } from "web-haptics/react";

// ─── Haptic intensity map ─────────────────────────────────────────────────────

type HapticPreset =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error"
  | "selection"
  | "soft"
  | "rigid"
  | "nudge"
  | "buzz";

/**
 * Resolves which haptic preset to use based on the closest
 * interactive element that was tapped.
 */
function resolvePreset(el: Element): HapticPreset {
  const tag = el.tagName.toLowerCase();
  const type = (el as HTMLInputElement).type?.toLowerCase();
  const role = el.getAttribute("role")?.toLowerCase();

  // Submit / primary CTA buttons → medium impact
  if (
    (tag === "input" && (type === "submit" || type === "button")) ||
    (tag === "button" && el.getAttribute("data-haptic") === "medium")
  ) {
    return "medium";
  }

  // Buttons — default medium
  if (tag === "button") return "medium";

  // External / nav links → light
  if (tag === "a") return "light";

  // ARIA interactive roles
  if (role === "button") return "medium";
  if (role === "link") return "light";
  if (role === "menuitem" || role === "option") return "selection";
  if (role === "checkbox" || role === "radio" || role === "switch") {
    return "selection";
  }

  return "light";
}

// ─── Provider ────────────────────────────────────────────────────────────────

export default function HapticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trigger } = useWebHaptics();

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Only fire on touch — desktop pointer events don't need haptics
      // (web-haptics no-ops on desktop anyway, but this avoids the lookup cost)
      if (e.pointerType !== "touch") return;

      const target = e.target as HTMLElement;

      const interactiveEl = target.closest(
        "button, a, [role='button'], [role='link'], [role='menuitem'], [role='option'], [role='checkbox'], [role='radio'], [role='switch'], input[type='submit'], input[type='button']"
      );

      if (!interactiveEl) return;

      const preset = resolvePreset(interactiveEl);

      // No try/catch needed — web-haptics silently no-ops on unsupported platforms
      trigger(preset);
    };

    window.addEventListener("pointerdown", handlePointerDown, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, {
        capture: true,
      });
    };
  }, [trigger]);

  return <>{children}</>;
}

// ─── Convenience hook for manual haptics in other components ─────────────────
// Usage:  const haptic = useHaptic()
//         haptic("success")  ← call after a form submit succeeds
//         haptic("error")    ← call after a form submit fails

export { useWebHaptics as useHaptic };