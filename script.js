// TeamAfot site scripts
(function () {
  const WHATSAPP = "233552318104"; // change here if the number changes

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Hairline under the nav once the page scrolls
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  };
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "Close" : "Menu";
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // ===== Demo wedding invitation =====
  const invite = document.querySelector(".invite");
  if (invite) {
    const closed = invite.querySelector(".invite__closed");
    const open = invite.querySelector(".invite__open");
    const seal = invite.querySelector(".seal");
    const msg = invite.querySelector(".rsvp__msg");
    let timer;

    // The demo date is always about four months away, so the countdown stays alive.
    const target = new Date();
    target.setMonth(target.getMonth() + 4);
    target.setHours(12, 0, 0, 0);
    invite.querySelector(".invite__date").textContent =
      target.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " · Accra";

    const tick = () => {
      const diff = Math.max(0, target - new Date());
      const parts = {
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
      };
      for (const k in parts) {
        invite.querySelector(`[data-cd="${k}"]`).textContent =
          k === "d" ? parts[k] : String(parts[k]).padStart(2, "0");
      }
    };

    seal.addEventListener("click", () => {
      closed.hidden = true;
      closed.style.display = "none";
      open.hidden = false;
      tick();
      timer = setInterval(tick, 1000);
      open.querySelector(".rsvp__btn").focus({ preventScroll: true });
    });

    invite.querySelector(".invite__reset").addEventListener("click", () => {
      clearInterval(timer);
      open.hidden = true;
      closed.hidden = false;
      closed.style.display = "";
      msg.textContent = "";
      seal.focus();
    });

    invite.querySelectorAll("[data-rsvp]").forEach((b) =>
      b.addEventListener("click", () => {
        msg.textContent =
          b.dataset.rsvp === "yes"
            ? "Wonderful. On your real site, you see every reply instantly."
            : "Noted. On your real site, you'd see this reply too.";
      })
    );
  }

  // ===== Contact form: opens WhatsApp with the message ready =====
  const form = document.getElementById("wa-form");
  if (form) {
    const err = form.querySelector(".form__error");
    form.name.addEventListener("input", () => (err.textContent = ""));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      if (!name) {
        err.textContent = "Add your name so we know who we're talking to.";
        form.name.focus();
        return;
      }
      let text = `Hello TeamAfot, my name is ${name}. I need: ${form.need.value}.`;
      const more = form.msg.value.trim();
      if (more) text += `\n\n${more}`;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }
})();
