// Importamos Express, el middleware 'multer' para manejar la carga de archivos, y la conexión a la base de datos
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const connection = require('../db/connection'); // Importamos la conexión a la base de datos

// Configuración de multer para guardar imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'uploads')); // Ruta correcta para guardar imágenes en 'uploads'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Asignamos un nombre único a la imagen
    }
});
const upload = multer({ storage: storage });

// Ruta para obtener todos los prendas
router.get('/', (req, res) => {
    connection.query('SELECT * FROM prendas', (err, results) => {
        if (err) return res.status(500).send(err); // Si hay error, enviamos el mensaje de error
        res.json(results); // Enviamos los resultados en formato JSON
    });
});

// Ruta para crear un nuevo producto (con imagen)
router.post('/', upload.single('imagen'), (req, res) => {
    const { nombre, precio, talla } = req.body;
    const imagen = req.file ? req.file.filename : null; // Si hay una imagen, tomamos el nombre del archivo
    connection.query('INSERT INTO prendas (nombre, precio, talla, imagen) VALUES (?, ?, ?, ?)', [nombre, precio, talla, imagen], (err, result) => {
        if (err) return res.status(500).send(err); // Si hay error, enviamos el mensaje de error
        res.json({ id: result.insertId, nombre, precio, talla, imagen }); // Devolvemos el producto insertado
    });
});

// Ruta para actualizar un producto existente (con imagen)
router.put('/:id', upload.single('imagen'), (req, res) => {
    const { id } = req.params;
    const { nombre, precio, talla } = req.body;
    const imagen = req.file ? req.file.filename : null;  // Si se sube una nueva imagen, la procesamos

    let query = 'UPDATE prendas SET nombre = ?, precio = ?, talla = ?';
    let values = [nombre, precio, talla];

    if (imagen) {
        query += ', imagen = ?';  // Si hay una nueva imagen, la añadimos
        values.push(imagen);
    }

    query += ' WHERE id = ?';
    values.push(id);

    connection.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Producto actualizado');
    });
});

// Ruta para eliminar un producto por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT imagen FROM prendas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);

        // Si el producto tiene imagen, la eliminamos de la carpeta 'uploads'
        const imagen = result[0]?.imagen;
        if (imagen) {
            const fs = require('fs');
            const pathToDelete = path.join(__dirname, '..', '..', 'uploads', imagen);

            // Eliminamos el archivo de la carpeta 'uploads'
            fs.unlink(pathToDelete, (err) => {
                if (err) console.error('Error al eliminar la imagen:', err);
            });
        }

        // Procedemos a eliminar el producto de la base de datos
        connection.query('DELETE FROM prendas WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).send(err);
            res.send('Producto eliminado');
        });
    });
});

// Exportamos las rutas
module.exports = router;
