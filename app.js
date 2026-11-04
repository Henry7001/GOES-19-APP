// Desarrollado por Henry Ruiz
// Monitor de tormentas satelitales GOES-19 para Ecuador y Galapagos

const DIVISION_TERRITORIAL = {
  pais: {
    nombre: 'Ecuador (Vista Nacional)',
    centro: [-1.4, -82.0],
    zoom: 6
  },
  provincias: {
    guayas: {
      nombre: 'Guayas',
      centro: [-2.0, -79.9],
      zoom: 9,
      ciudades: [
        { id: 'gran_guayaquil', nombre: '🏙️ Conurbano Gran Guayaquil (Área Metropolitana)', centro: [-2.14, -79.88], zoom: 11 },
        { id: 'gye_centro', nombre: 'Guayaquil - Centro Urbano', centro: [-2.1894, -79.8891], zoom: 13 },
        { id: 'gye_norte', nombre: 'Guayaquil - Norte (Martha de Roldós / Alborada)', centro: [-2.1465, -79.9142], zoom: 14 },
        { id: 'gye_sur', nombre: 'Guayaquil - Sur (Guasmo / Pradera)', centro: [-2.2547, -79.8883], zoom: 14 },
        { id: 'gye_ceibos', nombre: 'Guayaquil - Ceibos / Vía a la Costa', centro: [-2.1812, -80.0050], zoom: 13 },
        { id: 'gye_sambo', nombre: 'Guayaquil - Vía Samborondón (La Puntilla)', centro: [-2.1425, -79.8650], zoom: 13 },
        { id: 'daule_aurora', nombre: 'Daule - La Aurora', centro: [-2.0469, -79.9056], zoom: 13 },
        { id: 'daule_cabecera', nombre: 'Daule - Cabecera Cantonal', centro: [-1.8631, -79.9778], zoom: 13 },
        { id: 'duran', nombre: 'Durán (Eloy Alfaro)', centro: [-2.1697, -79.8492], zoom: 13 },
        { id: 'samborondon', nombre: 'Samborondón (Cabecera)', centro: [-1.9628, -79.7236], zoom: 13 },
        { id: 'yaguachi', nombre: 'Yaguachi (San Jacinto)', centro: [-2.0944, -79.6936], zoom: 13 },
        { id: 'nobol', nombre: 'Nobol (Narcisa de Jesús)', centro: [-1.9083, -79.9806], zoom: 13 },
        { id: 'milagro', nombre: 'Milagro', centro: [-2.1342, -79.5942], zoom: 13 },
        { id: 'salitre', nombre: 'Salitre (Urbina Jado)', centro: [-1.8217, -79.8172], zoom: 13 },
        { id: 'lomas_sargentillo', nombre: 'Lomas de Sargentillo', centro: [-1.8797, -80.0847], zoom: 13 },
        { id: 'isidro_ayora', nombre: 'Isidro Ayora', centro: [-1.8767, -80.1444], zoom: 13 },
        { id: 'playas', nombre: 'Playas (General Villamil)', centro: [-2.6319, -80.3881], zoom: 13 },
        { id: 'naranjal', nombre: 'Naranjal', centro: [-2.6736, -79.6178], zoom: 12 },
        { id: 'el_empalme', nombre: 'El Empalme', centro: [-1.0436, -79.6358], zoom: 12 },
        { id: 'balzar', nombre: 'Balzar', centro: [-1.3653, -79.9056], zoom: 12 },
        { id: 'pedro_carbo', nombre: 'Pedro Carbo', centro: [-1.8156, -80.2336], zoom: 12 },
        { id: 'toda_guayas', nombre: '── Toda la Provincia del Guayas ──', centro: [-2.0, -79.9], zoom: 9 }
      ]
    },
    pichincha: {
      nombre: 'Pichincha',
      centro: [-0.15, -78.5],
      zoom: 9,
      ciudades: [
        { id: 'uio_centro', nombre: 'Quito - Centro Histórico', centro: [-0.2202, -78.5123], zoom: 13 },
        { id: 'uio_norte', nombre: 'Quito - Norte (La Carolina / Calderón)', centro: [-0.1650, -78.4850], zoom: 13 },
        { id: 'uio_sur', nombre: 'Quito - Sur (Chillogallo / Quitumbe)', centro: [-0.2850, -78.5500], zoom: 13 },
        { id: 'uio_valles', nombre: 'Quito - Valles (Cumbayá / Tumbaco)', centro: [-0.2050, -78.4350], zoom: 13 },
        { id: 'uio_chillos', nombre: 'Valle de Los Chillos (San Rafael)', centro: [-0.3150, -78.4500], zoom: 13 },
        { id: 'ruminahui', nombre: 'Rumiñahui (Sangolquí)', centro: [-0.3333, -78.4489], zoom: 13 },
        { id: 'mejia', nombre: 'Mejía (Machachi)', centro: [-0.5100, -78.5670], zoom: 12 },
        { id: 'cayambe', nombre: 'Cayambe', centro: [0.0417, -78.1450], zoom: 12 },
        { id: 'tabacundo', nombre: 'Tabacundo', centro: [0.0150, -78.2150], zoom: 12 },
        { id: 'puerto_quito', nombre: 'Puerto Quito', centro: [0.1214, -79.2556], zoom: 12 },
        { id: 'toda_pichincha', nombre: '── Toda la Provincia de Pichincha ──', centro: [-0.15, -78.5], zoom: 9 }
      ]
    },
    azuay: {
      nombre: 'Azuay',
      centro: [-2.95, -79.05],
      zoom: 9,
      ciudades: [
        { id: 'cue_centro', nombre: 'Cuenca - Centro Urbano', centro: [-2.9001, -79.0059], zoom: 13 },
        { id: 'gualaceo', nombre: 'Gualaceo', centro: [-2.8931, -78.7781], zoom: 13 },
        { id: 'chordeleg', nombre: 'Chordeleg', centro: [-2.9239, -78.7758], zoom: 13 },
        { id: 'paute', nombre: 'Paute', centro: [-2.7778, -78.7597], zoom: 13 },
        { id: 'santa_isabel', nombre: 'Santa Isabel (Yunguilla)', centro: [-3.2750, -79.3150], zoom: 12 },
        { id: 'giron', nombre: 'Girón', centro: [-3.1611, -79.1464], zoom: 12 },
        { id: 'toda_azuay', nombre: '── Toda la Provincia del Azuay ──', centro: [-2.95, -79.05], zoom: 9 }
      ]
    },
    manabi: {
      nombre: 'Manabí',
      centro: [-0.95, -80.2],
      zoom: 9,
      ciudades: [
        { id: 'manta', nombre: 'Manta (Puerto / Tarqui)', centro: [-0.9677, -80.7089], zoom: 13 },
        { id: 'portoviejo', nombre: 'Portoviejo', centro: [-1.0544, -80.4544], zoom: 13 },
        { id: 'chone', nombre: 'Chone', centro: [-0.6978, -80.0931], zoom: 12 },
        { id: 'bahia', nombre: 'Bahía de Caráquez', centro: [-0.5986, -80.4239], zoom: 13 },
        { id: 'pedernales', nombre: 'Pedernales', centro: [0.0719, -80.0525], zoom: 12 },
        { id: 'montecristi', nombre: 'Montecristi', centro: [-1.0500, -80.6600], zoom: 13 },
        { id: 'jipijapa', nombre: 'Jipijapa', centro: [-1.3486, -80.5786], zoom: 12 },
        { id: 'pto_lopez', nombre: 'Puerto López', centro: [-1.5658, -80.8122], zoom: 13 },
        { id: 'toda_manabi', nombre: '── Toda la Provincia de Manabí ──', centro: [-0.95, -80.2], zoom: 9 }
      ]
    },
    el_oro: {
      nombre: 'El Oro',
      centro: [-3.5, -79.8],
      zoom: 9,
      ciudades: [
        { id: 'machala', nombre: 'Machala', centro: [-3.2581, -79.9554], zoom: 13 },
        { id: 'pto_bolivar', nombre: 'Puerto Bolívar', centro: [-3.2667, -79.9986], zoom: 13 },
        { id: 'pasaje', nombre: 'Pasaje', centro: [-3.3256, -79.8069], zoom: 13 },
        { id: 'santa_rosa', nombre: 'Santa Rosa', centro: [-3.4486, -79.9597], zoom: 13 },
        { id: 'huaquillas', nombre: 'Huaquillas', centro: [-3.4753, -80.2306], zoom: 13 },
        { id: 'arenillas', nombre: 'Arenillas', centro: [-3.5519, -80.0664], zoom: 12 },
        { id: 'zaruma_pinas', nombre: 'Zaruma / Piñas', centro: [-3.6917, -79.6111], zoom: 12 },
        { id: 'toda_el_oro', nombre: '── Toda la Provincia de El Oro ──', centro: [-3.5, -79.8], zoom: 9 }
      ]
    },
    los_rios: {
      nombre: 'Los Ríos',
      centro: [-1.5, -79.5],
      zoom: 9,
      ciudades: [
        { id: 'babahoyo', nombre: 'Babahoyo', centro: [-1.8022, -79.5342], zoom: 13 },
        { id: 'quevedo', nombre: 'Quevedo', centro: [-1.0286, -79.4636], zoom: 13 },
        { id: 'vinces', nombre: 'Vinces', centro: [-1.5564, -79.7522], zoom: 13 },
        { id: 'ventanas', nombre: 'Ventanas', centro: [-1.4439, -79.4589], zoom: 13 },
        { id: 'buena_fe', nombre: 'Buena Fe', centro: [-0.8931, -79.4908], zoom: 13 },
        { id: 'toda_los_rios', nombre: '── Toda la Provincia de Los Ríos ──', centro: [-1.5, -79.5], zoom: 9 }
      ]
    },
    esmeraldas: {
      nombre: 'Esmeraldas',
      centro: [0.8, -79.5],
      zoom: 9,
      ciudades: [
        { id: 'esmeraldas_ciu', nombre: 'Esmeraldas (Ciudad)', centro: [0.9682, -79.6517], zoom: 13 },
        { id: 'atacames', nombre: 'Atacames / Tonsupa', centro: [0.8686, -79.8458], zoom: 13 },
        { id: 'muisne_same', nombre: 'Muisne / Same', centro: [0.6125, -80.0194], zoom: 12 },
        { id: 'quininde', nombre: 'Quinindé (Rosa Zárate)', centro: [0.3289, -79.4678], zoom: 12 },
        { id: 'san_lorenzo', nombre: 'San Lorenzo', centro: [1.2861, -78.8353], zoom: 12 },
        { id: 'toda_esmeraldas', nombre: '── Toda la Provincia de Esmeraldas ──', centro: [0.8, -79.5], zoom: 9 }
      ]
    },
    santodomingo: {
      nombre: 'Santo Domingo de los Tsáchilas',
      centro: [-0.25, -79.2],
      zoom: 10,
      ciudades: [
        { id: 'sd_centro', nombre: 'Santo Domingo (Centro / Urbano)', centro: [-0.2530, -79.1754], zoom: 13 },
        { id: 'la_concordia', nombre: 'La Concordia', centro: [0.0050, -79.3958], zoom: 13 },
        { id: 'toda_sd', nombre: '── Toda la Provincia Santo Domingo ──', centro: [-0.25, -79.2], zoom: 10 }
      ]
    },
    tungurahua: {
      nombre: 'Tungurahua',
      centro: [-1.3, -78.6],
      zoom: 10,
      ciudades: [
        { id: 'ambato', nombre: 'Ambato', centro: [-1.2491, -78.6168], zoom: 13 },
        { id: 'banos', nombre: 'Baños de Agua Santa', centro: [-1.3964, -78.4244], zoom: 13 },
        { id: 'pelileo', nombre: 'Pelileo', centro: [-1.3289, -78.5447], zoom: 13 },
        { id: 'toda_tungurahua', nombre: '── Toda la Provincia de Tungurahua ──', centro: [-1.3, -78.6], zoom: 10 }
      ]
    },
    chimborazo: {
      nombre: 'Chimborazo',
      centro: [-1.8, -78.7],
      zoom: 9,
      ciudades: [
        { id: 'riobamba', nombre: 'Riobamba', centro: [-1.6710, -78.6477], zoom: 13 },
        { id: 'guano', nombre: 'Guano', centro: [-1.6067, -78.6319], zoom: 13 },
        { id: 'alausi', nombre: 'Alausí', centro: [-2.2047, -78.8475], zoom: 12 },
        { id: 'toda_chimborazo', nombre: '── Toda la Provincia de Chimborazo ──', centro: [-1.8, -78.7], zoom: 9 }
      ]
    },
    imbabura: {
      nombre: 'Imbabura',
      centro: [0.35, -78.2],
      zoom: 10,
      ciudades: [
        { id: 'ibarra', nombre: 'Ibarra', centro: [0.3517, -78.1222], zoom: 13 },
        { id: 'otavalo', nombre: 'Otavalo', centro: [0.2344, -78.2619], zoom: 13 },
        { id: 'cotacachi', nombre: 'Cotacachi', centro: [0.3014, -78.2644], zoom: 13 },
        { id: 'atuntaqui', nombre: 'Atuntaqui', centro: [0.3325, -78.2144], zoom: 13 },
        { id: 'toda_imbabura', nombre: '── Toda la Provincia de Imbabura ──', centro: [0.35, -78.2], zoom: 10 }
      ]
    },
    loja: {
      nombre: 'Loja',
      centro: [-4.0, -79.3],
      zoom: 9,
      ciudades: [
        { id: 'loja_ciu', nombre: 'Loja (Ciudad)', centro: [-3.9931, -79.2042], zoom: 13 },
        { id: 'catamayo', nombre: 'Catamayo', centro: [-3.9878, -79.3581], zoom: 13 },
        { id: 'vilcabamba', nombre: 'Vilcabamba', centro: [-4.2617, -79.2231], zoom: 13 },
        { id: 'cariamanga', nombre: 'Cariamanga', centro: [-4.3283, -79.5542], zoom: 12 },
        { id: 'macara', nombre: 'Macará', centro: [-4.3817, -79.9458], zoom: 12 },
        { id: 'toda_loja', nombre: '── Toda la Provincia de Loja ──', centro: [-4.0, -79.3], zoom: 9 }
      ]
    },
    cotopaxi: {
      nombre: 'Cotopaxi',
      centro: [-0.9, -78.8],
      zoom: 9,
      ciudades: [
        { id: 'latacunga', nombre: 'Latacunga', centro: [-0.9353, -78.6156], zoom: 13 },
        { id: 'salcedo', nombre: 'Salcedo', centro: [-1.0450, -78.5911], zoom: 13 },
        { id: 'la_mana', nombre: 'La Maná', centro: [-0.9417, -79.2250], zoom: 12 },
        { id: 'pujili', nombre: 'Pujilí', centro: [-0.9575, -78.6958], zoom: 12 },
        { id: 'toda_cotopaxi', nombre: '── Toda la Provincia de Cotopaxi ──', centro: [-0.9, -78.8], zoom: 9 }
      ]
    },
    santa_elena: {
      nombre: 'Santa Elena',
      centro: [-2.2, -80.6],
      zoom: 10,
      ciudades: [
        { id: 'salinas', nombre: 'Salinas / Chipipe', centro: [-2.2178, -80.9817], zoom: 13 },
        { id: 'la_libertad', nombre: 'La Libertad', centro: [-2.2333, -80.9100], zoom: 13 },
        { id: 'ste_cabecera', nombre: 'Santa Elena (Cabecera)', centro: [-2.2267, -80.8589], zoom: 13 },
        { id: 'montanita', nombre: 'Montañita / Olón', centro: [-1.8286, -80.7533], zoom: 13 },
        { id: 'ayangue', nombre: 'Ayangue', centro: [-1.9786, -80.7511], zoom: 13 },
        { id: 'toda_santa_elena', nombre: '── Toda la Península de Santa Elena ──', centro: [-2.2, -80.6], zoom: 10 }
      ]
    },
    canar: {
      nombre: 'Cañar',
      centro: [-2.5, -79.0],
      zoom: 9,
      ciudades: [
        { id: 'azogues', nombre: 'Azogues', centro: [-2.7397, -78.8475], zoom: 13 },
        { id: 'la_troncal', nombre: 'La Troncal', centro: [-2.4250, -79.3389], zoom: 13 },
        { id: 'canar_ciu', nombre: 'Cañar (Ciudad)', centro: [-2.5594, -78.9378], zoom: 12 },
        { id: 'toda_canar', nombre: '── Toda la Provincia de Cañar ──', centro: [-2.5, -79.0], zoom: 9 }
      ]
    },
    carchi: {
      nombre: 'Carchi',
      centro: [0.7, -78.0],
      zoom: 9,
      ciudades: [
        { id: 'tulcan', nombre: 'Tulcán', centro: [0.8122, -77.7178], zoom: 13 },
        { id: 'san_gabriel', nombre: 'San Gabriel', centro: [0.5936, -77.8289], zoom: 12 },
        { id: 'toda_carchi', nombre: '── Toda la Provincia del Carchi ──', centro: [0.7, -78.0], zoom: 9 }
      ]
    },
    bolivar: {
      nombre: 'Bolívar',
      centro: [-1.6, -79.1],
      zoom: 9,
      ciudades: [
        { id: 'guaranda', nombre: 'Guaranda', centro: [-1.5925, -79.0044], zoom: 13 },
        { id: 'san_miguel', nombre: 'San Miguel / Chimbo', centro: [-1.7100, -79.0433], zoom: 12 },
        { id: 'caluma', nombre: 'Caluma', centro: [-1.6319, -79.2558], zoom: 12 },
        { id: 'toda_bolivar', nombre: '── Toda la Provincia de Bolívar ──', centro: [-1.6, -79.1], zoom: 9 }
      ]
    },
    morona_santiago: {
      nombre: 'Morona Santiago',
      centro: [-2.5, -78.0],
      zoom: 8,
      ciudades: [
        { id: 'macas', nombre: 'Macas', centro: [-2.3087, -78.1114], zoom: 13 },
        { id: 'sucua', nombre: 'Sucúa', centro: [-2.4561, -78.1728], zoom: 12 },
        { id: 'gualaquiza', nombre: 'Gualaquiza', centro: [-3.4036, -78.5808], zoom: 12 },
        { id: 'toda_morona', nombre: '── Toda Morona Santiago ──', centro: [-2.5, -78.0], zoom: 8 }
      ]
    },
    napo: {
      nombre: 'Napo',
      centro: [-0.7, -77.8],
      zoom: 8,
      ciudades: [
        { id: 'tena', nombre: 'Tena', centro: [-0.9939, -77.8131], zoom: 13 },
        { id: 'archidona', nombre: 'Archidona', centro: [-0.9100, -77.8089], zoom: 13 },
        { id: 'baeza', nombre: 'Baeza', centro: [-0.4633, -77.8906], zoom: 12 },
        { id: 'toda_napo', nombre: '── Toda la Provincia de Napo ──', centro: [-0.7, -77.8], zoom: 8 }
      ]
    },
    orellana: {
      nombre: 'Orellana',
      centro: [-0.8, -76.8],
      zoom: 8,
      ciudades: [
        { id: 'coca', nombre: 'El Coca (Pto. Francisco de Orellana)', centro: [-0.4664, -76.9871], zoom: 12 },
        { id: 'loreto', nombre: 'Loreto', centro: [-0.6869, -77.3075], zoom: 12 },
        { id: 'toda_orellana', nombre: '── Toda la Provincia de Orellana ──', centro: [-0.8, -76.8], zoom: 8 }
      ]
    },
    pastaza: {
      nombre: 'Pastaza',
      centro: [-1.6, -76.8],
      zoom: 8,
      ciudades: [
        { id: 'puyo', nombre: 'Puyo', centro: [-1.4837, -77.9983], zoom: 13 },
        { id: 'mera_shell', nombre: 'Mera / Shell', centro: [-1.5036, -78.0642], zoom: 13 },
        { id: 'toda_pastaza', nombre: '── Toda la Provincia de Pastaza ──', centro: [-1.6, -76.8], zoom: 8 }
      ]
    },
    sucumbios: {
      nombre: 'Sucumbíos',
      centro: [0.1, -76.8],
      zoom: 8,
      ciudades: [
        { id: 'lago_agrio', nombre: 'Nueva Loja (Lago Agrio)', centro: [0.0847, -76.8828], zoom: 13 },
        { id: 'shushufindi', nombre: 'Shushufindi', centro: [-0.1856, -76.6536], zoom: 12 },
        { id: 'toda_sucumbios', nombre: '── Toda la Provincia de Sucumbíos ──', centro: [0.1, -76.8], zoom: 8 }
      ]
    },
    zamora_chinchipe: {
      nombre: 'Zamora Chinchipe',
      centro: [-3.9, -78.8],
      zoom: 8,
      ciudades: [
        { id: 'zamora', nombre: 'Zamora', centro: [-4.0678, -78.9567], zoom: 13 },
        { id: 'yantzaza', nombre: 'Yantzaza', centro: [-3.8306, -78.7611], zoom: 12 },
        { id: 'toda_zamora', nombre: '── Toda Zamora Chinchipe ──', centro: [-3.9, -78.8], zoom: 8 }
      ]
    },
    galapagos: {
      nombre: 'Galápagos',
      centro: [-0.8, -90.5],
      zoom: 8,
      ciudades: [
        { id: 'santa_cruz', nombre: 'Puerto Ayora (Isla Santa Cruz)', centro: [-0.7444, -90.3138], zoom: 13 },
        { id: 'san_cristobal', nombre: 'Pto. Baquerizo Moreno (San Cristóbal)', centro: [-0.9025, -89.6108], zoom: 13 },
        { id: 'isabela', nombre: 'Puerto Villamil (Isla Isabela)', centro: [-0.9569, -90.9667], zoom: 13 },
        { id: 'toda_galapagos', nombre: '── Archipiélago Completo (Galápagos) ──', centro: [-0.8, -90.5], zoom: 8 }
      ]
    }
  }
};

