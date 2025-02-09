import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

//Agregar a la base de datos

let productos = [
    { id: 1, nombre: 'Left for Dead 2', precio: 20 },
    { id: 2, nombre: 'The forest', precio: 15 },
    { id: 3, nombre: 'Son of the forest', precio: 25 },
    { id: 4, nombre: 'Human fall flat', precio: 10 },
    { id: 5, nombre: 'Overwatch', precio: 30 },
];

//Codigos de estado de respuesta

// Respuestas informativas (100–199),
// Respuestas satisfactorias (200–299),
// Redirecciones (300–399),
// Errores de los clientes (400–499),
// y errores de los servidores (500–599).


app.get('/', (req, res) => {
    res.send('Comprobando que el servidor funciona');
});

//Listar todos los productos
app.get('/productos', (req, res) => {
    console.log("Listar productos");
    res.status(200).json(productos);
});

//Listar un elemento por su id

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    console.log("Listar producto por el id", id);
    //Busqueda en la base de datos
    const producto = productos.find((producto) => producto.id == parseInt(id));
    res.status(200).json(producto);
});

//Eliminar un producto por su id

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    console.log("Eliminar el producto con id: ", id);
    //Busqueda en la base de datos ----- !==
    productos = productos.filter((producto) => producto.id !== parseInt(id));
    res.status(200).json(productos);
});

//Actualizar un producto por su id

app.patch('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const { precio } = req.body;
    console.log("Actualizar el producto con id: ", id);
    //Busqueda en la base de datos
    const producto = productos.find((producto) => producto.id == parseInt(id));
    //Actualizacion en la base de datos
    producto.nombre = nombre;
    producto.precio = precio;
    res.status(200).json(producto);
});

//Agregar un producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    console.log("Agregar producto", nuevoProducto);
    //Insercion a la base de datos
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.listen(port, () => {
    console.log(`Iniciando servidor http://localhost:${port}`);
});

//INICIAR EL SERVIDOR
//node --watch servidor_02.js 
