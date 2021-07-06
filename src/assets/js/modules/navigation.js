const body = document.querySelector("body");
const navMenu = document.querySelector(".js-mobilemenu");
const navToggles = document.querySelectorAll(".js-navtoggle");
const activeClass = "is-active";
const noscrollClass = "u-noscroll";

function init() {
  // return if not available
  if (window.NodeList && !NodeList.prototype.forEach) {
    return;
  }

  // toggle nav for both links
  navToggles.forEach((item) => {
    item.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        navMenu.classList.toggle(activeClass);
        body.classList.toggle(noscrollClass);
      },
      false
    );
  });
}

export default init;
