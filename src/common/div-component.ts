export class DivComponent {
  protected el: HTMLDivElement;

  constructor() {
    this.el = document.createElement("div");
  }

  render(): HTMLDivElement {
    return this.el;
  }
}