// Polígono simplificado de alta fidelidad del territorio nacional de Ecuador
const POLIGONO_ECUADOR = [
  [-78.829,1.434],[-78.77,1.394],[-78.719,1.341],[-78.684,1.282],[-78.665,1.267],[-78.641,1.259],
  [-78.602,1.264],[-78.597,1.234],[-78.57,1.196],[-78.541,1.205],[-78.485,1.193],[-78.349,1.056],
  [-78.25,1.02],[-78.12,0.921],[-78.078,0.901],[-78.007,0.898],[-77.939,0.873],[-77.918,0.874],
  [-77.909,0.864],[-77.903,0.832],[-77.848,0.809],[-77.808,0.813],[-77.728,0.843],[-77.703,0.843],
  [-77.673,0.82],[-77.667,0.748],[-77.646,0.716],[-77.58,0.671],[-77.543,0.656],[-77.509,0.661],
  [-77.468,0.651],[-77.455,0.602],[-77.448,0.497],[-77.435,0.434],[-77.424,0.408],[-77.397,0.388],
  [-77.256,0.353],[-77.207,0.334],[-77.117,0.358],[-77.083,0.349],[-77.045,0.306],[-76.946,0.287],
  [-76.882,0.24],[-76.798,0.25],[-76.734,0.233],[-76.737,0.273],[-76.725,0.278],[-76.627,0.259],
  [-76.584,0.223],[-76.565,0.216],[-76.525,0.231],[-76.426,0.243],[-76.408,0.255],[-76.418,0.321],
  [-76.416,0.402],[-76.365,0.407],[-76.335,0.442],[-76.3,0.462],[-76.263,0.428],[-76.224,0.407],
  [-76.136,0.397],[-76.12,0.352],[-76.053,0.364],[-75.972,0.252],[-75.952,0.204],[-75.818,0.1],
  [-75.754,0.073],[-75.647,0.085],[-75.627,0.079],[-75.598,0.05],[-75.57,0.038],[-75.523,-0.004],
  [-75.465,-0.04],[-75.421,-0.062],[-75.365,-0.073],[-75.283,-0.107],[-75.331,-0.145],[-75.403,-0.146],
  [-75.43,-0.164],[-75.455,-0.161],[-75.539,-0.12],[-75.571,-0.122],[-75.623,-0.107],[-75.638,-0.111],
  [-75.643,-0.129],[-75.62,-0.181],[-75.579,-0.183],[-75.546,-0.21],[-75.496,-0.233],[-75.485,-0.248],
  [-75.453,-0.361],[-75.434,-0.403],[-75.406,-0.442],[-75.376,-0.467],[-75.347,-0.471],[-75.304,-0.507],
  [-75.291,-0.528],[-75.272,-0.526],[-75.261,-0.543],[-75.256,-0.624],[-75.294,-0.668],[-75.288,-0.706],
  [-75.297,-0.747],[-75.253,-0.898],[-75.252,-0.933],[-75.227,-0.97],[-75.349,-0.975],[-75.406,-0.915],
  [-75.573,-1.537],[-75.651,-1.617],[-76.091,-2.129],[-76.625,-2.538],[-76.685,-2.574],[-77.868,-2.99],
  [-77.941,-3.055],[-78.043,-3.19],[-78.105,-3.245],[-78.148,-3.322],[-78.196,-3.364],[-78.197,-3.386],
  [-78.157,-3.429],[-78.155,-3.457],[-78.164,-3.477],[-78.226,-3.507],[-78.257,-3.41],[-78.313,-3.387],
  [-78.351,-3.39],[-78.362,-3.409],[-78.355,-3.435],[-78.363,-3.489],[-78.402,-3.594],[-78.401,-3.68],
  [-78.426,-3.689],[-78.414,-3.772],[-78.42,-3.791],[-78.47,-3.83],[-78.481,-3.85],[-78.498,-3.95],
  [-78.552,-3.969],[-78.562,-3.98],[-78.566,-4.056],[-78.577,-4.1],[-78.638,-4.227],[-78.656,-4.291],
  [-78.674,-4.306],[-78.682,-4.327],[-78.673,-4.402],[-78.661,-4.421],[-78.637,-4.435],[-78.64,-4.451],
  [-78.67,-4.493],[-78.673,-4.551],[-78.682,-4.567],[-78.72,-4.592],[-78.853,-4.652],[-78.899,-4.694],
  [-78.929,-4.747],[-78.928,-4.775],[-78.9,-4.844],[-78.911,-4.864],[-78.98,-4.874],[-79.009,-4.96],
  [-79.064,-5.011],[-79.104,-4.98],[-79.141,-4.983],[-79.209,-4.965],[-79.28,-4.967],[-79.303,-4.961],
  [-79.341,-4.904],[-79.378,-4.885],[-79.395,-4.848],[-79.451,-4.81],[-79.461,-4.769],[-79.487,-4.72],
  [-79.499,-4.661],[-79.528,-4.618],[-79.527,-4.597],[-79.504,-4.556],[-79.507,-4.532],[-79.528,-4.52],
  [-79.558,-4.517],[-79.63,-4.452],[-79.658,-4.439],[-79.694,-4.444],[-79.729,-4.464],[-79.796,-4.485],
  [-79.833,-4.479],[-79.904,-4.399],[-79.982,-4.389],[-80.029,-4.36],[-80.08,-4.309],[-80.134,-4.294],
  [-80.14,-4.283],[-80.205,-4.298],[-80.222,-4.319],[-80.24,-4.37],[-80.255,-4.387],[-80.383,-4.476],
  [-80.408,-4.478],[-80.47,-4.446],[-80.492,-4.413],[-80.489,-4.396],[-80.345,-4.198],[-80.435,-4.217],
  [-80.47,-4.213],[-80.491,-4.169],[-80.487,-4.131],[-80.514,-4.083],[-80.492,-4.015],[-80.466,-3.988],
  [-80.427,-3.981],[-80.386,-3.989],[-80.326,-4.015],[-80.305,-4.005],[-80.259,-3.944],[-80.181,-3.908],
  [-80.165,-3.89],[-80.165,-3.88],[-80.189,-3.858],[-80.193,-3.822],[-80.226,-3.749],[-80.217,-3.727],
  [-80.225,-3.681],[-80.216,-3.632],[-80.225,-3.592],[-80.25,-3.578],[-80.24,-3.514],[-80.249,-3.498],
  [-80.272,-3.486],[-80.266,-3.426],[-80.341,-3.393],[-80.341,-3.369],[-80.328,-3.361],[-80.307,-3.321],
  [-80.321,-3.356],[-80.314,-3.376],[-80.302,-3.367],[-80.286,-3.321],[-80.259,-3.348],[-80.173,-3.328],
  [-80.136,-3.328],[-80.108,-3.297],[-80.06,-3.204],[-80.038,-3.208],[-80.033,-3.232],[-80.04,-3.28],
  [-80.009,-3.242],[-79.953,-3.197],[-79.933,-3.115],[-79.875,-3.005],[-79.885,-2.988],[-79.881,-2.965],
  [-79.835,-2.807],[-79.801,-2.741],[-79.776,-2.659],[-79.726,-2.594],[-79.732,-2.525],[-79.745,-2.49],
  [-79.79,-2.481],[-79.839,-2.377],[-79.848,-2.245],[-79.84,-2.21],[-79.869,-2.161],[-79.854,-2.12],
  [-79.862,-2.108],[-79.846,-2.092],[-79.818,-2.08],[-79.806,-2.045],[-79.773,-2.027],[-79.766,-2.005],
  [-79.831,-2.044],[-79.835,-2.07],[-79.874,-2.075],[-79.892,-2.116],[-79.902,-2.185],[-79.896,-2.214],
  [-79.865,-2.267],[-79.863,-2.297],[-79.879,-2.492],[-79.896,-2.543],[-79.933,-2.58],[-79.998,-2.608],
  [-80.014,-2.59],[-80.044,-2.589],[-80.064,-2.577],[-80.069,-2.561],[-80.026,-2.525],[-80.002,-2.48],
  [-79.975,-2.477],[-79.955,-2.498],[-79.944,-2.498],[-79.93,-2.484],[-79.936,-2.463],[-79.941,-2.484],
  [-79.978,-2.457],[-80.034,-2.474],[-80.04,-2.46],[-80.036,-2.438],[-80.009,-2.359],[-79.978,-2.347],
  [-79.95,-2.307],[-79.983,-2.327],[-80.013,-2.326],[-80.033,-2.346],[-80.076,-2.458],[-80.175,-2.587],
  [-80.208,-2.601],[-80.232,-2.629],[-80.27,-2.605],[-80.28,-2.613],[-80.28,-2.649],[-80.245,-2.688],
  [-80.245,-2.721],[-80.255,-2.73],[-80.321,-2.711],[-80.396,-2.649],[-80.43,-2.642],[-80.468,-2.618],
  [-80.574,-2.493],[-80.657,-2.416],[-80.718,-2.391],[-80.751,-2.392],[-80.803,-2.375],[-80.864,-2.329],
  [-80.914,-2.319],[-80.935,-2.261],[-80.965,-2.223],[-81.002,-2.194],[-81.013,-2.167],[-81.001,-2.164],
  [-80.992,-2.176],[-80.949,-2.186],[-80.931,-2.217],[-80.871,-2.203],[-80.82,-2.162],[-80.781,-2.143],
  [-80.745,-2.103],[-80.737,-2.043],[-80.763,-1.974],[-80.758,-1.963],[-80.733,-1.954],[-80.73,-1.929],
  [-80.761,-1.798],[-80.782,-1.737],[-80.85,-1.616],[-80.856,-1.588],[-80.852,-1.577],[-80.816,-1.552],
  [-80.821,-1.5],[-80.8,-1.481],[-80.771,-1.478],[-80.76,-1.414],[-80.764,-1.391],[-80.76,-1.377],
  [-80.743,-1.368],[-80.744,-1.344],[-80.834,-1.231],[-80.882,-1.146],[-80.916,-1.066],[-80.91,-1.045],
  [-80.816,-0.946],[-80.788,-0.951],[-80.761,-0.937],[-80.746,-0.94],[-80.722,-0.931],[-80.724,-0.94],
  [-80.691,-0.95],[-80.653,-0.923],[-80.643,-0.937],[-80.616,-0.941],[-80.57,-0.912],[-80.547,-0.888],
  [-80.516,-0.742],[-80.498,-0.692],[-80.462,-0.618],[-80.449,-0.606],[-80.422,-0.6],[-80.42,-0.626],
  [-80.406,-0.646],[-80.379,-0.658],[-80.299,-0.662],[-80.299,-0.65],[-80.378,-0.636],[-80.392,-0.625],
  [-80.416,-0.574],[-80.437,-0.558],[-80.452,-0.477],[-80.485,-0.424],[-80.496,-0.381],[-80.486,-0.367],
  [-80.465,-0.365],[-80.433,-0.339],[-80.391,-0.274],[-80.371,-0.223],[-80.35,-0.215],[-80.324,-0.173],
  [-80.305,-0.189],[-80.232,-0.14],[-80.108,0.007],[-80.099,0.039],[-80.066,0.052],[-80.051,0.09],
  [-80.037,0.176],[-80.048,0.318],[-80.037,0.357],[-80.021,0.347],[-80.013,0.325],[-80.005,0.325],
  [-79.991,0.365],[-80.044,0.459],[-80.043,0.501],[-80.019,0.538],[-80.017,0.559],[-80.036,0.625],
  [-80.059,0.645],[-80.09,0.652],[-80.108,0.695],[-80.109,0.738],[-80.097,0.78],[-80.076,0.816],
  [-80.046,0.84],[-80.014,0.829],[-79.981,0.832],[-79.947,0.855],[-79.862,0.876],[-79.793,0.922],
  [-79.766,0.955],[-79.682,0.985],[-79.656,1.004],[-79.65,0.984],[-79.67,0.922],[-79.615,0.845],
  [-79.631,0.89],[-79.648,0.907],[-79.641,0.972],[-79.633,0.986],[-79.615,0.996],[-79.572,0.984],
  [-79.524,1.01],[-79.457,1.072],[-79.435,1.078],[-79.365,1.072],[-79.272,1.093],[-79.248,1.08],
  [-79.166,1.1],[-79.147,1.11],[-79.072,1.21],[-79.057,1.218],[-79.013,1.193],[-79,1.172],
  [-78.992,1.12],[-78.962,1.145],[-78.955,1.207],[-78.929,1.243],[-78.92,1.231],[-78.902,1.236],
  [-78.893,1.245],[-78.888,1.27],[-78.872,1.289],[-78.855,1.292],[-78.813,1.277],[-78.82,1.292],
  [-78.875,1.305],[-78.882,1.319],[-78.87,1.344],[-78.832,1.381],[-78.829,1.434]
];

