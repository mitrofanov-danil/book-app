import { DivComponent } from "../../common/div-component";
import { AppState, Book } from "../../types";
import "./card.css";

export class Card extends DivComponent {
  private appState: AppState;
  private cardState: Book;

  constructor(appState: AppState, cardState: Book) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render(): HTMLDivElement {
    const isFavorite = this.appState.favorites.some(
      (item) => item.key === this.cardState.key
    );
    const isActiveButton = isFavorite ? "button_active" : "";
    const favoriteIcon = isFavorite ? "favorites.svg" : "favorites-white.svg";

    this.el.classList.add("card");
    this.el.innerHTML = `
      <div class="card__image">
        <img src="https://covers.openlibrary.org/b/olid/${
          this.cardState.cover_edition_key
        }-M.jpg" alt="Обложка" />
      </div>
      <div class="card__info">
        <p class="card__tag">${this.cardState?.subject?.[0] ?? "Не задано"}</p>
        <p class="card__title">${this.cardState.title}</p>
        <p class="card__author">${
          this.cardState?.author_name?.[0] ?? "Не задано"
        }</p>
        <div class="card__footer">
          <button 
            class="button__add ${isActiveButton}" 
            data-id="${this.cardState.key}"
          >
            <img src="static/${favoriteIcon}" alt="Иконка избранное"/>
          </button>
        </div>
      </div>
    `;

    return this.el;
  }
}
