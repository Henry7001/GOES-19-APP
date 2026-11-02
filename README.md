# Monitoreo de Tormentas y Convección en Tiempo Real: GOES-19 (Ecuador & Galápagos)
**Desarrollado por: Henry Ruiz**

Sistema geoespacial web para la detección, seguimiento y análisis en tiempo casi real de tormentas severas, convección tropical profunda y dinámica atmosférica sobre el territorio ecuatoriano (continental e insular), alimentado directamente por el sensor **ABI** (*Advanced Baseline Imager*) del satélite geoestacionario **GOES-19 (GOES-East)** de la NOAA.

---

## 1. Fundamentos del Satélite GOES-19 y Cobertura sobre Ecuador

El satélite **GOES-19** (designado formalmente como **GOES-East**) opera en órbita geoestacionaria fijada en los **75.2° Oeste**, a ~35,786 km sobre el ecuador terrestre. Esta posición orbital proporciona una geometría de escaneo perpendicular ideal para Ecuador:

* **Sin distorsión por ángulo cenital:** Al encontrarse prácticamente sobre la misma longitud de Ecuador (75°W – 92°W), la paralaje y la deformación geométrica en los bordes del disco son mínimas en comparación con otros satélites.
* **Cadencia temporal (Full Disk Scan):** El sensor ABI genera una imagen de disco completo cada **10 minutos**, lo que permite rastrear el ciclo de vida de una celda convectiva desde su ignición hasta su madurez y disipación.
* **Resolución espacial:** Entre **0.5 km** (canales visibles diurnos) y **2.0 km** (canales infrarrojos térmicos y vapor de agua).

---

## 2. Dónde y Cómo Obtener los Datos Gratuitos

Los datos de GOES-19 son patrimonio científico abierto y de libre acceso provistos por el programa **NODD** (*NOAA Open Data Dissemination*). Existen tres formas principales de consumirlos:

### A. Repositorios Crudos en Cloud Storage (Big Data / NetCDF-4)
Archivos originales en formato NetCDF (`.nc`) organizados por año, día juliano y hora UTC:
* **AWS S3 (Acceso público sin autenticación ni cobro por egress):**
  `s3://noaa-goes19/ABI-L2-CMIPF/`
  *Estructura de prefijos:* `ABI-L2-CMIPF/<Año>/<DíaJuliano>/<Hora>/`
* **Google Cloud Storage:**
  `gs://gcp-public-data-goes-19/`
* **Microsoft Planetary Computer:** Colección `goes-cmi`.

### B. Mosaicos en Tiempo Real y Servicios WMS / TMS (Consumo Web / GIS)
Para visualizadores web en tiempo real sin necesidad de descargar y recortar archivos pesados de disco completo (~500 MB por escaneo):
* **SSEC RealEarth (Universidad de Wisconsin-Madison / NOAA):**
  * *API de última captura:* `https://realearth.ssec.wisc.edu/api/latest?products={ID_PRODUCTO}`
  * *Servicio de Mapeo WMS:* `https://realearth.ssec.wisc.edu/cgi-bin/mapserv?map={ID_PRODUCTO}.map`
* **NASA GIBS (Global Imagery Browse Services):**
  * Catálogo WMTS en Web Mercator (`EPSG:3857`) para capas históricas y en vivo de GOES-East.

---

## 3. Canales Espectrales y Criterios de Detección de Tormentas

Para el monitoreo de tormentas severas en el trópico (especialmente en la cuenca amazónica y el litoral ecuatoriano), se seleccionan canales e índices RGB multiespectrales específicos:

```
                            BANDAS DEL SENSOR ABI (GOES-19)
 ──────────────────────────────────────────────────────────────────────────────────────────
 Canal / Compuesto                 Longitud de Onda     Fenómeno Detectado
 ──────────────────────────────────────────────────────────────────────────────────────────
 Banda 13 (Clean IR Window)         10.3 µm              Temperatura de topes nubosos (-85°C a 30°C)
 Banda 11 (Cloud Phase IR)           8.4 µm              Diferenciación de fase (Hielo vs Agua)
 RGB Microfísica Nocturna           Compuesto Térmico    Nubes convectivas profundas durante la noche
 RGB Convección Intensa             Compuesto Diferencial Corrientes ascendentes vigorosas / Granizo
 RGB Masas de Aire                  Compuesto B08/B10/IR Dinámica de chorros, vaguadas y humedad
 GeoColor                           Visible + IR         Color natural diurno y nubes infrarrojas
 ──────────────────────────────────────────────────────────────────────────────────────────
```