function puntoEnPoligono(x, y, poligono) {
  let dentro = false;
  for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
    const xi = poligono[i][0], yi = poligono[i][1];
    const xj = poligono[j][0], yj = poligono[j][1];
    const intersecta = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersecta) dentro = !dentro;
  }
  return dentro;
}

function distPuntoASegmento(px, py, vx, vy, wx, wy) {
  const l2 = (vx - wx)**2 + (vy - wy)**2;
  if (l2 === 0) return Math.hypot(px - vx, py - vy);
  let t = ((px - vx) * (wx - vx) + (py - vy) * (wy - vy)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (vx + t * (wx - vx)), py - (vy + t * (wy - vy)));
}

function distMinimaAPoligono(px, py, poligono) {
  let min = Infinity;
  for (let i = 0; i < poligono.length - 1; i++) {
    const d = distPuntoASegmento(px, py, poligono[i][0], poligono[i][1], poligono[i+1][0], poligono[i+1][1]);
    if (d < min) min = d;
  }
  return min;
}

// Filtro estricto de soberanía: Ecuador Continental (polígono de alta fidelidad) + Región Insular Galápagos
function estaEnTerritorioEcuador(lon, lat) {
  // 1. Región Insular de Galápagos (Archipiélago de Colón)
  if (lat >= -1.65 && lat <= 0.85 && lon >= -92.2 && lon <= -89.0) {
    return true;
  }

  // 2. Pre-filtro de cuadrante continental
  if (lat < -5.1 || lat > 1.5 || lon < -81.2 || lon > -75.15) {
    return false;
  }

  // 3. Prueba dentro del polígono territorial continental
  if (puntoEnPoligono(lon, lat, POLIGONO_ECUADOR)) {
    return true;
  }

  // 4. Margen costero/marítimo nacional (hasta 0.08° ≈ 9 km mar adentro en costas y Golfo de Guayaquil)
  // Excluyendo con precisión estricta los territorios vecinos de Colombia y Perú
  if (distMinimaAPoligono(lon, lat, POLIGONO_ECUADOR) <= 0.08) {
    if (lat > 1.15 && lon > -77.8) return false; // Nariño / Pasto (Colombia)
    if (lon > -75.2) return false;               // Loreto (Perú)
    if (lat < -4.95) return false;               // Tumbes / Piura (Perú)
    return true;
  }

  return false;
}

