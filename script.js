// Seleccionamos los elementos del DOM
const btnOpen = document.getElementById('btn_open');
const menuSide = document.getElementById('menu_side');
const body = document.getElementById('body');

// Añadimos un evento al botón para abrir/cerrar el menú
btnOpen.addEventListener('click', () => {
  // Alternamos las clases que mueven el cuerpo y el menú
  body.classList.toggle('body_move');
  menuSide.classList.toggle('menu__side_move');
});

// Ajuste para que el menú colapse automáticamente en pantallas pequeñas
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    body.classList.remove('body_move');
    menuSide.classList.remove('menu__side_move');
  }
});
//flecha para mostrar menu 
const botones = document.querySelectorAll('.button');
botones.forEach(boton => {
  boton.addEventListener('click', () => {
    //obtener id de la caja 
    const targetId = boton.getAttribute('data-target');
    //selecionar caja correspondiente
    const caja = document.getElementById(targetId);
    // eliminar clase opcity de la clase de todos los elementos de la caja
    if (caja){
      const elementosOpacity = caja.querySelectorAll('.grid-item-slider-small');
      // Alternar visibilidad de los elementos
      elementosOpacity.forEach(elemento => {
        //verificar si tiene clase opacity para cambiarla 
        if (elemento.classList.contains('opacity')){
          elemento.classList.remove('opacity');
        } else {
          elemento.classList.add('opacity')
        }
      });
      // alterna el estado "activado" del boton
      boton.classList.toggle('activado')
    }
  });
});
//Configuracion botones de tallas
document.querySelectorAll('.talla').forEach(button => {
  button.addEventListener('click', function() {
      if (!this.classList.contains('agotada')) {
          document.querySelectorAll('.talla').forEach(btn => btn.classList.remove('seleccionada'));
          this.classList.add('seleccionada');
      }
  });
});
//Configuracion de añadir al carro
        const cantidad = document.getElementById('cantidad');
        const decrementar = document.getElementById('decrementar');
        const incrementar = document.getElementById('incrementar');

        decrementar.addEventListener('click', () => {
            if (cantidad.value > 1) {
                cantidad.value = parseInt(cantidad.value) - 1;
            }
        });

        incrementar.addEventListener('click', () => {
            if (cantidad.value < 10) {
                cantidad.value = parseInt(cantidad.value) + 1;
            }
        });

        cantidad.addEventListener('change', () => {
            cantidad.value = Math.max(1, Math.min(10, parseInt(cantidad.value) || 1));
        });

        document.querySelector('.comprar').addEventListener('click', () => {
            const tallaSeleccionada = document.querySelector('.talla.seleccionada');
            if (tallaSeleccionada) {
                alert(`Has añadido ${cantidad.value} unidad(es) de talla ${tallaSeleccionada.textContent} al carrito.`);
            } else {
                alert('Por favor, selecciona una talla antes de añadir al carrito.');
            }
        });