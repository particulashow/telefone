const params = new URLSearchParams(location.search);

const card = document.getElementById("card");
const labelEl = document.getElementById("label");
const numberEl = document.getElementById("number");

// params
const label = params.get("label") || "Liga agora";
const number = params.get("number") || "+351 912 345 678";
const show = (params.get("show") ?? "1") !== "0";
const duration = Number(params.get("duration") || "0"); // segundos (0 = fixo)

// cores opcionais
const accent = params.get("accent");
if (accent && /^#[0-9a-fA-F]{6}$/.test(accent)) {
  document.documentElement.style.setProperty("--accent", accent);
  // também ajusta o bloco do ícone
  const icon = document.querySelector(".icon");
  if (icon){
    icon.style.color = accent;
    icon.style.background = hexToRgba(accent, 0.18);
    icon.style.borderColor = hexToRgba(accent, 0.35);
  }
}

labelEl.textContent = label;
numberEl.textContent = number;

let hideTimer = null;

function doShow(){
  card.classList.remove("hide");
  card.classList.add("show");

  if (hideTimer) clearTimeout(hideTimer);
  if (duration > 0){
    hideTimer = setTimeout(doHide, duration * 1000);
  }
}

function doHide(){
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