// Helper seguro para persistencia en memoria local del navegador (localStorage)
const Memoria = {
  obtener(clave, valorPorDefecto = null) {
    try {
      const val = localStorage.getItem(clave);
      return val !== null ? val : valorPorDefecto;
    } catch (e) {
      return valorPorDefecto;
    }
  },
  guardar(clave, valor) {
    try {
      localStorage.setItem(clave, valor.toString());
    } catch (e) {
      // Modo incógnito restringido
    }
  }
};

let mapa;
let capaSatelite = null;
let capaEnCarga = null;
let productoActual = Memoria.obtener('producto_satelital_actual', 'G19-ABI-FD-BAND13-GRAD');
let opacidadActual = parseFloat(Memoria.obtener('opacidad_satelite', '0.85'));
let horaActualSatelite = null;

let cadenciaSegundos = parseInt(Memoria.obtener('cadencia_segundos_goes19', '600'), 10);
let tiempoProximaRecarga = Date.now() + cadenciaSegundos * 1000;
let temporizadorRecarga = null;
let recargaEnProgreso = false;
let temporizadorMovimiento = null;

let capaCalles;
let capaSateliteBase;
let capaLimites;
let grupoRayos;
let capaDensidadRayos = null;
let marcadorUsuario = null;
let circuloPrecision = null;

