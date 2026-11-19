(function () {
  const D = window.DATA, B = document.body, pg = B.dataset.page, N = +B.dataset.bai || 0, $ = s => document.querySelector(s);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x !== undefined) e.textContent = x; return e; };
  const add = (p, ...k) => { k.flat().forEach(n => n && p.append(n)); return p; };
  const img = (src, hint) => { const i = el("img"); i.src = src; i.alt = "Ảnh đại diện"; i.onerror = () => i.replaceWith(el("div", "ph", hint)); return i; };
  const list = (arr, cls) => add(el("ul", cls), (arr || ["[...]"]).map(x => el("li", "", x)));
  const sec = (title, label, id) => { const s = el("section", "sec rv"); if (id) s.id = id; if (label) s.appendChild(el("p", "lab", label)); s.appendChild(el("h2", "", title)); return s; };
  const proj = D.projects, mk = n => "bai-" + n + ".html", calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");
  document.title = (N ? "Bài " + N + ": " + proj[N - 1].title : { home: "Giới thiệu", projects: "Dự án", summary: "Tổng kết" }[pg]) + " – Portfolio " + D.name;

  // Tab menu mép phải + tên + chân trang
  const brand = el("a", "brand", "♪ " + D.name); brand.href = "index.html"; $("#hd").appendChild(brand);
  const tabs = el("nav", "tabs"), cur = pg === "bai" ? "projects" : pg; tabs.setAttribute("aria-label", "Menu chính");
  [["index.html", "Giới thiệu", "home", "#ffd86b"], ["du-an.html", "Dự án", "projects", "#8fd3ff"], ["tong-ket.html", "Tổng kết", "summary", "#ffa266"]].forEach(k => {
    const a = el("a", "tab", k[1]); a.href = k[0]; a.style.setProperty("--c", k[3]); if (k[2] === cur) a.setAttribute("aria-current", "page"); tabs.appendChild(a);
  });
  B.appendChild(tabs);
  $("#ft").textContent = D.name + " – MSSV " + D.id + " – Lớp " + D.cls + " – Học phần " + D.course;

  const stones = () => { const ol = el("ol", "stones"); proj.forEach((p, i) => { const li = el("li"), a = el("a", "stone"); a.href = mk(i + 1); add(a, el("i", "", String(i + 1)), document.createTextNode(p.tag)); ol.appendChild(add(li, a)); }); return ol; };
  const main = $("#app");

  const pages = {
    home() {
      const hero = el("section", "hero"), L = el("div"), hi = el("p", "hi", "Xin chào, mình là"), arm = el("span", "metro");
      arm.appendChild(el("i", "arm")); hi.appendChild(arm);
      const cta = el("a", "cta", "Xem các dự án →"); cta.href = "du-an.html";
      add(L, hi, el("h1", "", D.name), el("p", "role", D.major), add(el("div", "chips"), D.hobbies.map(h => el("span", "chip", h))), el("p", "lead", D.intro), cta);
      const w = el("div", "idw"), c = el("div", "id"), b = el("div", "idb"), p = el("div", "idp"); p.appendChild(img(D.avatar, D.avatar));
      const dl = el("dl", "idl");
      [["Ngành", D.major], ["Trường", D.school], ["Lớp", D.cls], ["Học phần", D.course], ["MSSV", D.id], ["Sở thích", D.hobbies.join(", ")]].forEach(r => add(dl, add(el("div", "idr"), el("dt", "", r[0]), el("dd", "", r[1]))));
      add(c, el("div", "idh", "Thông tin cá nhân"), add(b, p, el("div", "idn", D.name)), dl, el("div", "bc"));
      main.appendChild(add(hero, L, add(w, c)));
      const two = el("div", "cols"), s1 = sec("Mục tiêu học tập", "Học gì?"), s2 = sec("Định hướng phát triển cá nhân", "Đi đâu?");
      two.append(add(s1, list(D.goals, "chk")), add(s2, list(D.direction, "chk"))); main.appendChild(two);
      const m = sec("Mục tiêu của Portfolio", "Để làm gì?"), g = el("div", "chalks");
      D.portfolioGoals.forEach(x => add(g, add(el("div"), el("b", "", x.t), el("p", "", x.d)))); main.appendChild(add(m, g));
      // thẻ nghiêng theo chuột
      if (!calm) {
        w.addEventListener("pointermove", e => { const r = w.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = "rotateY(" + x * 20 + "deg) rotateX(" + -y * 16 + "deg)"; });
        w.addEventListener("pointerleave", () => { c.style.transform = ""; });
      }
    },
    projects() {
      main.appendChild(add(el("div"), el("p", "lab", "Bảng ghim bài tập"), el("h1", "", "Dự án"), el("p", "lead", "Sáu bài tập của học phần " + D.course + ". Bấm vào từng tờ giấy để xem quy trình thực hiện và sản phẩm cuối cùng.")));
      const ol = el("ol", "cork rv"); ol.style.marginTop = "2.4rem";
      proj.forEach((p, i) => {
        const li = el("li"), a = el("a", "note"); a.href = mk(i + 1);
        add(a, el("div", "n", "0" + (i + 1)), el("h3", "", p.title), el("p", "", p.sum), el("span", "tg", p.tag), el("span", "go", "Mở bài →")); ol.appendChild(add(li, a));
      });
      main.appendChild(ol);
    },
    bai() {
      const p = proj[N - 1], c = el("p", "crumb"), a = el("a", "", "Dự án"); a.href = "du-an.html"; add(c, a, document.createTextNode(" / Bài " + N));
      main.appendChild(add(el("div"), c, el("h1", "", "Bài " + N + ": " + p.title), el("p", "lead", p.sum), add(el("div", "tags"), el("span", "tag", p.tag))));
      const ls = el("div", "lesson"), toc = el("nav", "toc"), body = el("div");
      const S = [["muc-tieu", "Mục tiêu"], ["quy-trinh", "Quy trình thực hiện"], ["cong-cu", "Công cụ đã dùng"], ["san-pham", "Sản phẩm cuối cùng"], ["nhin-lai", "Nhìn lại bài tập"]];
      S.forEach(s => { const x = el("a", "", s[1]); x.href = "#" + s[0]; x.dataset.s = s[0]; toc.appendChild(x); });
      body.appendChild(add(sec("Mục tiêu", "", "muc-tieu"), list(p.goals, "chk")));
      const fl = el("ol", "flow"); (p.steps || ["[Bước 1: bạn đã làm gì?]"]).forEach(s => { const li = el("li"); if (typeof s === "string") li.textContent = s; else add(li, el("b", "", s.t), el("span", "", s.d)); fl.appendChild(li); });
      body.appendChild(add(sec("Quy trình thực hiện", "", "quy-trinh"), fl));
      body.appendChild(add(sec("Công cụ đã dùng", "", "cong-cu"), add(el("div", "chips"), (p.tools || ["[Công cụ]"]).map(t => el("span", "chip", t)))));
      const pr = sec("Sản phẩm cuối cùng", "", "san-pham");
      if (p.pdf) { const sc = el("div", "screen"), f = el("iframe"); f.src = p.pdf; f.title = "Báo cáo Bài " + N; const l = el("a", "", "Mở báo cáo ở tab mới"); l.href = p.pdf; l.target = "_blank"; add(pr, add(sc, f), add(el("p"), l)); }
      if (p.video) { const sc = el("div", "screen video"), v = el("iframe"); v.src = p.video; v.title = "Video Bài " + N; v.allowFullscreen = true; pr.appendChild(add(sc, v)); }
      body.appendChild(pr);
      const rf = sec("Nhìn lại bài tập", "", "nhin-lai"), ps = el("div", "posts");
      [["Bài học rút ra", p.lesson], ["Khó khăn đã gặp", p.hard], ["Hướng cải thiện lần sau", p.next]].forEach(r => add(ps, add(el("div", "post"), el("h3", "", r[0]), el("p", "", r[1] || "[...]"))));
      body.appendChild(add(rf, ps));
      const pg2 = el("nav", "pager"), pv = N > 1 ? mk(N - 1) : "du-an.html", nx = N < proj.length ? mk(N + 1) : "tong-ket.html";
      const A = (h, t) => { const x = el("a", "", t); x.href = h; return x; };
      body.appendChild(add(pg2, A(pv, N > 1 ? "← Bài " + (N - 1) : "← Tất cả dự án"), A(nx, N < proj.length ? "Bài " + (N + 1) + " →" : "Tổng kết →")));
      main.appendChild(add(ls, toc, body));
      const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) toc.querySelectorAll("a").forEach(x => x.classList.toggle("on", x.dataset.s === e.target.id)); }), { rootMargin: "-30% 0px -60% 0px" });
      S.forEach(s => spy.observe($("#" + s[0])));
    },
    summary() {
      const S = D.summary;
      main.appendChild(add(el("div"), el("p", "lab", "Cuối học phần"), el("h1", "", "Tổng kết"), el("p", "lead", "Nhìn lại quá trình làm Portfolio.")));
      const a = sec("Trải nghiệm và cảm nhận cá nhân"); a.appendChild(el("div", "paper", S.feel)); main.appendChild(a);
      const k = sec("Kiến thức và kỹ năng quan trọng nhất đã tiếp thu"), g = el("div", "chalks");
      S.key.forEach(x => add(g, add(el("div"), el("b", "", x.t), el("p", "", x.d)))); main.appendChild(add(k, g));
      const t = sec("Điểm tâm đắc nhất và thách thức đã gặp"), ps = el("div", "posts");
      add(ps, add(el("div", "post"), el("h3", "", "Điểm tâm đắc nhất"), el("p", "", S.proud)), add(el("div", "post"), el("h3", "", "Thách thức đã gặp"), el("p", "", S.hard)));
      main.appendChild(add(t, ps));
      main.appendChild(add(sec("Các trang bài tập đã hoàn thành"), stones()));
    }
  };
  pages[pg]();

  // Bụi phấn và nốt nhạc bay, dịch nhẹ theo chuột
  if (!calm) {
    const dust = el("div", "dust"); dust.setAttribute("aria-hidden", "true");
    const R = (a, b) => a + Math.random() * (b - a);
    for (let i = 0; i < 46; i++) { const d = el("i"), s = d.style, z = R(2, 6); s.width = s.height = z + "px"; s.left = R(0, 100) + "%"; s.animationDuration = R(16, 36) + "s"; s.animationDelay = -R(0, 36) + "s"; s.setProperty("--o", R(.15, .45).toFixed(2)); s.setProperty("--sw", R(-50, 50) + "px"); s.setProperty("--r", "0deg"); dust.appendChild(d); }
    ["♪", "♫", "♩", "♬"].forEach((g, i) => { for (let k = 0; k < 2; k++) { const b = el("b", "", g), s = b.style; s.left = R(4, 94) + "%"; s.setProperty("--fs", R(30, 54) + "px"); s.setProperty("--col", ["#ffd86b", "#8fd3ff", "#ffa266"][(i + k) % 3]); s.animationDuration = R(22, 38) + "s"; s.animationDelay = -R(0, 38) + "s"; s.setProperty("--o", R(.18, .32).toFixed(2)); s.setProperty("--sw", R(-60, 60) + "px"); s.setProperty("--r", R(-30, 30) + "deg"); dust.appendChild(b); } });
    B.prepend(dust);
    addEventListener("pointermove", e => { dust.style.setProperty("--px", (e.clientX / innerWidth - .5) * 2); dust.style.setProperty("--py", (e.clientY / innerHeight - .5) * 2); });
  }

  const rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !calm) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
    rv.forEach(e => io.observe(e));
  } else rv.forEach(e => e.classList.add("in"));
})();
