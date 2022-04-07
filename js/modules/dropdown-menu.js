import outsideClick from "./outside-click.js";

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = "active";

    // Define click e touchstart como default para events
    if(this.events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;

    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // Ativa o dropdownmenu e adiciona
  // a funcao que observa o clique fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;  
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  addDropdownMenuEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init(){
    if(this.dropdownMenus.length)
      this.addDropdownMenuEvent();
    return this;
  }

  
}
