import { DivComponent } from "../../common/div-component";
import { Card } from "../../components/card/card.js";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(event) {
    const button = event.target.closest("button[data-id]");
    if (button) {
      const id = button.getAttribute("data-id");
      const isFavorite = this.appState.favorites.some(
        (item) => item.key === id
      );

      isFavorite ? this.deleteFromFavorites(id) : this.addToFavorites(id);
    }
  }

  addToFavorites(id) {
    const book = this.state.list.find((item) => item.key === id);
    if (book) {
      this.appState.favorites.push(book);
    }
  }

  deleteFromFavorites(id) {
    const indexToRemove = this.appState.favorites.findIndex(
      (item) => item.key === id
    );

    if (indexToRemove !== -1) {
      this.appState.favorites.splice(indexToRemove, 1);
    }
  }

  render() {
    this.el.classList.add("card-list");
    if (this.state.loading) return this.renderLoading();
    if (this.state.list.length) {
      this.renderCards();
      this.el.addEventListener("click", this.handleCardClick);
    }
    return this.el;
  }

  renderLoading() {
    this.el.innerHTML = `<div class="loader"><span /></div>`;

    return this.el;
  }

  renderCards() {
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card-list__wrapper");

    for (const card of this.state.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }

    this.el.append(cardGrid);
  }
}
