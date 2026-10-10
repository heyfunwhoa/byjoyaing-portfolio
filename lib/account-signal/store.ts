import type { StoredSource } from "./types.ts";

export interface ResearchStore {
  get(url: string): StoredSource | undefined;
  add(record: StoredSource): void;
  size(): number;
}

export class MemoryResearchStore implements ResearchStore {
  private readonly records = new Map<string, StoredSource>();

  get(url: string): StoredSource | undefined {
    return this.records.get(url);
  }

  add(record: StoredSource): void {
    this.records.set(record.url, record);
  }

  size(): number {
    return this.records.size;
  }
}
