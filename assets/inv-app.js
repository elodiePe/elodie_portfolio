/* A working copy of the Inventaire app (the watch collection of Bruno Pesenti), drawn with the real markup and the real
   stylesheet of the app (inventaire-app.css, generated from its globals.css). It lives inside the phone of the story:
   the bottom bar works, the search filters, the cards open, the AI search "searches". The data is made up.
   window.buildInv(host, view, query) fills `host` with the app, starting on view = "collection" | "ia" | "stats". */
(function(){
  var K = 272 / 390;   // the app is laid out like on a 390 px phone, and scaled into the 272 px screen of the phone
  function ic(n, size, fill){ return '<span class="ms"' + (size || fill ? ' style="' + (size ? "font-size:" + size + "px;" : "") + (fill ? "font-variation-settings:'FILL' 1" : "") + '"' : "") + '>' + n + '</span>'; }
  function chf(n){ return n == null ? "—" : "CHF " + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function esc(t){ return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function norm(t){ return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  var CAT = {"Pendules": "schedule", "Montres": "watch", "Réveils": "alarm", "Meubles": "chair", "Publicités": "campaign", "Curiosités": "auto_awesome"};

  // made-up objects, with the names and the look of the real ones
  var ITEMS = [
    {id: 589, t: "Mido multifor super automatique, power…", c: "Montres", b: "MIDO", e: 350, p: 180, l: "Vitrine d'entrée", d: "16 oct. 2026", s: "Montres bracelet"},
    {id: 588, t: "Solvil Paul Ditisheim", c: "Montres", b: "SOLVIL", e: 120, p: 60, l: "Réserve B", d: "16 oct. 2026", s: "Montres bracelet (mécanique, automatique, à quartz)"},
    {id: 408, t: "Réveil Blangy", c: "Réveils", b: "BLANGY", e: 5850, p: 3100, l: "Atelier principal", d: "9 oct. 2026", s: "Réveils de table"},
    {id: 343, t: "Pendulette française", c: "Pendules", b: "", e: 5800, p: 2900, l: "Salle d'exposition", d: "8 oct. 2026", s: "Pendulettes"},
    {id: 465, t: "Montre Seeland automatique PA", c: "Montres", b: "SEELAND", e: 5400, p: 2500, l: "Réserve A", d: "5 oct. 2026", s: "Montres bracelet"},
    {id: 390, t: "Pendulette D. F. Dubois à Paris", c: "Pendules", b: "D. F. DUBOIS", e: 5700, p: 3000, l: "Vitrine d'entrée", d: "3 oct. 2026", s: "Pendulettes"},
    {id: 264, t: "Vitrinette d'exposition en noyer", c: "Meubles", b: "", e: 5550, p: 1800, l: "Salle d'exposition", d: "1 oct. 2026", s: "Vitrines"},
    {id: 482, t: "Réveil alarme doré 8 jours, modèle Versailles", c: "Réveils", b: "ERNEST-BOREL", e: 5550, p: 2700, l: "Réserve B", d: "28 sept. 2026", s: "Réveils de table"}
  ];
  var TOP = [[188, "Lot de mouvements", "", 5850, 2900], [408, "Réveil Blangy", "BLANGY", 5850, 3100], [343, "pendulette française", "", 5800, 2900],
             [537, "Publicité Rolex listant les concessionnaires suisses", "ROLEX", 5800, 400], [390, "pendulette", "D. F. DUBOIS À PARIS", 5700, 3000],
             [264, "Vitrinette d'exposition en noyer", "", 5550, 1800], [482, "Réveil alarme doré 8 jours 15 rubis Ernest-Borel modèle Versailles…", "ERNEST-BOREL", 5550, 2700],
             [23, "Layette en sapin avec 24 tiroirs contenant les outils originaux qu'…", "", 5450, 1200], [465, "Montre Seeland automatique PA", "SEELAND", 5400, 2500],
             [466, "Montre dame mandia waterproof en acier", "MANDIA", 5350, 1900]];
  var CATS = [["Pendules", 214], ["Montres", 148], ["Réveils", 92], ["Meubles", 61], ["Curiosités", 40], ["Publicités", 35]];

  function photo(i){ return '<div class="photo placeholder">' + ic("image", 36) + '</div>'; }
  function card(i, extra){
    return '<a class="card" data-open="' + i.id + '"><div class="thumb">' + photo(i) + '<span class="tag num">N° ' + i.id + '</span></div><div class="card-body">' +
      (extra || "") + '<p class="eyebrow">' + ic(CAT[i.c] || "category", 16) + " " + esc(i.c) + '</p><h3>' + esc(i.t) + '</h3>' + (i.b ? '<p class="brand-name">' + esc(i.b) + '</p>' : "") +
      '<p class="added-on">' + ic("calendar_today", 14) + " Ajouté le " + esc(i.d) + '</p>' +
      '<div class="meta"><span class="price">' + chf(i.e) + '</span><span class="where">' + ic("location_on", 16) + " " + esc(i.l) + '</span></div></div></a>';
  }

  window.buildInv = function(host, view, query){
    var cur = view || "collection", q = query || "", cat = "", sort = "recent", list = false, openId = null, photoSet = false;
    host.innerHTML = '<div class="appinv"><header class="topbar"><a class="brand"><span class="brand-dial">' + ic("schedule", 26) + '</span><span><strong>Inventaire</strong><small>Collection d\'horlogerie ancienne</small></span></a>' +
      '<nav class="top-actions"><button class="icon-btn" title="Actualiser">' + ic("sync") + '<span class="label">Actualiser</span></button><button class="icon-btn" title="Se déconnecter">' + ic("logout") + '<span class="label">Quitter</span></button></nav></header>' +
      '<div class="app-scroll"></div><nav class="bottom-nav" aria-label="Navigation"></nav></div>';
    var app = host.firstChild, scroll = app.querySelector(".app-scroll"), nav = app.querySelector(".bottom-nav");
    app.style.zoom = K; app.style.setProperty("--zk", K);

    function drawNav(){
      var on = function(v){ return cur === v || (v === "collection" && cur === "detail"); };
      nav.innerHTML = [["collection", "grid_view", "Collection"], ["ia", "auto_awesome", "Recherche IA"], ["stats", "monitoring", "Statistiques"]].map(function(n){
        return '<a data-go="' + n[0] + '" class="' + (on(n[0]) ? "on" : "") + '">' + ic(n[1], 0, on(n[0])) + '<span>' + n[2] + '</span></a>';
      }).join("") + '<a>' + ic("table_view") + '<span>Feuille</span></a>';
    }

    function collection(){
      var tot = ITEMS.length ? 590 : 0;
      var chips = '<button class="chip ' + (!cat ? "on" : "") + '" data-cat="">' + ic("apps", 18) + ' Tout <span class="n">590</span></button>' + CATS.map(function(c){
        return '<button class="chip ' + (cat === c[0] ? "on" : "") + '" data-cat="' + c[0] + '">' + ic(CAT[c[0]] || "category", 18) + " " + c[0] + ' <span class="n">' + c[1] + '</span></button>'; }).join("");
      scroll.innerHTML = '<main class="catalogue"><section class="hero"><div class="search">' + ic("search") + '<input value="' + esc(q) + '" placeholder="Rechercher : marque, description, n°, époque…" aria-label="Rechercher">' +
        '<button class="icon-only clear" aria-label="Effacer"' + (q ? "" : " hidden") + '>' + ic("close") + '</button><a class="icon-only camera" data-go="ia" title="Recherche IA">' + ic("photo_camera") + '</a></div>' +
        '<div class="chips" role="tablist">' + chips + '</div></section><div class="layout"><section class="results"><div class="toolbar">' +
        '<button class="btn ghost mobile-only">' + ic("tune") + ' Filtres</button><p class="count"></p><div class="toolbar-right"><a class="btn ghost small" data-go="stats">' + ic("monitoring", 18) + ' Statistiques</a>' +
        '<label class="sort">' + ic("sort", 20) + '<select aria-label="Trier"><option value="recent">Ajout le plus récent</option><option value="oldest">Ajout le plus ancien</option><option value="est-desc">Estimation décroissante</option><option value="est-asc">Estimation croissante</option></select></label>' +
        '<div class="segmented"><button class="' + (list ? "" : "on") + '" data-view="grid" aria-label="Grille">' + ic("grid_view") + '</button><button class="' + (list ? "on" : "") + '" data-view="list" aria-label="Liste">' + ic("view_list") + '</button></div></div></div>' +
        '<div class="' + (list ? "list" : "grid") + '"></div></section></div></main>';
      scroll.querySelector("select").value = sort;
      fill();
    }
    function fill(){
      var words = norm(q).split(/\s+/).filter(Boolean);
      var items = ITEMS.filter(function(i){ var t = norm([i.id, i.t, i.b, i.c, i.s].join(" ")); return (!cat || i.c === cat) && words.every(function(w){ return t.indexOf(w) >= 0; }); });
      items.sort({recent: function(a, b){ return b.id - a.id; }, oldest: function(a, b){ return a.id - b.id; }, "est-desc": function(a, b){ return b.e - a.e; }, "est-asc": function(a, b){ return a.e - b.e; }}[sort]);
      var n = (words.length || cat) ? items.length : 590, total = items.reduce(function(s, i){ return s + i.e; }, 0);
      scroll.querySelector(".count").innerHTML = "<strong>" + n + "</strong> objet" + (n > 1 ? "s" : "") + '<span class="sep">·</span> estimation totale <strong>' + chf((words.length || cat) ? total : 48250) + "</strong>";
      var g = scroll.querySelector(".grid, .list");
      g.innerHTML = items.length ? items.map(function(i){ return card(i); }).join("") : '<div class="empty">' + ic("hourglass_empty", 48) + '<p>Aucun objet ne correspond à ces critères.</p><div class="ps-actions"><a class="btn primary" data-go="ia">' + ic("auto_awesome") + ' Demander à l\'IA : « ' + esc(q) + ' »</a></div></div>';
      var clr = scroll.querySelector(".clear"); if(clr) clr.hidden = !q;
    }

    function detail(){
      var i = ITEMS.filter(function(x){ return x.id === openId; })[0] || ITEMS[1];
      scroll.innerHTML = '<main class="detail"><div class="crumbs"><button class="icon-btn" data-go="collection" style="border:1px solid var(--line);background:var(--surface)">' + ic("arrow_back") + ' Collection</button>' +
        '<div class="pager"><button class="icon-btn" aria-label="Précédent">' + ic("chevron_left") + '</button><button class="icon-btn" aria-label="Suivant">' + ic("chevron_right") + '</button></div>' +
        '<div class="crumb-path"><a>' + esc(i.c) + '</a>' + ic("chevron_right", 18) + '<span>' + esc(i.s) + '</span></div></div>' +
        '<div class="detail-grid"><div class="gallery"><button class="frame" type="button">' + photo(i) + '<span class="expand-hint">' + ic("open_in_full", 18) + ' Agrandir</span></button></div>' +
        '<div class="sheet"><p class="eyebrow">' + ic("location_on", 18) + ' N° ' + i.id + '</p><h1>' + esc(i.t) + '</h1>' + (i.b ? '<p class="brand-name big">' + esc(i.b) + '</p>' : "") +
        '<div class="prices"><div><span>Estimation</span><strong>' + chf(i.e) + '</strong></div><div><span>Prix d\'achat</span><strong>' + chf(i.p) + '</strong></div></div>' +
        '<h2 class="rule">' + ic("subject") + ' Description</h2><p class="description">' + esc(i.t) + ', en état de marche. Mouvement révisé, boîtier d\'origine.</p>' +
        '<h2 class="rule">' + ic("info") + ' Détails</h2><dl class="facts"><div><dt>' + ic("location_on", 18) + ' Lieu</dt><dd>' + esc(i.l) + '</dd></div><div><dt>' + ic("calendar_today", 18) + ' Ajouté le</dt><dd>' + esc(i.d) + '</dd></div></dl></div></div></main>';
    }

    function ia(){
      scroll.innerHTML = '<main class="stats ai-search"><div class="stats-title"><h1>Recherche IA</h1><p class="muted">Décrivez un objet avec vos mots, ou prenez-le en photo : l\'IA propose les objets les plus proches dans l\'inventaire.</p></div>' +
        '<div class="psearch"><div class="describe"><label class="field-label" for="inv-describe">' + ic("edit_note", 18) + ' Décrivez l\'objet recherché</label><div class="describe-box"><textarea id="inv-describe" rows="2" maxlength="1000" placeholder="Ex. : « une petite pendulette de voyage en laiton avec réveil »">' + esc(q) + '</textarea>' +
        '<button type="button" class="icon-only clear" aria-label="Effacer le texte"' + (q ? "" : " hidden") + '>' + ic("close") + '</button></div></div>' +
        '<p class="or"><span>et / ou</span></p><div class="dropzone' + (photoSet ? " has-preview" : "") + '">' + (photoSet ? '<button type="button" class="remove-photo" aria-label="Retirer la photo">' + ic("close", 18) + '</button><div class="query-photo" style="width:240px;height:150px;border-radius:12px;background:radial-gradient(circle at 50% 45%,#e8dcc0 0 22%,#5a4630 23% 34%,#2a1c13 35%);display:grid;place-items:center;font-size:56px">⌚</div>' :
          '<div class="dz-empty">' + ic("image_search", 52) + '<p><strong>Déposez une photo ici</strong>, collez-la (Ctrl+V) ou choisissez-la ci-dessous.</p></div>') + '</div>' +
        '<div class="ps-actions"><button class="btn ghost" data-photo>' + ic("photo_camera") + ' Prendre une photo</button><button class="btn ghost" data-photo>' + ic("upload") + ' ' + (photoSet ? "Changer d'image" : "Choisir une image") + '</button></div>' +
        '<div class="ps-submit"><button class="btn primary big" data-run' + (q.trim() || photoSet ? "" : " disabled") + '>' + ic("auto_awesome") + ' Rechercher</button></div><div class="ps-out"></div></div></main>';
    }
    function results(){
      var out = scroll.querySelector(".ps-out"), top = ITEMS.filter(function(i){ return i.c === "Réveils" || i.c === "Pendules"; }).slice(0, 2), sc = [92, 78];
      out.innerHTML = '<section class="ps-results"><p class="observed">' + ic("visibility", 18) + ' <span><strong>Objet recherché :</strong> ' + (q.trim() ? esc(q) : "une montre ancienne, cadran clair, bracelet en cuir") + '</span></p><div class="grid">' +
        top.map(function(i, k){ return card(i, '<div class="score"><span class="score-track"><span class="score-fill" style="width:' + sc[k] + '%"></span></span><span class="score-value">' + sc[k] + ' %</span></div>').replace('<p class="added-on">' + ic("calendar_today", 14) + " Ajouté le " + esc(i.d) + '</p>', '<p class="reason">Même famille, boîtier et cadran très proches.</p>'); }).join("") + '</div></section>';
      out.scrollIntoView && scroll.scrollTo({top: scroll.scrollHeight, behavior: "smooth"});
    }

    function stats(){
      var max = CATS[0][1], total = CATS.reduce(function(s, c){ return s + c[1]; }, 0);
      scroll.innerHTML = '<main class="stats"><div class="stats-title"><h1>Statistiques de la collection</h1><p class="muted">Calculées en direct depuis la feuille d\'inventaire · 590 objets</p></div>' +
        '<section class="kpis"><div class="kpi"><span class="kpi-label">' + ic("inventory_2", 18) + ' Objets dans l\'inventaire</span><span class="kpi-value">590</span><span class="kpi-sub">561 en collection · 29 vendus</span></div>' +
        '<div class="kpi hero"><span class="kpi-label">' + ic("payments", 18) + ' Valeur estimée totale</span><span class="kpi-value">' + chf(48250) + '</span><span class="kpi-sub">Moyenne CHF 82 · médiane CHF 40</span></div>' +
        '<div class="kpi"><span class="kpi-label">' + ic("shopping_bag", 18) + ' Total des prix d\'achat</span><span class="kpi-value">' + chf(21600) + '</span><span class="kpi-sub">Objets encore en collection</span></div>' +
        '<div class="kpi"><span class="kpi-label">' + ic("trending_up", 18) + ' Plus-value potentielle</span><span class="kpi-value">' + chf(26650) + '</span><span class="kpi-sub">+123 % par rapport au prix d\'achat</span></div></section>' +
        '<div class="panels"><section class="panel"><header class="panel-head"><h2>Proportions par catégorie</h2></header><ul class="bars">' + CATS.map(function(c){
          return '<li><div class="bar-row"><span class="bar-label">' + c[0] + '</span><span class="bar-track"><span class="bar-fill" style="width:' + (c[1] / max * 100) + '%"></span></span><span class="bar-value">' + c[1] + '<small>' + Math.round(c[1] / total * 100) + ' %</small></span></div></li>'; }).join("") + '</ul></section>' +
        '<section class="panel"><header class="panel-head"><h2>Les 10 objets les plus précieux</h2></header><table class="top-table"><thead><tr><th>N°</th><th>Objet</th><th class="num">Achat</th><th class="num">Estimation</th></tr></thead><tbody>' +
        TOP.map(function(r){ return '<tr><td>' + r[0] + '</td><td><a>' + esc(r[1]) + '</a>' + (r[2] ? '<small> · ' + esc(r[2]) + '</small>' : "") + '</td><td class="num">' + chf(r[4]) + '</td><td class="num strong">' + chf(r[3]) + '</td></tr>'; }).join("") + '</tbody></table></section></div></main>';
    }

    function show(v){
      cur = v; ({collection: collection, detail: detail, ia: ia, stats: stats}[v])(); scroll.scrollTop = 0; drawNav();
    }

    // the whole app answers to a few delegated events
    app.addEventListener("click", function(e){
      var t = e.target, go = t.closest("[data-go]"), open = t.closest("[data-open]"), chip = t.closest(".chip"), seg = t.closest("[data-view]");
      if(go){ e.preventDefault(); show(go.getAttribute("data-go")); return; }
      if(open){ e.preventDefault(); openId = Number(open.getAttribute("data-open")); show("detail"); return; }
      if(chip && cur === "collection"){ cat = chip.getAttribute("data-cat"); var s = scroll.scrollLeft; show("collection"); return; }
      if(seg){ list = seg.getAttribute("data-view") === "list"; show("collection"); return; }
      if(t.closest(".clear")){ q = ""; show(cur); return; }
      if(t.closest(".remove-photo")){ photoSet = false; show("ia"); return; }
      if(t.closest("[data-photo]")){ q = (scroll.querySelector("textarea") || {}).value || q; photoSet = true; show("ia"); return; }
      if(t.closest("[data-run]")){
        var b = t.closest("[data-run]"), dz = scroll.querySelector(".dropzone"); if(b.disabled) return;
        dz.insertAdjacentHTML("beforeend", '<div class="dz-busy">' + ic("progress_activity", 36, 0).replace('class="ms"', 'class="ms spin"') + '<span>Recherche dans l\'inventaire…</span></div>');
        setTimeout(function(){ var bz = dz.querySelector(".dz-busy"); if(bz) bz.remove(); results(); }, 1300);
      }
    });
    app.addEventListener("input", function(e){
      var t = e.target;
      if(t.matches(".search input")){ q = t.value; fill(); }
      else if(t.matches("textarea")){ q = t.value; var run = scroll.querySelector("[data-run]"), clr = scroll.querySelector(".clear"); if(run) run.disabled = !(q.trim() || photoSet); if(clr) clr.hidden = !q; }
    });
    app.addEventListener("change", function(e){ if(e.target.matches("select")){ sort = e.target.value; fill(); } });
    show(cur);
  };
})();
