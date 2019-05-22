var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var paleta = document.getElementById('paleta');
var grilla_pixeles = document.getElementById('grilla-pixeles');
var indicador = document.getElementById('indicador-de-color');
var $copiar_color = $('#copiar-color');
var mouseDown;
var copiando = false;

var generarPaletaColores = function(){  
  for (var i=0; i < nombreColores.length; i++){
    var div_color = document.createElement('div');
    div_color.style.backgroundColor = nombreColores[i];
    div_color.className = "color-paleta";
    div_color.addEventListener('click', actualizarIndicadorColor);
    paleta.appendChild(div_color);
  }
}

var generarGrillaPixeles = function() {
  for(var i=0; i < 1750; i++){
    var pixel = document.createElement('div');    
    pixel.addEventListener('click', pintarPixelOCopiarColor);
    pixel.addEventListener('mouseover',pintarConMouseOver);
    grilla_pixeles.appendChild(pixel);
  }
}

var actualizarIndicadorColor = function (e){    
  indicador.style.backgroundColor = e.target.style.backgroundColor;
}

var pintarPixel = function(e){
  e.target.style.backgroundColor = indicador.style.backgroundColor;
}

var copiarColor = function(e){
  indicador.style.backgroundColor = e.target.style.backgroundColor;
  $copiar_color.css({"background-color" : e.target.style.backgroundColor})
  $copiar_color.css({"cursor": "pointer"})
  copiando = false;
  grilla_pixeles.classList.remove('cursor-copiar');
  grilla_pixeles.classList.add('cursor-personalizado');
}

var pintarPixelOCopiarColor = function(e){
  if(!copiando){
    pintarPixel(e);    
  } else {
    copiarColor(e);    
  }  
}

var esMouseDown = function(){
  mouseDown = true;
  console.log("esMouseDown = " + mouseDown);
}

var esMouseUp = function(){
  mouseDown = false;
  console.log("esMouseDown = " + mouseDown);
}

var pintarConMouseOver = function (e){
  if(mouseDown){
    pintarPixelOCopiarColor(e);
  }
}

var borrarTodo = function(){
  $("#grilla-pixeles").children().animate({"background-color":"white"}, 1000);
}


// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    indicador.style.backgroundColor = colorActual;

  })
);

generarPaletaColores();
generarGrillaPixeles();

document.addEventListener('mousedown',esMouseDown);
document.addEventListener('mouseup',esMouseUp);

$("#borrar").click(borrarTodo);

$(".imgs").children().click(function(e){
  cargarSuperheroe(window[e.target.id])
});

$("#guardar").click(guardarPixelArt);

$copiar_color.click(function(e){
  $(this).css({"cursor": "url(./img/pick7.png) 0 27,  auto"});
  grilla_pixeles.classList.remove('cursor-personalizado');
  grilla_pixeles.classList.add('cursor-copiar');
  copiando = true;
});