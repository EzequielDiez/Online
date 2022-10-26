// Formato para producto eliminado.
const notification = (text, color) => {
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

// Función finalizar compra.
const loadEvents = (total) => {
    const botonComprar = document.querySelector('#realizarCompra');
    botonComprar.addEventListener('click', () => {
        localStorage.removeItem('Carrito'); // Eliminar Carrito una vez realizada la compra.
        if (total == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos en el carrito',
                footer: '<a href="./shop.html">Ir a la Tienda</a>'
              })
        } else {
            Swal.fire({
                title: '¿Deseas realizar la compra?',
                text: "Si continúas no podrás cancelar la compra",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#bba79e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Su compra ha sido realizada',
                    'Nos pondremos en contacto a la brevedad',
                    'success'
                  )
                    setTimeout(() => {
                window.location.href = "../index.html"; //Redirección al Inicio despues de 3".
            }, 3000);
                }
              })
        }
    });

    //Función eliminar producto del carrito.
    const eliminarProducto = document.querySelectorAll('.eliminarProducto');
    for (const boton of eliminarProducto) {
        boton.addEventListener('click', () => {
            const nuevoCarrito = carritoCompras.filter(element => element.id != boton.id);
            localStorage.setItem('Carrito', JSON.stringify(nuevoCarrito)); //Carga de nuevo carrito sin el producto eliminado.
            notification('Producto eliminado con éxito!');
            setTimeout(() => {
                location.reload(true); // Refresh página
            }, 1000);
        })
    }
}


//Función para actualizar el carrito cada vez que se agrega nuevo producto.
const actualizarCarrito = (Carrito) => {
    let sectionCarrito = document.querySelector(".sectioncarrito")
    let container = document.querySelector("containercarrito")
    if (container) {
        container.parentNode.removeChild(container)
    }
    let div = document.createElement('div')
    div.setAttribute('id', 'containercarrito')
    let tablacarrito = document.querySelector("tbody")
    for (const Producto of Carrito) {
        let fila = `<tr>
                        <td data-th="Producto">
                            <div class="row">
                                <div class="col-sm-2"><img src="${Producto.imagen}" alt="..." class="img-responsive"/></div>
                                <div class="col-sm-10">
                                    <h4 class="nomargin">${Producto.nombre}</h4>
                                    <p>${Producto.descripcion}</p>
                                </div>
                            </div>
                        </td>
                        <td data-th="Precio">$${Producto.precio}</td>
                        <td data-th="Cantidad"><button class ="btn btn-sm disminuirUnidad"><i class="fa-solid fa-minus"></i></button> ${Producto.cantidad} <button class ="btn btn-sm agregarUnidad"><i class="fa-solid fa-plus"></i></button> </td>
                        <td data-th="Subtotal" class="text-center">$${Producto.subtotal}</td>
                        <td class="actions" data-th="">
                            <button class="btn btn-sm"><i class="fa fa-refresh"></i></button>
                            <button class="btn btn-sm eliminarProducto"  id="${Producto.id}"><i class="fa fa-trash-o"></i></button>								
                        </td>
                    </tr>`
        tablacarrito.innerHTML += fila
    }
    //Funcion para suma total del carrito
    const total = Carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    let totalCarrito = document.querySelector("#totalcarrito")
    totalCarrito.innerHTML = "TOTAL $" + total.toFixed(2)

    sectionCarrito.appendChild(div);
    loadEvents(total);
}

const carritoCompras = JSON.parse(localStorage.getItem('Carrito')) || [];
actualizarCarrito(carritoCompras);