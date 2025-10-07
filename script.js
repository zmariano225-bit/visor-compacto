(function() {
  'use strict';

  let images = [];
  let currentIndex = -1;
  let scale = 1;
  let rotation = 0;

  function $(id) { return document.getElementById(id); }

  function log(...args) { console.log('[Visor]', ...args); }

  function init() {
    const img = $('displayImage');
    const ph = $('placeholder');
    if (img && ph) {
      img.style.display = 'none';
      ph.style.display = 'block';
      log('Interfaz inicializada');
    }
  }

  function showImage() {
    const img = $('displayImage');
    const ph = $('placeholder');
    if (currentIndex >= 0 && currentIndex < images.length && img && ph) {
      img.src = images[currentIndex];
      img.style.display = 'block';
      ph.style.display = 'none';
      img.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      log('Mostrando imagen:', images[currentIndex]);
    } else {
      init();
      log('No hay imágenes para mostrar');
    }
  }

  function resetTransform() {
    scale = 1;
    rotation = 0;
  }

  // Botón Cargar
  if ($('loadBtn')) {
    $('loadBtn').addEventListener('click', () => {
      if ($('fileInput')) {
        $('fileInput').click();
        log('Botón Cargar activado');
      }
    });
  }

  // Input de archivos
  if ($('fileInput')) {
    $('fileInput').addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
      log('Archivos seleccionados:', files.length);
      if (files.length > 0) {
        files.forEach(file => {
          const url = URL.createObjectURL(file);
          images.push(url);
          log('Imagen añadida:', url);
        });
        currentIndex = images.length - 1;
        resetTransform();
        showImage();
      }
    });
  }

  // Correr
  if ($('nextBtn')) {
    $('nextBtn').addEventListener('click', () => {
      if (images.length > 0) {
        currentIndex = (currentIndex + 1) % images.length;
        resetTransform();
        showImage();
        log('Siguiente imagen:', currentIndex);
      }
    });
  }

  // Borrar actual
  if ($('removeCurrentBtn')) {
    $('removeCurrentBtn').addEventListener('click', () => {
      if (images.length > 0 && currentIndex >= 0) {
        images.splice(currentIndex, 1);
        if (images.length === 0) {
          currentIndex = -1;
        } else {
          currentIndex = currentIndex % images.length;
        }
        resetTransform();
        showImage();
        log('Imagen eliminada, índice actual:', currentIndex);
      }
    });
  }

  // Borrar todo
  if ($('clearAllBtn')) {
    $('clearAllBtn').addEventListener('click', () => {
      images = [];
      currentIndex = -1;
      resetTransform();
      showImage();
      const input = $('fileInput');
      if (input) input.value = '';
      log('Todas las imágenes borradas');
    });
  }

  // Zoom +
  if ($('zoomInBtn')) {
    $('zoomInBtn').addEventListener('click', () => {
      if (currentIndex >= 0) {
        scale = Math.min(scale + 0.2, 3);
        showImage();
        log('Zoom +, escala:', scale);
      }
    });
  }

  // Zoom -
  if ($('zoomOutBtn')) {
    $('zoomOutBtn').addEventListener('click', () => {
      if (currentIndex >= 0) {
        scale = Math.max(scale - 0.2, 0.5);
        showImage();
        log('Zoom -, escala:', scale);
      }
    });
  }

  // Rotar
  if ($('rotateBtn')) {
    $('rotateBtn').addEventListener('click', () => {
      if (currentIndex >= 0) {
        rotation = (rotation + 90) % 360;
        showImage();
        log('Rotación:', rotation);
      }
    });
  }

  // Descargar
  if ($('downloadBtn')) {
    $('downloadBtn').addEventListener('click', () => {
      if (currentIndex >= 0) {
        const link = document.createElement('a');
        link.href = images[currentIndex];
        link.download = 'imagen-visora.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        log('Imagen descargada');
      } else {
        alert('No hay imagen para descargar.');
      }
    });
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
