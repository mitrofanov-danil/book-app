export abstract class AbstractView {
  app: HTMLElement | null;

  constructor() {
    this.app = document.getElementById("root");
  }

  setTitle(title: string): void {
    document.title = title;
  }

  abstract render(): void;

  destroy(): void {
    return;
  }
}
