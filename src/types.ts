export interface Book {
  key: string;
  cover_edition_key?: string;
  subject?: string[];
  author_name?: string[];
  title: string;
}

export interface AppState {
  favorites: Book[];
}

export interface MainViewState {
  list: Book[];
  numFound: number;
  loading: boolean;
  searchQuery?: string;
  offset: number;
}

export interface CardListState {
  list: Book[];
  loading?: boolean;
}

export interface SearchResponse {
  numFound: number;
  docs: Book[];
}

export abstract class AbstractView {
  app: HTMLElement | null;

  constructor() {
    this.app = document.getElementById("root");
  }

  setTitle(title: string): void {
    document.title = title;
  }

  abstract render(): void;

  destroy(): void {
    return;
  }
}
