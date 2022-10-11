const mostrarProductos = (contenido)=> {
    const {id, nombre, descripcion, precio, imagen} = contenido
    return `<div class="col-sm-12 col-md-4 col-lg-4 py-3">
                <div class="card border-0 h-100">
                    <img src="${imagen}" class="card-img-top" alt="${nombre}">
                    <div class="card-body">
                        <h4 class="card-title">${nombre}</h4>
                        <p class="card-text">${descripcion}</p>
                        <h5>$${precio}</h5>
                        <a href="#" class="btn btn-sm btn-secondary button-card" id="agregar${id}">Agregar al carrito</a>
                    </div>
                </div>
            </div>`
}