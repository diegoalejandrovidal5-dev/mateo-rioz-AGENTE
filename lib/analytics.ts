"use client";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "demo_video_play"
  | "demo_video_50_percent"
  | "demo_video_complete"
  | "interactive_demo_started"
  | "suggested_question_clicked"
  | "form_started"
  | "form_step_1_completed"
  | "form_submitted"
  | "calendar_booking_started"
  | "faq_opened"
  | "final_cta_click";

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties });
}
