import { DivComponent } from "../../common/div-component";
import { MainViewState } from "../../types";
import "./search.css";

export class Search extends DivComponent {
  private state: MainViewState;

  constructor(state: MainViewState) {
    super();
    this.state = state;
  }

  render(): HTMLDivElement {
    const inputValue = this.state.searchQuery ? this.state.searchQuery : "";
    this.el.classList.add("search");
    this.el.innerHTML = `
      <div class="search__wrapper">
        <input 
          type="text" 
          placeholder="Найти книгу или автора..." 
          class="search__input" value="${inputValue}" />
        <img src="/static/search.svg" alt="Иконка поиска" />
      </div>
      <button aria-label="Искать">
        <img src="/static/search-btn.svg" alt="Иконка поиска" />
      </button>
    `;

    this.el
      .querySelector("button")!
      .addEventListener("click", this.search.bind(this));

    this.el.querySelector("input")!.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Enter") this.search();
    });

    return this.el;
  }

  private search(): void {
    const value = this.el.querySelector("input")!.value;
    this.state.searchQuery = value;
  }
}
