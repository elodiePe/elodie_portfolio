/* Draws the list of all the projects (projets.html) and the page of one project (projet.html?id=…)
   from the data in projects.js. Nothing here needs editing to add a project.
   French and English: I18N.t("français", "english") for the texts of the interface, I18N.pick(project, "field") for the data. */
(function(){
  var P = window.PROJECTS || [];
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var T = window.I18N ? I18N.t : function(fr){ return fr; };
  var EN = window.I18N && I18N.lang === "en";
  var pick = function(p, k){ return window.I18N ? I18N.pick(p, k) : p[k]; };
  var LABEL = EN
    ? {ux:"UX", ui:"UI", coding:"Code", ai:"AI", research:"Research", branding:"Visual identity", graphism:"Graphic design",
       painting:"Painting", photography:"Photography", video:"Video", drawing:"Drawing"}
    : {ux:"UX", ui:"UI", coding:"Code", ai:"IA", research:"Recherche", branding:"Identité visuelle", graphism:"Graphisme",
       painting:"Peinture", photography:"Photographie", video:"Vidéo", drawing:"Dessin"};
  var ORDER = ["ux","ui","coding","ai","research","branding","graphism","painting","photography","video","drawing"];

  function key(t){ t = String(t).trim().toLowerCase(); return t === "ia" ? "ai" : t; }
  function tagsOf(p){ var out = []; (p.tags || []).forEach(function(t){ t = key(t); if(out.indexOf(t) < 0) out.push(t); }); return out; }
  function label(k){ return LABEL[k] || k.charAt(0).toUpperCase() + k.slice(1); }
  function isVideo(u){ return /youtu\.?be/.test(u); }
  function cover(p){ return (p.images || []).filter(function(u){ return !isVideo(u); })[0]; }
  function href(p){ return p.page ? ROOT + p.page : ROOT + "projet.html?id=" + p.id; }
  function byId(id){ for(var i = 0; i < P.length; i++) if(String(P[i].id) === String(id)) return P[i]; return null; }
  function year(p){ return p.date ? p.date.slice(0, 4) : ""; }
  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; }
  function plain(html){ var d = document.createElement("div"); d.innerHTML = String(html || "").replace(/<\/br>/gi, "<br>").replace(/<(br|\/li|\/p|\/ul|\/ol)[^>]*>/gi, "$& "); return (d.textContent || "").replace(/\s+/g, " ").trim(); }
  // the first paragraph of the description: the sentence that sums the project up
  function intro(p){ return plain(String(pick(p, "description") || "").split(/(?:<\/?br\s*\/?>\s*){2,}/i)[0]); }
  function excerpt(p, n){
    var s = intro(p); if(!s) return "";
    if(s.length <= n) return s;
    var cut = s.slice(0, n), i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
    return cut.slice(0, i > 60 ? i : n).replace(/[,;:\s]+$/, "") + "…";
  }
  // The descriptions are written with a little HTML: keep only the harmless tags.
  var OK = {B:1, STRONG:1, I:1, EM:1, BR:1, OL:1, UL:1, LI:1, P:1};
  function clean(html){
    var doc = new DOMParser().parseFromString("<div>" + String(html || "").replace(/<\/br>/gi, "<br>") + "</div>", "text/html");
    var out = document.createDocumentFragment();
    (function walk(src, dst){
      [].slice.call(src.childNodes).forEach(function(n){
        if(n.nodeType === 3){ dst.appendChild(document.createTextNode(n.nodeValue)); }
        else if(n.nodeType === 1){
          if(OK[n.tagName]){ var c = document.createElement(n.tagName.toLowerCase()); walk(n, c); dst.appendChild(c); }
          else walk(n, dst);
        }
      });
    })(doc.body.firstChild, out);
    [].forEach.call(out.querySelectorAll ? out.querySelectorAll("li") : [], function(li){
      if(li.firstChild && li.firstChild.nodeType === 3) li.firstChild.nodeValue = li.firstChild.nodeValue.replace(/^\s*-\s*/, "");
    });
    var wrap = document.createElement("div"); wrap.className = "prose"; wrap.appendChild(out);
    // runs of <br><br> become paragraph spacing
    wrap.innerHTML = wrap.innerHTML.replace(/(\s*<br>\s*){2,}/g, "</p><p>");
    if(wrap.innerHTML.indexOf("</p><p>") >= 0) wrap.innerHTML = "<p>" + wrap.innerHTML + "</p>";
    [].slice.call(wrap.querySelectorAll("p")).forEach(function(q){ if(!q.textContent.trim() && !q.children.length) q.remove(); });
    [].slice.call(wrap.querySelectorAll("br")).forEach(function(b){ if(!b.nextSibling || !b.previousSibling) b.remove(); });
    return wrap;
  }
  function metaLine(p){ return [year(p)].concat(tagsOf(p).map(label)).filter(Boolean).join(" · "); }

  // lower case and without accents, so "etude" finds "étude"
  function norm(t){ return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }

  /* ---- the list ---- */
  var list = document.getElementById("liste");
  if(list){
    var projects = P.slice().sort(function(a, b){
      var pa = tagsOf(a).join() === "photography" ? 1 : 0, pb = tagsOf(b).join() === "photography" ? 1 : 0;
      return pa - pb || String(b.date).localeCompare(String(a.date));
    });
    projects.forEach(function(p){
      var li = el("li"); li.setAttribute("data-tags", tagsOf(p).join(" "));
      // everything a visitor may type: the titles and texts in both languages, and the tags
      li.setAttribute("data-search", norm([p.title, p.description, p.fr && p.fr.title, p.fr && p.fr.description].map(plain).concat(tagsOf(p).map(label)).join(" ")));
      var art = el("article", "proj"); art.style.setProperty("--p", p.accent || "#7C6CF0");
      var shot = el("div", "shot"); shot.setAttribute("aria-hidden", "true");
      var img = cover(p);
      if(img){ var im = el("img"); im.src = img; im.alt = ""; im.loading = "lazy"; shot.appendChild(im); }
      else { var ph = el("div", "phone"); ph.appendChild(el("i")); shot.appendChild(ph); }
      var info = el("div", "info");
      info.appendChild(el("p", "label", metaLine(p)));
      var h = el("h3"), a = el("a", null, pick(p, "title")); a.href = href(p); h.appendChild(a); info.appendChild(h);
      var ex = excerpt(p, 150); if(ex) info.appendChild(el("p", null, ex));
      art.appendChild(shot); art.appendChild(info); li.appendChild(art); list.appendChild(li);
    });

    var chips = document.getElementById("chips"), count = document.getElementById("count"), empty = document.getElementById("empty");
    var present = {}; P.forEach(function(p){ tagsOf(p).forEach(function(t){ present[t] = (present[t] || 0) + 1; }); });
    var keys = ORDER.filter(function(k){ return present[k]; }).concat(Object.keys(present).filter(function(k){ return ORDER.indexOf(k) < 0; }));
    var items = [].slice.call(list.children), buttons = [];
    var search = document.getElementById("search"), cur = "all";
    function apply(f){
      if(f) cur = f;
      var words = norm(search ? search.value : "").split(/\s+/).filter(Boolean), shown = 0;
      items.forEach(function(li){
        var ok = (cur === "all" || (li.getAttribute("data-tags") || "").split(" ").indexOf(cur) >= 0) &&
                 words.every(function(w){ return (li.getAttribute("data-search") || "").indexOf(w) >= 0; });
        li.hidden = !ok; if(ok) shown++;
      });
      buttons.forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === cur)); });
      if(count) count.textContent = shown + (shown === 1 ? T(" projet affiché", " project shown") : T(" projets affichés", " projects shown"));
      if(empty) empty.hidden = shown !== 0;
    }
    if(search){
      search.placeholder = T("Rechercher un projet…", "Search a project…");
      search.addEventListener("input", function(){ apply(); });
      var form = search.form; if(form) form.addEventListener("submit", function(e){ e.preventDefault(); search.blur(); });
    }
    if(chips){
      [["all", T("Tous", "All")]].concat(keys.map(function(k){ return [k, label(k)]; })).forEach(function(kv){
        var b = el("button", "chip", kv[1]); b.type = "button"; b.setAttribute("data-filter", kv[0]); b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function(){ apply(kv[0]); });
        chips.appendChild(b); buttons.push(b);
      });
    }
    apply("all");
  }

  /* ---- one project: the same structure as the Pinday case study, for every project ---- */
  function esc(t){ var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; }
  // text with {{a note to complete}} segments, shown as a "to complete" chip
  function rich(t){ return esc(t).replace(/\{\{(.*?)\}\}/g, '<span class="todo">$1</span>'); }
  var TODO = function(fr, en){ return '<span class="todo">' + T("à compléter : ", "to complete: ") + esc(T(fr, en)) + '</span>'; };
  var title = document.getElementById("p-title"), fiche = document.getElementById("fiche");
  if(title && fiche){
    var p = byId(new URLSearchParams(location.search).get("id"));
    if(!p){
      fiche.innerHTML = '<p>' + T("Ce projet n'existe pas. ", "This project doesn't exist. ") + '<a href="' + ROOT + 'projets.html">' + T("Voir tous les projets", "See all projects") + '</a></p>';
    } else {
      var S = ((EN ? window.STUDIES_EN : window.STUDIES) || {})[p.id] || {};
      var ptitle = pick(p, "title");
      document.body.setAttribute("data-page", "projet-" + p.id);
      if(p.accent) document.body.style.setProperty("--p", p.accent);
      document.title = ptitle + " · Elodie Perring";
      title.textContent = ptitle;
      var kinds = tagsOf(p).map(label).join(", ");
      var leadEl = document.getElementById("p-lead"), lead = S.resume && S.resume.reponse ? S.resume.reponse : excerpt(p, 190);
      if(lead) leadEl.textContent = lead; else leadEl.innerHTML = TODO("une phrase qui résume le projet", "one sentence that sums up the project");

      // buttons
      var btns = document.getElementById("p-btns"), tourBtn = btns.firstElementChild, made = [];
      var add = function(url, text, fill){
        var a = el("a", "btn" + (fill ? " fill" : ""), text); a.href = url; a.target = "_blank"; a.rel = "noopener";
        a.appendChild(el("span", "sr-only", T(" (nouvel onglet)", " (new tab)"))); made.push(a);
      };
      if(p.website) add(p.website, T("Voir le site", "Visit the site"), true);
      var frBtns = (p.fr && p.fr.buttons) || [];
      (p.buttons || []).forEach(function(b, i){ if(b.url !== p.website) add(b.url, !EN && frBtns[i] ? frBtns[i] : b.label, false); });
      if(p.figma) add(p.figma, T("Voir sur Figma", "View on Figma"), false);
      (S.includes || []).map(byId).filter(Boolean).forEach(function(q){ if(q.figma) add(q.figma, T("Voir l'identité sur Figma", "View the identity on Figma"), false); });
      made.forEach(function(a){ btns.insertBefore(a, tourBtn); });

      // Role, Duration, Tools, Status: always the four of them
      var date = p.date ? new Date(p.date).toLocaleDateString(EN ? "en-GB" : "fr-FR", {month:"long", year:"numeric"}) : "";
      var facts = [[T("Rôle", "Role"), S.role, T("ton rôle", "your role")], [T("Durée", "Duration"), S.duree, T("la durée", "the duration")],
                   [T("Outils", "Tools"), S.tools, T("les outils", "the tools")], [T("Statut", "Status"), S.status || date, T("le statut", "the status")]];
      if(S.equipe) facts.splice(1, 0, [T("Équipe", "Team"), S.equipe, ""]);
      if(S.hideEmpty) facts = facts.filter(function(f){ return f[1]; });
      document.getElementById("p-info").innerHTML = facts.map(function(f){
        return "<div><span>" + f[0] + "</span><b>" + (f[1] ? esc(f[1]) : '<span class="todo">' + T("à compléter : ", "to complete: ") + esc(f[2]) + '</span>') + "</b></div>";
      }).join("");

      // the cover
      var covers = (p.images || []).filter(function(u){ return !isVideo(u); }), cv = document.getElementById("p-cover");
      if(covers.length){ var ci = el("img"); ci.src = covers[0]; ci.alt = ptitle; cv.appendChild(ci); }
      else { cv.setAttribute("aria-hidden", "true"); var ph = el("div", "phone"); ph.style.width = "min(40%,190px)"; ph.appendChild(el("i")); cv.appendChild(ph); }

      var sections = [];
      var section = function(id, heading, node){ sections.push({id:id, title:heading, node:node}); };
      var box = function(html){ var d = document.createElement("div"); d.className = "stack"; d.innerHTML = html; return d; };
      var R = S.resume || {};

      // In short
      var brief = box('<div class="summary">' +
        [[T("Le problème", "The problem"), R.probleme, T("le problème en une phrase", "the problem in one sentence")], [T("Ma réponse", "My answer"), R.reponse, T("ta réponse en une phrase", "your answer in one sentence")], [T("Le résultat", "The result"), R.resultat, T("le résultat en une phrase", "the result in one sentence")]]
          .map(function(r){ return '<div><span class="label">' + r[0] + '</span><p class="ink">' + (r[1] ? esc(r[1]) : '<span class="todo">' + T("à compléter : ", "to complete: ") + esc(r[2]) + '</span>') + '</p></div>'; }).join("") + '</div>');
      section("resume", T("En bref", "In short"), brief);

      var CASE = !!S.demarche;
      if(CASE){
        // the case-study structure: who it is for, the problem in their daily life, my process, how it answers the problem
        var ST = (window.STORIES || {})[p.id]; ST = ST && (EN ? ST.en : ST.fr);
        // with a story, "who it is for" and the story are one section, titled by the story (a day with the user)
        if(!ST) section("contexte", T("Pour qui", "Who it's for"), box('<p>' + (S.pour ? rich(S.pour) : TODO("qui sont les utilisateurs et à quoi ressemble leur journée", "who the users are and what their day looks like")) + '</p>'));
        // the story: one user, one day, told on a phone (story.js); without it, the two maps below
        if(ST){ var sbox = el("div", "story"); sbox.__story = Object.assign({}, ST, {pour: S.pour ? String(S.pour).replace(/\{\{.*?\}\}/g, "") : ""}); section("histoire", ST.title, sbox); }
        // the problems as a map too: each point opens a card with what it means in the daily life of the users
        if(!ST){
        var pitems = (S.probleme || []).map(function(c){ return {need: String(c[0]), answer: String(c[1]).replace(/\{\{.*?\}\}/g, ""), short: c[2] || String(c[0])}; });
        var pwrap = document.createElement("div"); pwrap.className = "stack";
        var pbox = el("div", "graph"); pbox.__graph = {mode: "pain", center: T("Le problème", "The problem"), items: pitems, label: T("Le problème", "The problem")};
        pwrap.appendChild(pbox);
        var psr = el("ul", "sr-only"); pitems.forEach(function(it){ psr.appendChild(el("li", null, it.need + " : " + it.answer)); }); pwrap.appendChild(psr);
        section("probleme", T("Le problème", "The problem"), pwrap);
        }
        section("demarche", T("Ma démarche", "My process"), box((S.demarcheIntro ? '<p class="ink">' + rich(S.demarcheIntro) + '</p>' : '') +
          '<ol class="steps">' + S.demarche.map(function(c){ return '<li><h3>' + esc(c[0]) + '</h3><p>' + rich(c[1]) + '</p></li>'; }).join("") + '</ol>'));
        if(!ST){
        // the answer to each need, drawn as an interactive diagram (graph.js); the same text stays in a list for screen readers
        var items = (S.reponses || []).map(function(r){ return {need: String(r[0]).replace(/\{\{.*?\}\}/g, ""), answer: String(r[1]).replace(/\{\{.*?\}\}/g, ""), short: r[2] || String(r[0]).slice(0, 18)}; });
        var gwrapper = document.createElement("div"); gwrapper.className = "stack";
        var gbox = el("div", "graph"); var centerName = ptitle.split(":")[0].trim(); if(centerName.length > 18) centerName = T("Mon étude", "My study");
        gbox.__graph = {center: centerName, items: items, label: S.reponsesTitle || T("Comment ça répond au problème", "How it answers the problem"), labels: {need: T("Le problème", "The problem"), answer: T("La solution", "The solution")}, hint: T("Survolez ou touchez un point pour lire le problème et la solution. Vous pouvez aussi le faire glisser.", "Hover or tap a point to read the problem and the solution. You can drag it too.")};
        gwrapper.appendChild(gbox);
        var srl = el("ul", "sr-only"); items.forEach(function(it){ srl.appendChild(el("li", null, it.need + " : " + it.answer)); }); gwrapper.appendChild(srl);
        section("reponses", S.reponsesTitle || T("Comment ça répond au problème", "How it answers the problem"), gwrapper);
        }
      } else {
        // Context (the full project text is kept, folded, underneath)
        var ctx = box('<p>' + (S.contexte ? esc(S.contexte) : TODO("ton contexte réel, la durée, ce que tu as fait seul ou en équipe", "your real context, the duration, what you did alone or in a team")) + '</p>');
        var descr = pick(p, "description");
        if(descr && !S.hideEmpty){
          var det = el("details", "orig"), sm = el("summary", null, T("Lire la description complète", "Read the full description"));
          det.appendChild(sm); det.appendChild(clean(descr)); ctx.appendChild(det);
        }
        section("contexte", T("Contexte", "Context"), ctx);

        // Problem
        section("probleme", T("Le problème", "The problem"), S.probleme && S.probleme.length
          ? box('<div class="grid2">' + S.probleme.map(function(c){ return '<div class="decision"><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p></div>'; }).join("") + '</div>')
          : box('<p>' + TODO("les problèmes que ce projet résout, en trois ou quatre mots chacun", "the problems this project solves, in three or four words each") + '</p>'));

        // Research
        if(!(S.hideEmpty && !S.recherche)) section("recherche", T("Recherche", "Research"), box('<p>' + (S.recherche ? esc(S.recherche) : TODO("entretiens, enquête, tests, citations, ce qui t'a surpris", "interviews, survey, tests, quotes, what surprised you")) + '</p>'));

        // Decisions
        section("decisions", T("Décisions", "Decisions"), S.decisions && S.decisions.length
          ? box(S.decisions.map(function(d){
              return '<div class="decision"><h3>' + esc(d.t) + '</h3><dl>' +
                (d.alt || !S.hideEmpty ? '<dt>' + T("Alternatives", "Alternatives") + '</dt><dd>' + (d.alt ? esc(d.alt) : TODO("les autres options envisagées", "the other options considered")) + '</dd>' : '') +
                '<dt>' + T("Choix", "Choice") + '</dt><dd>' + esc(d.choix) + '</dd>' +
                (d.pourquoi || !S.hideEmpty ? '<dt>' + T("Pourquoi", "Why") + '</dt><dd>' + (d.pourquoi ? esc(d.pourquoi) : TODO("la raison du choix", "the reason for the choice")) + '</dd>' : '') + '</dl></div>';
            }).join(""))
          : box('<p>' + TODO("deux ou trois décisions : les alternatives, le choix, la raison", "two or three decisions: the alternatives, the choice, the reason") + '</p>'));

      }

      // one big picture that slides on its own: the screens one after the other (paused when touched, still when motion is reduced)
      var makeSlider = function(gal){
        var sl = el("div", "slider"), track = el("div", "slider-track"), dotsEl = el("div", "slider-dots"), figs = [].slice.call(gal.children), cur = 0, timer = null;
        figs.forEach(function(f, i){
          f.className = "slide"; track.appendChild(f);
          var d = el("button", "slider-dot"); d.type = "button"; d.setAttribute("aria-label", T("Image ", "Image ") + (i + 1)); d.addEventListener("click", function(){ show(i); play(); }); dotsEl.appendChild(d);
        });
        var show = function(i){ cur = (i + figs.length) % figs.length; track.scrollTo({left: cur * track.clientWidth, behavior: "smooth"}); mark(); };
        var mark = function(){ [].forEach.call(dotsEl.children, function(d, j){ d.classList.toggle("on", j === cur); }); };
        var play = function(){ clearInterval(timer); if(window.matchMedia("(prefers-reduced-motion:reduce)").matches) return; timer = setInterval(function(){ if(document.hidden) return; show(cur + 1); }, 4500); };
        track.addEventListener("scroll", function(){ var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); if(i !== cur){ cur = i; mark(); } }, {passive: true});
        ["pointerdown", "focusin", "mouseenter"].forEach(function(ev){ sl.addEventListener(ev, function(){ clearInterval(timer); }); });
        ["mouseleave", "pointerup", "focusout"].forEach(function(ev){ sl.addEventListener(ev, play); });
        sl.appendChild(track); sl.appendChild(dotsEl); mark(); play();
        return sl;
      };

      // the story of an app told on a phone, also for a project of the short layout
      if(!CASE && (window.STORIES || {})[p.id]){
        var ST2 = window.STORIES[p.id]; ST2 = EN ? ST2.en : ST2.fr;
        var sbox2 = el("div", "story"); sbox2.__story = Object.assign({}, ST2, {pour: ""}); section("histoire", ST2.title, sbox2);
      }

      // Journey and screens
      var imgs = p.images || [];
      var gwrap = document.createElement("div"); gwrap.className = "stack";
      var gal = el("div", "grid2 gallery"), n = covers.length, k = 0;
      imgs.forEach(function(u){
        var fig = el("figure");
        if(isVideo(u)){
          var m = u.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
          if(m){
            var f = el("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + m[1]; f.title = T("Vidéo : ", "Video: ") + ptitle;
            f.loading = "lazy"; f.allowFullscreen = true; f.setAttribute("allow", "encrypted-media; picture-in-picture");
            fig.className = "video"; fig.appendChild(f);
          }
        } else {
          var im = el("img"); im.src = u; im.loading = "lazy"; im.alt = ptitle + (n > 1 ? T(" : image ", ": image ") + (k + 1) + T(" sur ", " of ") + n : "");
          fig.appendChild(im);
          var cap = (S.legendes || [])[k]; if(cap) fig.appendChild(el("figcaption", null, cap));
          k++;
        }
        if(fig.firstChild) gal.appendChild(fig);
      });
      if(S.slider && gal.querySelectorAll("figure:not(.video)").length > 1){
        var vids = [].slice.call(gal.querySelectorAll("figure.video")); vids.forEach(function(v){ gal.removeChild(v); });
        gwrap.appendChild(makeSlider(gal));
        if(vids.length){ var vg = el("div", "grid2 gallery"); vids.forEach(function(v){ vg.appendChild(v); }); gwrap.appendChild(vg); }
      }
      else if(gal.children.length){ if(S.slider) gal.className += " one-col"; gwrap.appendChild(gal); }
      else gwrap.appendChild(box('<p class="shot-ph">' + T("Ajoute des captures ou des photos dans projects.js", "Add screenshots or photos in projects.js") + '</p>'));
      var credit = pick(p, "info"); if(credit) gwrap.appendChild(el("p", "credit", credit));
      section("parcours", T("Parcours et écrans", "Journey and screens"), gwrap);

      // projects folded into this one (S.includes): their description and pictures become a section of the page
      var folded = (S.includes || []).map(byId).filter(Boolean);
      folded.forEach(function(q){
        var qwrap = document.createElement("div"); qwrap.className = "stack";
        var qd = pick(q, "description"); if(qd) qwrap.appendChild(clean(qd));
        var qgal = el("div", "grid2 gallery"), qi = (q.images || []).filter(function(u){ return !isVideo(u); });
        qi.forEach(function(u, i){ var fig = el("figure"), im = el("img"); im.src = u; im.loading = "lazy"; im.alt = pick(q, "title") + T(" : image ", ": image ") + (i + 1) + T(" sur ", " of ") + qi.length; fig.appendChild(im); qgal.appendChild(fig); });
        if(qgal.children.length > 1) qwrap.appendChild(makeSlider(qgal)); else if(qgal.children.length) qwrap.appendChild(qgal);
        section("identite", T("Identité visuelle", "Visual identity"), qwrap);
      });

      // Results, What I take from it
      var hasStory = CASE && (window.STORIES || {})[p.id];
      var realText = function(t){ return t && String(t).replace(/\{\{.*?\}\}/g, "").trim(); };
      if(!hasStory && !(S.hideEmpty && !realText(S.resultats))) section("resultats", T("Résultats", "Results"), box('<p>' + (S.resultats ? rich(S.resultats) : TODO("ce que tu peux démontrer : retours, changements après un test, un chiffre honnête", "what you can show: feedback, changes after a test, an honest figure")) + '</p>'));
      if((!hasStory && !S.hideEmpty) || realText(S.retient)) section("apprentissages", T("Ce que j'en retiens", "What I take from it"), box('<p>' + (S.retient ? rich(S.retient) : TODO("ce que tu referais autrement, ce que tu as appris", "what you would do differently, what you learned")) + '</p>'));

      var toc = document.getElementById("p-toc"), tocLabel = {resume:T("En bref", "Summary"), contexte:T("Contexte", "Context"), probleme:T("Problème", "Problem"), recherche:T("Recherche", "Research"), decisions:T("Décisions", "Decisions"), parcours:T("Parcours", "Screens"), resultats:T("Résultats", "Results"), identite:T("Identité visuelle", "Visual identity"), apprentissages:T("Apprentissages", "Lessons")};
      tocLabel.histoire = T("L'application", "The app");
      if(CASE){ tocLabel.contexte = T("Pour qui", "For whom"); tocLabel.demarche = T("Démarche", "Process"); tocLabel.reponses = T("Réponse", "Solution"); tocLabel.histoire = T("Pour qui", "For whom"); }
      sections.forEach(function(s){
        var sec = el("section"); sec.id = s.id; sec.setAttribute("aria-labelledby", "h-" + s.id);
        var h = el("h2", null, s.title); h.id = "h-" + s.id; sec.appendChild(h); sec.appendChild(s.node); fiche.appendChild(sec);
        var a = el("a", null, tocLabel[s.id] || s.title); a.href = "#" + s.id; toc.appendChild(a);
      });

      [].forEach.call(document.querySelectorAll(".story"), function(b){ if(b.__story && window.buildStory) window.buildStory(b, b.__story); });
      [].forEach.call(document.querySelectorAll(".graph"), function(g){ g.__w = Math.round(g.getBoundingClientRect().width); if(window.buildGraph) window.buildGraph(g); });

      var rel = (p.inthesameprojectas || []).filter(function(i){ return (S.includes || []).indexOf(i) < 0; }).map(byId).filter(Boolean), relBox = document.getElementById("p-related");
      if(rel.length){
        var ul = relBox.querySelector("ul");
        rel.forEach(function(r){ var li = el("li"), a = el("a", null, pick(r, "title")); a.href = href(r); li.appendChild(a); ul.appendChild(li); });
      } else relBox.hidden = true;
    }
  }
})();
