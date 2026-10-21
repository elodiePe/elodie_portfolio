/* The Vaud Sentiers prototype (vaudsentiers-app/app.html) in the phone of the story: the screens of the Figma file, rebuilt in
   HTML so you can touch them. The story puts it in the right state for each step through window.VS.show(view).
   window.VaudsentiersEmbed.create(parent) returns {show, hide}. */
(function(){
  var W = 412;   // the page is laid out 412 px wide, like the frames of the Figma file, and scaled to the phone
  window.VaudsentiersEmbed = {
    create: function(parent){
      var lang = (window.I18N && I18N.lang) || document.documentElement.lang || "fr";
      var layer = document.createElement("div"); layer.className = "embed-layer";
      var frame = document.createElement("iframe");
      frame.src = "vaudsentiers-app/app.html?lang=" + (lang === "en" ? "en" : "fr"); frame.title = "Vaud Sentiers";
      frame.setAttribute("loading", "eager"); frame.width = W; frame.style.width = W + "px";   // the stylesheet sets 390 px for the other apps
      layer.appendChild(frame); parent.insertBefore(layer, parent.firstChild);
      var fit = function(){ var k = layer.clientWidth / W; if(!k) return; frame.style.transform = "scale(" + k + ")"; frame.height = Math.ceil(layer.clientHeight / k); };
      fit(); if(window.ResizeObserver) new ResizeObserver(fit).observe(layer); else window.addEventListener("resize", fit);
      var ready = false, target = null;
      var apply = function(){ try{ if(ready && target && frame.contentWindow.VS) frame.contentWindow.VS.show(target); }catch(e){} };
      frame.addEventListener("load", function(){ ready = true; apply(); });
      return {
        show: function(view){ layer.classList.add("on"); target = view; apply(); },
        hide: function(){ layer.classList.remove("on"); }
      };
    }
  };
})();
