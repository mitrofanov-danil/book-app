import onChange from "on-change";
import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");

    this.searchComponent = new Search(this.state);
    this.headerComponent = new Header(this.appState);
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery") {
      this.state.loading = true;
      const data = await this.loadList(
        this.state.searchQuery,
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

  async loadList(q, offset) {
    const fields = "key,cover_edition_key,subject,author_name,title";
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=${fields}&offset=${offset}`
    );

    return res.json();
  }

  render() {
    const main = document.createElement("div");
    main.classList.add("main");

    main.append(this.searchComponent.render());
    main.append(new CardList(this.appState, this.state).render());

    this.app.innerHTML = "";
    this.app.append(main);
    this.renderResult();
    this.renderHeader();
  }

  renderHeader() {
    const header = this.headerComponent.render();
    this.app.prepend(header);
  }

  renderResult() {
    const cardList = document.querySelector(".card-list");
    const title = document.createElement("h1");
    title.textContent = `Найдено книг - ${this.state.numFound}`;
    cardList.prepend(title);
  }
}
