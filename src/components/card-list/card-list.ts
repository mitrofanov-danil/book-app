import { DivComponent } from "../../common/div-component";
import { Card } from "../../components/card/card";
import { AppState, CardListState } from "../../types";
import "./card-list.css";

export class CardList extends DivComponent {
  private appState: AppState;
  private state: CardListState;
  private handleCardClick: (event: MouseEvent) => void;

  constructor(appState: AppState, state: CardListState) {
    super();
    this.appState = appState;
    this.state = state;
    this.handleCardClick = this.handleCardClickMethod.bind(this);
  }

  private handleCardClickMethod(event: MouseEvent): void {
    const button = (event.target as HTMLElement).closest("button[data-id]") as HTMLButtonElement | null;
    if (button) {
      const id = button.getAttribute("data-id");
      if (id) {
        const isFavorite = this.appState.favorites.some(
          (item) => item.key === id
        );

        isFavorite ? this.deleteFromFavorites(id) : this.addToFavorites(id);
      }
    }
  }

  private addToFavorites(id: string): void {
    const book = this.state.list.find((item) => item.key === id);
    if (book) {
      this.appState.favorites.push(book);
    }
  }

  private deleteFromFavorites(id: string): void {
    const indexToRemove = this.appState.favorites.findIndex(
      (item) => item.key === id
    );

    if (indexToRemove !== -1) {
      this.appState.favorites.splice(indexToRemove, 1);
    }
  }

  render(): HTMLDivElement {
    this.el.classList.add("card-list");
    if (this.state.loading) return this.renderLoading();
    if (this.state.list.length) {
      this.renderCards();
      this.el.addEventListener("click", this.handleCardClick);
    }
    return this.el;
  }

  private renderLoading(): HTMLDivElement {
    this.el.innerHTML = `<div class="loader"><span /></div>`;

    return this.el;
  }

  private renderCards(): void {
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card-list__wrapper");

    for (const card of this.state.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }

    this.el.append(cardGrid);
  }
}
