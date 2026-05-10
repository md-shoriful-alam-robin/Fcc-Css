/* ============================================
   CSS PLAYING CARDS — script.js
   JavaScript শুধু CSS কে control করছে
   মূল শেখার বিষয় হলো CSS, JS শুধু helper
   ============================================ */

/* ── DOM ELEMENTS ── */
const cardsContainer = document.getElementById("playing-cards");
const allCards = document.querySelectorAll(".card");
const infoCode = document.getElementById("info-code");

const gapCtrl = document.getElementById("gap-ctrl");
const gapOut = document.getElementById("gap-out");
const radiusCtrl = document.getElementById("radius-ctrl");
const radiusOut = document.getElementById("radius-out");
const sizeCtrl = document.getElementById("size-ctrl");
const sizeOut = document.getElementById("size-out");
const justifyCtrl = document.getElementById("justify-ctrl");
const wrapCtrl = document.getElementById("wrap-ctrl");
const hoverCtrl = document.getElementById("hover-ctrl");

/* ── HELPER: CSS code info bar update ── */
function showInfo(cssText) {
  infoCode.textContent = cssText;
}

/* ── CONTROL: gap ── */
gapCtrl.addEventListener("input", () => {
  const val = gapCtrl.value + "px";
  cardsContainer.style.gap = val;
  gapOut.textContent = val;
  showInfo(
    `#playing-cards {\n  gap: ${val};\n}\n\n/* gap মানে flex/grid এ items এর মাঝে ফাঁকা */`,
  );
});

/* ── CONTROL: border-radius ── */
radiusCtrl.addEventListener("input", () => {
  const val = radiusCtrl.value + "px";
  allCards.forEach((c) => (c.style.borderRadius = val));
  radiusOut.textContent = val;
  showInfo(
    `.card {\n  border-radius: ${val};\n}\n\n/* 0px = sharp corner\n   50% = perfect circle\n   যেকোনো value = গোলাকার কোণ */`,
  );
});

/* ── CONTROL: card size ── */
sizeCtrl.addEventListener("input", () => {
  const w = parseInt(sizeCtrl.value);
  const h = Math.round(w * 1.45);
  allCards.forEach((c) => {
    c.style.width = w + "px";
    c.style.height = h + "px";
  });
  sizeOut.textContent = w + "px";
  showInfo(
    `.card {\n  width: ${w}px;\n  height: ${h}px; /* 1.45 ratio */\n}\n\n/* Real playing card ratio হলো\n   width : height = 1 : 1.4 */`,
  );
});

/* ── CONTROL: justify-content ── */
justifyCtrl.addEventListener("change", () => {
  cardsContainer.style.justifyContent = justifyCtrl.value;
  const descriptions = {
    center: "সব card center এ জড়ো হয়",
    "flex-start": "সব card বাম দিক থেকে শুরু",
    "flex-end": "সব card ডান দিকে শেষ",
    "space-between": "প্রথম ও শেষ card কিনারায়, বাকিরা সমান ফাঁকে",
    "space-around": "প্রতিটা card এর দুই পাশে সমান margin",
    "space-evenly": "সব ফাঁকা সমান — cards ও কিনারা মিলিয়ে",
  };
  showInfo(
    `#playing-cards {\n  justify-content: ${justifyCtrl.value};\n}\n\n/* ${descriptions[justifyCtrl.value]} */`,
  );
});

/* ── CONTROL: flex-wrap ── */
wrapCtrl.addEventListener("change", () => {
  cardsContainer.style.flexWrap = wrapCtrl.value;
  const descriptions = {
    wrap: "জায়গা না হলে পরের লাইনে যায়",
    nowrap: "সব একলাইনে — overflow হতে পারে",
    "wrap-reverse": "উল্টো দিক থেকে wrap হয়",
  };
  showInfo(
    `#playing-cards {\n  flex-wrap: ${wrapCtrl.value};\n}\n\n/* ${descriptions[wrapCtrl.value]} */`,
  );
});

/* ── CONTROL: hover effect ── */
hoverCtrl.addEventListener("change", () => {
  const val = hoverCtrl.value;

  /* body থেকে সব hover class সরাও */
  document.body.classList.remove("hover-rotate", "hover-scale", "hover-none");
  /* card থেকে shake class সরাও */
  allCards.forEach((c) => c.classList.remove("hover-shake"));

  const effects = {
    lift: `.card:hover {\n  transform: translateY(-10px) scale(1.04);\n  box-shadow: 4px 16px 36px rgba(0,0,0,0.55);\n}`,
    rotate: `.card:hover {\n  transform: translateY(-8px) rotate(-6deg) scale(1.05);\n}`,
    scale: `.card:hover {\n  transform: scale(1.12);\n}`,
    shake: `@keyframes shake {\n  20% { transform: rotate(-4deg); }\n  40% { transform: rotate( 4deg); }\n  60% { transform: rotate(-4deg); }\n  80% { transform: rotate( 4deg); }\n}\n.card:hover {\n  animation: shake 0.4s ease;\n}`,
    none: `.card:hover {\n  transform: none;\n}`,
  };

  if (val === "rotate") document.body.classList.add("hover-rotate");
  if (val === "scale") document.body.classList.add("hover-scale");
  if (val === "none") document.body.classList.add("hover-none");
  if (val === "shake") allCards.forEach((c) => c.classList.add("hover-shake"));

  showInfo(effects[val] || "");
});

/* ── CARD CLICK — selected state + info ── */
allCards.forEach((card) => {
  card.addEventListener("click", () => {
    /* আগের selection সরাও */
    allCards.forEach((c) => c.classList.remove("selected"));
    /* এই card select করো */
    card.classList.add("selected");

    const rank = card.dataset.rank;
    const suit = card.dataset.suit;
    const color = card.classList.contains("red")
      ? "var(--red) → #c0392b"
      : "var(--black) → #1a1a2e";

    showInfo(
      `.card {\n  position: relative;   /* corner badge এর জন্য */\n  overflow: hidden;      /* shine clip করতে */\n  transition: transform 0.25s ease,\n              box-shadow 0.25s ease;\n}\n\n/* ${rank}${suit} এর color: ${color} */\n/* CSS variable দিয়ে এক জায়গা থেকে\n   সব color control করা যায় */`,
    );
  });

  /* keyboard accessibility */
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

/* ── INITIAL INFO MESSAGE ── */
showInfo(
  `/* CSS Playing Cards — শুরু করতে:\n\n   1. উপরের slider টেনে দেখো\n   2. dropdown বদলাও\n   3. যেকোনো card এ click করো\n\n   প্রতিটা action এ CSS code দেখাবে */`,
);
