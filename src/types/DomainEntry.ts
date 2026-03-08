interface DomainCardEntry {
  readonly name: string;
  readonly title: string;
  readonly preview: string;
  readonly content: string;
}

interface DomainEntry {
  readonly name: string;
  readonly cards: readonly DomainCardEntry[];
}

export type { DomainCardEntry, DomainEntry };
