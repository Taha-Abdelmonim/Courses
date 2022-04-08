// hide and show Mega Menu
let toggleMenu = document.querySelector("div.toggle-class-open-menu"),
  toggleMenuCLink = document.querySelector("div.toggle-class-open-menu > a"),
  MenuDiv = document.querySelector("div.menu"),
  megaMenu = document.querySelector(".mega-menu"),
  settingsBox = document.querySelector(".settings-box"),
  headerArea = document.querySelector(".header-area"),
  heightArea = headerArea.offsetHeight;
settingsBox.style.top = `${heightArea}px`;
toggleMenu.onclick = (e) => {
  e.preventDefault();
  MenuDiv.classList.toggle("open");
  megaMenu.style.top = `${heightArea - 2}px`;
  if (MenuDiv.classList.contains("open")) {
    toggleMenu.lastElementChild.style.cssText = "transform: rotateZ(-180deg); color: var(--main-color);";
    toggleMenuCLink.style.color = "var(--main-color)";
  } else {
    toggleMenu.lastElementChild.style.cssText = "transform: rotateZ(0deg); color: var(--site-color);";
    toggleMenuCLink.style.color = "var(--site-color)";
  }
};
// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");
  if (this.classList.contains("fa-spin")) {
    this.parentElement.style.background = "#ff0054";
  } else {
    this.parentElement.style.background = "#fb6376";
  }
  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // Reload Window
  window.location.reload();
};

// // Toggle Mode
window.addEventListener("load", () => {
  let mod = document.querySelector(".mod span"),
    bod = document.querySelector("body");
  mod.addEventListener("click", (e) => {
    bod.classList.toggle("dark");
    bod.classList.contains("dark") ? (mod.className = "fas fa-moon") : (mod.className = "fas fa-sun");
  });
});
AOS.init();

