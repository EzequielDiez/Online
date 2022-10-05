const Productos = [
    {
        id:001,
        nombre:'Template "Médico"',
        descripcion: 'Contiene 15 plantillas editables en Canva para mejorar la estética del feed de tu emprendimiento',
        precio: '6.000',
        imagen: '../img/templates/template001.png',
    },
    {
        id:002,
        nombre:'Template "Computación"',
        descripcion: 'Contiene 15 plantillas editables en Canva para mejorar la estética del feed de tu emprendimiento',
        precio: '6.000',
        imagen: '../img/templates/template002.png'
    },
    {
        id:003,
        nombre:'Template "Decoración"',
        descripcion: 'Contiene 15 plantillas editables en Canva para mejorar la estética del feed de tu emprendimiento',
        precio: '6.000',
        imagen: '../img/templates/template001.png'
    },
    {
        id:004,
        nombre:'Template "Deporte"',
        descripcion: 'Contiene 15 plantillas editables en Canva para mejorar la estética del feed de tu emprendimiento',
        precio: '6.000',
        imagen: '../img/templates/template002.png'
    },
    {
        id:005,
        nombre:'Template "Indumentaria"',
        descripcion: 'Contiene 15 plantillas editables en Canva para mejorar la estética del feed de tu emprendimiento',
        precio: '6.000',
        imagen: '../img/templates/template001.png'
    },
    {
        id:006,
        nombre:'Template "Gastronomía"',
        descripcion: 'Contiene 15 plantillas editables en Canva para mejorar la estética del feed de tu emprendimiento',
        precio: '6.000',
        imagen: '../img/templates/template002.png'
    }
]

let Carrito = []

const CargarProductos = (Productos) => {
    let sectioncards = document.querySelector('#sectioncards')
    for (const Producto of Productos) {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-sm-12 col-md-4 col-lg-4 py-3');
        div.innerHTML = `
            <div class="card border-0 h-100">
                <img src="${Producto.imagen}" class="card-img-top" alt="${Producto.nombre}">
                <div class="card-body">
                    <h4 class="card-title">${Producto.nombre}</h4>
                    <p class="card-text">${Producto.descripcion}</p>
                    <h5>$${Producto.precio}</h5>
                    <a href="#" class="btn btn-sm btn-secondary button-card" id="agregar${Producto.id}">Agregar al carrito</a>
                </div>
            </div>
        `;
        sectioncards.appendChild(div)

        const boton = document.querySelector(`#agregar${Producto.id}`)
            boton.addEventListener('click', () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1000
                  }).then(function(confirmed) {
                    if(confirmed) {
                        agregarAlCarrito(Producto.id)
                    }
                  });
            })
    }
}

const agregarAlCarrito = (prodId) => {

    const existe = Carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = Carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const prod = Productos.find(producto => producto.id === prodId)
        Carrito.push(prod)
        localStorage.setItem("Carrito", JSON.stringify(Carrito))
    }    
}


function recuperarCarrito(){
    if (localStorage.getItem("Carrito")) {
        Carrito = JSON.parse(localStorage.getItem("Carrito"))
    }
}

CargarProductos(Productos)

recuperarCarrito()
