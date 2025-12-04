import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { CardList } from "../../components/card-list/card-list";
import { AppState } from "../../types";

export class FavoritesView extends AbstractView {
  private appState: AppState;

  constructor(appState: AppState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Мои книги");
  }

  destroy(): void {
    onChange.unsubscribe(this.appState);
  }

  private appStateHook(path: string): void {
    if (path === "favorites") {
      this.render();
    }
  }

  render(): void {
    const main = document.createElement("div");
    const list = this.appState.favorites;
    main.classList.add("main");
    main.innerHTML = `<h1>Избранное</h1>`;
    main.append(new CardList(this.appState, { list }).render());

    this.app!.innerHTML = "";
    this.app!.append(main);
    this.renderHeader();
  }

  private renderHeader(): void {
    const header = new Header(this.appState).render();
    this.app!.prepend(header);
  }
}
