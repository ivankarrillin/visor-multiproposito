
import '../css/styles.scss';
//openlayers
import './filtros'

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import { Style, Fill, Stroke} from 'ol/style';
import { boundingExtent } from 'ol/extent';
import { transformExtent } from 'ol/proj';
import Overlay from 'ol/Overlay';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Cluster from 'ol/source/Cluster';
import { Circle as CircleStyle, RegularShape, Text, Icon } from 'ol/style';
import { defaults as defaultControls } from 'ol/control.js';

import { get as getProjection } from 'ol/proj';



import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import geometria from '../json/bbox.json'

import Leyenda from './leyenda.js'
import Ruta from './ruta_optima.js'

import {DescargaInfo} from './descarga.js'

import { getZip } from './csvtojson'

import variables from './variables'

import Load from './util'

import servidor from './request'


import { Barras, Dona } from '../modulos/graficos'
import { jsPDF } from "jspdf";



var loading = ReactDOM.render(<Load visible={true} />, document.getElementById('loader'));

ReactDOM.render(<Leyenda />, document.getElementById('leyenda'));

ReactDOM.render(<DescargaInfo />, document.getElementById('descarga_datos'));



var imagenes = ['010108',
'010109',
'010125',
'010201',
'010202',
'010203',
'010204',
'010205',
'010206',
'010207',
'010208',
'010209',
'010210',
'010211',
'010212',
'010213',
'010214',
'010215',
'010216',
'010217',
'010218',
'010219',
'010220',
'010221',
'010222',
'010301',
'010302',
'010303',
'010401',
'010402',
'010403',
'010404',
'010405',
'010501',
'010502',
'010503',
'010504',
'010505',
'010506',
'010507',
'020101',
'020102',
'020103',
'020104',
'020105',
'020106',
'020107',
'020108',
'020109',
'020110',
'020111',
'020112',
'020113',
'020114',
'020115',
'020116',
'020117',
'020118',
'020119',
'020120',
'020121',
'020122',
'020123',
'020124',
'020125',
'020126',
'020127',
'020130',
'020201',
'020202',
'020203',
'020204',
'020205',
'020301',
'020302',
'020303',
'020304',
'020401',
'020402',
'020403',
'020404',
'020405',
'020406',
'020407',
'020408',
'020501',
'020502',
'020601',
'020602',
'020603',
'020604',
'020605',
'020607',
'020608',
'020609',
'020610',
'020701',
'020702',
'020703',
'020704',
'020705',
'020706',
'020707',
'020708',
'020709',
'020710',
'020711',
'020712',
'020713',
'020801',
'020802',
'020803',
'020804',
'020805',
'020806',
'020807',
'020810',
'020901',
'020902',
'020903',
'020904',
'020905',
'020906',
'021001',
'021003',
'021004',
'021006',
'021008',
'021009',
'021010',
'021011',
'021012',
'021101',
'021102',
'021103',
'021104',
'021105',
'021106',
'021201',
'021202',
'021203',
'021204',
'021205',
'021301',
'021302',
'021304',
'021401',
'021402',
'021403',
'021404',
'021501',
'021502',
'021503',
'021504',
'021505',
'030101',
'030102',
'030103',
'0030104a'
];






var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

var token = "pk.eyJ1IjoiaXZhbjEyMzQ1Njc4IiwiYSI6ImNqc2ZkOTNtMjA0emgzeXQ3N2ppMng4dXAifQ.2k-OLO6Do2AoH5GLOWt-xw"