let detectorRayosActivo = Memoria.obtener('detector_rayos_activo', 'true') !== 'false';
let alertaSonoraRayosActiva = Memoria.obtener('alerta_sonora_rayos_activa', 'false') === 'true';
let temporizadorRayos = null;
let ultimoConteoRayos = 0;
let coordenadasUsuarioActual = null;

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app-root');
  if (window.innerWidth > 768 && localStorage.getItem('panel_opciones_visible') !== 'false') {
    if (appRoot) appRoot.classList.add('drawer-open');
  }

  iniciarMapa();
  vincularEventosInterfaz();
  ejecutarRecargaCompleta('inicio');
  iniciarContadorRecarga();
  iniciarDetectorRayos();

  // Solo solicitar ubicación automáticamente si es un dispositivo con GPS (móvil / tablet)
  if (esDispositivoConGPS()) {
    solicitarUbicacionUsuario(false);
  }
});

function iniciarMapa() {
  const limitesEcuador = L.latLngBounds(
    L.latLng(-6.2, -93.5),
    L.latLng(2.8, -74.0)
  );

  // Restaurar posición exacta donde el usuario dejó el mapa
  const latGuardada = parseFloat(Memoria.obtener('mapa_centro_lat'));
  const lonGuardada = parseFloat(Memoria.obtener('mapa_centro_lon'));
  const zoomGuardado = parseInt(Memoria.obtener('mapa_zoom'), 10);

  const hayPosicionGuardada = !isNaN(latGuardada) && !isNaN(lonGuardada) && !isNaN(zoomGuardado) &&
    latGuardada >= -6.5 && latGuardada <= 3.0 && lonGuardada >= -94.0 && lonGuardada <= -73.0;

  const centroInicial = hayPosicionGuardada ? [latGuardada, lonGuardada] : DIVISION_TERRITORIAL.pais.centro;
  const zoomInicial = hayPosicionGuardada ? zoomGuardado : DIVISION_TERRITORIAL.pais.zoom;

  mapa = L.map('map', {
    center: centroInicial,
    zoom: zoomInicial,
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
  });

  // Restaurar capa base (Esri Satélite vs Calles OSM)
  const basemapSateliteActivo = Memoria.obtener('mapa_base_satelite', 'true') !== 'false';
  if (basemapSateliteActivo) {
    capaSateliteBase.addTo(mapa);
  } else {
    capaCalles.addTo(mapa);
  }

  capaLimites = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    zIndex: 500,
    maxZoom: 18
  });

  // Restaurar límites y carreteras
  const limitesActivos = Memoria.obtener('capa_limites_activa', 'true') !== 'false';
  if (limitesActivos) {
    capaLimites.addTo(mapa);
  }

  // Restaurar capa de rayos
  grupoRayos = L.layerGroup();
  if (detectorRayosActivo) {
    grupoRayos.addTo(mapa);
  }

  // Restaurar ubicación registrada previa del usuario (sin volver a pedir permisos)
  restaurarUbicacionUsuarioGuardada();

  mapa.on('moveend', () => {
    // Guardar coordenadas y nivel de zoom para abrir exactamente donde se dejó
    const centro = mapa.getCenter();
    Memoria.guardar('mapa_centro_lat', centro.lat.toFixed(5));
    Memoria.guardar('mapa_centro_lon', centro.lng.toFixed(5));
    Memoria.guardar('mapa_zoom', mapa.getZoom().toString());

    clearTimeout(temporizadorMovimiento);
    temporizadorMovimiento = setTimeout(renderizarImagenSatelital, 300);
  });
}

function restaurarUbicacionUsuarioGuardada() {
  const latU = parseFloat(Memoria.obtener('usuario_lat_guardada'));
  const lonU = parseFloat(Memoria.obtener('usuario_lon_guardada'));
  const precisionU = parseFloat(Memoria.obtener('usuario_precision_guardada')) || 25;

  if (!isNaN(latU) && !isNaN(lonU)) {
    coordenadasUsuarioActual = { lat: latU, lon: lonU };

    const iconoUbicacion = L.divIcon({
      className: 'user-marker-container',
      html: '<div class="user-marker-pulse"></div><div class="user-marker-dot"></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    marcadorUsuario = L.marker([latU, lonU], {
      icon: iconoUbicacion,
      zIndexOffset: 1000
    }).addTo(mapa);

    marcadorUsuario.bindPopup(`
      <div style="font-family: var(--font-body); font-size: 0.8rem; color: #1e293b; padding: 2px;">
        <b style="color: #0284c7;">📍 Tu Ubicación Registrada</b><br>
        <span style="font-family: var(--font-mono); font-size: 0.72rem;">Lat: ${latU.toFixed(4)}, Lon: ${lonU.toFixed(4)}</span><br>
        <span style="font-size: 0.7rem; color: #64748b;">(Guardada en memoria local)</span>
      </div>
    `);

    if (precisionU > 20) {
      circuloPrecision = L.circle([latU, lonU], {
        radius: precisionU,
        color: '#06b6d4',
        fillColor: '#06b6d4',
        fillOpacity: 0.12,
        weight: 1
      }).addTo(mapa);
    }
  }
}

