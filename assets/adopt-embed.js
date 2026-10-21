/* The real "Adopte un animal" front-end (Vue.js, built from the project's code) in the phone of the story. A small stand-in for
   the REST API (adopt-app/mock.js) feeds it invented data, so it runs on its own. The story puts it in the right state for each
   step through window.AP.show(view). window.AdoptEmbed.create(parent) returns {show, hide}. */
(function(){
  var K = 272 / 390;
  window.AdoptEmbed = {
    create: function(parent){
      var layer = document.createElement("div"); layer.className = "embed-layer";
      var frame = document.createElement("iframe");
      frame.src = "adopt-app/index.html"; frame.title = "Adopte un animal";
      frame.setAttribute("loading", "eager"); frame.width = 390;
      layer.appendChild(frame); parent.insertBefore(layer, parent.firstChild);
      var fit = function(){ var k = layer.clientWidth / 390; if(!k) return; frame.style.transform = "scale(" + k + ")"; frame.height = Math.ceil(layer.clientHeight / k); };
      fit(); if(window.ResizeObserver) new ResizeObserver(fit).observe(layer); else window.addEventListener("resize", fit);
      var ready = false, target = null;
      var apply = function(){ try{ if(ready && target && frame.contentWindow.AP && frame.contentWindow.__apRouter) frame.contentWindow.AP.show(target); }catch(e){} };
      frame.addEventListener("load", function(){ ready = true; setTimeout(apply, 400); });
      return {
        show: function(view){ layer.classList.add("on"); target = view; apply(); },
        hide: function(){ layer.classList.remove("on"); }
      };
    }
  };
})();
