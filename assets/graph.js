/* The interactive diagram of a case study: the project in the middle, the user needs around it, and the answer to each need.
   Tap or hover a need to read it, drag the points around (they spring back). Built from the `reponses` of the study:
   window.buildGraph(box) reads box.__graph = {center, items:[{short, need, answer}], hint}. */
(function(){
  var NS = "http://www.w3.org/2000/svg";
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function svg(tag, attrs){ var e = document.createElementNS(NS, tag); for(var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function html(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; }

  window.buildGraph = function(box){
    var G = box.__graph; if(!G || !G.items.length) return;
    var W = Math.round(box.getBoundingClientRect().width) || 340;
    box.innerHTML = "";
    var pain = G.mode === "pain", small = W < 520, n = G.items.length;
    box.classList.toggle("pain", pain);
    var H = Math.round(Math.max(small ? 400 : 420, Math.min(small ? 560 : 520, W * (small ? 1.25 : 0.62))));
    var cx = W / 2, cy = H / 2;
    var root = svg("svg", {viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "group", "aria-label": G.label || ""});
    var edgesLayer = svg("g", {}), nodesLayer = svg("g", {});
    root.appendChild(edgesLayer); root.appendChild(nodesLayer);
    box.appendChild(root);   // in the page before the pills are measured

    // the centre
    var centre = svg("g", {"class": "node centre", "aria-hidden": "true"});
    var cr = small ? 38 : 46;
    centre.appendChild(svg("circle", {r: cr}));
    var words = String(G.center || "").split(" "), lines = words.length > 1 && G.center.length > 9 ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")] : [G.center];
    var ct = svg("text", {}); lines.forEach(function(l, i){ var ts = svg("tspan", {x: 0, y: (i - (lines.length - 1) / 2) * 15 + 5}); ts.textContent = l; ct.appendChild(ts); });
    centre.appendChild(ct); nodesLayer.appendChild(centre);

    var C = {x: cx, y: cy, vx: 0, vy: 0, ax: cx, ay: cy, g: centre, r: cr};
    var ctrl = []; // {need:{x,y,vx,vy,ax,ay,g,w}, ans:{...}, e1, e2, it}
    var rx = Math.min(W * 0.34, 260), ry = H * (small ? 0.33 : 0.34);
    G.items.forEach(function(it, i){
      var a = -Math.PI / 2 + i * 2 * Math.PI / n;
      // the need: a pill with its short label
      var needG = svg("g", {"class": "node need", tabindex: 0, role: "button", "aria-pressed": "false", "aria-label": it.need + " : " + it.answer});
      var rect = svg("rect", {height: 32, rx: 16, y: -16}), txt = svg("text", {}); txt.textContent = it.short;
      needG.appendChild(rect); needG.appendChild(txt); nodesLayer.appendChild(needG);
      var w = 40; var tl = 0; try{ tl = txt.getComputedTextLength(); }catch(e){} w = Math.max(76, (tl || it.short.length * 7.6) + 30);
      rect.setAttribute("width", w); rect.setAttribute("x", -w / 2);
      var nx = Math.max(w / 2 + 6, Math.min(W - w / 2 - 6, cx + rx * Math.cos(a))), ny = cy + ry * Math.sin(a);
      // the answer: a small point beyond the need
      var ansG = svg("g", {"class": "node ans" + (pain ? " off" : ""), "aria-hidden": "true"});
      ansG.appendChild(svg("circle", {r: 8}));
      nodesLayer.appendChild(ansG);
      var ox = Math.cos(a) * (w / 2 + 20), oy = Math.sin(a) * 34 + (Math.abs(Math.cos(a)) < .3 ? 0 : 0);
      var ax = Math.max(14, Math.min(W - 14, nx + ox)), ay = Math.max(14, Math.min(H - 14, ny + oy));
      var e1 = svg("line", {"class": "edge"}), e2 = svg("line", {"class": "edge a" + (pain ? " off" : "")});
      edgesLayer.appendChild(e1); edgesLayer.appendChild(e2);
      ctrl.push({it: it, n: {x: nx, y: ny, vx: 0, vy: 0, ax: nx, ay: ny, g: needG, rect: rect}, a: {x: ax, y: ay, vx: 0, vy: 0, dx: ax - nx, dy: ay - ny, g: ansG}, e1: e1, e2: e2, i: i});
    });

    // the card that opens over the diagram: the problem, and the solution that answers it
    var card = html("div", "graph-card" + (pain ? " single" : "")); card.setAttribute("role", "status"); card.setAttribute("aria-live", "polite");
    var cl1 = html("span", "label", (G.labels && G.labels.need) || "Problem"), cp1 = html("p", "need"),
        cl2 = html("span", "label", (G.labels && G.labels.answer) || "Solution"), cp2 = html("p", "answer");
    var r1 = html("div", "row"), r2 = html("div", "row");
    r1.appendChild(cl1); r1.appendChild(cp1); r2.appendChild(cl2); r2.appendChild(cp2); card.appendChild(r1); card.appendChild(r2);
    box.appendChild(card);

    // the need is a sentence said by a user: it goes between quotation marks, in the style of the language
    function quote(t){ if(pain) return t; return document.documentElement.lang === "en" ? "“" + t + "”" : "« " + t + " »"; }
    var sel = null, hov = null;
    function current(){ return hov != null ? hov : sel; }
    function place(){
      var i = current(); if(i == null){ card.classList.remove("open"); return; }
      var n = ctrl[i].n, r = root.getBoundingClientRect(), k = r.width / W;
      var cw = Math.min(268, r.width - 16); card.style.width = cw + "px";
      var ch = card.offsetHeight, x = n.x * k, y = n.y * k, below = y + 30 + ch < r.height - 6;
      card.style.left = Math.max(8, Math.min(r.width - cw - 8, x - cw / 2)) + "px";
      card.style.top = Math.max(6, below ? y + 26 : y - 26 - ch) + "px";
      card.classList.add("open");
    }
    function update(){
      var i = current();
      if(i != null){ cp1.textContent = quote(ctrl[i].it.need); cp2.textContent = ctrl[i].it.answer; }
      ctrl.forEach(function(k, j){
        var on = j === sel, d = i != null && j !== i;
        k.n.g.classList.toggle("on", j === i); k.n.g.setAttribute("aria-pressed", String(on));
        k.n.g.classList.toggle("dim", d); k.a.g.classList.toggle("dim", d); k.e1.classList.toggle("dim", d); k.e2.classList.toggle("dim", d);
      });
      place();
    }
    function toggle(i){ sel = sel === i ? null : i; update(); }

    // the little physics: every point is pulled back to its place, and dragged with the finger
    var drag = null, running = false, visible = true, t0 = performance.now();
    function frame(now){
      var settled = true, t = (now - t0) / 1000;
      if(!(drag && drag.which === "c")){ C.vx = (C.vx + (C.ax - C.x) * .06) * .82; C.vy = (C.vy + (C.ay - C.y) * .06) * .82; C.x += C.vx; C.y += C.vy; }
      if(Math.abs(C.vx) + Math.abs(C.vy) > .05) settled = false;
      ctrl.forEach(function(c){
        var n = c.n, a = c.a;
        var fx = reduced ? 0 : Math.sin(t * .9 + c.i * 1.7) * 2.5, fy = reduced ? 0 : Math.cos(t * .8 + c.i * 1.3) * 2.5;
        if(!(drag && drag.c === c)){ n.vx = (n.vx + (n.ax + (C.x - C.ax) + fx - n.x) * .09) * .8; n.vy = (n.vy + (n.ay + (C.y - C.ay) + fy - n.y) * .09) * .8; n.x += n.vx; n.y += n.vy; }
        var tx = n.x + a.dx, ty = n.y + a.dy;
        if(!(drag && drag.c === c && drag.which === "a")){ a.vx = (a.vx + (tx - a.x) * .07) * .78; a.vy = (a.vy + (ty - a.y) * .07) * .78; a.x += a.vx; a.y += a.vy; }
        if(Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(a.vx) + Math.abs(a.vy) > .05) settled = false;
        n.g.setAttribute("transform", "translate(" + n.x.toFixed(1) + " " + n.y.toFixed(1) + ")");
        a.g.setAttribute("transform", "translate(" + a.x.toFixed(1) + " " + a.y.toFixed(1) + ")");
        c.e1.setAttribute("x1", C.x.toFixed(1)); c.e1.setAttribute("y1", C.y.toFixed(1)); c.e1.setAttribute("x2", n.x.toFixed(1)); c.e1.setAttribute("y2", n.y.toFixed(1));
        c.e2.setAttribute("x1", n.x.toFixed(1)); c.e2.setAttribute("y1", n.y.toFixed(1)); c.e2.setAttribute("x2", a.x.toFixed(1)); c.e2.setAttribute("y2", a.y.toFixed(1));
      });
      centre.setAttribute("transform", "translate(" + C.x.toFixed(1) + " " + C.y.toFixed(1) + ")");
      if(current() != null) place();
      running = visible && (!reduced || drag || !settled) && !document.hidden;
      if(running) requestAnimationFrame(frame);
    }
    function kick(){ if(!running){ running = true; requestAnimationFrame(frame); } }
    if("IntersectionObserver" in window){ new IntersectionObserver(function(es){ visible = es[0].isIntersecting; if(visible) kick(); }).observe(box); }
    document.addEventListener("visibilitychange", function(){ if(!document.hidden) kick(); });

    function point(e){ var r = root.getBoundingClientRect(); return {x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height}; }
    (function(){
      var moved = 0, start = null;
      centre.addEventListener("pointerdown", function(e){
        start = point(e); moved = 0; drag = {c: null, which: "c", dx: C.x - start.x, dy: C.y - start.y};
        try{ centre.setPointerCapture(e.pointerId); }catch(x){}
        e.preventDefault(); kick();
      });
      centre.addEventListener("pointermove", function(e){
        if(!drag || drag.which !== "c") return;
        var p = point(e);
        C.x = Math.max(C.r, Math.min(W - C.r, p.x + drag.dx)); C.y = Math.max(C.r, Math.min(H - C.r, p.y + drag.dy)); C.vx = C.vy = 0;
      });
      function release(){ if(drag && drag.which === "c"){ drag = null; kick(); } }
      centre.addEventListener("pointerup", release); centre.addEventListener("pointercancel", release);
    })();
    ctrl.forEach(function(c){
      [[c.n, "n"], [c.a, "a"]].forEach(function(pair){
        var node = pair[0], which = pair[1], g = node.g, moved = 0, start = null;
        g.addEventListener("pointerdown", function(e){
          start = point(e); moved = 0; drag = {c: c, which: which, dx: node.x - start.x, dy: node.y - start.y};
          try{ g.setPointerCapture(e.pointerId); }catch(x){}
          e.preventDefault(); kick();
        });
        g.addEventListener("pointermove", function(e){
          if(!drag || drag.c !== c || drag.which !== which) return;
          var p = point(e); moved = Math.max(moved, Math.abs(p.x - start.x) + Math.abs(p.y - start.y));
          node.x = Math.max(10, Math.min(W - 10, p.x + drag.dx)); node.y = Math.max(10, Math.min(H - 10, p.y + drag.dy));
          if(which === "a"){ c.a.vx = c.a.vy = 0; } else { node.vx = node.vy = 0; }
        });
        function up(){ if(drag && drag.c === c && drag.which === which){ drag = null; if(moved < 6) toggle(c.i); kick(); } }
        g.addEventListener("pointerup", up); g.addEventListener("pointercancel", function(){ drag = null; kick(); });
        g.addEventListener("pointerenter", function(e){ if(!drag && e.pointerType !== "touch"){ hov = c.i; update(); } });
        g.addEventListener("pointerleave", function(e){ if(!drag && e.pointerType !== "touch"){ hov = null; update(); } });
      });
      c.n.g.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); toggle(c.i); } else if(e.key === "Escape"){ sel = null; update(); } });
      c.n.g.addEventListener("focus", function(){ hov = c.i; update(); });
      c.n.g.addEventListener("blur", function(){ hov = null; update(); });
    });
    // a tap on the empty background closes the card
    root.addEventListener("pointerdown", function(e){ if(e.target === root){ sel = null; hov = null; update(); } });
    update(); kick();
  };

  // rebuild when the width changes (a phone turned on its side, a window resized)
  var timer, last = {};
  window.addEventListener("resize", function(){
    clearTimeout(timer);
    timer = setTimeout(function(){ [].forEach.call(document.querySelectorAll(".graph"), function(b){
      var w = Math.round(b.getBoundingClientRect().width); if(b.__w && Math.abs(w - b.__w) > 24){ b.__w = w; window.buildGraph(b); }
    }); }, 200);
  });
})();
