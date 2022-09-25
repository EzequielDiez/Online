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

const CargarEventos = () =>{
    let buttons = document.querySelectorAll('.button-card')
    for (const button of buttons) {
        button.addEventListener('click', ()=>{
            const prod = Productos.find(producto => producto.id == button.id)
            console.log('prod object: ', prod)
        })
    }
}

const CargarProductos = (Productos) => {
    let sectioncards = document.querySelector('#sectioncards')
    debugger
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
                    <a href="#" class="btn btn-sm btn-secondary button-card" id="${Producto.id}">Agregar al carrito</a>
                </div>
            </div>
        `;
        sectioncards.appendChild(div)
    }
    CargarEventos();
}

CargarProductos(Productos)