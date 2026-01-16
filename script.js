// === ELEMENTOS ===
const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoCircularEl = document.getElementById('textoCircularEl');
const invertirBtn = document.getElementById('invertirBtn');

// === VARIABLES ===
let invertido = false;
let arrastrando = false;
let inicioX = 0;
let rotacion = 0;

// === TEXTO EN TIEMPO REAL ===
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// === INVERTIR TEXTO 180° ===
invertirBtn.addEventListener('click', () => {
  invertido = !invertido;
  aplicarTransformaciones();
});

// === FUNCION APLICAR TRANSFORMACIONES ===
function aplicarTransformaciones() {
  const rotacionFinal = invertido ? rotacion + 180 : rotacion;
  textoCircularEl.setAttribute('transform', `rotate(${rotacionFinal} 210 210)`);
}

// === ARRASTRE DESKTOP ===
textoCircularEl.style.cursor = 'grab';

textoCircularEl.addEventListener('mousedown', (e) => {
  arrastrando = true;
  inicioX = e.clientX;
  textoCircularEl.style.cursor = 'grabbing';
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!arrastrando) return;
  const delta = e.clientX - inicioX;
  rotacion += delta * 0.4; // sensibilidad
  aplicarTransformaciones();
  inicioX = e.clientX;
});

document.addEventListener('mouseup', () => {
  arrastrando = false;
  textoCircularEl.style.cursor = 'grab';
});

// === ARRASTRE MOBILE ===
textoCircularEl.addEventListener('touchstart', (e) => {
  arrastrando = true;
  inicioX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  if (!arrastrando) return;
  const delta = e.touches[0].clientX - inicioX;
  rotacion += delta * 0.4; // misma sensibilidad
  aplicarTransformaciones();
  inicioX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
  arrastrando = false;
});

