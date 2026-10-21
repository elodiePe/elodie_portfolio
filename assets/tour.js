/* The guided tour: a list of steps, each with a title, a text, and the part of a page it talks about.
   The text is always written on the screen; the audio reads that same text aloud (the voice of the browser, or
   a recording if a step has an "audio" file). The tour goes from page to page by itself and can be left at any time.
   To add a project to the tour: add its steps below, with the "page" they belong to and the "target" (an id). */
(function(){
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var HERE = document.body.getAttribute("data-page") || "home";
  var P = window.PROJECTS || [];
  function byId(id){ for(var i = 0; i < P.length; i++) if(String(P[i].id) === String(id)) return P[i]; return null; }
  function pageUrl(key){
    if(key === "home") return ROOT + "index.html";
    if(key === "projets") return ROOT + "projets.html";
    var m = /^projet-(\d+)$/.exec(key), p = m && byId(m[1]);
    if(p) return p.page ? ROOT + p.page : ROOT + "projet.html?id=" + p.id;
    return ROOT + "index.html";
  }
  function plain(html){ var d = document.createElement("div"); d.innerHTML = String(html || "").replace(/<\/br>/gi, "<br>").replace(/<(br|\/li|\/p|\/ul|\/ol)[^>]*>/gi, "$& "); return (d.textContent || "").replace(/\s+/g, " ").trim(); }
  function excerpt(p, n){
    var s = plain(String(pick(p, "description") || "").split(/(?:<\/?br\s*\/?>\s*){2,}/i)[0]); if(s.length <= n) return s;
    var cut = s.slice(0, n), i = cut.lastIndexOf(". ");
    return i > 60 ? cut.slice(0, i + 1) : cut.replace(/\s+\S*$/, "") + "…";
  }
  function audioOf(id){ var p = byId(id); return p && p.audio ? p.audio : undefined; }

  var T = window.I18N ? I18N.t : function(fr){ return fr; };
  var EN = window.I18N && I18N.lang === "en";
  var pick = function(p, k){ return window.I18N ? I18N.pick(p, k) : p[k]; };
  var STEPS = [
    {page:"home", target:"accueil", title:T("Bienvenue", "Welcome"),
     text:T("Je suis Elodie, designer UX et UI. Cette visite dure quelques minutes. Tu peux la suivre à l'écrit, à l'oreille, ou les deux, et la quitter à tout moment.",
            "I'm Elodie, a UX and UI designer. This tour takes a few minutes. You can follow it in writing, by ear, or both, and leave at any time.")},
    {page:"home", target:"methode", title:T("Ma façon de travailler", "How I work"),
     text:T("Je commence par comprendre les usages, je simplifie, je teste tôt, puis je livre. Chaque projet suit ce fil, du problème jusqu'à la mise en ligne.",
            "I start by understanding how things are used, then simplify, test early and ship. Every project follows this thread, from the problem to launch.")},
    {page:"home", target:"projets", title:T("Les projets", "Projects"),
     text:T("Voici quelques projets. La page Tous les projets les réunit, avec un filtre par type : design, code, identité visuelle, recherche et peinture.",
            "Here are a few projects. The All projects page gathers them, with a filter by type: design, code, visual identity, research and painting.")},
    {page:"projets", target:"liste-projets", title:T("Tous les projets", "All projects"),
     text:T("Chaque projet a sa page. Commençons par Pinday, une application pour les étudiants.",
            "Each project has its own page. Let's start with Pinday, an app for students.")},
    {page:"projet-38", target:"resume", title:T("Pinday en trente secondes", "Pinday in thirty seconds"),
     text:T("Pinday réunit l'emploi du temps, les notes, les diapositives et la révision au même endroit. Les données restent dans le Google Drive de chaque étudiant.",
            "Pinday brings the schedule, notes, slides and revision together in one place. The data stays in each student's own Google Drive.")},
    {page:"projet-38", target:"decisions", title:T("Les décisions de Pinday", "Pinday's decisions"),
     text:T("Trois choix ont guidé le projet : garder les données chez l'étudiant, permettre d'écrire à plusieurs en direct, et transformer les notes en révision active avec l'IA.",
            "Three choices guided the project: keep the data with the student, allow live writing together, and turn notes into active revision with AI.")},
    {page:"projet-36", target:"resume", title:"myHouzly", audio:audioOf(36),
     text:T("myHouzly est une application d'argent de poche familial et de gestion du foyer : les parents administrent, chaque enfant a son propre compte, ses tâches et ses objectifs d'épargne.",
            "myHouzly is a family pocket-money and household app: parents manage everything, and each child has their own account, chores and savings goals.")},
    {page:"projet-36", target:"decisions", title:T("Les décisions de myHouzly", "myHouzly's decisions"),
     text:T("Ne jamais supprimer une opération mais la corriger, un accès simple pour les enfants avec un code protégé, et des demandes écrites plutôt que des discussions.",
            "Never delete an operation but correct it, a simple access for children with a protected code, and written requests instead of discussions.")}
  ];
  // every other project that has a recorded presentation joins the tour, with its own recording
  // (the recordings are in one language: they only play in the language they were made in)
  P.filter(function(p){ return p.audio && !p.page && p.id !== 36; }).forEach(function(p){
    STEPS.push({page:"projet-" + p.id, target:"resume", title:pick(p, "title"), text:excerpt(p, 240), audio:p.audio});
  });
  STEPS.push(
    {page:"home", target:"competences", title:T("Compétences", "Skills"),
     text:T("Côté UX : recherche, parcours, architecture de l'information, tests d'usage et accessibilité. Côté interface : design système, prototypage, et le code quand il le faut.",
            "On the UX side: research, journeys, information architecture, usability tests and accessibility. On the interface side: design systems, prototyping, and code when needed.")},
    {page:"home", target:"contact", title:T("Parlons-en", "Let's talk"),
     text:T("Voilà pour la visite. Si un projet te parle, écris-moi : je réponds volontiers.",
            "That's the tour. If a project speaks to you, write to me: I'm happy to reply.")}
  );

  var KEY = "tour";
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  var state = load() || {on:false, i:0, audio:false, auto:false, rate:1};
  var voice = null, speaking = false, panel, els = {}, lastTarget = null;

  function load(){ try{ return JSON.parse(sessionStorage.getItem(KEY)); }catch(e){ return null; } }
  function save(){ try{ sessionStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }

  function pickVoice(){
    if(!synth) return;
    var list = synth.getVoices();
    voice = list.filter(function(v){ return (EN ? /^en/i : /^fr/i).test(v.lang); })[0] || null;
  }
  if(synth){ pickVoice(); if(synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice); }

  function stopSpeech(){ if(synth){ try{ synth.cancel(); }catch(e){} } speaking = false; syncPause(); }
  function speak(step){
    stopSpeech();
    if(!state.audio) return;
    if(step.audio){   // a recording, when there is one
      var a = new Audio(/^https?:/.test(step.audio) ? step.audio : ROOT + step.audio);
      els.rec = a; a.playbackRate = state.rate;
      a.onended = function(){ speaking = false; syncPause(); if(state.auto) setTimeout(next, 700); };
      a.play().then(function(){ speaking = true; syncPause(); }).catch(function(){});
      return;
    }
    if(!synth) return;
    var u = new SpeechSynthesisUtterance(step.title + ". " + step.text);
    u.lang = EN ? "en-GB" : "fr-FR"; if(voice) u.voice = voice; u.rate = state.rate;
    u.onstart = function(){ speaking = true; syncPause(); };
    u.onend = function(){ speaking = false; syncPause(); if(state.auto && state.on) setTimeout(next, 700); };
    u.onerror = function(){ speaking = false; syncPause(); };
    synth.speak(u);
  }
  function syncPause(){
    if(!els.pause) return;
    els.pause.hidden = !(state.audio && (speaking || (synth && synth.paused)));
    var paused = synth && synth.paused;
    els.pause.textContent = paused ? T("Reprendre", "Resume") : "Pause";
  }

  function build(){
    panel = document.createElement("div");
    panel.className = "tour"; panel.hidden = true;
    panel.innerHTML =
      '<div class="tour-card" role="dialog" aria-modal="false" aria-labelledby="tour-title">' +
        '<div class="tour-top"><span class="label" id="tour-count"></span><button type="button" id="tour-quit">' + T("Quitter la visite", "Leave the tour") + '</button></div>' +
        '<div class="tour-bar" aria-hidden="true"><i id="tour-fill"></i></div>' +
        '<h2 class="tour-title" id="tour-title" tabindex="-1"></h2>' +
        '<p class="tour-text" id="tour-text"></p>' +
        '<div class="tour-row">' +
          '<div class="group"><button type="button" id="tour-prev">' + T("Précédent", "Previous") + '</button><button type="button" class="primary" id="tour-next">' + T("Suivant", "Next") + '</button></div>' +
          '<div class="group">' +
            '<button type="button" id="tour-audio" aria-pressed="false">Audio</button>' +
            '<button type="button" id="tour-pause" hidden>Pause</button>' +
            '<label class="hide-s"><span>' + T("Vitesse", "Speed") + '</span><select id="tour-rate"><option value="0.85">' + T("Lente", "Slow") + '</option><option value="1" selected>' + T("Normale", "Normal") + '</option><option value="1.2">' + T("Rapide", "Fast") + '</option></select></label>' +
            '<label class="hide-s"><input type="checkbox" id="tour-auto"> <span>' + T("Avancer seule", "Auto-advance") + '</span></label>' +
          '</div>' +
        '</div>' +
        '<div class="sr-only" aria-live="polite" id="tour-live"></div>' +
      '</div>';
    document.body.appendChild(panel);
    ["count","quit","fill","title","text","prev","next","audio","pause","rate","auto","live"].forEach(function(k){ els[k] = document.getElementById("tour-" + k); });
    if(!synth){ els.audio.hidden = true; els.rate.parentNode.hidden = true; els.auto.parentNode.hidden = true; }
    els.quit.addEventListener("click", quit);
    els.prev.addEventListener("click", prev);
    els.next.addEventListener("click", next);
    els.audio.addEventListener("click", function(){
      state.audio = !state.audio; save(); render(false);
      if(state.audio) speak(STEPS[state.i]); else stopSpeech();
    });
    els.pause.addEventListener("click", function(){
      if(els.rec){ if(els.rec.paused) els.rec.play(); else els.rec.pause(); return; }
      if(synth.paused) synth.resume(); else synth.pause();
      syncPause();
    });
    els.rate.addEventListener("change", function(){ state.rate = Number(els.rate.value) || 1; save(); if(state.audio) speak(STEPS[state.i]); });
    els.auto.addEventListener("change", function(){ state.auto = els.auto.checked; save(); });
    panel.addEventListener("keydown", function(e){
      if(e.key === "ArrowRight"){ e.preventDefault(); next(); }
      else if(e.key === "ArrowLeft"){ e.preventDefault(); prev(); }
    });
  }

  function render(focus){
    var step = STEPS[state.i];
    els.count.textContent = T("Étape ", "Step ") + (state.i + 1) + T(" sur ", " of ") + STEPS.length;
    els.fill.style.width = ((state.i + 1) / STEPS.length * 100) + "%";
    els.title.textContent = step.title;
    els.text.textContent = step.text;
    els.prev.disabled = state.i === 0;
    els.next.textContent = state.i === STEPS.length - 1 ? T("Terminer", "Finish") : T("Suivant", "Next");
    els.audio.setAttribute("aria-pressed", String(state.audio));
    els.audio.textContent = state.audio ? T("Audio activé", "Audio on") : T("Activer l'audio", "Turn audio on");
    els.rate.value = String(state.rate); els.auto.checked = state.auto;
    if(focus){
      els.live.textContent = T("Étape ", "Step ") + (state.i + 1) + T(" sur ", " of ") + STEPS.length + " : " + step.title;
      els.title.focus({preventScroll:true});
    }
    if(lastTarget) lastTarget.classList.remove("tour-target");
    var t = document.getElementById(step.target);
    lastTarget = t;
    if(t){ t.classList.add("tour-target"); t.scrollIntoView({block:"center", behavior: reduced ? "auto" : "smooth"}); }
    syncPause();
  }

  function go(i){
    stopSpeech();
    state.i = Math.max(0, Math.min(STEPS.length - 1, i)); state.on = true; save();
    var step = STEPS[state.i];
    if(step.page !== HERE){ location.href = pageUrl(step.page); return; }   // the tour carries on on the other page
    if(!panel) build();
    panel.hidden = false;
    render(true);
    speak(step);
  }
  function next(){ if(state.i >= STEPS.length - 1){ quit(); return; } go(state.i + 1); }
  function prev(){ go(state.i - 1); }
  function quit(){
    stopSpeech(); state.on = false; state.i = 0; save();
    if(lastTarget) lastTarget.classList.remove("tour-target");
    if(panel) panel.hidden = true;
    var s = document.querySelector("[data-tour-start]"); if(s) s.focus();
  }

  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("[data-tour-start]");
    if(b){ e.preventDefault(); state.i = 0; go(0); }
  });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape" && state.on && panel && !panel.hidden) quit(); });
  window.addEventListener("pagehide", stopSpeech);

  // the tour was running on the page before: it carries on
  if(state.on){
    if(STEPS[state.i] && STEPS[state.i].page === HERE){ build(); panel.hidden = false; render(true); if(state.audio) speak(STEPS[state.i]); }
    else if(STEPS[state.i]){ location.href = pageUrl(STEPS[state.i].page); }
  }
})();
