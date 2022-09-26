function recuperoCarrito() {
    let carrito = JSON.parse(localStorage.getItem("Carrito"))
    let tabla = document.querySelector("tbody")
        carrito.forEach(prod => {
            let fila = `<tr>
                            <td>${prod.nombre}</td>
                            <td>${prod.precio}</td>
                        </tr>`
                        tabla.innerHTML += fila
        });
}

recuperoCarrito()