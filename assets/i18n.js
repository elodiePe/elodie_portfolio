/* French and English, on every page. Loaded first.
   The page is written in French; to give an element an English version, add data-en="…" (its content, HTML allowed)
   or data-en-<attribute>="…" (aria-label, content, alt…). The scripts that draw content use I18N.t("français", "english")
   or I18N.pick(object, "field") for data that has an `fr` block (see projects.js).
   The language is remembered, and the first visit follows the language of the browser. */
(function(){
  var KEY = "lang", lang = "fr";
  try{ lang = localStorage.getItem(KEY); }catch(e){}
  if(lang !== "fr" && lang !== "en") lang = /^fr/i.test(navigator.language || "fr") ? "fr" : "en";
  document.documentElement.setAttribute("lang", lang);

  window.I18N = {
    lang: lang,
    t: function(fr, en){ return lang === "en" ? en : fr; },
    // a project (or any object) that holds its French text in `.fr` and its English text at the top
    pick: function(o, k){ return lang === "fr" && o.fr && o.fr[k] != null ? o.fr[k] : o[k]; }
  };

  function apply(){
    [].forEach.call(document.querySelectorAll("*"), function(el){
      if(!el.attributes) return;
      [].slice.call(el.attributes).forEach(function(a){
        if(a.name.indexOf("data-en") !== 0) return;
        var target = a.name === "data-en" ? null : a.name.slice(8);   // data-en-aria-label → aria-label
        if(lang !== "en") return;
        if(target) el.setAttribute(target, a.value); else el.innerHTML = a.value;
      });
    });
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "lang";
    btn.textContent = lang === "fr" ? "EN" : "FR";
    btn.setAttribute("lang", lang === "fr" ? "en" : "fr");
    btn.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
    btn.addEventListener("click", function(){
      try{ localStorage.setItem(KEY, lang === "fr" ? "en" : "fr"); }catch(e){}
      location.reload();
    });
    var tools = document.querySelector(".tools");
    if(tools) tools.insertBefore(btn, tools.firstChild);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();
