/* =========================================================
   交互与渲染 —— 网站的大脑 🧠
   读取 window.PORTFOLIO_DATA，把数据渲染成页面，
   并处理灯箱、主题切换、移动端菜单、iframe 降级与缺图占位。
   无需任何第三方库。
   ========================================================= */
(function () {
  "use strict";

  var D = window.PORTFOLIO_DATA || {};

  /* ---------- 小工具 ---------- */

  // HTML 转义，防止内容里的特殊字符破坏结构（也防 XSS）
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // 仅允许安全链接，挡掉 javascript: 之类的危险协议。
  // 放行：http(s) / mailto: / 锚点 / 绝对路径(/) / 相对路径(如 articles/xxx.html)
  function safeUrl(u) {
    u = String(u || "");
    if (/^(https?:\/\/|mailto:|#|\/|\.\/|\.\.\/)/i.test(u)) return u;
    // 纯相对路径（字母/数字/./-/_ 组成，且不含 scheme 冒号）
    if (/^[a-z0-9_.\/-]+$/i.test(u) && !/:/.test(u)) return u;
    // 带 scheme 但不是上述安全项 → 拦截（如 javascript:、data:）
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return "#";
    return "#";
  }

  // 缺图兜底：换成内联 SVG 占位（渐变 + 文字），零外部请求
  window.imgFallback = function (img) {
    img.onerror = null;
    var text = img.getAttribute("data-ph") || "图片待补";
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#e9eef5'/><stop offset='1' stop-color='#cfd8e6'/>" +
      "</linearGradient></defs>" +
      "<rect width='100%' height='100%' fill='url(#g)'/>" +
      "<text x='50%' y='50%' font-family='sans-serif' font-size='22' fill='#8a94a6' " +
      "text-anchor='middle' dominant-baseline='middle'>" + esc(text) + "</text></svg>";
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    img.classList.add("img-ph");
  };

  // 构建一张图片（带占位兜底）
  function imgTag(src, alt, phText, cls) {
    if (!src) return "";
    return (
      '<img class="' + (cls || "") + '" src="' + esc(src) + '" alt="' + esc(alt) + '" ' +
      'loading="lazy" decoding="async" data-ph="' + esc(phText || "图片待补") + '" ' +
      'onerror="imgFallback(this)">'
    );
  }

  /* ---------- 灯箱状态 ---------- */
  var photos = D.photos || [];
  var lightboxIndex = -1;

  /* =========================================================
     渲染：Hero / 导航品牌 / 页脚
     ========================================================= */
  function renderShell() {
    var site = D.site || {};
    var $ = function (id) { return document.getElementById(id); };

    if (site.name) {
      if ($("brandName")) $("brandName").textContent = site.name;
      if ($("heroName")) $("heroName").textContent = site.name;
      document.title = site.name + " · 个人作品集";
    }
    if (site.title && $("heroTitle")) $("heroTitle").textContent = site.title;
    if (site.bio && $("heroBio")) $("heroBio").textContent = site.bio;
    if (site.footer && $("footerText")) {
      $("footerText").textContent = "© " + new Date().getFullYear() + " " + site.footer;
    }
    var yr = $("year"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* =========================================================
     渲染：摄影作品（画廊 + 灯箱）
     ========================================================= */
  function renderPhotos() {
    var grid = document.getElementById("photosGrid");
    if (!grid) return;
    var list = photos;

    if (!list.length) {
      grid.innerHTML = '<div class="empty">还没有上传照片。</div>';
      return;
    }

    grid.innerHTML = list.map(function (ph, idx) {
      var meta = [];
      if (ph.location) meta.push(esc(ph.location));
      if (ph.date) meta.push(esc(ph.date));
      var metaHtml = meta.length ? '<span class="photo-card__meta">' + meta.join(" · ") + "</span>" : "";

      return (
        '<button class="photo-card" type="button" data-index="' + idx + '" aria-label="打开 ' + esc(ph.title) + '">' +
          imgTag(ph.src, esc(ph.title), "照片待补", "photo-card__img") +
          '<span class="photo-card__overlay">' +
            '<span class="photo-card__title">' + esc(ph.title) + "</span>" +
            '<span class="photo-card__desc">' + esc(ph.description || "") + "</span>" +
            metaHtml +
          "</span>" +
        "</button>"
      );
    }).join("");
  }

  /* =========================================================
     交互：灯箱（Lightbox）
     ========================================================= */
  function initLightbox() {
    var box = document.getElementById("lightbox");
    var img = document.getElementById("lightboxImg");
    var title = document.getElementById("lightboxTitle");
    var desc = document.getElementById("lightboxDesc");
    var closeBtn = document.getElementById("lightboxClose");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");
    if (!box || !img || !title || !desc) return;

    function open(idx) {
      if (idx < 0 || idx >= photos.length || !photos[idx]) return;
      lightboxIndex = idx;
      var ph = photos[idx];
      img.src = ph.src || "";
      img.alt = ph.title || "";
      title.textContent = ph.title || "";
      desc.textContent = (ph.description || "") + (ph.location ? "  —  " + ph.location : "");
      box.hidden = false;
      document.body.classList.add("lightbox-open");
      if (closeBtn) closeBtn.focus();
      updateNav();
    }

    function close() {
      box.hidden = true;
      document.body.classList.remove("lightbox-open");
      img.src = "";
      img.alt = "";
      lightboxIndex = -1;
    }

    function prev() { open((lightboxIndex - 1 + photos.length) % photos.length); }
    function next() { open((lightboxIndex + 1) % photos.length); }
    function updateNav() {
      if (prevBtn) prevBtn.disabled = photos.length <= 1;
      if (nextBtn) nextBtn.disabled = photos.length <= 1;
    }

    // 点击画廊中的照片打开灯箱
    var grid = document.getElementById("photosGrid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var card = e.target.closest(".photo-card");
        if (!card) return;
        var idx = parseInt(card.getAttribute("data-index"), 10);
        if (!isNaN(idx)) open(idx);
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });

    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && photos.length > 1) prev();
      if (e.key === "ArrowRight" && photos.length > 1) next();
    });
  }

  /* =========================================================
     渲染：小插件
     ========================================================= */
  function renderPlugins() {
    var grid = document.getElementById("pluginsGrid");
    if (!grid) return;
    var list = D.plugins || [];

    if (!list.length) {
      grid.innerHTML = '<div class="empty">还没有上架的小插件。</div>';
      return;
    }

    grid.innerHTML = list.map(function (pl) {
      var preview = "";
      if (pl.previewType === "iframe" && pl.demoUrl) {
        preview =
          '<div class="plugin__preview">' +
            '<iframe src="' + esc(safeUrl(pl.demoUrl)) + '" ' +
            'title="' + esc(pl.name) + ' 预览" loading="lazy"></iframe>' +
          "</div>";
      }
      // 无论 iframe 是否成功，都提供一个稳定可用的「新标签打开」入口（降级保障）
      var link = pl.demoUrl
        ? '<a class="btn btn--primary btn--sm" href="' + esc(safeUrl(pl.demoUrl)) +
          '" target="_blank" rel="noopener noreferrer">在线试用 ↗</a>'
        : "";

      return (
        '<article class="card">' +
          '<div class="card__media">' + imgTag(pl.screenshot, pl.name + " 预览", "预览图待补") + "</div>" +
          '<div class="card__body">' +
            '<h3 class="card__title">' + esc(pl.name) + "</h3>" +
            '<p class="card__desc">' + esc(pl.description) + "</p>" +
            (pl.scenarios ? '<div class="plugin__scenario">📌 ' + esc(pl.scenarios) + "</div>" : "") +
            preview +
            (link ? '<div class="card__links">' + link + "</div>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* =========================================================
     渲染：公众号文章（时间线，按日期倒序）
     ========================================================= */
  function renderArticles() {
    var ol = document.getElementById("articlesTimeline");
    if (!ol) return;
    var list = (D.articles || []).slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });

    if (!list.length) {
      ol.innerHTML = '<li class="empty">还没有导入文章。</li>';
      return;
    }

    ol.innerHTML = list.map(function (a) {
      return (
        '<li class="timeline__item">' +
          '<span class="timeline__dot" aria-hidden="true"></span>' +
          '<div class="timeline__date">' + esc(a.date || "") + "</div>" +
          '<a class="timeline__card" href="' + esc(safeUrl(a.url)) + '" ' +
            'target="_blank" rel="noopener noreferrer">' +
            '<div class="timeline__title">' + esc(a.title) + "</div>" +
            (a.summary ? '<p class="timeline__summary">' + esc(a.summary) + "</p>" : "") +
            '<div class="timeline__more">阅读原文 ↗</div>' +
          "</a>" +
        "</li>"
      );
    }).join("");
  }

  /* =========================================================
     渲染：关于我
     ========================================================= */
  function renderAbout() {
    var box = document.getElementById("aboutCard");
    if (!box) return;
    var ab = D.about || {};
    var bioHtml = (ab.bio || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    var c = ab.contacts || {};
    var contacts = [];
    if (c.email) {
      contacts.push(
        '<a class="contact" href="mailto:' + esc(c.email) + '">' +
        '<span class="contact__icon">✉️</span><span>' + esc(c.email) + "</span></a>"
      );
    }
    if (c.github) {
      contacts.push(
        '<a class="contact" href="' + esc(safeUrl(c.github)) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="contact__icon">🐙</span><span>GitHub</span></a>'
      );
    }
    if (c.wechatOfficial) {
      contacts.push(
        '<a class="contact" href="#" onclick="return false;">' +
        '<span class="contact__icon">💬</span><span>公众号：' + esc(c.wechatOfficial) + "</span></a>"
      );
    }

    var qrHtml = "";
    if (ab.qr) {
      qrHtml =
        '<div class="qr">' +
          imgTag(ab.qr, "公众号二维码", "二维码", "") +
          (c.wechatOfficial ? '<div class="qr__caption">扫码关注：' + esc(c.wechatOfficial) + "</div>" : "") +
        "</div>";
    }

    box.innerHTML =
      '<div class="about__bio">' + (bioHtml || "<p>这个人很神秘，还没写介绍。</p>") + "</div>" +
      '<div class="about__side">' +
        (contacts.length ? '<div class="contacts">' + contacts.join("") + "</div>" : "") +
        qrHtml +
      "</div>";
  }

  /* =========================================================
     交互：主题切换（明/暗），记住偏好
     ========================================================= */
  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("themeToggle");
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";
    }
    applyTheme(saved);

    function applyTheme(mode) {
      root.setAttribute("data-theme", mode);
      if (btn) {
        var dark = mode === "dark";
        btn.setAttribute("aria-pressed", dark ? "true" : "false");
        btn.querySelector(".theme-toggle__icon").textContent = dark ? "☀️" : "🌙";
        btn.querySelector(".theme-toggle__label").textContent = dark ? "浅色" : "深色";
      }
    }

    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }
  }

  /* =========================================================
     交互：移动端导航折叠
     ========================================================= */
  function initNav() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    // 点击链接后自动收起（移动端）
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================================
     交互：滚动高亮当前导航项
     ========================================================= */
  function initScrollSpy() {
    var links = document.querySelectorAll(".nav__link");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id) map[id] = a;
    });
    var sections = Object.keys(map)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          var active = map[en.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { obs.observe(s); });
  }

  /* =========================================================
     启动
     ========================================================= */
  function init() {
    renderShell();
    renderPhotos();
    initLightbox();
    renderPlugins();
    renderArticles();
    renderAbout();
    initTheme();
    initNav();
    initScrollSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
