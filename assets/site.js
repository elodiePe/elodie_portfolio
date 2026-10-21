/* The only script of the site: the theme switch, and the active link of the contents list on a case study. */
(function(){
  var root = document.documentElement;
  try{ var saved = localStorage.getItem("theme"); if(saved === "dark" || saved === "light") root.setAttribute("data-theme", saved); }catch(e){}
  var btn = document.getElementById("theme");
  if(btn) btn.addEventListener("click", function(){
    var dark = root.getAttribute("data-theme") === "dark" || (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try{ localStorage.setItem("theme", next); }catch(e){}
  });
  // what sticks under the menu (the contents list of a project) starts exactly where the menu ends, whatever its height
  var navEl = document.querySelector(".nav");
  var setNav = function(){ if(navEl) root.style.setProperty("--nav", (navEl.getBoundingClientRect().height - 1) + "px"); };
  setNav(); window.addEventListener("resize", setNav); window.addEventListener("load", setNav);
  var year = document.getElementById("year"); if(year) year.textContent = new Date().getFullYear();

  // the menu shows where you are: on the home page it follows the section you are reading
  if(document.body.getAttribute("data-page") === "home" && "IntersectionObserver" in window){
    var navLinks = {accueil: 'a[href="#accueil"]', projets: 'a[href="projets.html"]', competences: 'a[href="#competences"]', contact: 'a[href="#contact"]'};
    var all = [].slice.call(document.querySelectorAll(".nav li a"));
    var spy = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(!en.isIntersecting) return;
        var l = document.querySelector(".nav " + navLinks[en.target.id]); if(!l) return;
        all.forEach(function(a){ a.removeAttribute("aria-current"); }); l.setAttribute("aria-current", "true");
      });
    }, {rootMargin: "-35% 0px -55% 0px"});
    Object.keys(navLinks).forEach(function(id){ var el = document.getElementById(id); if(el) spy.observe(el); });
    // the last section is short: at the very bottom of the page, it is the one you are on
    window.addEventListener("scroll", function(){
      if(window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 6) return;
      var l = document.querySelector(".nav " + navLinks.contact); if(!l) return;
      all.forEach(function(a){ a.removeAttribute("aria-current"); }); l.setAttribute("aria-current", "true");
    }, {passive: true});
  }

  var links = [].slice.call(document.querySelectorAll(".toc a"));
  if(links.length && "IntersectionObserver" in window){
    var map = {};
    links.forEach(function(a){ map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){ links.forEach(function(a){ a.classList.remove("on"); }); if(map[en.target.id]) map[en.target.id].classList.add("on"); }
      });
    }, {rootMargin:"-25% 0px -65% 0px"});
    Object.keys(map).forEach(function(id){ var el = document.getElementById(id); if(el) io.observe(el); });
  }
})();
