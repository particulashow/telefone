const params = new URLSearchParams(location.search);

const theme = (params.get("theme") || "dark").toLowerCase();
document.documentElement.dataset.theme = theme;

const title = params.get("title") || "LIGA JÁ";
const phone = params.get("phone") || "---";
const active = (params.get("active") || "1") === "1";
const pulse = (params.get("pulse") || "1") === "1";

const elTitle = document.getElementById("title");
const elPhone = document.getElementById("phone");
const elHint = document.getElementById("hint");
const card = document.getElementById("card");

elTitle.textContent = title;
elPhone.textContent = phone;

if (active){
  card.classList.add("active");
  elHint.textContent = "Linha ativa";
} else {
  elHint.textContent = "Linha indisponível";
}

if (active && pulse){
  document.documentElement.classList.add("pulse");
}
