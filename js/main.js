// Live2D Cursor promo site — small interaction layer, no dependencies.

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
      "meta.title": "Live2D Cursor — 把你的 Live2D 模型锚定在鼠标上",
      "meta.description": "Live2D Cursor 把任意 Live2D 模型锚定在你的鼠标光标上——光标去哪，模型就跟到哪；拖拽甩出弹性物理效果，热键一键触发表情。原生 C++ 轻量运行，支持 OBS 友好背景模式与 5 国语言。",
      "nav.features": "功能",
      "nav.how": "工作原理",
      "nav.languages": "语言",      "nav.team": "团队",      "nav.steamCta": "Steam 上架准备中",
      "hero.eyebrow": "轻松让你的 Live2D 模型跟随鼠标移动！",
      "hero.sub": "Live2D鼠标桌宠",
      "hero.desc": "导入任意 Live2D 模型，让它跟随鼠标移动，并加入物理效果、快捷键表情与待机动画。无论是直播、绘画、视频录制，还是日常使用电脑，都能让你的角色陪伴你的每一次点击。",
      "hero.cta": "Steam 上架准备中",
      "hero.stat2": "语言本地化",
      "features.eyebrow": "核心功能",
      "features.h2": "每一个功能都为Live2D模型与键鼠互动而设计",
      "features.desc": "轻松体验 Live2D 模型互动的乐趣！",
      "features.f1.title": "锚点跟随系统",
      "features.f1.desc": "自动检测、点击选择或按 ArtMesh ID 搜索，精准锁定模型的“锚点”，让视线始终追随鼠标。",
      "features.f2.title": "拖拽物理效果",
      "features.f2.desc": "拖动模型时触发模型绑定的物理反馈，增益强度可调。",
      "features.f3.title": "表情与热键绑定",
      "features.f3.desc": "键盘或鼠标按键即可触发表情，按住/点击双模式，淡入淡出时长自由配置。",
      "features.f4.title": "OBS 友好背景模式",
      "features.f4.desc": "透明背景 + 置顶 + 后台渲染三件套，窗口从屏幕隐藏但持续渲染，完美适配直播采集。",
      "features.f5.title": "全局热键与穿透覆盖",
      "features.f5.desc": "一键切换点击穿透 + 置顶悬浮层，覆盖模式 / 全屏 / 切换模型，热键全部可自定义。",
      "features.f6.title": "多模型管理",
      "features.f6.desc": "拖拽 <code>.model3.json</code> 到窗口即可加载，多角色随时切换，设置可单独保存至电脑。",
      "how.eyebrow": "上手只要三步",
      "how.h2": "从拖入模型到桌面搭档，不到一分钟",
      "how.s1.title": "拖入模型",
      "how.s1.desc": "把 <code>.model3.json</code> 拖到控制面板窗口，模型立即出现在桌面上。",
      "how.s2.title": "设定模型",
      "how.s2.desc": "点击选择锚点、大小、物理效果，模型从此追随鼠标移动。",
      "how.s3.title": "绑定热键",
      "how.s3.desc": "为表情配置快捷键，启用覆盖模式后即可享受。",
      "languages.eyebrow": "多语言支持",
      "languages.h2": "5 种语言，无缝本地化界面",
      "cta.h2": "准备好把你的模型锚定在鼠标上了吗？",
      "cta.desc": "Live2D Cursor 基于 Live2D Cubism SDK 原生构建，Steam 上架准备中。",
      "cta.btn": "Steam 上架准备中",
      "footer.tagline": "轻量级 Live2D 鼠标跟随桌宠",
      "footer.note": "基于 <a href=\"https://www.live2d.com/\" target=\"_blank\" rel=\"noopener\">Live2D Cubism SDK</a> 构建。",
      "team.eyebrow": "认识我们的团队",
      "team.h1": "我们是 Bluebearry 🐻",
      "team.desc": "只是两个真心热爱 Live2D 的人。一个负责把角色的灵魂捏出来，一个负责把它写进代码、搬上你的桌面——合起来，就是 Live2D Cursor。",
      "team.modeler.role": "Live2D 模型师",
      "team.modeler.name": "建模师",
      "team.modeler.bio": "自 2020 年起从事 Live2D 建模，拥有丰富的商业委托与个人作品经验，作品多次入选官方评选活动并获奖。对自然形变、表情绑定与物理效果有着极致的追求，让每一个模型都真正“活”起来。",
      "team.modeler.tag1": "建模经验始于 2020",
      "team.modeler.tag2": "获官方奖项认可",
      "team.dev.role": "程序开发",
      "team.dev.name": "程序员",
      "team.dev.bio": "用原生 C++ 和 Cubism SDK 开发 Live2D Cursor，专注于让它保持轻量、跟手、好用。",
      "team.dev.tag1": "原生 C++",
      "team.dev.tag2": "实时渲染",
      "team.contact.desc": "有问题、建议，或者单纯想聊聊 Live2D？我们很乐意听你说。",
      "team.contact.btn": "✉ bluebearry.work@gmail.com"
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
      var metaDescKey = metaDesc ? (metaDesc.getAttribute("data-i18n") || "meta.description") : "meta.description";
      en[metaDescKey] = metaDesc ? metaDesc.getAttribute("content") : "";
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
      var metaDescKey = metaDesc ? (metaDesc.getAttribute("data-i18n") || "meta.description") : "meta.description";
      if (metaDesc && dict[metaDescKey]) metaDesc.setAttribute("content", dict[metaDescKey]);

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
      videoSource.src = "assets/introvideo2.mp4";
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
