const textoSVG = document.getElementById("textoVirola");
const input = document.getElementById("textoInput");

const btnAdd = document.getElementById("btnAdd");
const btnRemove = document.getElementById("btnRemove");
const btnSize = document.getElementById("btnSize");
const btnInvert = document.getElementById("btnInvert");

let textos = ["TEXTO"];
let sizeIndex = 1;
let sizes = [16, 20, 24, 28]; // 4 alturas
let rotation = 0;

// ===== Texto base =====
function actualizarTexto() {
  textoSVG.textContent = textos.join(" ");
}
actualizarTexto();

// ===== Input =====
input.addEventListener("input", () => {
  textos[textos.length - 1] = input.value;
  actualizarTexto();
});

// ===== Agregar texto =====
btnAdd.addEventListener("click", () => {
  textos.push(input.value);
  actualizarTexto();
});

// ===== Quitar texto =====
btnRemove.addEventListener("click", () => {
  if (textos.length > 1) {
    textos.pop();
    actualizarTexto();
  }
});

// ===== Tamaño =====
btnSize.addEventListener("click", () => {
  sizeIndex = (sizeIndex + 1) % sizes.length;
  textoSVG.style.fontSize = sizes[sizeIndex] + "px";
});

// ===== Invertir 180° =====
btnInvert.addEventListener("click", () => {
  rotation = (rotation + 180) % 360;
  aplicarTransform();
});

// ===== Movimiento 360° =====
let dragging = false;

function getAngle(x, y) {
  const cx = 200;
  const cy = 200;
  return Math.atan2(y - cy, x - cx) * 180 / Math.PI;
}

function aplicarTransform(angle = null) {
  if (angle !== null) {
    textoSVG.dataset.angle = angle;
  }
  const a = textoSVG.dataset.angle || 0;
  textoSVG.setAttribute(
    "transform",
    `rotate(${Number(a) + rotation} 200 200)`
  );
}

// Mouse
textoSVG.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);

document.addEventListener("mousemove", e => {
  if (!dragging) return;
  const rect = document.getElementById("virola").getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  aplicarTransform(getAngle(x, y));
});

// Touch (móvil)
textoSVG.addEventListener("touchstart", () => dragging = true);
document.addEventListener("touchend", () => dragging = false);

document.addEventListener("touchmove", e => {
  if (!dragging) return;
  const rect = document.getElementById("virola").getBoundingClientRect();
  const t = e.touches[0];
  const x = t.clientX - rect.left;
  const y = t.clientY - rect.top;
  aplicarTransform(getAngle(x, y));
});
