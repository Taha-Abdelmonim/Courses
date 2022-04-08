
// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {
  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");
  if (this.classList.contains("fa-spin")) {
    this.parentElement.style.cssText =
      "background-color: #ff0054; box-shadow: 1px 1px 2px #b8b9be, -0.5px -0.5px 0px #fff, inset 2px 2px 5px #b8b9be, inset -1px -1px 3px #fff; text-shadow: 1px 1px 1px #5559, -1px -1px 1px #fff9";
  } else {
    this.parentElement.style.cssText =
      "background-color: #fb6376; box-shadow: 2px 2px 2px #343434, -0.5px -0.5px 0px #fff, inset -2px -2px 5px #b8b9be, inset 1px 1px 2px #aaa2,inset 2px 2px 5px #fff;";
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

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// let s = document.getElementById("id");

// Loop On All Spans background
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}

randomizeImgs();

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links li a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault(); // disabl # in a or link
      if (e.target.dataset.section == ".home") {
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
        // console.log(this.offsetTop);
      }

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
      allLinks.forEach((element) => {
        element.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullets_option");
  localStorage.clear();

  // Reload Window
  window.location.reload();
};

// Click Anywhere Outside Menu And Toggle Button
// document.addEventListener("click", (e) => {
//   if (e.target !== toggleBtn && e.target !== tLinks) {
//     // Check If Menu Is Open
//     if (tLinks.classList.contains("open")) {
//       // Toggle Class "menu-active" On Button
//       toggleBtn.classList.toggle("menu-active");

//       // Toggle Class "open" On Links
//       tLinks.classList.toggle("open");
//     }
//   }
// });

// Stop Propagation On Menu
// tLinks.onclick = function (e) {
//   e.stopPropagation();
// };

// .classList.remove("active");

const handelBulet = (ele) => {
  ele.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ele.classList.add("active");
  allLinks.forEach((el) => {
    if (el.dataset.section === ele.dataset.section) {
      allLinks.forEach((element) => {
        element.classList.remove("active");
      });
      el.classList.add("active");
    }
  });
};

//  show before bolts
window.onscroll = () => {
  // console.log(window.pageYOffset);
  if (document.querySelector(".home").offsetTop <= window.pageYOffset) {
    let ele = document.querySelector(".bullet[data-section='.home']");
    handelBulet(ele);
  }
  if (document.querySelector(".work-steps").offsetTop <= window.pageYOffset) {
    let ele = document.querySelector(".bullet[data-section='.work-steps']");
    handelBulet(ele);
  }
  if (document.querySelector(".services").offsetTop - 100 <= window.pageYOffset) {
    let ele = document.querySelector(".bullet[data-section='.services']");
    handelBulet(ele);
  }
  if (document.querySelector(".information").offsetTop - 100 <= window.pageYOffset) {
    let ele = document.querySelector(".bullet[data-section='.information']");
    handelBulet(ele);
  }
  if (document.querySelector(".contact").offsetTop - 100 <= window.pageYOffset) {
    let ele = document.querySelector(".bullet[data-section='.contact']");
    handelBulet(ele);
  }
  if (document.querySelector(".footer").offsetTop - 200 <= window.pageYOffset) {
    let ele = document.querySelector(".bullet[data-section='.footer']");
    handelBulet(ele);
  }
};

let headerArea = document.querySelector(".header-area");
let heightArea = headerArea.offsetHeight;
landingPage.style.marginTop = `${heightArea}px`;

// Toggle Mode
window.addEventListener("load", () => {
  let mode = document.querySelector(".mode i"),
    body = document.querySelector("body");
  mode.addEventListener("click", (e) => {
    body.classList.toggle("dark");
    body.classList.contains("dark") ? (mode.className = "fas fa-moon") : (mode.className = "fas fa-sun");
  });
});

// hide and show Mega Menu
let toggleMenu = document.querySelector("div.toggle-class-open-menu");
let toggleMenuCLink = document.querySelector("div.toggle-class-open-menu > a");
let MenuDiv = document.querySelector("div.menu");
let megaMenu = document.querySelector(".mega-menu");
let SettingsBox = document.querySelector(".settings-box");
SettingsBox.style.top = `${heightArea}px`;
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

//     transform: rotateZ(-180deg);
// Handel show Hide section
let links = document.querySelector(".links");
let toggleSection = document.querySelector(".toggle-menu");

toggleSection.onclick = () => {
  toggleSection.classList.toggle("open");
  links.classList.toggle("open");
};

// write Effect
let text = `Information is processed, organized and structured data. It provides context for data and enables decision making process. For example, a single customer’s sale at a restaurant is data – this becomes information when the business is able to identify the most popular or least popular dish More technically`,
  i = 0;
window.onload = () => {
  let typeWriter = setInterval(() => {
    document.querySelector(".introduction-text p").textContent += text[i];
    i += 1;
    if (i > text.length - 1) {
      i = 0;
      document.querySelector(".introduction-text p").textContent = "";
    }
  }, 100);
};
AOS.init();
