
const carrito = JSON.parse(localStorage.getItem("Carrito")) || []
let tabla = document.querySelector("tbody")
    carrito.forEach(prod => {
    let fila =  `<tr>
                    <td data-th="Producto">
                        <div class="row">
                            <div class="col-sm-2"><img src="${prod.imagen}" alt="..." class="img-responsive"/></div>
                            <div class="col-sm-10">
                                <h4 class="nomargin">${prod.nombre}</h4>
                                <p>${prod.descripcion}</p>
                            </div>
                        </div>
                    </td>
                    <td data-th="Precio">$${prod.precio}</td>
                    <td data-th="Cantidad">
                        <input type="number" class="form-control text-center" min="1" value="${prod.cantidad}"/>
                    </td>
                    <td data-th="Subtotal" class="text-center">$${prod.subtotal}</td>
                    <td class="actions" data-th="">
                        <button class="btn btn-sm"><i class="fa fa-refresh"></i></button>
                        <button onclick="eliminarDelCarrito(${prod.id})" class="btn btn-sm"><i class="fa fa-trash-o"></i></button>								
                    </td>
                </tr>`
                tabla.innerHTML += fila
    })

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
}