async function cargarDatosSatelitales() {
  mostrarEstadoCarga(true, 'Consultando pasada...');

  try {
    const timestamp = Date.now();
    const urlApi = `https://realearth.ssec.wisc.edu/api/latest?products=${productoActual}&_nocache=${timestamp}`;
    const respuesta = await fetch(urlApi, { cache: 'no-store' });
    const datos = await respuesta.json();
    const horaRaw = datos[productoActual];

    if (horaRaw) {
      horaActualSatelite = horaRaw;
      actualizarRelojesCabecera(horaRaw);
    }
  } catch (error) {
    console.error('No se pudo obtener la marca de tiempo satelital:', error);
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
  let nombreCapa = 'latest';
  if (horaActualSatelite) {
    nombreCapa = `${productoActual}_${horaActualSatelite.replace('.', '_')}`;
  }

  const urlWms = `https://realearth.ssec.wisc.edu/cgi-bin/mapserv?map=${productoActual}.map&service=WMS&version=1.3.0&request=GetMap&layers=${nombreCapa}&crs=EPSG:4326&bbox=${sur.toFixed(4)},${oeste.toFixed(4)},${norte.toFixed(4)},${este.toFixed(4)}&width=${ancho}&height=${alto}&format=image/png&transparent=true&_nocache=${timestampCache}`;

  const coordenadasOverlay = [
    [sur, oeste],
    [norte, este]
  ];

  // Limpiar capa anterior en carga si aún no había terminado
  if (capaEnCarga && mapa.hasLayer(capaEnCarga)) {
    mapa.removeLayer(capaEnCarga);
    capaEnCarga = null;
  }

  const nuevaCapa = L.imageOverlay(urlWms, coordenadasOverlay, {
    opacity: opacidadActual,
    zIndex: 200,
    interactive: false
  });

  capaEnCarga = nuevaCapa;

  const timeoutId = setTimeout(() => {
    if (capaEnCarga === nuevaCapa) {
      mostrarEstadoCarga(false);
    }
  }, 12000);

  nuevaCapa.on('load', () => {
    clearTimeout(timeoutId);
    if (capaEnCarga === nuevaCapa) {
      if (capaSatelite && mapa.hasLayer(capaSatelite) && capaSatelite !== nuevaCapa) {
        mapa.removeLayer(capaSatelite);
      }
      capaSatelite = nuevaCapa;
      capaEnCarga = null;
      mostrarEstadoCarga(false);
    } else {
      if (mapa.hasLayer(nuevaCapa)) mapa.removeLayer(nuevaCapa);
    }
  });

  nuevaCapa.on('error', () => {
    clearTimeout(timeoutId);
    if (capaEnCarga === nuevaCapa) {
      if (nombreCapa !== 'latest') {
        const urlFallback = `https://realearth.ssec.wisc.edu/cgi-bin/mapserv?map=${productoActual}.map&service=WMS&version=1.3.0&request=GetMap&layers=latest&crs=EPSG:4326&bbox=${sur.toFixed(4)},${oeste.toFixed(4)},${norte.toFixed(4)},${este.toFixed(4)}&width=${ancho}&height=${alto}&format=image/png&transparent=true&_nocache=${Date.now()}`;
        const capaFallback = L.imageOverlay(urlFallback, coordenadasOverlay, {
          opacity: opacidadActual,
          zIndex: 200,
          interactive: false
        });
        capaEnCarga = capaFallback;
        capaFallback.on('load', () => {
          if (capaSatelite && mapa.hasLayer(capaSatelite)) mapa.removeLayer(capaSatelite);
          capaSatelite = capaFallback;
          capaEnCarga = null;
          mostrarEstadoCarga(false);
        });
        capaFallback.on('error', () => {
          capaEnCarga = null;
          mostrarEstadoCarga(false);
        });
        capaFallback.addTo(mapa);
      } else {
        capaEnCarga = null;
        mostrarEstadoCarga(false);
      }
    }
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

  // Restaurar producto satelital activo guardado
  opcionesCanal.forEach(opcion => {
    const inputRadio = opcion.querySelector('input[type="radio"]');
    if (inputRadio && inputRadio.value === productoActual) {
      opcionesCanal.forEach(item => item.classList.remove('active'));
      opcion.classList.add('active');
      inputRadio.checked = true;
    }

    opcion.addEventListener('click', () => {
      opcionesCanal.forEach(item => item.classList.remove('active'));
      opcion.classList.add('active');

      const radio = opcion.querySelector('input[type="radio"]');
      radio.checked = true;
      productoActual = radio.value;
      Memoria.guardar('producto_satelital_actual', productoActual);
      horaActualSatelite = null;

      actualizarLeyendaTermica(productoActual);
      cargarDatosSatelitales();
    });
  });

  // Restaurar y vincular deslizador de opacidad
  const deslizadorOpacidad = document.getElementById('opacity-slider');
  const visorOpacidad = document.getElementById('opacity-readout');
  if (deslizadorOpacidad) {
    const porcentajeOpacidad = Math.round(opacidadActual * 100);
    deslizadorOpacidad.value = porcentajeOpacidad;
    if (visorOpacidad) visorOpacidad.innerText = `${porcentajeOpacidad}%`;

    deslizadorOpacidad.addEventListener('input', (evento) => {
      opacidadActual = evento.target.value / 100;
      Memoria.guardar('opacidad_satelite', opacidadActual.toString());
      if (visorOpacidad) visorOpacidad.innerText = `${evento.target.value}%`;
      if (capaSatelite) {
        capaSatelite.setOpacity(opacidadActual);
      }
    });
  }

  // Restaurar y vincular capa base
  const toggleMapaBase = document.getElementById('toggle-basemap');
  if (toggleMapaBase) {
    toggleMapaBase.checked = Memoria.obtener('mapa_base_satelite', 'true') !== 'false';
    toggleMapaBase.addEventListener('change', (evento) => {
      Memoria.guardar('mapa_base_satelite', evento.target.checked ? 'true' : 'false');
      if (evento.target.checked) {
        mapa.removeLayer(capaCalles);
        mapa.addLayer(capaSateliteBase);
      } else {
        mapa.removeLayer(capaSateliteBase);
        mapa.addLayer(capaCalles);
      }
    });
  }

  // Restaurar y vincular límites nacionales
  const toggleLimites = document.getElementById('toggle-boundaries');
  if (toggleLimites) {
    toggleLimites.checked = Memoria.obtener('capa_limites_activa', 'true') !== 'false';
    toggleLimites.addEventListener('change', (evento) => {
      Memoria.guardar('capa_limites_activa', evento.target.checked ? 'true' : 'false');
      if (evento.target.checked) {
        mapa.addLayer(capaLimites);
      } else {
        mapa.removeLayer(capaLimites);
      }
    });
  }

  const toggleLeyenda = document.getElementById('toggle-legend');
  if (toggleLeyenda) {
    toggleLeyenda.checked = Memoria.obtener('leyenda_termica_visible', 'true') !== 'false';
    aplicarVisibilidadLeyenda(toggleLeyenda.checked);
    toggleLeyenda.addEventListener('change', (evento) => {
      aplicarVisibilidadLeyenda(evento.target.checked);
    });
  }

  const btnCloseLegend = document.getElementById('btn-close-legend');
  if (btnCloseLegend) {
    btnCloseLegend.addEventListener('click', (e) => {
      e.stopPropagation();
      if (toggleLeyenda) toggleLeyenda.checked = false;
      aplicarVisibilidadLeyenda(false);
    });
  }

  // Restaurar y vincular detector de rayos
  const toggleRayos = document.getElementById('toggle-lightning');
  if (toggleRayos) {
    toggleRayos.checked = detectorRayosActivo;
    if (!detectorRayosActivo) {
      const contadorCabecera = document.getElementById('header-lightning-count');
      const badgeContador = document.getElementById('lightning-count-badge');
      if (contadorCabecera) contadorCabecera.innerText = 'OFF';
      if (badgeContador) badgeContador.innerText = 'DESACTIVADO';
    }

    toggleRayos.addEventListener('change', (evento) => {
      detectorRayosActivo = evento.target.checked;
      Memoria.guardar('detector_rayos_activo', detectorRayosActivo ? 'true' : 'false');
      if (detectorRayosActivo) {
        if (!mapa.hasLayer(grupoRayos)) mapa.addLayer(grupoRayos);
        actualizarDetectorRayos();
      } else {
        if (mapa.hasLayer(grupoRayos)) mapa.removeLayer(grupoRayos);
        const contadorCabecera = document.getElementById('header-lightning-count');
        const badgeContador = document.getElementById('lightning-count-badge');
        if (contadorCabecera) contadorCabecera.innerText = 'OFF';
        if (badgeContador) badgeContador.innerText = 'DESACTIVADO';
      }
    });
  }

  // Restaurar y vincular alerta sonora
  const toggleSonido = document.getElementById('toggle-lightning-sound');
  if (toggleSonido) {
    toggleSonido.checked = alertaSonoraRayosActiva;
    toggleSonido.addEventListener('change', (evento) => {
      alertaSonoraRayosActiva = evento.target.checked;
      Memoria.guardar('alerta_sonora_rayos_activa', alertaSonoraRayosActiva ? 'true' : 'false');
      if (alertaSonoraRayosActiva) {
        reproducirSonidoRayo(true); // Tono de prueba
      }
    });
  }

  const botonLocate = document.getElementById('btn-locate');
  if (botonLocate) {
    botonLocate.addEventListener('click', () => {
      solicitarUbicacionUsuario(true);
    });
  }

  document.getElementById('btn-refresh').addEventListener('click', () => {
    tiempoProximaRecarga = Date.now() + cadenciaSegundos * 1000;
    actualizarVisorContador();
    ejecutarRecargaCompleta('manual');
  });

  // Configuración territorial jerárquica (Provincia y Ciudad / Sector)
  iniciarSelectorTerritorial();

  // Configuración de cadencia de autorecarga en consola lateral
  const botonesCadencia = document.querySelectorAll('#cadence-selector .seg-btn');
  botonesCadencia.forEach(boton => {
    const valorCadencia = parseInt(boton.getAttribute('data-cadence'), 10);
    if (valorCadencia === cadenciaSegundos) {
      botonesCadencia.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
    }

    boton.addEventListener('click', () => {
      cambiarCadencia(valorCadencia);
    });
  });

  // Clic directo en el contador de cadencia de la cabecera (ciclo rápido: 10m -> 5m -> 2m -> 10m)
  const itemCadenciaCabecera = document.getElementById('telemetry-cadence');
  if (itemCadenciaCabecera) {
    itemCadenciaCabecera.addEventListener('click', () => {
      const opciones = [600, 300, 120];
      const indiceActual = opciones.indexOf(cadenciaSegundos);
      const siguienteCadencia = opciones[(indiceActual + 1) % opciones.length];
      cambiarCadencia(siguienteCadencia);
    });
  }

  const botonToggleOpciones = document.getElementById('btn-toggle-sidebar');
  const botonCerrarOpciones = document.getElementById('btn-close-sidebar');

  if (botonToggleOpciones) {
    botonToggleOpciones.addEventListener('click', (e) => {
      e.stopPropagation();
      alternarConsolaOpciones();
    });
  }

  if (botonCerrarOpciones) {
    botonCerrarOpciones.addEventListener('click', () => {
      alternarConsolaOpciones(false);
    });
  }

  // Atajo de teclado: Escape para ocultar/mostrar opciones
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      alternarConsolaOpciones(false);
    }
  });

  // Restaurar estado en escritorio si el usuario lo dejó previamente cerrado
  if (window.innerWidth > 650 && localStorage.getItem('panel_opciones_visible') === 'false') {
    alternarConsolaOpciones(false);
  }
}

