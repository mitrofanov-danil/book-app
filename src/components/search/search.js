import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
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
      .querySelector("button")
      .addEventListener("click", this.search.bind(this));

    this.el.querySelector("input").addEventListener("keydown", (event) => {
      if (event.code === "Enter") this.search();
    });

    return this.el;
  }

  search() {
    const value = this.el.querySelector("input").value;
    this.state.searchQuery = value;
  }
}
