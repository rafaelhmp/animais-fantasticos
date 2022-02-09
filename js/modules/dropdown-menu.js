export default function initDropdownMenu() {}
import outsideClick from "./outside-click.js";

const dropdownMenus = document.querySelectorAll("[data-dropdown]");
dropdownMenus.forEach((menu) => {
  ["click", "touchstart"].forEach((userEvent) => {
    menu.addEventListener(userEvent, handleClick);
  });
});

function handleClick(event) {
  event.preventDefault();
  this.classList.add("active");
  outsideClick(this, ["click", "touchstart"], () => {
    this.classList.remove("active");
  });
}
