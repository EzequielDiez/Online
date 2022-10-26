const notification = (text, color) =>
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

const loadEvents = (total) =>
{   
    // checkout functionality
    const botonComprar = document.querySelector('#realizarCompra');
    botonComprar.addEventListener('click', ()=>{
        localStorage.removeItem('Carrito'); // remove cart
        // location.reload(true); // reload page
        if(total > 0)
        {
            const mensaje = 'Compra finalizada su total es de $' + total;
            notification(mensaje, "#00a650");
            setTimeout(() => {
                window.location.href = "../index.html"; // reditect to index
            }, 3000);
        }
        else
        {
            const mensaje = 'No tenes productos en el carrito!';
            notification(mensaje, "	#ff0000");
        }
    });

    // delete item
    const eliminarProducto = document.querySelectorAll('.eliminarProducto');
    for (const boton of eliminarProducto)
    {   
        boton.addEventListener('click', ()=>{
            const nuevoCarrito = carritoCompras.filter(element => element.id != boton.id);
            localStorage.setItem('Carrito', JSON.stringify(nuevoCarrito)); // set new cart in storage
              notification('Producto eliminado con éxito!');
              setTimeout(() => {
                  location.reload(true); // reload page
              }, 1000);
        })
    }
}



const actualizarCarrito = (Carrito) =>
{
    let sectionCarrito = document.querySelector(".sectioncarrito")
    let container = document.querySelector("containercarrito")
    if(container){
        container.parentNode.removeChild(container)
    }
    let div = document.createElement('div')
    div.setAttribute('id','containercarrito')
        let tablacarrito = document.querySelector("tbody")
            for (const Producto of Carrito) {
            let fila =  `<tr>
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
    const total = Carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    let totalCarrito = document.querySelector("#totalcarrito")
        totalCarrito.innerHTML = "TOTAL $" + total.toFixed(3)

    sectionCarrito.appendChild(div);
    loadEvents(total);
}

const carritoCompras = JSON.parse(localStorage.getItem('Carrito')) || [];
actualizarCarrito(carritoCompras);