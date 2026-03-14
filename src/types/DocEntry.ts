import type { Frontmatter } from "./Frontmatter";

interface DocEntry {
  readonly name: string;
  readonly slug: string;
  readonly content: string;
  readonly meta: Frontmatter;
}

export type { DocEntry };
