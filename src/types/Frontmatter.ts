interface Frontmatter {
  readonly title: string;
  readonly author: string;
  readonly date: string;
  readonly domain?: string;
  readonly collection?: string;
  readonly part?: number;
  readonly tags?: readonly string[];
}

export type { Frontmatter };