function iniciarSelectorTerritorial() {
  const selectProvincia = document.getElementById('select-provincia');
  const selectCiudad = document.getElementById('select-ciudad');
  const btnNacional = document.getElementById('btn-focus-national');
  const pillsRapidos = document.querySelectorAll('.t-pill[data-quick]');

  if (!selectProvincia || !selectCiudad) return;

  // Poblar combo de provincias
  selectProvincia.innerHTML = '';
  Object.keys(DIVISION_TERRITORIAL.provincias).forEach(claveProv => {
    const prov = DIVISION_TERRITORIAL.provincias[claveProv];
    const opcion = document.createElement('option');
    opcion.value = claveProv;
    opcion.textContent = prov.nombre;
    selectProvincia.appendChild(opcion);
  });

  function actualizarCiudades(claveProv, ciudadSeleccionadaId = null) {
    const prov = DIVISION_TERRITORIAL.provincias[claveProv];
    if (!prov) return;

    selectCiudad.innerHTML = '';
    prov.ciudades.forEach(ciu => {
      const opcion = document.createElement('option');
      opcion.value = ciu.id;
      opcion.textContent = ciu.nombre;
      selectCiudad.appendChild(opcion);
    });

    if (ciudadSeleccionadaId) {
      selectCiudad.value = ciudadSeleccionadaId;
    }
  }

  // Restaurar provincia y ciudad guardada o usar valores por defecto
  const provGuardada = Memoria.obtener('enfoque_provincia_guardada', 'guayas');
  const ciudadGuardada = Memoria.obtener('enfoque_ciudad_guardada', 'gye_centro');
  const esNacionalActivo = Memoria.obtener('enfoque_es_nacional', 'true') === 'true';

  if (DIVISION_TERRITORIAL.provincias[provGuardada]) {
    selectProvincia.value = provGuardada;
    actualizarCiudades(provGuardada, ciudadGuardada);
  } else {
    selectProvincia.value = 'guayas';
    actualizarCiudades('guayas', 'gye_centro');
  }

  if (btnNacional) {
    btnNacional.classList.toggle('active', esNacionalActivo);
  }

  // Evento: Cambio de provincia
  selectProvincia.addEventListener('change', () => {
    const claveProv = selectProvincia.value;
    actualizarCiudades(claveProv);

    Memoria.guardar('enfoque_provincia_guardada', claveProv);
    Memoria.guardar('enfoque_ciudad_guardada', selectCiudad.value);
    Memoria.guardar('enfoque_es_nacional', 'false');

    const prov = DIVISION_TERRITORIAL.provincias[claveProv];
    if (prov) {
      mapa.flyTo(prov.centro, prov.zoom, { duration: 1.0 });
    }

    if (btnNacional) btnNacional.classList.remove('active');
    pillsRapidos.forEach(p => p.classList.remove('active'));
  });

  // Evento: Cambio de ciudad / sector
  selectCiudad.addEventListener('change', () => {
    const claveProv = selectProvincia.value;
    const prov = DIVISION_TERRITORIAL.provincias[claveProv];
    if (!prov) return;

    const ciudadId = selectCiudad.value;
    Memoria.guardar('enfoque_provincia_guardada', claveProv);
    Memoria.guardar('enfoque_ciudad_guardada', ciudadId);
    Memoria.guardar('enfoque_es_nacional', 'false');

    const ciudadObj = prov.ciudades.find(c => c.id === ciudadId);
    if (ciudadObj) {
      mapa.flyTo(ciudadObj.centro, ciudadObj.zoom, { duration: 1.0 });
    }

    if (btnNacional) btnNacional.classList.remove('active');
    pillsRapidos.forEach(p => p.classList.remove('active'));

    // En móviles/tablets, cerrar la consola automáticamente para apreciar el vuelo al sector
    if (window.innerWidth <= 768) {
      alternarConsolaOpciones(false);
    }
  });

  // Evento: Botón Nacional (Ecuador Completo)
  if (btnNacional) {
    btnNacional.addEventListener('click', () => {
      btnNacional.classList.add('active');
      pillsRapidos.forEach(p => p.classList.remove('active'));
      Memoria.guardar('enfoque_es_nacional', 'true');
      mapa.flyTo(DIVISION_TERRITORIAL.pais.centro, DIVISION_TERRITORIAL.pais.zoom, { duration: 1.0 });

      if (window.innerWidth <= 768) {
        alternarConsolaOpciones(false);
      }
    });
  }

  // Evento: Accesos rápidos directos (Pills)
  pillsRapidos.forEach(pill => {
    pill.addEventListener('click', () => {
      const valor = pill.getAttribute('data-quick') || '';
      const [claveProv, ciudadId] = valor.split(':');
      if (DIVISION_TERRITORIAL.provincias[claveProv]) {
        selectProvincia.value = claveProv;
        actualizarCiudades(claveProv, ciudadId);

        Memoria.guardar('enfoque_provincia_guardada', claveProv);
        Memoria.guardar('enfoque_ciudad_guardada', ciudadId);
        Memoria.guardar('enfoque_es_nacional', 'false');

        const prov = DIVISION_TERRITORIAL.provincias[claveProv];
        const ciudadObj = prov.ciudades.find(c => c.id === ciudadId);
        if (ciudadObj) {
          mapa.flyTo(ciudadObj.centro, ciudadObj.zoom, { duration: 1.0 });
        }

        if (btnNacional) btnNacional.classList.remove('active');
        pillsRapidos.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        if (window.innerWidth <= 768) {
          alternarConsolaOpciones(false);
        }
      }
    });
  });
}

function alternarConsolaOpciones(forzarEstado = null) {
  const panel = document.getElementById('control-drawer');
  const botonToggle = document.getElementById('btn-toggle-sidebar');
  const appRoot = document.getElementById('app-root');
  if (!panel) return;

  const esMovil = window.innerWidth <= 768;

  if (esMovil) {
    const debeAbrir = forzarEstado !== null ? forzarEstado : !panel.classList.contains('open');
    if (debeAbrir) {
      panel.classList.add('open');
      panel.classList.remove('closed');
      if (botonToggle) botonToggle.classList.add('active');
      if (appRoot) appRoot.classList.add('drawer-open');
    } else {
      panel.classList.remove('open');
      if (botonToggle) botonToggle.classList.remove('active');
      if (appRoot) appRoot.classList.remove('drawer-open');
    }
  } else {
    // En escritorio: por defecto está abierto. La clase 'closed' lo oculta hacia la derecha.
    const estaCerrado = panel.classList.contains('closed');
    const debeAbrir = forzarEstado !== null ? forzarEstado : estaCerrado;
    if (debeAbrir) {
      panel.classList.remove('closed');
      if (botonToggle) botonToggle.classList.add('active');
      if (appRoot) appRoot.classList.add('drawer-open');
      localStorage.setItem('panel_opciones_visible', 'true');
    } else {
      panel.classList.add('closed');
      if (botonToggle) botonToggle.classList.remove('active');
      if (appRoot) appRoot.classList.remove('drawer-open');
      localStorage.setItem('panel_opciones_visible', 'false');
    }
  }
}

function aplicarVisibilidadLeyenda(visible) {
  const contenedor = document.getElementById('floating-legend');
  if (!contenedor) return;
  localStorage.setItem('leyenda_termica_visible', visible ? 'true' : 'false');
  contenedor.classList.toggle('hidden', !visible);
}

function actualizarLeyendaTermica(producto) {
  const contenedor = document.getElementById('floating-legend');
  const leyendaHabilitada = localStorage.getItem('leyenda_termica_visible') !== 'false';
  if (!leyendaHabilitada && contenedor) {
    contenedor.classList.add('hidden');
  }
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
  if (temporizadorRecarga) {
    clearInterval(temporizadorRecarga);
  }

  actualizarVisorContador();

  temporizadorRecarga = setInterval(() => {
    tickContadorRecarga();
  }, 1000);
}

function tickContadorRecarga() {
  const ahora = Date.now();
  const milisegundosRestantes = tiempoProximaRecarga - ahora;
  const segundos = Math.max(0, Math.ceil(milisegundosRestantes / 1000));

  actualizarVisorContador(segundos);

  if (segundos <= 0 && !recargaEnProgreso) {
    tiempoProximaRecarga = ahora + cadenciaSegundos * 1000;
    ejecutarRecargaCompleta('auto');
  }
}

function actualizarVisorContador(segundos = null) {
  if (segundos === null) {
    const milisegundosRestantes = tiempoProximaRecarga - Date.now();
    segundos = Math.max(0, Math.ceil(milisegundosRestantes / 1000));
  }
  const visorContador = document.getElementById('header-countdown');
  if (visorContador) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    visorContador.innerText = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  }
}

function cambiarCadencia(nuevosSegundos) {
  cadenciaSegundos = nuevosSegundos;
  localStorage.setItem('cadencia_segundos_goes19', nuevosSegundos.toString());
  tiempoProximaRecarga = Date.now() + cadenciaSegundos * 1000;
  actualizarVisorContador();

  const botonesCadencia = document.querySelectorAll('#cadence-selector .seg-btn');
  botonesCadencia.forEach(b => {
    if (parseInt(b.getAttribute('data-cadence'), 10) === cadenciaSegundos) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
}

// Reactivación inmediata cuando la pestaña vuelve a estar visible o se desbloquea el dispositivo
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const ahora = Date.now();
    if (ahora >= tiempoProximaRecarga) {
      tiempoProximaRecarga = ahora + cadenciaSegundos * 1000;
      ejecutarRecargaCompleta('visibilidad');
    } else {
      actualizarVisorContador();
    }
  }
});

async function ejecutarRecargaCompleta(origen = 'auto') {
  if (recargaEnProgreso) return;
  recargaEnProgreso = true;

  const botonRefresh = document.getElementById('btn-refresh');
  if (botonRefresh) botonRefresh.classList.add('rotating');

  mostrarEstadoCarga(true, origen === 'manual' ? 'Recarga forzada en curso...' : 'Sincronizando satélite y rayos...');

  try {
    // 1. Recargar datos satelitales (con timestamp dinámico)
    await cargarDatosSatelitales();

    // 2. Recargar detector de rayos (GLM)
    if (detectorRayosActivo) {
      await actualizarDetectorRayos();
    }
  } catch (error) {
    console.error('Error durante la recarga completa:', error);
  } finally {
    recargaEnProgreso = false;
    mostrarEstadoCarga(false);
    if (botonRefresh) {
      setTimeout(() => botonRefresh.classList.remove('rotating'), 600);
    }
  }
}

