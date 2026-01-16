const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoCircularEl = document.getElementById('textoCircularEl');
const invertirBtn = document.getElementById('invertirBtn');

let invertido = false;

// texto en tiempo real
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// dirección inversa (path normal / invertido)
invertirBtn.addEventListener('click', () => {
  textoPreview.setAttribute(
    'href',
    invertido ? '#pathNormal' : '#pathInvertido'
  );
  invertido = !invertido;
});

// --- DRAG ---
let arrastrando = false;
let inicioX = 0;
let offsetActual = 50;

// centrado inicial
textoPreview.setAttribute('startOffset', offsetActual + '%');

// mouse down sobre el TEXTO
textoCircularEl.addEventListener('mousedown', (e) => {
  arrastrando = true;
  inicioX = e.clientX;
  textoCircularEl.style.cursor = 'grabbing';
  e.preventDefault();
});

// mouse move
document.addEventListener('mousemove', (e) => {
  if (!arrastrando) return;

  const delta = e.clientX - inicioX;
  offsetActual += delta * 0.05;

const margen = 15; // zona segura

if (offsetActual < margen) offsetActual = margen;
if (offsetActual > 100 - margen) offsetActual = 100 - margen;


  textoPreview.setAttribute('startOffset', offsetActual + '%');
  inicioX = e.clientX;
});

// mouse up
document.addEventListener('mouseup', () => {
  arrastrando = false;
  textoCircularEl.style.cursor = 'grab';
});

