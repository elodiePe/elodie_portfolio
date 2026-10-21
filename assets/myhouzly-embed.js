/* The MyHouzly demo (myhouzly-app/app.html) in the phone of the story. Same idea as pinday-embed.js: the page is the app's own
   compiled stylesheet and markup with a believable invented family, scaled into the phone. You can touch it; the story puts it
   in the right state for each step through window.MH.show(view). window.MyhouzlyEmbed.create(parent) returns {show, hide}. */
(function(){
  var K = 272 / 390;
  window.MyhouzlyEmbed = {
    create: function(parent){
      var lang = (window.I18N && I18N.lang) || document.documentElement.lang || "fr";
      var layer = document.createElement("div"); layer.className = "embed-layer";
      var frame = document.createElement("iframe");
      frame.src = "myhouzly-app/app.html?lang=" + (lang === "en" ? "en" : "fr"); frame.title = "MyHouzly";
      frame.setAttribute("loading", "eager");
      frame.width = 390;
      layer.appendChild(frame); parent.insertBefore(layer, parent.firstChild);
      // the page is laid out 390 px wide and scaled to the width of the screen; its height fills what is left, so the tab bar sits on the edge
      var fit = function(){ var k = layer.clientWidth / 390; if(!k) return; frame.style.transform = "scale(" + k + ")"; frame.height = Math.ceil(layer.clientHeight / k); };
      fit(); if(window.ResizeObserver) new ResizeObserver(fit).observe(layer); else window.addEventListener("resize", fit);
      var ready = false, target = null;
      var apply = function(){ try{ if(ready && target && frame.contentWindow.MH) frame.contentWindow.MH.show(target); }catch(e){} };
      frame.addEventListener("load", function(){ ready = true; apply(); });
      return {
        show: function(view){ layer.classList.add("on"); target = view; apply(); },
        hide: function(){ layer.classList.remove("on"); }
      };
    }
  };
})();
