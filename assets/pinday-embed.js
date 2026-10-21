/* The real Pinday app, in the phone of the story. It is the app itself (pinday-app/app.html, in its demo mode: a believable
   semester), scaled into the phone, not a drawing: you can touch it. The story drives it from one step to the next, with the
   same clicks a person would make. window.PindayEmbed.create(layerParent) returns {show(view), hide()}. */
(function(){
  var K = 272 / 390, LW = 1100, LH = 712, LK = 440 / 1100;   // the phone screen is 272 px wide; the laptop screen 440 px, showing a 1280 px wide page
  var NOTE_MD = "# Presentations in English\n\n#english\n\n> [!tip] Structure\n> Tell them what you will say, say it, then tell them what you said.\n\n## Three rules\n1. One message per slide, **few words**\n2. ==Practise the first 30 seconds== until they feel natural\n3. Look at the audience, not at the screen\n\n| Part | Time | Goal |\n| --- | --- | --- |\n| Opening | 30 s | Hook the audience |\n| Body | 4 min | Three clear points |\n| Closing | 30 s | One sentence to remember |\n\n- [x] Slides done\n- [ ] Rehearse twice\n";
  var w = function(ms){ return new Promise(function(r){ setTimeout(r, ms); }); };

  window.PindayEmbed = {
    create: function(parent, device){
      var laptop = device === "laptop";
      try{ localStorage.setItem("cp:theme", "light"); }catch(e){}
      var layer = document.createElement("div"); layer.className = "embed-layer";
      var frame = document.createElement("iframe");
      frame.src = "pinday-app/app.html#demo-drive"; frame.title = "Pinday";
      frame.setAttribute("loading", "eager");
      if(laptop){ frame.width = LW; layer.classList.add("laptop"); }
      else { frame.width = 390; frame.height = Math.round(538 / K); frame.style.transform = "scale(" + K + ")"; }
      layer.appendChild(frame); parent.insertBefore(layer, parent.firstChild);
      if(laptop){
        // the page is laid out 1100 px wide and scaled to the width of the laptop screen, whatever it is
        var fit = function(){ var k = layer.clientWidth / LW; if(!k) return; frame.style.transform = "scale(" + k + ")"; frame.height = Math.round(layer.clientHeight / k); };
        fit(); if(window.ResizeObserver) new ResizeObserver(fit).observe(layer); else window.addEventListener("resize", fit);
      }

      var D = function(){ return frame.contentDocument; };
      var $ = function(s){ var d = D(); return d && d.querySelector(s); };
      var visible = function(el){ return !!(el && el.offsetParent !== null); };
      var tap = function(s){ var e = $(s); if(e) e.click(); return !!e; };
      var ready = false, target = null, running = false;

      frame.addEventListener("load", function(){
        // no pop-ups over the demo
        var d = D(); if(!d) return;
        // the screenshots of the project are light: keep the demo light whatever the visitor's system says
        var root = d.documentElement, light = function(){ if(root.getAttribute("data-theme") !== "light") root.setAttribute("data-theme", "light"); };
        light(); new frame.contentWindow.MutationObserver(light).observe(root, {attributes: true, attributeFilter: ["data-theme"]});
        var st = d.createElement("style"); st.textContent = ".snack,#snackHost,.toast,.tour,.tour-card,.rm-clean,.rm-all:has(.rm-clean){display:none!important}"; d.head.appendChild(st);
        (async function(){
          for(var i = 0; i < 60; i++){
            var dd = D(); if(dd && dd.querySelectorAll(".card,.hero").length > 3 && dd.body.innerText.indexOf("Bring your timetable") < 0) break;
            await w(500);
          }
          await w(1200); ready = true; pump();
        })();
      });

      async function closeAll(){
        for(var i = 0; i < 8; i++){
          var b = $("#stClose"); if(visible(b)){ b.click(); await w(350); continue; }
          var x = [].slice.call((D().querySelectorAll("[data-close]")) || []).filter(visible)[0];
          if(x){ x.click(); await w(350); continue; }
          break;
        }
        tap('[data-tab-go="today"]'); await w(350);
      }
      async function more(which){
        if(!tap("#setBtn")) tap('[data-tab-go="more"]');
        await w(700); tap('[data-more="' + which + '"]');
      }
      async function openSession(){
        await more("exams"); await w(900); tap('[data-rvt="plans"]'); await w(1000);
        var rp = [].slice.call(D().querySelectorAll(".rp")).filter(function(s){ return s.textContent.indexOf("Financial") >= 0; })[0];
        if(rp){ var m = rp.querySelector("[data-rp-smenu]"); if(m) m.click(); await w(500); }
        var det = [].slice.call(D().querySelectorAll(".pop .mi")).filter(function(x){ return /Details/.test(x.textContent); })[0]; if(det) det.click();
        await w(3500);
      }
      var VIEWS = {
        home: async function(){ await closeAll(); },
        library: async function(){ await closeAll(); tap('[data-tab-go="notes"]'); await w(2200); },
        note: async function(){
          await closeAll(); tap('[data-tab-go="notes"]'); await w(2200);
          var lf = $(".lib-file[data-lib-open]"); if(lf) lf.click(); await w(3500);
          var ta = $("#mdIn"); if(ta){ ta.value = NOTE_MD; ta.dispatchEvent(new frame.contentWindow.Event("input", {bubbles: true})); await w(1000); }
        },
        map: async function(){ await closeAll(); await more("map"); await w(4000); },
        exams: async function(){ await closeAll(); await more("exams"); await w(1000); },
        session: async function(){ await closeAll(); await openSession(); },
        cards: async function(){
          await closeAll(); await openSession();
          var b = D().querySelectorAll(".rv-path [data-rm-open]")[1]; if(b) b.click(); await w(2200);
          tap("[data-st-go]"); await w(800);
        }
      };
      var byText = function(sel, t){
        return [].slice.call(D().querySelectorAll(sel)).filter(function(x){ return visible(x) && x.textContent.trim().replace(/\s+/g, " ").indexOf(t) === 0; })[0];
      };
      var VIEWS_LAPTOP = {
        home: async function(){ await closeAll(); },
        note: async function(){
          await closeAll(); var n = byText("button,a", "My notes"); if(n) n.click(); await w(2400);
          var tf = $(".tree-file"), ob = [].slice.call(D().querySelectorAll("button")).filter(function(b){ return b.textContent.trim() === "Open" && visible(b); })[0];
          var t = visible(tf) ? tf : ob; if(t) t.click(); await w(3500);
          var ta = $("#mdIn"); if(ta){ ta.value = NOTE_MD; ta.dispatchEvent(new frame.contentWindow.Event("input", {bubbles: true})); await w(1000); }
        },
        library: async function(){
          await closeAll(); var n = byText("button,a", "My notes"); if(n) n.click(); await w(2400);
          var f = byText(".tree-item, .tree-box *, button", "Financial Accounting"); if(f) f.click(); await w(1400);
        },
        map: async function(){ await closeAll(); var m = byText("button,a", "Map"); if(m) m.click(); await w(4500); },
        exams: async function(){ await closeAll(); tap("#setBtn"); await w(600); tap('[data-more="exams"]'); await w(1200); },
        session: async function(){ await closeAll(); await openSession(); },
        cards: async function(){
          await closeAll(); await openSession();
          var b = D().querySelectorAll(".rv-path [data-rm-open]")[1]; if(b) b.click(); await w(2200);
          tap("[data-st-go]"); await w(800);
        }
      };
      if(laptop) VIEWS = VIEWS_LAPTOP;
      var current = null;
      async function pump(){
        if(running || !ready) return; running = true;
        try{
          while(target && target !== current){
            var v = target; current = v;
            try{ await VIEWS[v](); }catch(e){ /* the app is still waking up: the next step tries again */ current = null; }
          }
        } finally { running = false; }
      }
      return {
        show: function(view){ layer.classList.add("on"); target = view; pump(); },
        hide: function(){ layer.classList.remove("on"); }
      };
    }
  };
})();
