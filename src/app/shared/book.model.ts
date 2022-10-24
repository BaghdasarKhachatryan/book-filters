export interface Book {
  id: number;
  title: string;
  author: string;
  language: string;
  pages: number;
  description: string;
  genre: string;
}

export interface FilteredBook {
  title: string;
  author: string;
  language: string;
  pagesMinCount: string;
  pagesMaxCount: string;
  description: string;
  genre: string;
}