function mostrarEstadoCarga(cargando, mensaje = 'Sincronizando...') {
  const banner = document.getElementById('sync-banner');
  const etiqueta = document.getElementById('sync-label');
  if (banner) {
    if (mensaje && etiqueta) etiqueta.innerText = mensaje;
    banner.classList.toggle('active', cargando);
  }
}

function esDispositivoConGPS() {
  const ua = navigator.userAgent || '';
  // Detecta si el dispositivo es móvil o tablet (equipos con receptor GPS dedicado)
  const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua) ||
                  Boolean(navigator.userAgentData && navigator.userAgentData.mobile) ||
                  (Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 1) && window.innerWidth <= 1024);
  return esMovil;
}

function solicitarUbicacionUsuario(centrarAlEncontrar = false) {
  // En PC sin GPS o en segundo plano, NUNCA solicitar ubicación para evitar el diálogo de permisos
  if (!centrarAlEncontrar && !esDispositivoConGPS()) {
    return;
  }

  if (!navigator.geolocation) {
    if (centrarAlEncontrar) {
      alert('Tu navegador o dispositivo no soporta geolocalización.');
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
      coordenadasUsuarioActual = { lat, lon };

      // Guardar ubicación en memoria para no requerir permisos nuevamente
      Memoria.guardar('usuario_lat_guardada', lat.toString());
      Memoria.guardar('usuario_lon_guardada', lon.toString());
      Memoria.guardar('usuario_precision_guardada', precision.toString());

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

// ============================================================================
// DETECTOR DE RAYOS EN TIEMPO REAL (GOES GLM - Geostationary Lightning Mapper)
// ============================================================================

function iniciarDetectorRayos() {
  actualizarDetectorRayos();
  // Consulta automática de descargas cada 30 segundos
  if (temporizadorRayos) clearInterval(temporizadorRayos);
  temporizadorRayos = setInterval(() => {
    if (detectorRayosActivo) {
      actualizarDetectorRayos();
    }
  }, 30000);
}

async function actualizarDetectorRayos() {
  if (!detectorRayosActivo) return;

  try {
    const timestamp = Date.now();
    // 1. Obtener la última marca de tiempo disponible para el producto de rayos
    let paramTiempo = '';
    try {
      const respLatest = await fetch(`https://realearth.ssec.wisc.edu/api/latest?products=glmgrouppoints&_nocache=${timestamp}`, { cache: 'no-store' });
      const datosLatest = await respLatest.json();
      if (datosLatest && datosLatest.glmgrouppoints) {
        paramTiempo = `&time=${datosLatest.glmgrouppoints}`;
      }
    } catch (e) {
      // Usar última pasada por defecto si falla
    }

    const respuesta = await fetch(`https://realearth.ssec.wisc.edu/api/shapes?products=glmgrouppoints${paramTiempo}&_nocache=${timestamp}`, { cache: 'no-store' });
    if (!respuesta.ok) return;

    const datos = await respuesta.json();
    if (!datos || !datos.features) return;

    // Filtrar estrictamente descargas dentro del territorio de Ecuador (Continental + Galápagos)
    const rayosEcuador = datos.features.filter(f => {
      if (!f.geometry || !f.geometry.coordinates) return false;
      const [lon, lat] = f.geometry.coordinates;
      // Descartar valores no calibrados (-999 o fuera de rango)
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return false;
      return estaEnTerritorioEcuador(lon, lat);
    });

    renderizarRayos(rayosEcuador);
  } catch (error) {
    console.warn('No se pudo actualizar el detector de rayos:', error);
  }
}

function renderizarRayos(rayos) {
  if (!grupoRayos) return;
  grupoRayos.clearLayers();

  const total = rayos.length;
  const contadorCabecera = document.getElementById('header-lightning-count');
  const badgeContador = document.getElementById('lightning-count-badge');

  if (contadorCabecera) {
    contadorCabecera.innerText = total;
    if (total > 0) {
      contadorCabecera.style.textShadow = '0 0 10px rgba(245, 158, 11, 0.8)';
    } else {
      contadorCabecera.style.textShadow = 'none';
    }
  }

  if (badgeContador) {
    badgeContador.innerText = `${total} ACTIVOS`;
    if (total > 0) {
      badgeContador.className = 'pill-badge pill-red';
    } else {
      badgeContador.className = 'pill-badge pill-amber';
    }
  }

  if (total === 0) return;

  // Agrupamiento espacial inteligente (Clustering) de descargas para evitar columnas y superposiciones
  // Las descargas del sensor satelital ocurren en ráfagas sobre la misma celda convectiva (~0.18° ≈ 20 km)
  const clusters = [];
  rayos.forEach(rayo => {
    const [lon, lat] = rayo.geometry.coordinates;
    const prop = rayo.properties || {};

    let grupo = clusters.find(c => Math.hypot(c.lat - lat, c.lon - lon) < 0.18);
    if (!grupo) {
      clusters.push({
        lat,
        lon,
        count: 1,
        horaMasReciente: prop.RE_PRODUCT_TIME || '',
        puntos: [rayo]
      });
    } else {
      grupo.count++;
      grupo.puntos.push(rayo);
      // Promediar centro de gravedad del foco de tormenta
      grupo.lat = (grupo.lat * (grupo.count - 1) + lat) / grupo.count;
      grupo.lon = (grupo.lon * (grupo.count - 1) + lon) / grupo.count;
      if (prop.RE_PRODUCT_TIME && (!grupo.horaMasReciente || prop.RE_PRODUCT_TIME > grupo.horaMasReciente)) {
        grupo.horaMasReciente = prop.RE_PRODUCT_TIME;
      }
    }
  });

  let rayoCercanoDetectado = false;
  let distanciaMinimaKm = Infinity;

  clusters.forEach(cluster => {
    const lat = cluster.lat;
    const lon = cluster.lon;
    const count = cluster.count;

    const horaRayo = cluster.horaMasReciente && cluster.horaMasReciente.length >= 6
      ? `${cluster.horaMasReciente.slice(0, 2)}:${cluster.horaMasReciente.slice(2, 4)}:${cluster.horaMasReciente.slice(4, 6)} UTC`
      : 'Reciente';

    // Medir distancia al usuario si tenemos su ubicación
    let distanciaTexto = '';
    if (coordenadasUsuarioActual) {
      const distKm = calcularDistanciaKm(
        coordenadasUsuarioActual.lat,
        coordenadasUsuarioActual.lon,
        lat,
        lon
      );
      if (distKm < distanciaMinimaKm) distanciaMinimaKm = distKm;
      if (distKm <= 50) {
        rayoCercanoDetectado = true;
      }
      distanciaTexto = `<div style="margin-top: 4px; color: ${distKm <= 50 ? '#ef4444' : '#0284c7'}; font-weight: 600;">
        📍 A ${distKm.toFixed(1)} km de tu posición
      </div>`;
    }

    const badgeNumero = count > 1 ? `<span class="lightning-badge">${count}</span>` : '';
    const iconoCluster = L.divIcon({
      className: 'lightning-flash-container',
      html: `
        <div class="lightning-glow"></div>
        <div class="lightning-icon-box">
          <span class="lightning-bolt">⚡</span>
          ${badgeNumero}
        </div>
      `,
      iconSize: [36, 26],
      iconAnchor: [18, 13]
    });

    const marcador = L.marker([lat, lon], {
      icon: iconoCluster,
      zIndexOffset: 850
    });

    marcador.bindPopup(`
      <div style="font-family: var(--font-body); font-size: 0.8rem; color: #0f172a; min-width: 175px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; font-weight:700; color:#d97706; margin-bottom:4px;">
          <span>⚡ ${count > 1 ? `Foco Eléctrico (${count} rayos)` : 'Impacto GLM'}</span>
          <span style="font-size:0.68rem; background:#fef3c7; color:#b45309; padding:1px 5px; border-radius:4px; font-family:var(--font-mono);">${count}x</span>
        </div>
        <div style="font-size: 0.72rem; color: #475569; line-height: 1.4;">
          <b>Instrumento:</b> GOES-19 (GLM)<br>
          <b>Hora Detección:</b> ${horaRayo}<br>
          <span style="font-family: var(--font-mono); font-size: 0.7rem;">Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}</span>
        </div>
        ${distanciaTexto}
      </div>
    `);

    marcador.addTo(grupoRayos);
  });

  // Alerta sonora si hay rayos cercanos a menos de 50 km o si aumentó la actividad
  if (alertaSonoraRayosActiva && (rayoCercanoDetectado || (total > ultimoConteoRayos && total > 0))) {
    reproducirSonidoRayo(false);
  }

  ultimoConteoRayos = total;
}

// Cálculo esférico (Haversine) para medir distancia a rayos en kilómetros
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Síntesis Web Audio para alerta acústica de tormenta sin dependencias de audio externas
function reproducirSonidoRayo(esTonoPrueba = false) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const oscilador = ctx.createOscillator();
    const ganancia = ctx.createGain();

    oscilador.type = esTonoPrueba ? 'sine' : 'sawtooth';
    oscilador.frequency.setValueAtTime(esTonoPrueba ? 880 : 320, ctx.currentTime);
    oscilador.frequency.exponentialRampToValueAtTime(esTonoPrueba ? 440 : 120, ctx.currentTime + 0.35);

    ganancia.gain.setValueAtTime(0.2, ctx.currentTime);
    ganancia.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    oscilador.connect(ganancia);
    ganancia.connect(ctx.destination);

    oscilador.start();
    oscilador.stop(ctx.currentTime + 0.35);
  } catch (e) {
    console.warn('AudioContext no disponible o bloqueado por el navegador:', e);
  }
}

