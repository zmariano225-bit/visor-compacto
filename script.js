(function() {
  'use strict';

  let images = [];
  let currentIndex = -1;
  let scale = 1;
  let rotation = 0;

  function $(id) { return document.getElementById(id); }

  function init() {
    const img = $('displayImage');
    const ph = $('placeholder');
    if (img && ph) {
      img.style.display = 'none';
      ph.style.display = 'block';
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
    } else {
      init();
    }
  }

  function resetTransform() {
    scale = 1;
    rotation = 0;
  }

  // Botón Cargar
  if ($('loadBtn')) {
    $('loadBtn').onclick = () => {
      if ($('fileInput')) $('fileInput').click();
    };
  }

  // Input de archivos
  if ($('fileInput')) {
    $('fileInput').onchange = (e) => {
      const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
      if (files.length > 0) {
        files.forEach(file => {
          const url = URL.createObjectURL(file);
          images.push(url);
        });
        currentIndex = images.length - 1;
        resetTransform();
        showImage();
      }
    };
  }

  // Correr
  if ($('nextBtn')) {
    $('nextBtn').onclick = () => {
      if (images.length > 0) {
        currentIndex = (currentIndex + 1) % images.length;
        resetTransform();
        showImage();
      }
    };
  }

  // Borrar actual
  if ($('removeCurrentBtn')) {
    $('removeCurrentBtn').onclick = () => {
      if (images.length > 0 && currentIndex >= 0) {
        images.splice(currentIndex, 1);
        if (images.length === 0) {
          currentIndex = -1;
        } else {
          currentIndex = currentIndex % images.length;
        }
        resetTransform();
        showImage();
      }
    };
  }

  // Borrar todo
  if ($('clearAllBtn')) {
    $('clearAllBtn').onclick = () => {
      images = [];
      currentIndex = -1;
      resetTransform();
      showImage();
      const input = $('fileInput');
      if (input) input.value = '';
    };
  }

  // Zoom +
  if ($('zoomInBtn')) {
    $('zoomInBtn').onclick = () => {
      if (currentIndex >= 0) {
        scale = Math.min(scale + 0.2, 3);
        showImage();
      }
    };
  }

  // Zoom -
  if ($('zoomOutBtn')) {
    $('zoomOutBtn').onclick = () => {
      if (currentIndex >= 0) {
        scale = Math.max(scale - 0.2, 0.5);
        showImage();
      }
    };
  }

  // Rotar
  if ($('rotateBtn')) {
    $('rotateBtn').onclick = () => {
      if (currentIndex >= 0) {
        rotation = (rotation + 90) % 360;
        showImage();
      }
    };
  }

  // Descargar
  if ($('downloadBtn')) {
    $('downloadBtn').onclick = () => {
      if (currentIndex >= 0) {
        const link = document.createElement('a');
        link.href = images[currentIndex];
        link.download = 'imagen-visora.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('No hay imagen para descargar.');
      }
    };
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
