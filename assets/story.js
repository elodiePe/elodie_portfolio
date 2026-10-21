/* The story of a case study, told on a phone: you follow one user through their day. Every moment is a screen of the phone,
   and it changes as you scroll. The "before" moments show the problem (the real screens people struggle with), the "after"
   moments show the answer. The screens are small, working pieces of interface: you can type in a search field, flip a card,
   accept a request, take the challenge. Data lives in stories.js; window.buildStory(box, story) draws it. */
(function(){
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; }
  function q(t){ return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }

  /* ---- the pieces of interface a screen is made of: ["type", ...arguments] ---- */
  var U = {
    bar: function(a, ctx){
      var d = el("div", "u-bar" + (ctx.th ? " brand" : ""));
      if(ctx.th) d.appendChild(el("i", "dial", "⌚"));
      d.appendChild(el("b", null, a[1])); if(a[2]) d.appendChild(el("span", null, a[2])); return d;
    },
    search: function(a, ctx){
      var d = el("label", "u-search"); d.appendChild(el("i", null, "⌕")); var i = el("input");
      i.type = "search"; i.placeholder = a[1] || ""; i.value = a[2] || ""; i.setAttribute("aria-label", a[1] || "Search"); i.autocomplete = "off";
      d.appendChild(i); if(a[3]) d.appendChild(el("i", "tail", a[3])); ctx.search = i; return d;
    },
    sheet: function(a){
      var w = el("div", "u-sheetwrap"), t = el("table", "u-sheet"); if(!reduced) t.classList.add("pan");
      a[1].forEach(function(r, ri){ var tr = el("tr"); r.forEach(function(c){ tr.appendChild(el(ri ? "td" : "th", null, c)); }); t.appendChild(tr); });
      w.appendChild(t); return w;
    },
    list: function(a){
      var ul = el("ul", "u-list");
      a[1].forEach(function(r){
        var li = el("li", "u-row"); li.setAttribute("data-q", q(r[0] + " " + (r[1] || "")));
        li.appendChild(el("span", "u-thumb", r[2] || "•"));
        var d = el("div"); d.appendChild(el("b", null, r[0]));
        if(r[1]){ var sp = el("span"); sp.innerHTML = String(r[1]).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/(CHF [\d ' ]+)/, '<b class="pr">$1</b>'); d.appendChild(sp); }
        li.appendChild(d);
        li.addEventListener("click", function(){ [].forEach.call(ul.children, function(o){ o.classList.remove("on"); }); li.classList.add("on"); });
        ul.appendChild(li);
      });
      return ul;
    },
    cards: function(a){
      var g = el("div", "u-cards");
      a[1].forEach(function(r){
        var c = el("button", "u-card"); c.type = "button"; c.setAttribute("data-q", q(r[0] + " " + (r[1] || "")));
        c.appendChild(el("span", "u-pic", r[2] || "⌚")); c.appendChild(el("b", null, r[0])); if(r[1]) c.appendChild(el("span", null, r[1]));
        c.addEventListener("click", function(){ c.classList.toggle("big"); });
        g.appendChild(c);
      });
      return g;
    },
    chips: function(a){
      var d = el("div", "u-chips");
      a[1].forEach(function(t, i){ var c = el("button", "u-chip" + (i === (a[2] || 0) ? " on" : ""), t); c.type = "button";
        c.addEventListener("click", function(){ [].forEach.call(d.children, function(o){ o.classList.remove("on"); }); c.classList.add("on"); }); d.appendChild(c); });
      return d;
    },
    bubble: function(a){ return el("div", "u-bubble " + (a[2] || "them"), a[1]); },
    note: function(a){ var n = el("div", "u-note", a[1]); if(a[2] != null) n.style.setProperty("--h", a[2]); if(a[3] != null) n.style.setProperty("--r", a[3] + "deg"); return n; },
    alert: function(a){ return el("div", "u-alert", a[1]); },
    toast: function(a){ return el("div", "u-toast", a[1]); },
    cap: function(a){ return el("p", "u-cap", a[1]); },
    btn: function(a){
      var b = el("button", "u-btn " + (a[2] || "primary"), a[1]); b.type = "button";
      if(a[3]) b.addEventListener("click", function(){ b.classList.add("done"); b.textContent = "✓ " + a[3]; });
      return b;
    },
    stat: function(a){ var d = el("div", "u-stats"); a[1].forEach(function(s){ var c = el("div"); c.appendChild(el("b", null, s[0])); c.appendChild(el("span", null, s[1])); d.appendChild(c); }); return d; },
    bars: function(a){ var d = el("div", "u-bars"); a[1].forEach(function(s){ var r = el("div"); r.appendChild(el("span", null, s[0])); var i = el("i"); i.style.setProperty("--w", s[1] + "%"); r.appendChild(i); d.appendChild(r); }); return d; },
    big: function(a){ var d = el("div", "u-big"); d.appendChild(el("b", null, a[1])); d.appendChild(el("span", null, a[2])); return d; },
    slide: function(a){
      var d = el("div", "u-slide"); d.appendChild(el("h4", null, a[1]));
      for(var i = 0; i < 4; i++){ var l = el("i"); l.style.width = (92 - i * 14) + "%"; d.appendChild(l); }
      if(a[2]) d.appendChild(el("em", null, a[2]));
      return d;
    },
    flash: function(a){
      var b = el("button", "u-flash"); b.type = "button"; b.setAttribute("aria-label", a[1] + " / " + a[2]);
      var f = el("span", "f", a[1]), k = el("span", "k", a[2]); b.appendChild(f); b.appendChild(k);
      b.appendChild(el("small", null, a[3] || "↻")); b.addEventListener("click", function(){ b.classList.toggle("flip"); }); return b;
    },
    slider: function(a){
      var d = el("div", "u-slider"), v = el("b", null, "0"), i = el("input"), ok = el("span", "ok", "");
      d.appendChild(el("p", null, a[1])); i.type = "range"; i.min = 0; i.max = 10; i.value = 0; i.setAttribute("aria-label", a[1]);
      i.addEventListener("input", function(){ v.textContent = i.value; var good = Number(i.value) === Number(a[2]); d.classList.toggle("good", good); ok.textContent = good ? a[3] : ""; });
      d.appendChild(i); d.appendChild(v); d.appendChild(ok); return d;
    },
    email: function(a){ var d = el("div", "u-mail" + (a[4] ? " flag" : "")); d.appendChild(el("b", null, a[1])); d.appendChild(el("strong", null, a[2])); d.appendChild(el("span", null, a[3])); return d; },
    url: function(a){
      var d = el("div", "u-url"), t = String(a[1]), bad = a[2], i = bad ? t.indexOf(bad) : -1;
      d.appendChild(el("i", null, "🔒"));
      if(i < 0) d.appendChild(el("span", null, t));
      else { var s = el("span"); s.appendChild(document.createTextNode(t.slice(0, i))); s.appendChild(el("mark", null, bad)); s.appendChild(document.createTextNode(t.slice(i + bad.length))); d.appendChild(s); }
      return d;
    },
    field: function(a){ var d = el("div", "u-field"); d.appendChild(el("span", null, a[1])); d.appendChild(el("b", null, a[2])); return d; },
    map: function(a){
      var d = el("div", "u-map"), n = a[1] || 5;
      for(var i = 0; i < n; i++){ var p = el("i", "pin"); p.style.left = (12 + (i * 37) % 76) + "%"; p.style.top = (14 + (i * 53) % 62) + "%"; p.style.setProperty("--d", (i * 90) + "ms"); p.style.setProperty("--h", (i * 47) % 360); d.appendChild(p); }
      if(a[2] === "route"){
        d.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M12 86 C 30 70, 22 50, 46 46 S 74 30, 88 14"/></svg>');
      }
      return d;
    },
    stars: function(a){
      var d = el("div", "u-stars"), n = a[1] || 4;
      for(var i = 1; i <= 5; i++){ (function(i){ var s = el("button", i <= n ? "on" : "", "★"); s.type = "button"; s.setAttribute("aria-label", i + "/5");
        s.addEventListener("click", function(){ [].forEach.call(d.children, function(o, j){ o.classList.toggle("on", j < i); }); }); d.appendChild(s); })(i); }
      return d;
    },
    app: function(a, ctx){ var d = el("div", "u-app"); ctx.app = true; if(window.buildInv) window.buildInv(d, a[1], a[2]); return d; },
    shot: function(a, ctx){ var d = el("div", "u-shot"), i = el("img"); i.src = a[1]; i.alt = a[2] || ""; i.draggable = false; d.appendChild(i); ctx.shot = true; return d; },
    avatars: function(a){ var d = el("div", "u-avatars"); (a[1] || []).forEach(function(e){ d.appendChild(el("span", null, e)); }); d.appendChild(el("em", null, a[2] || "")); return d; }
  };

  function screen(prims, th){
    var host = el("div", "screen"), ctx = {th: th};
    prims.forEach(function(a, i){ var f = U[a[0]]; if(!f) return; var n = f(a, ctx); n.style.setProperty("--i", i); host.appendChild(n); });
    if(ctx.app || ctx.shot) host.classList.add("app");
    if(ctx.search){
      var items = [].slice.call(host.querySelectorAll("[data-q]"));
      var run = function(){ var w = q(ctx.search.value).split(/\s+/).filter(Boolean); items.forEach(function(n){ var t = n.getAttribute("data-q"); n.hidden = !w.every(function(x){ return t.indexOf(x) >= 0; }); }); };
      ctx.search.addEventListener("input", run); run();
    }
    return host;
  }

  window.buildStory = function(box, S){
    box.innerHTML = "";
    var head = el("div", "story-head");
    if(S.pour) head.appendChild(el("p", "story-pour", S.pour));
    box.appendChild(head);

    var grid = el("div", "story-grid"), stage = el("div", "story-stage"), steps = el("ol", "story-steps");
    var solo = S.device === "laptop";   // a story told on a laptop only: no phone
    var frame = el("div", solo ? "laptop-frame solo" : "phone-frame");
    var bar = el("div", "statusbar"), time = el("span", "time", ""), sig = el("span", "sig", "●●●● ▮"); bar.appendChild(time); bar.appendChild(sig);
    var hostWrap = el("div", "screen-wrap");
    // a live app inside the phone (pinday-embed.js): one iframe for the whole story, loaded when the story comes near
    // the same app can also be shown on a laptop (S.desktop): a second frame, a second live app, same story
    var embeds = {phone: null, laptop: null}, want = "phone", curView = null, KIND = null;
    S.steps.forEach(function(s){ (s.s || []).forEach(function(a){ if(a[0] === "pinday" || a[0] === "myhouzly" || a[0] === "vaudsentiers" || a[0] === "adopt") KIND = a[0]; }); });
    var laptop = null, lpScreen = null;
    if(solo){ want = "laptop"; lpScreen = el("div", "lp-screen"); hostWrap.classList.add("lp-wrap"); lpScreen.appendChild(hostWrap); frame.appendChild(lpScreen); frame.appendChild(el("i", "lp-base")); }
    else if(S.desktop){ laptop = el("div", "laptop-frame"); lpScreen = el("div", "lp-screen"); laptop.appendChild(lpScreen); laptop.appendChild(el("i", "lp-base")); }
    function ensureEmbed(d){
      var F = window[{myhouzly: "MyhouzlyEmbed", vaudsentiers: "VaudsentiersEmbed", adopt: "AdoptEmbed"}[KIND] || "PindayEmbed"];
      if(!embeds[d] && F) embeds[d] = F.create(d === "laptop" ? lpScreen : hostWrap, d);
      return embeds[d];
    }
    if(KIND){
      if("IntersectionObserver" in window){ var eio = new IntersectionObserver(function(es){ if(es[0].isIntersecting){ ensureEmbed(solo ? "laptop" : "phone"); eio.disconnect(); } }, {rootMargin: "900px 0px"}); eio.observe(box); }
      else ensureEmbed(solo ? "laptop" : "phone");
    }
    if(!solo){ frame.appendChild(el("i", "notch")); frame.appendChild(bar); frame.appendChild(hostWrap); frame.appendChild(el("i", "homebar")); }
    var mood = el("span", "story-mood", ""); mood.setAttribute("aria-hidden", "true"); frame.appendChild(mood);
    stage.appendChild(frame); if(laptop) stage.appendChild(laptop);
    var tabs = el("div", "story-tabs", ""), dots = el("div", "story-dots");
    var firstP = -1, firstA = -1;
    S.steps.forEach(function(s, i){ if(s.k === "p" && firstP < 0) firstP = i; if(s.k === "a" && firstA < 0) firstA = i; });
    [[S.before || "Avant", firstP, "p"], [S.after || "Après", firstA, "a"]].forEach(function(t){
      if(t[1] < 0) return;   // a story with no "before" has one tab only
      var b = el("button", "story-tab " + t[2], t[0]); b.type = "button"; b.setAttribute("data-k", t[2]); b.addEventListener("click", function(){ jump(t[1]); }); tabs.appendChild(b);
    });
    stage.appendChild(tabs); stage.appendChild(dots);
    var devices = null;
    if(S.desktop){
      devices = el("div", "story-devices"); devices.setAttribute("role", "group"); devices.setAttribute("aria-label", (S.devices && S.devices[2]) || "Device");
      [["phone", (S.devices && S.devices[0]) || "Phone", "📱"], ["laptop", (S.devices && S.devices[1]) || "Computer", "💻"]].forEach(function(d){
        var b = el("button", "story-device" + (d[0] === "phone" ? " on" : ""), d[2] + "  " + d[1]); b.type = "button"; b.setAttribute("data-d", d[0]);
        b.addEventListener("click", function(){ want = d[0]; showDevice(); }); devices.appendChild(b);
      });
      stage.appendChild(devices);
    }
    stage.appendChild(el("p", "story-legend", S.legend || ""));

    var lis = [], dotEls = [], cur = -1;
    S.steps.forEach(function(s, i){
      var li = el("li", "step " + s.k); li.setAttribute("data-i", i);
      var top = el("div", "step-top"); top.appendChild(el("span", "when", s.w)); top.appendChild(el("span", "tag " + s.k, s.k === "p" ? (S.before || "Avant") : (S.after || "Après")));
      li.appendChild(top); li.appendChild(el("h4", null, s.t)); li.appendChild(el("p", null, s.x));
      li.addEventListener("click", function(){ go(i); if(!window.matchMedia("(min-width:900px)").matches) stage.scrollIntoView({block: "start", behavior: reduced ? "auto" : "smooth"}); });
      steps.appendChild(li); lis.push(li);
      var d = el("button", "dot " + s.k); d.type = "button"; d.setAttribute("aria-label", s.w + " : " + s.t); d.addEventListener("click", function(){ jump(i); }); dots.appendChild(d); dotEls.push(d);
    });
    grid.appendChild(stage); grid.appendChild(steps); box.appendChild(grid);
    box.appendChild(el("p", "story-foot", S.legend || ""));

    function go(i){
      if(i === cur) return; cur = i; var s = S.steps[i];
      time.textContent = s.w;
      mood.textContent = s.m || (s.k === "p" ? "😣" : "😊"); mood.classList.remove("hop"); void mood.offsetWidth; mood.classList.add("hop");
      frame.classList.toggle("pain", s.k === "p"); frame.classList.toggle("ans", s.k === "a");
      if(s.th) frame.setAttribute("data-theme", s.th); else frame.removeAttribute("data-theme");
      var pv = (s.s || []).filter(function(a){ return a[0] === KIND; })[0], next;
      curView = pv ? pv[1] : null; hostWrap.classList.toggle("has-app", !!pv);
      if(pv){ next = el("div", "screen pinday"); }
      else { next = screen(s.s || [], s.th); }
      showDevice();
      // every screen that is still there leaves (when steps change quickly, several can be on stage at once)
      [].slice.call(hostWrap.children).forEach(function(old){
        if(old.classList.contains("embed-layer")) return;
        old.classList.add("out");
        setTimeout(function(){ if(old.parentNode) old.parentNode.removeChild(old); }, reduced ? 0 : 320);
      });
      next.classList.add("in"); hostWrap.appendChild(next);
      lis.forEach(function(l, j){ l.classList.toggle("on", j === i); }); dotEls.forEach(function(d, j){ d.classList.toggle("on", j === i); });
      [].forEach.call(tabs.children, function(b){ b.classList.toggle("on", b.getAttribute("data-k") === s.k); });
    }
    // phone or laptop: the laptop only shows the live app; a drawn "before" screen is always on the phone
    function showDevice(){
      var canLaptop = solo || (!!laptop && window.matchMedia("(min-width:900px)").matches);
      var d = solo ? "laptop" : ((curView && canLaptop && want === "laptop") ? "laptop" : "phone");
      var changed = box.getAttribute("data-device") !== d;
      box.setAttribute("data-device", d);
      if(changed && typeof watch === "function") setTimeout(watch, 60);
      if(devices) [].forEach.call(devices.children, function(b){ b.classList.toggle("on", b.getAttribute("data-d") === want); });
      ["phone", "laptop"].forEach(function(k){
        if(k === d && curView){ var e = ensureEmbed(k); if(e) e.show(curView); }
        else if(embeds[k]) embeds[k].hide();
      });
    }
    function jump(i){ if(i < 0) return; go(i); if(window.matchMedia("(min-width:900px)").matches) lis[i].scrollIntoView({block: "center", behavior: reduced ? "auto" : "smooth"}); }
    go(0);
    // the step that is "read" is the one in a band of the screen: the middle on a large screen, just under the phone on a small one
    var io = null;
    function watch(){
      if(!("IntersectionObserver" in window)) return;
      if(io) io.disconnect();
      var h = window.innerHeight, top, bottom;
      var lap = false;
      if(window.matchMedia("(min-width:900px)").matches && !lap){ top = h * .42; bottom = h * .42; }
      else { var nav = document.querySelector(".nav"), toc = document.querySelector(".toc"); top = Math.min(h * .75, (nav ? nav.offsetHeight : 0) + (lap || !toc ? 0 : toc.offsetHeight) + stage.offsetHeight + 12); bottom = Math.max(0, h - top - 170); }
      io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) go(Number(e.target.getAttribute("data-i"))); }); }, {rootMargin: "-" + Math.round(top) + "px 0px -" + Math.round(bottom) + "px 0px"});
      lis.forEach(function(l){ io.observe(l); });
    }
    watch(); window.addEventListener("resize", function(){ clearTimeout(watch.t); watch.t = setTimeout(watch, 200); });
  };
})();
