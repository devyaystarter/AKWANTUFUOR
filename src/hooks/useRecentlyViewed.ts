"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 10;
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface StoredEntry {
  id: string;
  viewedAt: number; // Unix timestamp ms
}

function readStorage(): StoredEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: StoredEntry[] = JSON.parse(raw);
    const now = Date.now();
    // Drop expired entries
    return parsed.filter((e) => now - e.viewedAt < TTL_MS);
  } catch {
    return [];
  }
}

function writeStorage(entries: StoredEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage quota exceeded or unavailable — silently ignore
  }
}

/**
 * Records `currentId` as viewed and returns the list of recently viewed IDs
 * (excluding the current product, most-recent first).
 */
export function useRecentlyViewed(currentId: string): string[] {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    // Read existing entries
    const entries = readStorage();

    // Remove any existing entry for this product so we can re-insert at front
    const filtered = entries.filter((e) => e.id !== currentId);

    // Prepend current product and cap at MAX_ITEMS
    const updated: StoredEntry[] = [
      { id: currentId, viewedAt: Date.now() },
      ...filtered,
    ].slice(0, MAX_ITEMS);

    writeStorage(updated);

    // Expose IDs excluding the current product (it's already on screen)
    setRecentIds(updated.filter((e) => e.id !== currentId).map((e) => e.id));
  }, [currentId]);

  return recentIds;
}
