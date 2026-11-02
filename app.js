// Desarrollado por Henry Ruiz
// Monitor de tormentas satelitales GOES-19 para Ecuador y Galapagos

const REGIONES = {
  pais: { centro: [-1.4, -82.0], zoom: 6 },
  costa: { centro: [-2.18, -79.9], zoom: 10 },
  sierra: { centro: [-0.22, -78.5], zoom: 10 },
  oriente: { centro: [-1.2, -77.0], zoom: 9 },
  galapagos: { centro: [-0.8, -90.5], zoom: 8 }
};

const CIUDADES_REFERENCIA = [
  { nombre: 'Quito', lat: -0.1807, lon: -78.4678 },
  { nombre: 'Guayaquil', lat: -2.1894, lon: -79.8891 },
  { nombre: 'Cuenca', lat: -2.9001, lon: -79.0059 },
  { nombre: 'Manta', lat: -0.9677, lon: -80.7089 },
  { nombre: 'Esmeraldas', lat: 0.9682, lon: -79.6517 },
  { nombre: 'Loja', lat: -3.9931, lon: -79.2042 },
  { nombre: 'El Coca', lat: -0.4664, lon: -76.9871 },
  { nombre: 'Puyo', lat: -1.4837, lon: -77.9983 },
  { nombre: 'Lago Agrio', lat: 0.0847, lon: -76.8828 },
  { nombre: 'Macas', lat: -2.3087, lon: -78.1114 },
  { nombre: 'Galápagos', lat: -0.7444, lon: -90.3138 }
];

let mapa;
let capaSatelite = null;
let productoActual = 'G19-ABI-FD-BAND13-GRAD';
let opacidadActual = 0.85;
let temporizadorRecarga = null;
let segundosRestantes = 600;
let temporizadorMovimiento = null;

let capaCalles;
let capaSateliteBase;
let capaLimites;
let grupoCiudades;
let marcadorUsuario = null;
let circuloPrecision = null;

document.addEventListener('DOMContentLoaded', () => {
  iniciarMapa();
  vincularEventosInterfaz();
  cargarDatosSatelitales();
  iniciarContadorRecarga();
  solicitarUbicacionUsuario(false);
});

function iniciarMapa() {
  const limitesEcuador = L.latLngBounds(
    L.latLng(-6.2, -93.5),
    L.latLng(2.8, -74.0)
  );

  mapa = L.map('map', {
    center: REGIONES.pais.centro,
    zoom: REGIONES.pais.zoom,
    minZoom: 6,
    maxZoom: 18,
    maxBounds: limitesEcuador,
    maxBoundsViscosity: 0.8,
    zoomControl: false
  });

  L.control.zoom({ position: 'bottomright' }).addTo(mapa);

  capaCalles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  });

  capaSateliteBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri Satellite',
    maxZoom: 18
  }).addTo(mapa);

  capaLimites = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    zIndex: 500,
    maxZoom: 18
  }).addTo(mapa);

  grupoCiudades = L.layerGroup().addTo(mapa);
  CIUDADES_REFERENCIA.forEach(ciudad => {
    const htmlMarcador = `<div class="city-badge">${ciudad.nombre}</div>`;
    const icono = L.divIcon({
      className: 'custom-badge-icon',
      html: htmlMarcador,
      iconSize: [80, 18],
      iconAnchor: [40, 9]
    });
    L.marker([ciudad.lat, ciudad.lon], { icon: icono }).addTo(grupoCiudades);
  });

  mapa.on('moveend', () => {
    clearTimeout(temporizadorMovimiento);
    temporizadorMovimiento = setTimeout(renderizarImagenSatelital, 300);
  });
}

async function cargarDatosSatelitales() {
  mostrarEstadoCarga(true, 'Consultando pasada...');

  try {
    const urlApi = `https://realearth.ssec.wisc.edu/api/latest?products=${productoActual}`;
    const respuesta = await fetch(urlApi);
    const datos = await respuesta.json();
    const horaRaw = datos[productoActual];

    if (horaRaw) {
      actualizarRelojesCabecera(horaRaw);
    }
  } catch (error) {
    console.error('No se pudo obtener la marca de tiempo:', error);
  } finally {
    renderizarImagenSatelital();
  }
}