### Detalle Meteorológico de los Parámetros:

#### 1. Banda 13: Infrarrojo Térmico Limpio (10.3 µm)
Es el canal termográfico fundamental. Al estar ubicado en una "ventana atmosférica" con mínima absorción de vapor de agua, mide directamente la temperatura de brillo de la cima de las nubes (*Cloud-Top Brightness Temperature*):
* **Fórmula de referencia:** A menor temperatura en la cima de la nube, mayor es su altitud y más potente es la corriente ascendente (*updraft*).
* **Umbral de Alerta de Tormenta Severa:**
  * **-50 °C a -65 °C (Verde / Amarillo):** Convección moderada a fuerte; chubascos y tormentas eléctricas estándar.
  * **-65 °C a -75 °C (Rojo):** *Cumulonimbus* severo; precipitaciones torrenciales y alta densidad de rayos.
  * **-75 °C a -85 °C (Negro / Violeta / Blanco frío):** Núcleos convectivos extremos con cimas penetrantes (*overshooting tops*) que perforan la tropopausa, con alto riesgo de granizo y ráfagas descendentes destructivas (*downbursts*).

#### 2. Banda 11: Fase Nubosa (8.4 µm)
Se basa en las propiedades de absorción diferencial del agua líquida frente al hielo:
* Las gotas de agua absorben menos radiación a 8.4 µm que a 11.2 µm, mientras que los cristales de hielo absorben de manera más uniforme.
* Permite identificar rápidamente la glaciación en la cima de la nube, indicando que una corriente ascendente ha alcanzado niveles subcero y está lista para generar actividad eléctrica.

#### 3. RGB Microfísica Nocturna (*Night-time Microphysics*)
Combina las diferencias de temperatura de brillo entre las bandas 13, 15 y 7:
* **Cimas de tormenta densas:** Aparecen en tonos **rojos y ocres brillantes**.
* **Nubes bajas y niebla:** Se representan en tonos verde manzana o cian.
* **Cielos despejados / Océano:** Se muestran en tonalidades azul marino e índigo oscuro.

#### 4. RGB Convección Intensa (*Day / Night Convective Storms*)
Diseñado para resaltar nubes que contienen partículas de hielo extremadamente pequeñas en sus cimas, indicador de corrientes ascendentes sumamente violentas:
* Se observan en tonos **amarillos y magentas intensos** rodeados de áreas rojas, señalando núcleos con probable granizo de gran tamaño.

---

## 4. Arquitectura de Visualización Geoespacial

Para lograr una experiencia interactiva sin marcas de agua ni sobrecostos de procesamiento:

```
[ Sensor ABI GOES-19 ] 
          │  (Escaneo Full Disk cada 10 min)
          ▼
[ NOAA / SSEC Data Gateway ]
          │  (Generación de productos derivados y tablas térmicas)
          ▼
[ Motor WMS Dinámico GetMap ] ──> Petición delimitada con BBOX exacto del viewport
          │                       de Ecuador (lon: [-93.5, -74.0], lat: [-6.2, 2.8])
          ▼
[ Capa de Despliegue en Cliente ]
    ├── Mapa Base: Imágenes satelitales globales de alta resolución (Esri)
    ├── Capa Vectorial: Red vial y división político-administrativa
    ├── Capa Temática: Imagen satelital georreferenciada con transparencia ajustable
    └── Telemetría: Sincronización horaria UTC a hora local continental (UTC-5) y Galápagos (UTC-6)
```

### Control de Escala y Enfoque Geográfico:
* **Escala Mínima Delimitada:** El visor restringe el alejamiento a nivel continental para mantener el marco centrado permanentemente entre el Archipiélago de Galápagos y la frontera oriental amazónica.
* **Escala Máxima Detallada:** Permite aproximaciones hasta nivel de avenidas y manzanas urbanas sobre las principales urbes (Guayaquil, Quito, Cuenca, Manta, Portoviejo, etc.), permitiendo correlacionar núcleos de tormenta con la infraestructura local.
* **Prevención de Marcas de Agua:** Al delimitar la resolución del lienzo WMS a dimensiones óptimas por cuadro, se elimina cualquier límite de cuota o marca publicitaria, garantizando una visualización limpia apta para centros de monitoreo.
