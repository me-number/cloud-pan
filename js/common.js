document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var html = document.querySelector('html'),
    menuOpenIcon = document.querySelector(".icon__menu"),
    menuCloseIcon = document.querySelector(".nav__icon-close"),
    menuList = document.querySelector(".main-nav"),
    searchOpenIcon = document.querySelector(".icon__search"),
    searchCloseIcon = document.querySelector(".search__close"),
    searchInput = document.querySelector(".search__text"),
    search = document.querySelector(".search"),
    searchBox = document.querySelector(".search__box"),
    toggleTheme = document.querySelector(".toggle-theme"),
    btnScrollToTop = document.querySelector(".top");


  /* =======================================================
  // Menu + Search + Theme Switcher
  ======================================================= */
  menuOpenIcon.addEventListener("click", () => {
    menuOpen();
  });

  menuCloseIcon.addEventListener("click", () => {
    menuClose();
  });

  function menuOpen() {
    menuList.classList.add("is-open");
  }
  
  function menuClose() {
    menuList.classList.remove("is-open");
  }

  searchOpenIcon.addEventListener("click", () => {
    searchOpen();
  });

  searchCloseIcon.addEventListener("click", () => {
    searchClose();
  });

  function searchOpen() {
    search.classList.add("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 250);
  }

  function searchClose() {
    search.classList.remove("is-visible");
  }

  searchBox.addEventListener("keydown", function(event) {
    if (event.target == this || event.keyCode == 27) {
      search.classList.remove('is-visible');
    }
  });

  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      darkMode();
    });
  };


  // Theme Switcher
  function darkMode() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("dark");
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  }


  // =====================
  // Simple Jekyll Search
  // =====================
  SimpleJekyllSearch({
    searchInput: document.getElementById("js-search-input"),
    resultsContainer: document.getElementById("js-results-container"),
    json: "/search.json",
    searchResultTemplate: '{article}',
    noResultsText: '<h3 class="no-results">No results found</h3>'
  });


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");

/* =======================
  // 修正全屏空白后的 JS
  ======================= */
document.addEventListener("DOMContentLoaded", function() {
  const baseSelector = ".post-image img, .page__content img, .post__content img, .gallery__image img";

  function applyLightense() {
    // 检查 Lightense 是否存在
    if (typeof Lightense === "function") {
      Lightense(`${baseSelector}:not(.no-lightense)`, {
        padding: 40,   // 稍微减少边距
        offset: 10,    // 显著减少偏移，防止计算错误
        duration: 300, // 缩短动画时间，防止动画卡死在空白状态
        cubicBezier: 'cubic-bezier(.2, 0, .1, 1)'
      });
    }
  }

  // 监听图片加载，防止图片还没显示就初始化导致空白
  const allImgs = document.querySelectorAll(baseSelector);
  allImgs.forEach(img => {
    if (img.complete) {
      applyLightense();
    } else {
      img.addEventListener('load', applyLightense);
    }
  });

  window.addEventListener("load", applyLightense);
});


  /* =================================
  // Smooth scroll to the tags page
  ================================= */
  document.querySelectorAll(".tag__link, .top__link").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

});