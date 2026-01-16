const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoCircularEl = document.getElementById('textoCircularEl');
const invertirBtn = document.getElementById('invertirBtn');

// ===== TEXTO EN TIEMPO REAL =====
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// ===== ROTACIÓN POR ARRASTRE =====
let arrastrando = false;
let inicioX = 0;
let rotacion = 0;

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

  // sensibilidad de giro
  rotacion += delta * 0.4;

  aplicarTransformaciones();
  inicioX = e.clientX;
});

document.addEventListener('mouseup', () => {
  arrastrando = false;
  textoCircularEl.style.cursor = 'grab';
});

// ===== INVERTIR TEXTO (180° REAL) =====
let invertido = false;

invertirBtn.addEventListener('click', () => {
  invertido = !invertido;
  aplicarTransformaciones();
});

// ===== APLICAR TRANSFORMACIONES =====
function aplicarTransformaciones() {
  const rotacionFinal = invertido ? rotacion + 180 : rotacion;

  textoCircularEl.setAttribute(
    'transform',
    `rotate(${rotacionFinal} 210 210)`
  );
}
