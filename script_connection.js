const apiUrl = 'http://localhost:3006/prendas';

document.addEventListener('DOMContentLoaded', cargarprendas);

async function cargarprendas() {
    const response = await fetch(apiUrl);
    const prendas = await response.json();
    const tbody = document.querySelector('#prendasTable tbody');
    tbody.innerHTML = '';

    prendas.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td><input type="text" value="${producto.nombre}" id="nombre-${producto.id}"></td>
            <td><input type="number" value="${producto.precio}" id="precio-${producto.id}"></td>
            <td><input type="text" value="${producto.talla}" id="talla-${producto.id}"></td>
            <td>
                <img src="./uploads/${producto.imagen}" alt="Imagen" style="max-width: 150px; height: auto;">
            </td>
            <td>
                <input type="file" id="imagen-${producto.id}"> <!-- Campo para nueva imagen -->
                <p></p>
                <button onclick="actualizarProducto(${producto.id})">Actualizar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
}

// Función para agregar un nuevo producto (con imagen)
document.querySelector('#productoForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que el formulario recargue la página
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const talla = document.getElementById('talla').value;
    const imagen = document.getElementById('imagen').files[0]; // Obtenemos la imagen

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('talla', talla);
    formData.append('imagen', imagen); // Añadimos la imagen al FormData

    // Hacemos la solicitud POST para crear un producto con imagen
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData, // Enviamos el FormData
    });

    if (response.ok) {
        alert('Producto agregado con éxito');
        cargarprendas(); // Recargamos la lista de prendas
    } else {
        alert('Error al agregar el producto');
    }
});

async function actualizarProducto(id) {
    // Obtener los valores actualizados de los campos
    const nombre = document.getElementById(`nombre-${id}`).value;
    const precio = document.getElementById(`precio-${id}`).value;
    const talla = document.getElementById(`talla-${id}`).value;
    const imagen = document.getElementById(`imagen-${id}`) ? document.getElementById(`imagen-${id}`).files[0] : null; // Obtiene la nueva imagen si está presente

    // Validar que se ingresen valores válidos
    if (!nombre || !precio || !talla) {
        alert('Por favor, ingresa un nombre,precio y talla válidos');
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('talla', talla);

    if (imagen) {
        formData.append('imagen', imagen); // Añadir nueva imagen si existe
    }

    // Enviar la solicitud PUT al backend
    const response = await fetch(`http://localhost:3006/prendas/${id}`, {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
        alert('Producto actualizado');
        cargarprendas();  // Volver a cargar la lista de prendas
    } else {
        alert('Error al actualizar el producto');
    }
}



async function eliminarProducto(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Producto eliminado');
        cargarprendas(); // Recargamos la lista de prendas
    } else {
        alert('Error al eliminar el producto');
    }
}
