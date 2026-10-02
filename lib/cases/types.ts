export type CaseStudy = {
  live?: string;
  role: string;
  org: string;
  platform: string;
  stack: string;
  tags: string[];
  summary: string;
  objective: string;
  tasks: string[];
  /** [title, sentence] */
  features: [string, string][];
  /** [title, sub, description]. Descriptions were written for the design; confirm with the owner. */
  arch: [string, string, string][];
  archCaption: string;
  gallery: string[];
};
