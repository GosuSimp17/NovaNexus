// Lista de productos
const productos = [
    { nombre: "Botines Elegantes para Mujer con Tacón Bloque", imagen: "img/zapatos_mujer.webp", precio: "90.99", destacado: true },
    { nombre: "Guantes de cuero PU impermeables unisex", imagen: "img/guantes.webp", precio: "22.50", destacado: true },
    { nombre: "Zapatos de running transpirables", imagen: "img/zapatillas.webp", precio: "80.75", destacado: false },
    { nombre: "Vestido de mujer con capucha con estampado de alfabeto", imagen: "img/vestido_capucha.webp", precio: "85.20", destacado: false },
    { nombre: "Billetera Con Cremallera Multifuncional De Moda Retro", imagen: "img/billetera.webp", precio: "27.36", destacado: true },
    { nombre: "Anillo de gato y corazón de estilo bohemio vintage", imagen: "img/gato_anillo.webp", precio: "2.33", destacado: false },
    { nombre: "Anillo De Aleación Con Forma De Pata De Gato Adorable", imagen: "img/anillopatagato.webp", precio: "4.10", destacado: false },
    { nombre: "Llavero Luminoso De 12 Constelaciones", imagen: "img/llavero_luminoso.webp", precio: "3.29", destacado: false },
    { nombre: "Chaqueta Softshell con capucha multibolsillos", imagen: "img/chaqueta.webp", precio: "64.15", destacado: false },
    { nombre: "Zapatos Formales de Vestir", imagen: "img/zapatos.webp", precio: "89.50", destacado: false },
    { nombre: "Chaleco de cintura de vestir de un solo pecho de espiga retro", imagen: "img/chaleco.webp", precio: "54.25", destacado: false },
    { nombre: "Sombrero De Ala Ancha Para El Sol De Verano", imagen: "img/sombrero_woman.webp", precio: "16.75", destacado: true },
];

const carrito = [];

// Función para cargar productos
function cargarProductos() {
    const productosGrid = document.getElementById("productosGrid");
    const productosDestacados = document.getElementById("productosDestacados");

    productos.forEach((producto) => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");
        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <h3 class="producto-nombre">${producto.nombre}</h3>
            <p class="producto-precio">S/ ${producto.precio}</p>
            <button class="btn-comprar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>
        `;
        productosGrid.appendChild(productoCard); 

        if (producto.destacado) {
            const destacadoCard = productoCard.cloneNode(true);
            productosDestacados.appendChild(destacadoCard);
        }
    });
}

// Función para añadir producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio: parseFloat(precio) });
    document.getElementById("cantidadCarrito").innerText = carrito.length;
}

// Eventos del carrito
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-comprar")) {
        const { nombre, precio } = e.target.dataset;
        agregarAlCarrito(nombre, precio);
    }
});

// Buscar productos
document.getElementById("busquedaInput").addEventListener("input", (e) => {
    const filtro = e.target.value.toLowerCase();
    const productosGrid = document.getElementById("productosGrid");
    productosGrid.innerHTML = "";

    productos
        .filter((p) => p.nombre.toLowerCase().includes(filtro))
        .forEach((producto) => {
            const productoCard = document.createElement("div");
            productoCard.classList.add("producto-card");
            productoCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">S/ ${producto.precio}</p>
                <button class="btn-comprar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>
            `;
            productosGrid.appendChild(productoCard);
        });
});

// Mostrar carrito
document.getElementById("verCarrito").addEventListener("click", () => {
    const modal = document.getElementById("modalCarrito");
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    modal.style.display = "block";
    listaCarrito.innerHTML = carrito
        .map((item) => `<p>${item.nombre} - S/ ${item.precio.toFixed(2)}</p>`)
        .join("");
    totalCarrito.innerText = `Total: S/ ${carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2)}`;
});

// Cerrar modal
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("modalCarrito").style.display = "none";
});

// Vaciar carrito
document.getElementById("vaciarCarrito").addEventListener("click", () => {
    carrito.length = 0;
    document.getElementById("cantidadCarrito").innerText = "0";
    document.getElementById("listaCarrito").innerHTML = "";
    document.getElementById("totalCarrito").innerText = "";
});

// Inicializar productos
document.addEventListener("DOMContentLoaded", cargarProductos);
