/* A small stand-in for the REST API and the WebSocket of "Adopte un animal", so the real front-end (Vue.js) runs on its own in the portfolio.
   Everything is invented data, kept in memory: the animals are the ones of the project's seeder, the people are made up. Nothing leaves the page. */
(function(){
  var realFetch = window.fetch.bind(window);
  var uid = 0, nid = function(p){ return p + (++uid); };
  var now = Date.now();
  var ago = function(min){ return new Date(now - min * 60000).toISOString(); };

  /* ---------- data ---------- */
  var DB;
  function fresh(){
    var tags = ["Chien", "Chat", "Lapin", "Joueur", "Turbulant", "Calme", "Curieux"].map(function(n, i){ return {_id: "t" + (i + 1), nom: n}; });
    var T = function(n){ return tags.filter(function(t){ return t.nom === n; })[0]; };
    var spas = [
      {_id: "s1", nom: "SPA de Yverdon", adresse: "Yverdon", latitude: 46.46514, longitude: 6.38484, user_id: "u2"},
      {_id: "s2", nom: "SPA de Morges", adresse: "Morges", latitude: 46.30233, longitude: 6.29471, user_id: "u3"}
    ];
    var S = function(id){ return spas.filter(function(s){ return s._id === id; })[0]; };
    var im = function(a){ return a.map(function(n){ return {src: "img/" + n + ".jpg", imgType: "image/jpeg"}; }); };
    var P = function(id, nom, age, desc, imgs, tg, spa){ return {_id: id, nom: nom, age: age, description: desc, images: im(imgs), tags: tg.map(T), spa_id: S(spa), likes_count: 3, dislikes_count: 1, isAdopted: false}; };
    var pets = [
      P("p1", "Toffee", 12, "Un chien très mignon qui a 12 ans bientôt 13 ans", ["dog1", "dog2", "dog3"], ["Chien", "Joueur"], "s1"),
      P("p2", "Kira", 3, "Une chatte toute mignonne qui a 2 ans. Elle est très calme et adore les câlins.", ["cat1", "cat2", "cat3"], ["Chat", "Calme"], "s1"),
      P("p3", "Arthur", 3, "Un chien très mignon qui a 3 ans. Border Collie croisé avec golden retriever", ["dog2", "dog1", "dog3"], ["Chien", "Joueur"], "s1"),
      P("p4", "Jojo", 2, "Un lapin très mignon qui a 2 ans. Il est très joueur et curieux.", ["rab1", "rab2"], ["Lapin", "Turbulant", "Curieux"], "s1"),
      P("p5", "Pito", 8, "Un chat très mignon qui a 8 ans. Il est très joueur et curieux.", ["cat2", "cat3"], ["Chat", "Joueur", "Curieux", "Turbulant"], "s2"),
      P("p6", "Bethany", 10, "Un chien très mignon qui a 10 ans. Très calme et affectueuse, adore jouer avec les enfants", ["dog1", "dog2", "dog3"], ["Chien", "Joueur"], "s1"),
      P("p7", "Mojito", 1, "Un chaton de tout juste une année qui veut être aimée et être caressée.", ["cat3", "cat2", "cat1"], ["Chat", "Calme"], "s2"),
      P("p8", "Cookie", 1, "Un chiot de tout juste une année qui veut être aimée et être caressée.", ["dog2", "dog1", "dog3"], ["Chien", "Joueur"], "s1"),
      P("p9", "Roger", 1, "Un lapin très mignon qui a 1 an. Il est très joueur et curieux.", ["rab2", "rab1"], ["Lapin", "Joueur", "Curieux"], "s2"),
      P("p10", "Merlan", 3, "Un chien très mignon qui a 3 ans. Border Collie croisé avec golden retriever", ["dog2", "dog3", "dog1"], ["Chien", "Joueur"], "s2")
    ];
    var users = {
      u1: {_id: "u1", firstName: "Léa", lastName: "Martin", email: "lea.martin@example.com", hasSpa: false},
      u2: {_id: "u2", firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", hasSpa: true},
      u3: {_id: "u3", firstName: "Marc", lastName: "Doe", email: "marc.doe@example.com", hasSpa: true}
    };
    var P1 = function(id){ return pets.filter(function(p){ return p._id === id; })[0]; };
    var adoptions = [
      {_id: "a1", date: ago(300), user_id: "u1", pet_id: "p2", status: "pending", messages: [
        {_id: "m1", content: "Bonjour, Kira est-elle toujours disponible ?", date: ago(240), user_id: "u1"},
        {_id: "m2", content: "Bonjour Léa ! Oui, elle est toujours là. Elle adore les câlins.", date: ago(200), user_id: "u2"}]}
    ];
    return {tags: tags, spas: spas, pets: pets, users: users, adoptions: adoptions, likes: {u1: ["p2", "p8"]}, dislikes: {u1: ["p10"]}, P1: P1};
  }
  DB = fresh();
  var byId = function(list, id){ return list.filter(function(x){ return x._id === id; })[0]; };

  /* ---------- tokens ---------- */
  function token(userId){ return "x." + btoa(JSON.stringify({sub: userId})) + ".y"; }
  function me(req){ var h = (req.headers && (req.headers.Authorization || req.headers.authorization)) || ""; var t = h.replace("Bearer ", ""); try{ return JSON.parse(atob(t.split(".")[1])).sub; }catch(e){ return null; } }

  /* ---------- views of the data, the way the API shapes them ---------- */
  var petOut = function(p){ return p; };
  function adoptionOut(a){
    var pet = byId(DB.pets, a.pet_id), u = DB.users[a.user_id];
    return {_id: a._id, date: a.date, status: a.status, messages: a.messages, pet_id: pet, user_id: u};
  }
  function adoptionIdFor(userId, petId){ var a = DB.adoptions.filter(function(x){ return x.user_id === userId && x.pet_id === petId; })[0]; return a && a._id; }

  /* ---------- sockets ---------- */
  var sockets = [];
  function MockWS(){
    var s = this; this.readyState = 0; this.adoptionId = null; sockets.push(this);
    setTimeout(function(){ s.readyState = 1; s.onopen && s.onopen({}); }, 30);
  }
  MockWS.prototype.send = function(d){ try{ var m = JSON.parse(d); if(m.type === "authenticate") this.adoptionId = m.adoptionId; }catch(e){} };
  MockWS.prototype.close = function(){ sockets = sockets.filter(function(x){ return x !== this; }, this); this.readyState = 3; };
  function push(adoptionId, type, data){ sockets.forEach(function(s){ if(s.adoptionId === adoptionId && s.onmessage) s.onmessage({data: JSON.stringify({type: type, data: data})}); }); }
  window.WebSocket = MockWS;

  /* ---------- the routes ---------- */
  var json = function(data, status, headers){ return new Response(JSON.stringify(data), {status: status || 200, headers: Object.assign({"Content-Type": "application/json"}, headers || {})}); };
  var bytesToSrc = function(arr, type){ var s = ""; for(var i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]); return "data:" + (type || "image/jpeg") + ";base64," + btoa(s); };

  function route(method, path, q, body, req){
    var m, uidMe = me(req);
    // users
    if(method === "POST" && path === "/users/login"){
      var u = null; Object.keys(DB.users).forEach(function(k){ if(DB.users[k].email === (body.email || "").toLowerCase()) u = DB.users[k]; });
      if(!u) u = DB.users.u1;
      return json({token: token(u._id), hasSpa: u.hasSpa});
    }
    if(method === "POST" && path === "/users"){ var nu = {_id: nid("u"), firstName: body.firstName || "Nouveau", lastName: body.lastName || "", email: body.email, hasSpa: false}; DB.users[nu._id] = nu; return json(nu, 201); }
    if((m = path.match(/^\/users\/([^/]+)\/spa$/)) && method === "GET"){ var spa = DB.spas.filter(function(s){ return s.user_id === m[1]; })[0]; return spa ? json(spa) : json({}, 404); }
    if((m = path.match(/^\/users\/([^/]+)\/(likes|dislikes)$/)) && method === "GET"){
      var kind = m[2], ids = (DB[kind][m[1]] || []).slice().reverse();
      var page = +q.page || 1, size = +q.pageSize || ids.length || 1, total = ids.length, pages = Math.max(1, Math.ceil(total / size));
      var list = ids.slice((page - 1) * size, page * size).map(function(id){ var p = Object.assign({}, byId(DB.pets, id)); p.adoptionId = adoptionIdFor(m[1], id); return p; });
      var h = {}; h["pagination-total-" + kind] = String(total); h["pagination-total-pages"] = String(pages);
      return json(list, 200, h);
    }
    if((m = path.match(/^\/users\/([^/]+)\/adoptions$/)) && method === "GET"){
      var uu = DB.users[m[1]], list2 = DB.adoptions.filter(function(a){ return uu.hasSpa ? byId(DB.pets, a.pet_id).spa_id.user_id === uu._id : a.user_id === uu._id; });
      return json(list2.map(adoptionOut));
    }
    if((m = path.match(/^\/users\/([^/]+)$/))){ if(method === "GET") return json(DB.users[m[1]] || {}, DB.users[m[1]] ? 200 : 404); if(method === "PUT"){ Object.assign(DB.users[m[1]], body); return json(DB.users[m[1]]); } if(method === "DELETE") return json({}); }
    // pets
    if(path === "/tags" && method === "GET") return json(DB.tags);
    if(path === "/pets" && method === "GET"){
      var seen = (DB.likes[uidMe] || []).concat(DB.dislikes[uidMe] || []), want = q.tags ? q.tags.split(",") : [];
      var pool = DB.pets.filter(function(p){ return seen.indexOf(p._id) < 0 && !p.isAdopted && (!want.length || p.tags.some(function(t){ return want.indexOf(t._id) >= 0; })); });
      return json(pool);
    }
    if(path === "/pets" && method === "POST"){
      var sp = DB.spas.filter(function(s){ return s.user_id === uidMe; })[0] || DB.spas[0];
      var pet = {_id: nid("p"), nom: body.nom, age: +body.age, description: body.description, images: (body.images || []).map(function(i){ return {src: bytesToSrc(i.data, i.imgType), imgType: i.imgType}; }), tags: (body.tags || []).map(function(id){ return byId(DB.tags, id); }).filter(Boolean), spa_id: sp, likes_count: 0, dislikes_count: 0, isAdopted: false};
      DB.pets.unshift(pet); return json(pet, 201);
    }
    if((m = path.match(/^\/pets\/([^/]+)\/(like|dislike)$/))){
      var key = m[2] === "like" ? "likes" : "dislikes", other = m[2] === "like" ? "dislikes" : "likes";
      DB[key][uidMe] = DB[key][uidMe] || []; DB[other][uidMe] = DB[other][uidMe] || [];
      if(method === "PUT"){ if(DB[key][uidMe].indexOf(m[1]) < 0) DB[key][uidMe].push(m[1]); DB[other][uidMe] = DB[other][uidMe].filter(function(x){ return x !== m[1]; }); var pp = byId(DB.pets, m[1]); if(pp) pp[key + "_count"]++; return json({}); }
      if(method === "DELETE"){ DB[key][uidMe] = DB[key][uidMe].filter(function(x){ return x !== m[1]; }); return json({}); }
    }
    if((m = path.match(/^\/pets\/([^/]+)\/adoptions$/)) && method === "GET") return json(DB.adoptions.filter(function(a){ return a.pet_id === m[1]; }).map(adoptionOut));
    if((m = path.match(/^\/pets\/([^/]+)$/))){
      var p0 = byId(DB.pets, m[1]);
      if(method === "GET") return p0 ? json(p0) : json({}, 404);
      if(method === "PUT"){ Object.assign(p0, {nom: body.nom, age: +body.age, description: body.description}); if(body.tags) p0.tags = body.tags.map(function(id){ return byId(DB.tags, id); }).filter(Boolean); return json(p0); }
      if(method === "DELETE"){ DB.pets = DB.pets.filter(function(x){ return x._id !== m[1]; }); return json({}); }
    }
    // spas
    if((m = path.match(/^\/spas\/([^/]+)\/pets$/)) && method === "GET") return json(DB.pets.filter(function(p){ return p.spa_id._id === m[1]; }));
    if((m = path.match(/^\/spas\/([^/]+)$/))){ var s0 = byId(DB.spas, m[1]); if(method === "GET") return json(s0); if(method === "PUT"){ Object.assign(s0, body); return json(s0); } }
    if(path === "/spas" && method === "POST") return json({_id: nid("s")}, 201);
    // adoptions and chat
    if(path === "/adoptions" && method === "POST"){
      var ex = adoptionIdFor(uidMe, body.pet_id), ad = ex ? byId(DB.adoptions, ex) : null;
      if(!ad){ ad = {_id: nid("a"), date: new Date().toISOString(), user_id: uidMe, pet_id: body.pet_id, status: "pending", messages: []}; DB.adoptions.push(ad); }
      return json({_id: ad._id}, 201);
    }
    if((m = path.match(/^\/adoptions\/([^/]+)\/messages$/)) && method === "POST"){
      var a1 = byId(DB.adoptions, m[1]), msg = {_id: nid("m"), content: body.content, date: new Date().toISOString(), user_id: uidMe};
      a1.messages.push(msg); setTimeout(function(){ push(a1._id, "addMessage", msg); }, 40);
      if(!DB.users[uidMe].hasSpa){
        var pet2 = byId(DB.pets, a1.pet_id), who = pet2.spa_id.user_id;
        setTimeout(function(){ var r = {_id: nid("m"), content: "Merci pour votre message ! " + pet2.nom + " est toujours disponible. Voulez-vous passer la rencontrer ce week-end ?", date: new Date().toISOString(), user_id: who}; a1.messages.push(r); push(a1._id, "addMessage", r); }, 1700);
      }
      return json(msg, 201);
    }
    if((m = path.match(/^\/adoptions\/([^/]+)\/status$/)) && method === "PUT"){ var a2 = byId(DB.adoptions, m[1]); a2.status = body.status; setTimeout(function(){ push(a2._id, "statusUpdate", a2.status); }, 40); return json(a2); }
    if((m = path.match(/^\/adoptions\/([^/]+)$/)) && method === "GET"){ var a3 = byId(DB.adoptions, m[1]); return a3 ? json(adoptionOut(a3)) : json({}, 404); }
    return json({message: "not found"}, 404);
  }

  window.fetch = function(input, init){
    var url = typeof input === "string" ? input : (input && input.url) || "";
    if(url.indexOf("/api/") !== 0 && url.indexOf("/api?") !== 0) return realFetch(input, init);
    init = init || {};
    var u = new URL(url.replace(/^\/api/, ""), "http://x"), q = {}; u.searchParams.forEach(function(v, k){ q[k] = v; });
    var body = {}; try{ body = init.body ? JSON.parse(init.body) : {}; }catch(e){}
    var res; try{ res = route((init.method || "GET").toUpperCase(), u.pathname, q, body, init); }catch(e){ console.error(e); res = json({message: "error"}, 500); }
    return new Promise(function(ok){ setTimeout(function(){ ok(res); }, 120); });
  };

  /* a position, so the app does not ask for the visitor's */
  var pos = {latitude: 46.5197, longitude: 6.6323};
  try{ Object.defineProperty(navigator, "geolocation", {value: {getCurrentPosition: function(ok){ setTimeout(function(){ ok({coords: pos}); }, 10); }}, configurable: true}); }catch(e){}

  /* ---------- what the story calls ---------- */
  function setUser(id){ localStorage.setItem("token", token(id)); localStorage.setItem("hasSpa", String(DB.users[id].hasSpa)); }
  // the login form comes filled in, so a visitor only has to press the button (any password works)
  function fillLogin(){ setTimeout(function(){ [["#email", "lea.martin@example.com"], ["#password", "demo1234"]].forEach(function(f){ var i = document.querySelector(f[0]); if(i){ i.value = f[1]; i.dispatchEvent(new Event("input", {bubbles: true})); } }); }, 300); }
  window.__apSpa = localStorage.getItem("hasSpa") === "true";
  if(location.hash === "#/login") window.addEventListener("load", fillLogin);
  window.AP = {
    reset: function(){ DB = fresh(); },
    show: function(view){
      var app = window.__apRouter; if(!app) return;
      DB = fresh();
      if(view === "login"){ if(localStorage.getItem("token")){ localStorage.removeItem("token"); localStorage.removeItem("hasSpa"); location.hash = "#/login"; location.reload(); } else app.push("/login").then(fillLogin); return; }
      var spaViews = {spa: 1, spachat: 1, add: 1};
      setUser(spaViews[view] ? "u2" : "u1");
      var go = {home: "/", details: "/", likes: "/favorite", chats: "/chats", chat: "/chats/a1", spa: "/spa", spachat: "/chats/a1", add: "/pets/add", history: "/history", account: "/account"}[view] || "/";
      // the nav bar reads hasSpa once: reload when the kind of account changes
      var wasSpa = window.__apSpa; window.__apSpa = !!spaViews[view];
      if(wasSpa !== window.__apSpa){ location.hash = "#" + go; location.reload(); return; }
      app.push(go).then(function(){ if(view === "details") setTimeout(function(){ var c = document.querySelector(".swipeable-card-0"); if(c) c.click(); }, 700); });
    }
  };
})();
