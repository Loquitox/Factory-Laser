// === ELEMENTOS PRINCIPALES ===
const textoInput = document.getElementById('textoInput');
const invertirBtn = document.getElementById('invertirBtn');
const agregarCapaBtn = document.getElementById('agregarCapaBtn');
const quitarCapaBtn = document.getElementById('quitarCapaBtn');
const svg = document.getElementById('preview');

// === ARRAY DE CAPAS ===
let capas = [];
let capaSeleccionada = null; // la capa que se está editando

// === FUNCIONES BASE ===
function aplicarTransformaciones(capa) {
  const rotacionFinal = capa.invertido ? capa.rotacion + 180 : capa.rotacion;
  capa.textoEl.setAttribute('transform', `rotate(${rotacionFinal} 210 210)`);
}

// === CREAR NUEVA CAPA ===
function crearCapa(texto = 'TU TEXTO ACÁ') {
  const textoEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textoEl.setAttribute('font-size', '26');
  textoEl.setAttribute('fill', '#000');
  textoEl.setAttribute('dominant-baseline', 'middle');
  textoEl.style.cursor = 'grab';

  const textPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
  textPathEl.setAttribute('href', '#textoCircular');
  textPathEl.setAttribute('startOffset', '50%');
  textPathEl.setAttribute('text-anchor', 'middle');
  textPathEl.textContent = texto;

  textoEl.appendChild(textPathEl);
  svg.appendChild(textoEl);

  const capa = {
    textoEl,
    textPathEl,
    rotacion: 0,
    invertido: false
  };

  // evento arrastre desktop
  let arrastrando = false;
  let inicioX = 0;

  textoEl.addEventListener('mousedown', (e) => {
    arrastrando = true;
    inicioX = e.clientX;
    capa.textoEl.style.cursor = 'grabbing';
    // seleccionamos esta capa al hacer click
    capaSeleccionada = capa;
    textoInput.value = capaSeleccionada.textPathEl.textContent;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!arrastrando) return;
    const delta = e.clientX - inicioX;
    capa.rotacion += delta * 0.4;
    aplicarTransformaciones(capa);
    inicioX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    arrastrando = false;
    textoEl.style.cursor = 'grab';
  });

  // evento arrastre mobile
  textoEl.addEventListener('touchstart', (e) => {
    arrastrando = true;
    inicioX = e.touches[0].clientX;
    capaSeleccionada = capa;
    textoInput.value = capaSeleccionada.textPathEl.textContent;
  });

  document.addEventListener('touchmove', (e) => {
    if (!arrastrando) return;
    const delta = e.touches[0].clientX - inicioX;
    capa.rotacion += delta * 0.4;
    aplicarTransformaciones(capa);
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', () => {
    arrastrando = false;
  });

  capas.push(capa);
  capaSeleccionada = capa;
  textoInput.value = capaSeleccionada.textPathEl.textContent;
}

// === INPUT DE TEXTO EN TIEMPO REAL ===
textoInput.addEventListener('input', () => {
  if (capaSeleccionada) {
    capaSeleccionada.textPathEl.textContent = textoInput.value || 'TU TEXTO ACÁ';
  }
});

// === INVERTIR TEXTO 180° ===
invertirBtn.addEventListener('click', () => {
  if (capaSeleccionada) {
    capaSeleccionada.invertido = !capaSeleccionada.invertido;
    aplicarTransformaciones(capaSeleccionada);
  }
});

// === BOTONES CAPAS ===
agregarCapaBtn.addEventListener('click', () => {
  crearCapa();
});

quitarCapaBtn.addEventListener('click', () => {
  if (!capaSeleccionada) return;
  svg.removeChild(capaSeleccionada.textoEl);
  capas = capas.filter(c => c !== capaSeleccionada);
  capaSeleccionada = capas.length ? capas[capas.length - 1] : null;
  textoInput.value = capaSeleccionada ? capaSeleccionada.textPathEl.textContent : '';
});

// === CREAR CAPA INICIAL ===
crearCapa();
