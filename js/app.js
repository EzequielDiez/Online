const Productos = []
const Carrito = JSON.parse(localStorage.getItem('Carrito')) || [];

const URL = "../js/productos.json"

const cantidadCarrito = () =>
{
    const label = document.querySelector('#cantidadCarrito');
    const total = Carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if(total > 0)
    {
        label.innerText = total;
    }
}

const notificationapp = (text) =>
{
    Toastify({
        text: text,
        className: "info",
        duration: 2000,
        style: {
          background: "#bba79e",
          color:"#ffffff"
        }
      }).showToast();
}


const cargarEventos = () => {
    let botones = document.querySelectorAll('.button-card')
    for (const boton of botones) 
    {
        boton.addEventListener('click', ()=>{
            let existe = Carrito.find(element => element.id == boton.id);
            if(existe)
            {
                // esta en el carrito
                existe.cantidad++;
                localStorage.setItem('Carrito', JSON.stringify(Carrito));
                notificationapp('El producto ya existe en su carrito, se agregó 1 unidad.')
            }
            else
            {
                let Producto = Productos.find(element => element.id == boton.id);
                if(Producto)
                {
                    let nuevoProducto = {
                        id:Producto.id,
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

const recuperarData = async () => {
    debugger
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
