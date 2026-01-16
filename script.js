const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const invertirBtn = document.getElementById('invertirBtn');

let invertido = false;

// Función que invierte letras (estilo upside-down)
function invertirTexto(texto) {
  const mapa = {
    a:'ɐ', b:'q', c:'ɔ', d:'p', e:'ǝ',
    f:'ɟ', g:'ɓ', h:'ɥ', i:'ᴉ',
    j:'ɾ', k:'ʞ', l:'ן', m:'ɯ',
    n:'u', o:'o', p:'d', q:'b',
    r:'ɹ', s:'s', t:'ʇ', u:'n',
    v:'ʌ', w:'ʍ', x:'x', y:'ʎ',
    z:'z',
    A:'∀', B:'𐐒', C:'Ɔ', D:'p',
    E:'Ǝ', F:'Ⅎ', G:'פ', H:'H',
    I:'I', J:'ſ', K:'ʞ', L:'˥',
    M:'W', N:'N', O:'O', P:'Ԁ',
    Q:'Ό', R:'ᴚ', S:'S', T:'┴',
    U:'∩', V:'Λ', W:'M', X:'X',
    Y:'⅄', Z:'Z'
  };

  return texto
    .split('')
    .reverse()
    .map(c => mapa[c] || c)
    .join('');
}

// Texto en tiempo real
textoInput.addEventListener('input', () => {
  const texto = textoInput.value || 'TU TEXTO ACÁ';
  textoPreview.textContent = invertido
    ? invertirTexto(texto)
    : texto;
});

// Botón invertir letras
invertirBtn.addEventListener('click', () => {
  invertido = !invertido;

  const texto = textoInput.value || 'TU TEXTO ACÁ';
  textoPreview.textContent = invertido
    ? invertirTexto(texto)
    : texto;
});
