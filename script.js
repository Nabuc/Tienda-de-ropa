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