function renderizarImagenSatelital() {
  if (!mapa) return;
  mostrarEstadoCarga(true, 'Cargando satélite...');

  const limites = mapa.getBounds();
  const sur = limites.getSouth();
  const norte = limites.getNorth();
  const oeste = limites.getWest();
  const este = limites.getEast();

  const tamano = mapa.getSize();
  const topeDimension = 512;
  const factor = Math.min(topeDimension / Math.max(tamano.x, 1), topeDimension / Math.max(tamano.y, 1), 1.0);
  const ancho = Math.round(tamano.x * factor);
  const alto = Math.round(tamano.y * factor);

  const timestampCache = Date.now();
  const urlWms = `https://realearth.ssec.wisc.edu/cgi-bin/mapserv?map=${productoActual}.map&service=WMS&version=1.3.0&request=GetMap&layers=latest&crs=EPSG:4326&bbox=${sur.toFixed(4)},${oeste.toFixed(4)},${norte.toFixed(4)},${este.toFixed(4)}&width=${ancho}&height=${alto}&format=image/png&transparent=true&_nocache=${timestampCache}`;

  const coordenadasOverlay = [
    [sur, oeste],
    [norte, este]
  ];

  const nuevaCapa = L.imageOverlay(urlWms, coordenadasOverlay, {
    opacity: opacidadActual,
    zIndex: 200,
    interactive: false
  });

  nuevaCapa.on('load', () => {
    if (capaSatelite && capaSatelite !== nuevaCapa) {
      mapa.removeLayer(capaSatelite);
    }
    capaSatelite = nuevaCapa;
    mostrarEstadoCarga(false);
  });

  nuevaCapa.on('error', () => {
    mostrarEstadoCarga(false);
  });

  nuevaCapa.addTo(mapa);
}

function actualizarRelojesCabecera(cadenaHora) {
  if (!cadenaHora || !cadenaHora.includes('.')) return;

  const [fecha, hora] = cadenaHora.split('.');
  const anio = fecha.slice(0, 4);
  const mes = fecha.slice(4, 6);
  const dia = fecha.slice(6, 8);
  const horas = hora.slice(0, 2);
  const minutos = hora.slice(2, 4);

  const fechaUtc = new Date(Date.UTC(anio, mes - 1, dia, horas, minutos));
  const horaEcuador = new Intl.DateTimeFormat('es-EC', {
    timeZone: 'America/Guayaquil',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(fechaUtc);

  const nodoUtc = document.getElementById('header-timestamp');
  const nodoLocal = document.getElementById('header-local-time');

  if (nodoUtc) nodoUtc.innerText = `${horas}:${minutos} UTC`;
  if (nodoLocal) nodoLocal.innerText = `${horaEcuador} EC`;
}

function vincularEventosInterfaz() {
  const opcionesCanal = document.querySelectorAll('.layer-option');
  opcionesCanal.forEach(opcion => {
    opcion.addEventListener('click', () => {
      opcionesCanal.forEach(item => item.classList.remove('active'));
      opcion.classList.add('active');

      const inputRadio = opcion.querySelector('input[type="radio"]');
      inputRadio.checked = true;
      productoActual = inputRadio.value;

      actualizarLeyendaTermica(productoActual);
      renderizarImagenSatelital();
    });
  });

  const deslizadorOpacidad = document.getElementById('opacity-slider');
  const visorOpacidad = document.getElementById('opacity-readout');
  deslizadorOpacidad.addEventListener('input', (evento) => {
    opacidadActual = evento.target.value / 100;
    visorOpacidad.innerText = `${evento.target.value}%`;
    if (capaSatelite) {
      capaSatelite.setOpacity(opacidadActual);
    }
  });

  const toggleMapaBase = document.getElementById('toggle-basemap');
  toggleMapaBase.addEventListener('change', (evento) => {
    if (evento.target.checked) {
      mapa.removeLayer(capaCalles);
      mapa.addLayer(capaSateliteBase);
    } else {
      mapa.removeLayer(capaSateliteBase);
      mapa.addLayer(capaCalles);
    }
  });

  const toggleLimites = document.getElementById('toggle-boundaries');
  toggleLimites.addEventListener('change', (evento) => {
    if (evento.target.checked) {
      mapa.addLayer(capaLimites);
    } else {
      mapa.removeLayer(capaLimites);
    }
  });

  const toggleCiudades = document.getElementById('toggle-cities');
  toggleCiudades.addEventListener('change', (evento) => {
    if (evento.target.checked) {
      mapa.addLayer(grupoCiudades);
    } else {
      mapa.removeLayer(grupoCiudades);
    }
  });

  const botonLocate = document.getElementById('btn-locate');
  if (botonLocate) {
    botonLocate.addEventListener('click', () => {
      solicitarUbicacionUsuario(true);
    });
  }

  document.getElementById('btn-refresh').addEventListener('click', () => {
    segundosRestantes = 600;
    cargarDatosSatelitales();
  });

  const botonesRegion = document.querySelectorAll('.seg-btn');
  botonesRegion.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesRegion.forEach(item => item.classList.remove('active'));
      boton.classList.add('active');

      const claveRegion = boton.getAttribute('data-region');
      if (REGIONES[claveRegion]) {
        mapa.flyTo(REGIONES[claveRegion].centro, REGIONES[claveRegion].zoom, { duration: 1.0 });
      }
    });
  });

  const panelLateral = document.getElementById('control-drawer');
  const botonMenuMovil = document.getElementById('btn-toggle-sidebar');
  const botonCerrarPanel = document.getElementById('btn-close-sidebar');

  botonMenuMovil.addEventListener('click', () => {
    panelLateral.classList.toggle('open');
  });

  botonCerrarPanel.addEventListener('click', () => {
    panelLateral.classList.remove('open');
  });
}

