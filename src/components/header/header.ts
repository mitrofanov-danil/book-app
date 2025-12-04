import { DivComponent } from "../../common/div-component";
import { AppState } from "../../types";
import "./header.css";

export class Header extends DivComponent {
  private appState: AppState;

  constructor(appState: AppState) {
    super();
    this.appState = appState;
  }

  render(): HTMLDivElement {
    this.el.innerHTML = "";
    this.el.classList.add("header");
    this.el.innerHTML = `
      <div>
        <img src="/static/logo.svg" alt='logo' />
      </div>
      <div class="menu">
        <a class="menu__item" href="#">
          <img src="/static/search.svg" alt='Поиск иконка' />
          Поиск книг
        </a>
        <a class="menu__item" href="#favorites">
          <img src="/static/favorites.svg" alt='Избранное иконка' />
          Избранное
          <div class="menu__counter">
            ${this.appState.favorites.length}
          </div>
        </a>
      </div>
    `;

    return this.el;
  }
}
