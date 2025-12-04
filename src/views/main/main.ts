import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";
import { AppState, MainViewState, SearchResponse } from "../../types";

export class MainView extends AbstractView {
  private appState: AppState;
  private state: MainViewState;
  private searchComponent: Search;
  private headerComponent: Header;

  constructor(appState: AppState) {
    super();
    this.appState = appState;
    this.state = {
      list: [],
      numFound: 0,
      loading: false,
      searchQuery: undefined,
      offset: 0,
    };
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");

    this.searchComponent = new Search(this.state);
    this.headerComponent = new Header(this.appState);
  }

  destroy(): void {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  private appStateHook(path: string): void {
    if (path === "favorites") {
      this.render();
    }
  }

  private async stateHook(path: string): Promise<void> {
    if (path === "searchQuery") {
      this.state.loading = true;
      const data = await this.loadList(
        this.state.searchQuery!,
        this.state.offset
      );
      this.state.numFound = data.numFound;
      this.state.list = data.docs;
      this.state.loading = false;
    }

    if (path === "loading") {
      this.render();
    }
  }

  private async loadList(q: string, offset: number): Promise<SearchResponse> {
    const fields = "key,cover_edition_key,subject,author_name,title";
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=${fields}&offset=${offset}`
    );

    return res.json();
  }

  render(): void {
    const main = document.createElement("div");
    main.classList.add("main");

    main.append(this.searchComponent.render());
    main.append(new CardList(this.appState, this.state).render());

    this.app!.innerHTML = "";
    this.app!.append(main);
    this.renderResult();
    this.renderHeader();
  }

  private renderHeader(): void {
    const header = this.headerComponent.render();
    this.app!.prepend(header);
  }

  private renderResult(): void {
    const cardList = document.querySelector(".card-list");
    const title = document.createElement("h1");
    title.textContent = `Найдено книг - ${this.state.numFound}`;
    cardList!.prepend(title);
  }
}