var base = new TileLayer({
  source: new XYZ({
    url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=' + token,
    crossOrigin: "Anonymous"
  })
});
const map = new Map({
  target: 'mapa',
  controls: [],
  overlays: [overlay],
  layers: [
    base
  ],
  view: new View({
    center: transform([-74.1083125, 4.663437], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12
  })
});





var key = "pk.eyJ1IjoiaXZhbjEyMzQ1Njc4IiwiYSI6ImNqc2ZkOTNtMjA0emgzeXQ3N2ppMng4dXAifQ.2k-OLO6Do2AoH5GLOWt-xw"



var resolutions = [];
for (var i = 0; i <= 8; ++i) {
  resolutions.push(156543.03392804097 / Math.pow(2, i * 2));
}
// Calculation of tile urls for zoom levels 1, 3, 5, 7, 9, 11, 13, 15.
function tileUrlFunction(tileCoord) {

  return (
    'https://api.mapbox.com/v4/ivan12345678.9t8jbmu0/{z}/{x}/{y}.vector.pbf?sku=101h6wrNEIHUF&access_token=' +
    key
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}


function tileUrlFunction_seccion(tileCoord) {

  return (
    servidor.getUrl() + 'seccion/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}

function tileUrlFunction_sector(tileCoord) {

  return (
    servidor.getUrl() + 'sector/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}


function tileUrlFunction_mpio(tileCoord) {

  return (
    servidor.getUrl() + 'mpio/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}
function tileUrlFunction_depto(tileCoord) {

  return (
    servidor.getUrl() + 'depto/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}

function tileUrlFunction_toponimia(tileCoord) {

  return (
    servidor.getUrl() + 'mvt/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}

var start = 'LA ISLA';
var stop = 'NEIVA';

function tileUrlFunction_ruta(tileCoord) {

  return (
    servidor.getUrl() + 'ruta/'+start+'/'+stop+'/'+'{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}

const mz_source = new VectorTileSource({
  format: new MVT(),
  tileGrid: new TileGrid({
    extent: getProjection('EPSG:900913').getExtent(),
    resolutions: resolutions,
    tileSize: 512,
  }),
  tileUrlFunction: tileUrlFunction,
});


const sector_source = new VectorTileSource({
  format: new MVT(),
  tileGrid: new TileGrid({
    extent: getProjection('EPSG:900913').getExtent(),
    resolutions: resolutions,
    tileSize: 512,
  }),
  tileUrlFunction: tileUrlFunction_sector,
});


const seccion_source = new VectorTileSource({
  format: new MVT(),
  tileGrid: new TileGrid({
    extent: getProjection('EPSG:900913').getExtent(),
    resolutions: resolutions,
    tileSize: 512,
  }),
  tileUrlFunction: tileUrlFunction_seccion,
});


const topo_source = new VectorTileSource({
  format: new MVT(),
  tileGrid: new TileGrid({
    extent: getProjection('EPSG:900913').getExtent(),
    resolutions: resolutions,
    tileSize: 512,
  }),
  tileUrlFunction: tileUrlFunction_toponimia,
});

const ruta_source = new VectorTileSource({
  format: new MVT(),
  url:servidor.getUrl() + 'ruta/'+start+'/'+stop+'/'+'{x}/{y}/{z}.pbf'
});


const mz_uso_viv = new VectorTileLayer({
  source: mz_source,
  zIndex: 3
});

const mz_uso_mix = new VectorTileLayer({
  source: mz_source,
  zIndex: 2
});
const mz_uso_res = new VectorTileLayer({
  source: mz_source,
  zIndex: 1
});


const dif_catastro_censo = new VectorTileLayer({
  source: mz_source,
  zIndex: 4
});


const razon_unidades_seccion = new VectorTileLayer({
  source: seccion_source,
  zIndex: 5
});
const razon_unidades_manzana = new VectorTileLayer({
  source: mz_source,
  zIndex: 1
});

const topo = new VectorTileLayer({
  source: topo_source,
  zIndex: 10,
  minZoom: 15,
  maxZoom: 18,
  

  style: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({color: '#666666'}),
      stroke: new Stroke({color: '#bada55', width: 1}),
    })
  }),


});

map.addLayer(topo);
topo.set('id', 'topo')

const ruta_optima = new VectorTileLayer({
  source: ruta_source,
  zIndex: 100,
  style:new Style({
    stroke: new Stroke({
      color: 'red',
      lineDash: [4],
      width: 3
    })
  })
});

map.addLayer(ruta_optima);
ruta_optima.set('id', 'ruta_optima')

ReactDOM.render(<Ruta ruta={ruta_optima} map={map}/>, document.getElementById('ruta'));

var iconos= new Array();
for (i = 0; i < imagenes.length; i++) {
  
  var imagen =  new Icon( ({
    size: [40, 40],
    scale: 0.5,
    anchor: [0.5, 20],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: './img/icons/'+imagenes[i]+'.png'
  }))
  
  
  iconos.push(imagen)

}





topo.setStyle(function (feature) {

  var cod = feature.get("cod");
  
  var indice=imagenes.indexOf(cod)
  
  return new Style({
    image: iconos[indice],
    text: new Text({
      text: feature.get("descripcion"),
      offsetY: 15,
      font: "12px Calibri,sans-serif",
      stroke: new Stroke({
        color: '#ffff',
        width: 3,
      }),
    })
  })


})






map.addLayer(mz_uso_res);
mz_uso_res.set('id', 'mz_uso_res')
mz_uso_res.setVisible(false)
map.addLayer(mz_uso_mix);
mz_uso_mix.set('id', 'mz_uso_mix')
mz_uso_mix.setVisible(false)
map.addLayer(mz_uso_viv);
mz_uso_viv.set('id', 'mz_uso_viv')
mz_uso_viv.setVisible(false)

map.addLayer(dif_catastro_censo);
dif_catastro_censo.set('id', 'dif_catastro_censo')
dif_catastro_censo.setVisible(false)

map.addLayer(razon_unidades_seccion);
razon_unidades_seccion.set('id', 'razon_unidades_seccion')

map.addLayer(razon_unidades_manzana);
razon_unidades_manzana.set('id', 'razon_unidades_manzana')

const mpio_source = new VectorTileSource({
  format: new MVT(),
  tileGrid: new TileGrid({
    extent: getProjection('EPSG:900913').getExtent(),
    resolutions: resolutions,
    tileSize: 512,
  }),
  tileUrlFunction: tileUrlFunction_mpio,
});


const mpio = new VectorTileLayer({
  source: mpio_source,
  zIndex: 10
});

map.addLayer(mpio);
mpio.set('id', 'mpio')
mpio.setVisible(false)

const depto_source = new VectorTileSource({
  format: new MVT(),
  tileGrid: new TileGrid({
    extent: getProjection('EPSG:900913').getExtent(),
    resolutions: resolutions,
    tileSize: 512,
  }),
  tileUrlFunction: tileUrlFunction_depto,
});

const depto = new VectorTileLayer({
  source: depto_source,
  zIndex: 15
});

map.addLayer(depto);
depto.set('id', 'depto')
depto.setVisible(false)


////

map.on("pointermove", function (evt) {
  var hit = map.hasFeatureAtPixel(evt.pixel);
  map.getTargetElement().style.cursor = (hit ? 'pointer' : '');
});

const sector_vivienda = new VectorTileLayer({
  source: sector_source,
});
const sector_mixto = new VectorTileLayer({
  source: sector_source,
});
const sector_residencial = new VectorTileLayer({
  source: sector_source,
});
const sector_hot = new VectorTileLayer({
  source: sector_source,
});

map.addLayer(sector_vivienda);
sector_vivienda.set('id', 'sector_vivienda')
sector_vivienda.setVisible(false)
map.addLayer(sector_mixto);
sector_mixto.set('id', 'sector_mixto')
sector_mixto.setVisible(false)

map.addLayer(sector_residencial);
sector_residencial.set('id', 'sector_residencial')
sector_residencial.setVisible(false)

map.addLayer(sector_hot);
sector_hot.set('id', 'sector_hot')
sector_hot.setVisible(false)



mpio.setStyle(function (feature) {

  return new Style({
    stroke: new Stroke({
      color: '#015592',
      width: 0.5,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0)'
    })
  });
});

depto.setStyle(function (feature) {

  return new Style({
    stroke: new Stroke({
      color: '#349C00',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0)'
    })
  });
});



var newdata_mz = []
var newdata_sect = []
var newdata_mz_hot = []
var newdata_se_hot = []
var newdata_razon_unidades_seccion = []
var newdata_razon_unidades_manzana = []

async function getDatos() {
  newdata_mz = await getZip('manzana');
  newdata_sect = await getZip('sector');
  newdata_mz_hot = await getZip('hot_spot');
  newdata_se_hot = await getZip('sector_dif_censal');

  newdata_razon_unidades_seccion=await getZip('razon_unidades_seccion1');
  newdata_razon_unidades_manzana = await getZip('razon_unidades_manzana1');
  
  layerStyle();

}

getDatos()




const getColor = (valor, var_array, var_colores) => {

  var array = []
  var colores = []

  array = var_array;
  colores = var_colores;


  var filter = array.map((e, i) => {
    return e < valor ? i : false;
  })

  return colores[Math.max(...filter)]

}


const iterador = (info, feature, columna, pk, array, colores) => {

  const key = feature.get(pk);

  var color = 'transparent'
  if (typeof info[key] !== "undefined") {
    //console.log(newdata_mz[key])

    color = getColor(parseFloat(info[key].row[columna]), array, colores)

  }
  return color;
}




const layerStyle = () => {


  const estilo = (color) => {



    if (color!=='transparent') {
      return new Style({
        fill: new Fill({
          color: color
        }),
        stroke: new Stroke({
          color: '#535353',
          width: 0.3,
        }),
      });
    } else {
      return new Style({
        fill: new Fill({
          color: color
        })
      });
    }
    


  }

  sector_hot.setStyle(function (feature) {

    var color = iterador(newdata_se_hot, feature, 1, 'setr_ccnct', variables.hot_spot.rangos, variables.hot_spot.colores);

    return estilo(color)
  });

  dif_catastro_censo.setStyle(function (feature) {

    var color = iterador(newdata_mz_hot, feature, 4, 'cod_dane', variables.hot_spot.rangos, variables.hot_spot.colores);

    return estilo(color)
  });

  sector_vivienda.setStyle(function (feature) {

    var color = iterador(newdata_sect, feature, 4, 'setr_ccnct', variables.col4.rangos, variables.col4.colores);

    return estilo(color)
  });
  sector_mixto.setStyle(function (feature) {

    var color = iterador(newdata_sect, feature, 5, 'setr_ccnct', variables.col5.rangos, variables.col5.colores);

    return estilo(color)
  });
  sector_residencial.setStyle(function (feature) {

    var color = iterador(newdata_sect, feature, 6, 'setr_ccnct', variables.col6.rangos, variables.col6.colores);

    return estilo(color)
  });

  mz_uso_viv.setStyle(function (feature) {

    var color = iterador(newdata_mz, feature, 4, 'cod_dane', variables.col4.rangos, variables.col4.colores);

    return estilo(color)
  });
  mz_uso_mix.setStyle(function (feature) {

    var color = iterador(newdata_mz, feature, 5, 'cod_dane', variables.col5.rangos, variables.col5.colores);

    return estilo(color)
  });
  mz_uso_res.setStyle(function (feature) {

    var color = iterador(newdata_mz, feature, 6, 'cod_dane', variables.col6.rangos, variables.col6.colores);

    return estilo(color)
  });


  razon_unidades_seccion.setStyle(function (feature) {

    var color = iterador(newdata_razon_unidades_seccion, feature, 4, 'secr_ccnct', variables.razon_unidades.rangos, variables.razon_unidades.colores);

    return estilo(color)
  });

  razon_unidades_manzana.setStyle(function (feature) {

    var color = iterador(newdata_razon_unidades_manzana, feature, 5, 'cod_dane', variables.razon_unidades.rangos, variables.razon_unidades.colores);

    return estilo(color)
  });








  ReactDOM.unmountComponentAtNode(document.getElementById('loader'))
  document.getElementById('background').style.display="none"

  mz_source.on('tileloadend', function () {
    


  });


}




// zoom to municipio 
const sel_municipio = document.querySelector('#municipio');
sel_municipio.addEventListener('change', (event) => {

  var value = sel_municipio.value;

  var boundary = geometria[value]

  var ext = boundingExtent([[boundary[0][0], boundary[0][1]], [boundary[1][0], boundary[1][1]]]);
  ext = transformExtent(ext, 'EPSG:4326', 'EPSG:3857');

  map.getView().fit(ext, map.getSize());


});





// Popup al hacer click sobre una capa
map.on('singleclick', function (evt) {
  var coordinate = evt.coordinate;

  var mensaje = "";
  var id = "";

  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    id = layer.get('id')
    return feature;

  }, {
    hitTolerance: 2
  });
 

  if (id == "mz_uso_viv") {
    var info = newdata_mz[feature.get("cod_dane")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Conteo: " + info[1] + "</p><p>% : " + info[4] + "</p>"
  } else if (id == "mz_uso_mix") {
    var info = newdata_mz[feature.get("cod_dane")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Conteo: " + info[2] + "</p><p>% : " + info[5] + "</p>"
  } else if (id == "mz_uso_res") {
    var info = newdata_mz[feature.get("cod_dane")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Conteo: " + info[3] + "</p><p>% : " + info[6] + "</p>"
  }
  else if (id == "dif_catastro_censo") {
    var info = newdata_mz_hot[feature.get("cod_dane")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>diferencia %: " + info[4] + "</p>"
  }
  else if (id == "sector_vivienda") {
    var info = newdata_sect[feature.get("setr_ccnct")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Conteo: " + info[1] + "</p><p>% : " + info[4] + "</p>"
  }
  else if (id == "sector_mixto") {
    var info = newdata_sect[feature.get("setr_ccnct")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Conteo: " + info[2] + "</p><p>% : " + info[5] + "</p>"
  }
  else if (id == "sector_residencial") {
    var info = newdata_sect[feature.get("setr_ccnct")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Conteo: " + info[3] + "</p><p>% : " + info[6] + "</p>"
  }
  else if (id == "sector_hot") {
    var info = newdata_se_hot[feature.get("setr_ccnct")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>diferencia %: " + info[1] + "</p>"
  }
  else if (id == "razon_unidades_seccion") {
    var info = newdata_razon_unidades_seccion[feature.get("secr_ccnct")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Razón: " + info[4] + "</p>"+
    "</p><p>Lotes: " + info[1] + "</p>"+
    "</p><p>Predios: " + info[2] + "</p>"+
    "</p><p>Unidades censales: " + info[3] + "</p>"
  }
  else if (id == "razon_unidades_manzana") {
    var info = newdata_razon_unidades_manzana[feature.get("cod_dane")].row
    mensaje = "<p>Cod DANE: " + info[0] + "</p><p>Razón: " + info[5] + "</p>"+
    "</p><p>Lotes: " + info[2] + "</p>"+
    "</p><p>Predios: " + info[3] + "</p>"+
    "</p><p>Unidades censales: " + info[4] + "</p>"+
    "</p><p>Total de viviendas: " + info[1] + "</p>"

  } else if (id == "topo") {
    
    mensaje = `<p>Cód: ${feature.get("cod")}</p><p>Descripción: ${feature.get("descripcion")}</p>`
  }


  else if (id == "mpio") {
    var info = feature.get("nombre_mpio")
    var info1 = feature.get("nombre_depto")

    mensaje = "<p>Municipio: " + info + "</p>" + "<p>Depto: " + info1 + "</p>"
  } else if (id == "depto") {
    var info = feature.get("nombre")
    mensaje = "<p>Depto: " + info + "</p>"
  }



  if (mensaje != "") {
    content.innerHTML = '<p>' + mensaje + '</p>';
    overlay.setPosition(coordinate);
  }


});



// Generación de la impresión del PDF 
var dims = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148],
};

var exportButton = document.getElementById('export-pdf');

exportButton.addEventListener(
  'click',
  function () {
    exportButton.disabled = true;
    document.body.style.cursor = 'progress';

    var format = document.getElementById('format').value;
    var resolution = document.getElementById('resolution').value;
    var dim = dims[format];
    var width = Math.round((dim[0] * resolution) / 25.4);
    var height = Math.round((dim[1] * resolution) / 25.4);
    var size = map.getSize();
    var viewResolution = map.getView().getResolution();

    map.once('rendercomplete', function () {
      var mapCanvas = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      var mapContext = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            var transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            var matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );


      var pdf = new jsPDF('landscape', undefined, format);
      pdf.addImage(
        mapCanvas.toDataURL('image/jpeg'),
        'JPEG',
        5,
        20,
        dim[0] - 10,
        dim[1] - 30
      );

      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(0, 0, 0);
      pdf.setTextColor(0, 0, 0)

      pdf.rect(5, 20, 30, 60, 'F');


      var radio = document.querySelector('input[name="radio"]:checked').getAttribute("layer");

      var data=variables[variables[radio]]

   
      
      pdf.setFontSize(14);
      pdf.text(5, 15, data.titulo);

      pdf.text(5, 25, "Leyenda");
      pdf.setFontSize(12);
      var j = 30;

      for (i = 0; i < data.colores.length; i++){
        
        pdf.setFillColor(data.colores[i]);

        pdf.rect(5, j, 5, 5, 'F');
        pdf.text(15, j+5, data.labels[i]);

        j = j + 10;
      }


      pdf.save('map.pdf');
      // Reset original map size
      map.setSize(size);
      map.getView().setResolution(viewResolution);
      exportButton.disabled = false;
      document.body.style.cursor = 'auto';
    });

    // Set print size
    var printSize = [width, height];
    map.setSize(printSize);
    var scaling = Math.min(width / size[0], height / size[1]);
    map.getView().setResolution(viewResolution / scaling);
  },
  false
);



// cambio del mapa base
var radios = document.querySelectorAll('input[type=radio][name=radio1]');
radios.forEach(radio => radio.addEventListener('change', () => {
  const mapa = radio.value;
  if (mapa == "gris") {
    base.setSource(
      new XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token=' + token,
        crossOrigin: "Anonymous"
      })
    )
  } else if (mapa == "dark") {
    base.setSource(
      new XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=' + token,
        crossOrigin: "Anonymous"
      })
    )
  } else {
    base.setSource(
      new XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=' + token,
        crossOrigin: "Anonymous"
      })
    )
  }

}

))


var grafico = document.getElementById('grupo-graficos')

var info_graph = null;


var data = variables['razon_unidades']
  
info_graph = data;

map.on('moveend', onMoveEnd);

//visibilidad de las capas de los layer
var check_depto = document.getElementsByClassName('layer');

var prev_layer = "razon_unidades_seccion";

const myFunction = (e) => {

  const check = ["depto", "mpio"]


 var layer=e.target.getAttribute("layer");

  if (e.target.checked && check.indexOf(layer)<0) {
    
    eval(prev_layer).setVisible(false)
    
    document.getElementById(prev_layer).style.display = "none";

    sector_vivienda.setVisible(false)
    sector_mixto.setVisible(false)
    sector_residencial.setVisible(false)
    sector_hot.setVisible(false)
    dif_catastro_censo.setVisible(false)
    razon_unidades_seccion.setVisible(false)
    razon_unidades_manzana.setVisible(false)


    prev_layer = layer;

    eval(layer).setVisible(true)
    document.getElementById(prev_layer).style.display = "block";


    if (layer == "mz_uso_viv") {
      sector_vivienda.setVisible(true)
    }
    else if (layer == "mz_uso_mix") {
      sector_mixto.setVisible(true)
    }
    else if (layer== "mz_uso_res") {
      sector_residencial.setVisible(true)
    }else if (layer == "dif_catastro_censo") {
      sector_hot.setVisible(true)
    }else if (layer == "razon_unidades_seccion") {
      razon_unidades_manzana.setVisible(true)
    }

    //seccion de graficos
    
    console.log(layer)

    var data = variables[variables[layer]]
  
    info_graph = data;

    console.log(data)

  
    map.on('moveend', onMoveEnd);

    var center = map.getView().getCenter();
    var resolution = map.getView().getResolution();
    map.getView().setCenter([center[0] + 10*resolution, center[1] + 10*resolution]);
  







  } else  {
    if (e.target.checked) {
      eval(layer).setVisible(true)
    } else {
      eval(layer).setVisible(false)
    }
    
  }



}

for (var i = 0; i < check_depto.length; i++) {
  check_depto[i].addEventListener('change', e => myFunction(e), false);
}


//cambio de transparencia
var slider = document.getElementsByClassName('slider');

const changeSlider = (e) => {
  const transparencia = e.target.value / 10
  eval(e.target.name).setOpacity(transparencia)
  if (e.target.name == "mz_uso_viv") {
    sector_vivienda.setOpacity(transparencia)
  }
  else if (e.target.name == "mz_uso_mix") {
    sector_mixto.setOpacity(transparencia)
  }
  else if (e.target.name == "mz_uso_res") {
    sector_residencial.setOpacity(transparencia)
  }else if (e.target.name == "dif_catastro_censo") {
    sector_hot.setOpacity(transparencia)
  }else if (e.target.name == "razon_unidades_seccion") {
    razon_unidades_manzana.setOpacity(transparencia)
  }


}
for (var i = 0; i < slider.length; i++) {
  slider[i].addEventListener('change', e => changeSlider(e), false);
}



// actualización de las estadisticas


const getEstadistica = (valor, rangos) => {

  var array = []

  array = rangos

  var filter = array.map((e, i) => {
    return e < valor ? i : false;
  })

  return Math.max(...filter)

}






function onMoveEnd(evt) {
  
  evt.stopPropagation();
  evt.preventDefault();

  var info = info_graph;

  if (evt.map.getView().getZoom() > 12) {



    var map = evt.map;
    var extent = map.getView().calculateExtent(map.getSize());


    var elementos = mz_source.getFeaturesInExtent(extent);

    elementos = getUniqueFeatures(elementos, 'cod_dane');


    var est1 = new Array(info.rangos.length-1).fill(0);


    var radio = document.querySelector('input[name="radio"]:checked').getAttribute("layer");
    var array_datos;

    if (radio=="dif_catastro_censo") {
      array_datos=newdata_mz_hot
    } else if (radio=="razon_unidades_seccion") {
      array_datos=newdata_razon_unidades_manzana

    } else {
      array_datos=newdata_mz
    }

    if (elementos.length < 50000 && elementos.length >0 ) {

      grafico.style.display = "block";



      elementos.forEach(function (feature) {

        try {
          
          var data = array_datos[feature.get("cod_dane")];

          var a = data.row[info.columna]

          var i1 = getEstadistica(a, info.rangos);

        est1[i1] = est1[i1] + 1
        }
        catch (err) {
          
        }
        


      });

      

      var donita = null;
      var barrita = null;
          
/*
      console.log(info.titulo)
      console.log(variables.series)
      console.log(info.colores)
      console.log(info.labels)

      
      variables.series=[0,0,0,0,0,0,0],
      est1=[0,0,0,16,0,0,0]
      info.colores= ['#25318E', '#6872C6', '#C0C3D6', '#FFF', '#E1AE4E','#E1814E','#E14E4E']
      info.labels=['<20%', '20-50%', '50-75%', '75-90%', '>90%','s','l']
      info.titulo="Diferencia porcentual del censo vs catastrohkjhj"
      */

      barrita= ReactDOM.render(<Barras titulo={info.titulo} series={variables.series} colors={info.colores} labels={info.labels} />, document.getElementById('grafico'));
      
      donita = ReactDOM.render(<Dona titulo="Ejemplo de gráfico" series={variables.series} colors={info.colores} labels={info.labels} />, document.getElementById('grafico3'));
      
      barrita.setState({ series: [{ data: est1 }],options:{colors:info.colores,xaxis:{categories:info.labels},title:{text:info.titulo}}})

      donita.setState({ series: est1,options:{colors:info.colores,labels:info.labels} })

    } else {
      grafico.style.display = "none";

    }




  } else {
    grafico.style.display = "none";

  }

}





function getUniqueFeatures(array, comparatorProperty) {
  var existingFeatureKeys = {};
  var uniqueFeatures = array.filter(function (el) {

    if (existingFeatureKeys[el.get(comparatorProperty)]) {
      return false;
    } else {
      existingFeatureKeys[el.get(comparatorProperty)] = true;
      return true;
    }
  });

  return uniqueFeatures;
}



const mq = window.matchMedia("(max-width: 700px)");

if (mq.matches) {
  document.getElementById('ham').checked = false;


  var ham = document.getElementById('ham');
  ham.addEventListener('change', e => {

    if (ham.checked) {
      document.getElementById('leyenda').style.visibility = "hidden";
    } else {
      document.getElementById('leyenda').style.visibility = "visible";

    }

  }

    , false);


} else {
  document.getElementById('ham').checked = true;
}


var buttons = document.querySelectorAll(".toggle-button");
var modal = document.querySelector("#modal");


[].forEach.call(buttons, function(button) {
  button.addEventListener("click", function() {
    modal.classList.toggle("off");
  })
});