function actualizarLeyendaTermica(producto) {
  const contenedor = document.getElementById('floating-legend');
  const titulo = document.getElementById('legend-product-title');
  const subtitulo = document.getElementById('legend-product-sub');
  const barra = document.getElementById('legend-bar');
  const etiquetas = document.getElementById('legend-labels');

  if (producto.includes('BAND13')) {
    contenedor.style.display = 'flex';
    titulo.innerText = 'Banda 13 Infrarrojo (Clean IR)';
    subtitulo.innerText = 'Tormentas severas: < -65°C';
    barra.style.background = 'linear-gradient(to right, #1e293b 0%, #64748b 20%, #06b6d4 35%, #22c55e 50%, #eab308 65%, #ef4444 80%, #000000 100%)';
    etiquetas.innerHTML = `<span>Gris</span><span>Azul</span><span>Verde</span><span>Amarillo</span><span class="crit">Rojo/Negro</span>`;
  } else if (producto.includes('night-microphysics')) {
    contenedor.style.display = 'flex';
    titulo.innerText = 'Microfísica Nocturna RGB';
    subtitulo.innerText = 'Rojo/Ocre: Cimas gruesas | Azul: Despejado';
    barra.style.background = 'linear-gradient(to right, #1e1b4b 0%, #3730a3 30%, #7c2d12 60%, #b91c1c 85%, #f59e0b 100%)';
    etiquetas.innerHTML = `<span>Despejado</span><span>Cirros</span><span class="crit">Tormentas</span>`;
  } else if (producto.includes('airmass')) {
    contenedor.style.display = 'flex';
    titulo.innerText = 'Masas de Aire RGB';
    subtitulo.innerText = 'Blanco: Convección | Verde: Cálido tropical';
    barra.style.background = 'linear-gradient(to right, #15803d 0%, #65a30d 25%, #ea580c 50%, #0284c7 75%, #ffffff 100%)';
    etiquetas.innerHTML = `<span>Masa Cálida</span><span>Seco</span><span class="crit">Núcleo</span>`;
  } else if (producto.includes('convection')) {
    contenedor.style.display = 'flex';
    titulo.innerText = 'Convección Intensa RGB';
    subtitulo.innerText = 'Magenta/Púrpura: Corrientes ascendentes severas';
    barra.style.background = 'linear-gradient(to right, #3b0764 0%, #7e22ce 30%, #db2777 65%, #f43f5e 100%)';
    etiquetas.innerHTML = `<span>Estable</span><span>En Desarrollo</span><span class="crit">Severa</span>`;
  } else if (producto.includes('BAND11')) {
    contenedor.style.display = 'flex';
    titulo.innerText = 'Banda 11 Fase Nubosa';
    subtitulo.innerText = 'Blanco: Cristales de Hielo | Gris: Agua líquida';
    barra.style.background = 'linear-gradient(to right, #020617, #334155, #64748b, #94a3b8, #ffffff)';
    etiquetas.innerHTML = `<span>Cálido</span><span>Nube Líquida</span><span class="crit">Hielo/Tormenta</span>`;
  } else {
    contenedor.style.display = 'none';
  }
}

