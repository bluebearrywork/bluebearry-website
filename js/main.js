// Live2DCursor promo site — small interaction layer, no dependencies.

(function () {
  "use strict";

  /* ---------- Steam link wiring ---------- */
  // TODO: the Steam page isn't live yet - replace STEAM_URL with the real store URL
  // once it exists. Every button/link sharing the "js-steam-link" class (nav, hero,
  // download CTA, footer) updates from here. Until then, clicks are safely no-ops
  // instead of popping open a blank duplicate tab.
  var STEAM_URL = "#";
  var steamReady = STEAM_URL !== "#";
  document.querySelectorAll(".js-steam-link").forEach(function (el) {
    el.href = STEAM_URL;
    if (!steamReady) {
      el.removeAttribute("target");
      el.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });

  /* ---------- i18n: English by default, toggle to Chinese ---------- */
  (function () {
    var STORAGE_KEY = "l2dcursor_lang";

    var zh = {
      "meta.title": "Live2DCursor — 把你的 Live2D 模型锚定在鼠标上",
      "meta.description": "Live2DCursor 把任意 Live2D 模型锚定在你的鼠标光标上——光标去哪，模型就跟到哪；拖拽甩出弹性物理效果，热键一键触发表情。原生 C++ 轻量运行，支持 OBS 友好背景模式、6 大主题与 5 国语言。",
      "nav.features": "功能",
      "nav.how": "工作原理",
      "nav.themes": "主题",
      "nav.languages": "语言",
      "nav.steamCta": "在 Steam 上获取",
      "hero.eyebrow": "原生 C++ · Live2D 锚定于鼠标",
      "hero.sub": "锚定于你的鼠标",
      "hero.desc": "Live2DCursor 把模型上的锚点直接锁在你的鼠标光标上——光标去哪，模型就跟到哪。甩动鼠标会甩出弹性物理效果，按键或点击瞬间触发表情。轻量、直播友好，把你的鼠标变成一个活生生的角色。",
      "hero.cta": "⬇ 在 Steam 上获取",
      "hero.stat1": "内置主题",
      "hero.stat2": "语言本地化",
      "hero.stat3": "键 Steam 安装",
      "features.eyebrow": "核心能力",
      "features.h2": "为「把 Live2D 锚定在鼠标上」而生的每一个细节",
      "features.desc": "从锚点跟随到直播露出，Live2DCursor 把 VTuber 级别的鼠标绑定交互体验装进一个轻量应用。",
      "features.f1.title": "锚点跟随系统",
      "features.f1.desc": "自动检测、点击选择，或按 ArtMesh ID 搜索，在模型上选取任意一点——把它锁定到鼠标光标上，整个模型都会跟着光标移动。",
      "features.f2.title": "拖拽物理效果",
      "features.f2.desc": "因为模型的锚点被锁定在鼠标光标上，甩动鼠标就会甩出弹性物理反馈，增益强度实时可调，让每次移动都软萌又有分量感。",
      "features.f3.title": "表情与热键绑定",
      "features.f3.desc": "键盘或鼠标按键即可触发表情，Hold / Toggle 双模式，淡入淡出时长自由配置。",
      "features.f4.title": "OBS 友好背景模式",
      "features.f4.desc": "透明背景 + 置顶 + 后台渲染三件套，窗口从屏幕隐藏但持续渲染，完美适配直播采集。",
      "features.f5.title": "全局热键与穿透覆盖",
      "features.f5.desc": "一键切换点击穿透 + 置顶悬浮层，覆盖模式 / 全屏 / 切换模型，热键全部可自定义。",
      "features.f6.title": "多模型管理",
      "features.f6.desc": "拖拽 <code>.model3.json</code> 到窗口即可加载，多角色随时切换，独立缩放与位置偏移。",
      "how.eyebrow": "上手只要三步",
      "how.h2": "从拖入模型到锚定鼠标，不到一分钟",
      "how.s1.title": "拖入模型",
      "how.s1.desc": "把 <code>.model3.json</code> 拖到控制面板窗口，模型立即出现在桌面上。",
      "how.s2.title": "设定锚点",
      "how.s2.desc": "自动检测或点击选择锚点——从此这一点会锁定在鼠标光标上，整个模型都会跟随光标移动。",
      "how.s3.title": "绑定热键",
      "how.s3.desc": "为表情、置顶、覆盖模式配置快捷键，剩下的交给锚定在鼠标上的它。",
      "themes.eyebrow": "个性化外观",
      "themes.h2": "6 款内置主题，总有一款对味",
      "themes.desc": "控制面板本身也是可以“换装”的角色，一键切换配色，随心情决定今天的氛围。",
      "theme.dark": "暗黑",
      "theme.sakura": "樱花粉",
      "theme.cyan": "青石蓝",
      "theme.mint": "薄荷绿",
      "theme.lavender": "薰衣草",
      "theme.orange": "炫酷橙",
      "languages.eyebrow": "全球化",
      "languages.h2": "5 种语言，无缝本地化界面",
      "cta.h2": "准备好把你的模型锚定在鼠标上了吗？",
      "cta.desc": "Live2DCursor 基于 Live2D Cubism SDK 原生构建，现在就去 Steam 获取吧。",
      "cta.btn": "⬇ 在 Steam 上获取",
      "footer.tagline": "轻量级 Live2D 鼠标锚定工具 · 用 C++ 与 ❤ 构建",
      "footer.poweredBy": "基于 Live2D Cubism SDK 构建",
      "footer.note": "基于 <a href=\"https://www.live2d.com/\" target=\"_blank\" rel=\"noopener\">Live2D Cubism SDK</a> 构建。图标来自 Game Icon Pack（SIL OFL）。本站与 Live2D Inc. 无任何官方关联。"
    };

    var en = {}; // captured from the authored English DOM on first load

    function captureEnglish() {
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        en[el.getAttribute("data-i18n")] = el.textContent;
      });
      document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
        en[el.getAttribute("data-i18n-html")] = el.innerHTML;
      });
      var metaDesc = document.getElementById("metaDescription");
      en["meta.description"] = metaDesc ? metaDesc.getAttribute("content") : "";
    }

    function applyLanguage(lang) {
      var dict = lang === "zh" ? zh : en;

      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
      });
      document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
        var key = el.getAttribute("data-i18n-html");
        if (dict[key]) el.innerHTML = dict[key];
      });

      var metaDesc = document.getElementById("metaDescription");
      if (metaDesc && dict["meta.description"]) metaDesc.setAttribute("content", dict["meta.description"]);

      document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

      document.querySelectorAll(".lang-btn").forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
      });

      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore (private mode etc.) */ }
    }

    captureEnglish();

    var savedLang = null;
    try { savedLang = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    applyLanguage(savedLang === "zh" ? "zh" : "en");

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });
  })();

  /* ---------- cursor-follow glow (mirrors the app's mouse-follow feature) ---------- */
  var glow = document.getElementById("cursorGlow");
  if (glow) {
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var curX = targetX;
    var curY = targetY;

    window.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function animateGlow() {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      glow.style.transform = "translate(" + curX + "px, " + curY + "px)";
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
  }

  /* ---------- hero background video (desktop + motion-safe only) ---------- */
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isWideEnough = window.innerWidth > 760;
    if (!prefersReducedMotion && isWideEnough) {
      var videoSource = document.createElement("source");
      videoSource.src = "assets/introvideo.mp4";
      videoSource.type = "video/mp4";
      heroVideo.appendChild(videoSource);
      heroVideo.addEventListener("playing", function () {
        heroVideo.classList.add("is-visible");
      });
      heroVideo.load();
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          /* autoplay blocked by browser — static hero background remains */
        });
      }
    }
  }

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- navbar background intensity on scroll ---------- */
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 12) {
        navbar.style.boxShadow = "0 12px 30px -20px rgba(0,0,0,0.6)";
      } else {
        navbar.style.boxShadow = "none";
      }
    });
  }
})();
