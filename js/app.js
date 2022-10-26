const Productos = []
const Carrito = JSON.parse(localStorage.getItem('Carrito')) || [];

const URL = "../js/productos.json"

//Indica cantidad de productos que existe en el carrito en navbar.
const cantidadCarrito = () => {
    const label = document.querySelector('#cantidadCarrito');
    const total = Carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (total > 0) {
        label.innerText = total;
    }
}

//Formato cuando se agrega producto al carrito.
const notificationapp = (text) => {
    Toastify({
        text: text,
        className: "info",
        duration: 2000,
        style: {
            background: "#bba79e",
            color: "#ffffff"
        }
    }).showToast();
}

//Función para botones de las cards y agregar al carrito.
const cargarEventos = () => {
    let botones = document.querySelectorAll('.button-card')
    for (const boton of botones) {
        boton.addEventListener('click', () => {
            let existe = Carrito.find(element => element.id == boton.id);
            if (existe) {
                // Si el producto existe suma 1 unidad al carrito.
                existe.cantidad++;
                localStorage.setItem('Carrito', JSON.stringify(Carrito));
                notificationapp('El producto ya existe en su carrito, se agregó 1 unidad.')
            } else {
                // Si el producto no existe lo agrega al carrito.
                let Producto = Productos.find(element => element.id == boton.id);
                if (Producto) {
                    let nuevoProducto = {
                        id: Producto.id,
                        nombre: Producto.nombre,
                        precio: Producto.precio,
                        descripcion: Producto.descripcion,
                        imagen: Producto.imagen,
                        cantidad: 1
                    }
                    Carrito.push(nuevoProducto);
                    localStorage.setItem('Carrito', JSON.stringify(Carrito));
                    notificationapp('El producto ha sido agregado al carrito');
                }
            }
            cantidadCarrito(Carrito);
        })
    }
}

//Función para cargar HTML de productos a la Tienda.
const cargarProductos = (Productos) => {
    let sectionCards = document.querySelector('#sectioncards')
    for (const Producto of Productos) {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-sm-12 col-md-4 col-lg-4 py-3')
        div.innerHTML =
            `<div class="card border-0 h-100">
                            <img src="${Producto.imagen}" class="card-img-top" alt="${Producto.nombre}">
                            <div class="card-body">
                                <h4 class="card-title">${Producto.nombre}</h4>
                                <p class="card-text">${Producto.descripcion}</p>
                                <h5>$${Producto.precio}</h5>
                                <button class="btn btn-sm btn-secondary button-card" id="${Producto.id}">Agregar al carrito</a>
                            </div>
                        </div>`
        sectionCards.appendChild(div)
    }
    cargarEventos()
}

//Función para recuperar productos de archivo JSON. 
const recuperarData = async () => {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        cargarProductos(data)
        Productos.push(...data)
        cantidadCarrito()
    } catch (error) {
        console.log(error)
    }
}

recuperarData()