export interface Project {
  $id: string;
  title: string;
  image: string;
  date: string;
  link: string;
  year: number;
  month: number;
  week: number;
  performance?: number;
  seo?: number;
  accessibility?: number;
  bestPractices?: number;
}
