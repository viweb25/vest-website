'use client';
// Re-exports InteractiveDotGrid as default so next/dynamic can import
// it without calling .then() on a client module (which breaks SSR).
export { InteractiveDotGrid as default } from './InteractiveDotGrid';
