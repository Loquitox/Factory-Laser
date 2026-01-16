const svg = document.getElementById('preview');
const textoInput = document.getElementById('textoInput');
const invertirBtn = document.getElementById('invertirBtn');
const agregarCapaBtn = document.getElementById('agregarCapaBtn');
const tamBtns = document.querySelectorAll('.tamBtn');

let capas = []; // Array de capas
let capaSeleccionada = null;

// ===== FUNCION CREAR CAPA =====
function crearCapa(texto = 'TU TEXTO ACÁ', fontSize = 26) {
  const nuevaCapa = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  nuevaCapa.setAttribute('x', 210);
  nuevaCapa.setAttribute('y', 210);
  nuevaCapa.setAttribute('font-size', fontSize);
  nuevaCapa.setAttribute('fill', '#000');
  nuevaCapa.setAttribute('dominant-baseline', 'middle');
  nuevaCapa.setAttribute('text-anchor', 'middle');
  nuevaCapa.textContent = texto;
  nuevaCapa.style.cursor = 'grab';
  svg.appendChild(nuevaCapa);

  const capaObj = {
    el: nuevaCapa,
    rotacion: 0,
    invertido: false,
    startOffset: 50
  };

  capas.push(capaObj);
  seleccionarCapa(capaObj);
}

// ===== SELECCIONAR CAPA =====
function seleccionarCapa(capaObj) {
  capaSeleccionada = capaObj;
  textoInput.value = capaObj.el.textContent;
}

// ===== INPUT EN TIEMPO REAL =====
textoInput.addEventListener('input', () => {
  if (!capaSeleccionada) return;
  capaSeleccionada.el.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// ===== BOTON INVERTIR =====
invertirBtn.addEventListener('click', () => {
  if (!capaSeleccionada) return;
  capaSeleccionada.invertido = !capaSeleccionada.invertido;
  aplicarTransformaciones(capaSeleccionada);
});

// ===== BOTONES TAMAÑO =====
tamBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!capaSeleccionada) return;
    const size = btn.getAttribute('data-size');
    capaSeleccionada.el.setAttribute('font-size', size);
  });
});

// ===== BOTON AGREGAR CAPA =====
agregarCapaBtn.addEventListener('click', () => {
  crearCapa();
});

// ===== ARRASTRE =====
let arrastrando = false;
let inicioX = 0;

svg.addEventListener('mousedown', e => {
  if (!e.target.tagName.includes('text')) return;
  const capa = capas.find(c => c.el === e.target);
  if (!capa) return;
  seleccionarCapa(capa);
  arrastrando = true;
  inicioX = e.clientX;
  capa.el.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
  if (!arrastrando || !capaSeleccionada) return;
  const delta = e.clientX - inicioX;
  capaSeleccionada.rotacion += delta * 0.4;
  aplicarTransformaciones(capaSeleccionada);
  inicioX = e.clientX;
});

document.addEventListener('mouseup', () => {
  if (capaSeleccionada) capaSeleccionada.el.style.cursor = 'grab';
  arrastrando = false;
});

// ===== FUNCION APLICAR TRANSFORM =====
function aplicarTransformaciones(capa) {
  const rot = capa.invertido ? capa.rotacion + 180 : capa.rotacion;
  capa.el.setAttribute('transform', `rotate(${rot} 210 210)`);
}

// ===== SOPORTE TOUCH =====
svg.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (!target || !target.tagName.includes('text')) return;
  const capa = capas.find(c => c.el === target);
  if (!capa) return;
  seleccionarCapa(capa);
  arrastrando = true;
  inicioX = touch.clientX;
  e.preventDefault();
}, { passive: false });

svg.addEventListener('touchmove', e => {
  if (!arrastrando || !capaSeleccionada) return;
  const delta = e.touches[0].clientX - inicioX;
  capaSeleccionada.rotacion += delta * 0.4;
  aplicarTransformaciones(capaSeleccionada);
  inicioX = e.touches[0].clientX;
  e.preventDefault();
}, { passive: false });

svg.addEventListener('touchend', () => { arrastrando = false; });
