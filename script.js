const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const invertirBtn = document.getElementById('invertirBtn');

let invertido = false;

// Texto en tiempo real
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// Dirección inversa (como Zizou)
invertirBtn.addEventListener('click', () => {
  textoPreview.setAttribute(
    'href',
    invertido ? '#pathNormal' : '#pathInvertido'
  );
  invertido = !invertido;
});