function iniciarContadorRecarga() {
  const visorContador = document.getElementById('header-countdown');

  if (temporizadorRecarga) {
    clearInterval(temporizadorRecarga);
  }

  temporizadorRecarga = setInterval(() => {
    segundosRestantes--;

    if (segundosRestantes <= 0) {
      segundosRestantes = 600;
      cargarDatosSatelitales();
    }

    const min = Math.floor(segundosRestantes / 60);
    const seg = segundosRestantes % 60;
    if (visorContador) {
      visorContador.innerText = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function mostrarEstadoCarga(cargando, mensaje = 'Sincronizando...') {
  const banner = document.getElementById('sync-banner');
  const etiqueta = document.getElementById('sync-label');
  if (banner) {
    if (mensaje && etiqueta) etiqueta.innerText = mensaje;
    banner.classList.toggle('active', cargando);
  }
}

function solicitarUbicacionUsuario(centrarAlEncontrar = false) {
  if (!navigator.geolocation) {
    if (centrarAlEncontrar) {
      alert('Tu navegador no soporta geolocalización.');
    }
    return;
  }

  const botonLocate = document.getElementById('btn-locate');
  if (botonLocate) {
    botonLocate.classList.add('active-locating');
  }

  if (centrarAlEncontrar) {
    mostrarEstadoCarga(true, 'Detectando tu ubicación...');
  }

  navigator.geolocation.getCurrentPosition(
    (posicion) => {
      const lat = posicion.coords.latitude;
      const lon = posicion.coords.longitude;
      const precision = posicion.coords.accuracy;

      if (marcadorUsuario) {
        mapa.removeLayer(marcadorUsuario);
      }
      if (circuloPrecision) {
        mapa.removeLayer(circuloPrecision);
      }

      // Marcador con efecto radar
      const iconoUbicacion = L.divIcon({
        className: 'user-marker-container',
        html: '<div class="user-marker-pulse"></div><div class="user-marker-dot"></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      marcadorUsuario = L.marker([lat, lon], {
        icon: iconoUbicacion,
        zIndexOffset: 1000
      }).addTo(mapa);

      marcadorUsuario.bindPopup(`
        <div style="font-family: var(--font-body); font-size: 0.8rem; color: #1e293b; padding: 2px;">
          <b style="color: #0284c7;">📍 Tu Ubicación Actual</b><br>
          <span style="font-family: var(--font-mono); font-size: 0.72rem;">Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}</span><br>
          <span style="font-size: 0.7rem; color: #64748b;">Precisión: ±${Math.round(precision)} metros</span>
        </div>
      `);

      if (precision > 20) {
        circuloPrecision = L.circle([lat, lon], {
          radius: precision,
          color: '#06b6d4',
          fillColor: '#06b6d4',
          fillOpacity: 0.12,
          weight: 1
        }).addTo(mapa);
      }

      if (centrarAlEncontrar) {
        mapa.flyTo([lat, lon], 12, { duration: 1.2 });
        marcadorUsuario.openPopup();
        mostrarEstadoCarga(false);
      }

      if (botonLocate) {
        botonLocate.classList.remove('active-locating');
      }
    },
    (error) => {
      if (botonLocate) {
        botonLocate.classList.remove('active-locating');
      }
      mostrarEstadoCarga(false);

      if (centrarAlEncontrar) {
        let mensaje = 'No fue posible obtener tu ubicación.';
        if (error.code === error.PERMISSION_DENIED) {
          mensaje = 'Permiso denegado para acceder a la ubicación. Puedes habilitarlo en los permisos del navegador.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          mensaje = 'La ubicación no está disponible en este momento.';
        } else if (error.code === error.TIMEOUT) {
          mensaje = 'Tiempo de espera agotado al consultar tu ubicación.';
        }
        alert(mensaje);
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}
