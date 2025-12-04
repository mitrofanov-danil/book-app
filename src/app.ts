import { MainView } from "./views/main/main";
import { FavoritesView } from "./views/favorites/favorites";
import { AppState, AbstractView } from "./types";

class App {
  routes = [
    {
      path: "",
      view: MainView,
    },
    {
      path: "#favorites",
      view: FavoritesView,
    },
  ];
  appState: AppState = {
    favorites: [],
  };
  currentView?: AbstractView;

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route(): void {
    if (this.currentView) {
      this.currentView.destroy();
    }
    const foundRoute = this.routes.find((r) => r.path === location.hash);

    if (foundRoute) {
      this.currentView = new foundRoute.view(this.appState);
      this.currentView.render();
    }
  }
}

new App();
