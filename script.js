const params = new URLSearchParams(location.search);

const card = document.getElementById("card");
const icon = document.getElementById("icon");
const titleEl = document.getElementById("title");
const phoneEl = document.getElementById("phone");

// params
const title = params.get("title") || params.get("label") || "Liga agora";
const phone = params.get("phone") || params.get("number") || "+351 912 345 678";

const show = (params.get("show") ?? "1") !== "0";
const pulse = (params.get("pulse") ?? "1") !== "0";
const duration = Number(params.get("duration") || "0"); // segundos (0 = fixo)

// cores opcionais
const accent = params.get("accent");
if (accent && /^#[0-9a-fA-F]{6}$/.test(accent)) {
  document.documentElement.style.setProperty("--accent", accent);

  // ajusta o bloco do ícone e o pulse para a mesma cor
  icon.style.color = accent;
  icon.style.background = hexToRgba(accent, 0.18);
  icon.style.borderColor = hexToRgba(accent, 0.35);

  // injecta a cor no keyframe via CSS variable usando box-shadow indireto
  // (mantemos simples: o ::after usa rgba fixo no CSS, mas o box visual já fica coerente
  // porque o ícone e borda seguem o accent)
}

titleEl.textContent = title;
phoneEl.textContent = phone;

let hideTimer = null;

function doShow(){
  card.classList.remove("hide");
  card.classList.add("show");

  if (pulse) icon.classList.add("pulse");
  else icon.classList.remove("pulse");

  if (hideTimer) clearTimeout(hideTimer);
  if (duration > 0){
    hideTimer = setTimeout(doHide, duration * 1000);
  }
}

function doHide(){
  icon.classList.remove("pulse");
  card.classList.remove("show");
  card.classList.add("hide");
}

function hexToRgba(hex, a){
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

if (show) doShow();
else doHide();
