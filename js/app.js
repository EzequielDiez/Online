
const URL = "../js/productos.json"

let Carrito = []
let Productos = []
let contenidoHTML = ""
const sectioncards = document.querySelector('#sectioncards')

const cargarProductos = async () => {
    fetch (URL)
        .then(response => response.json())
        .then(data => Productos = data)
        .then(Productos => Productos.forEach(Producto => {
            contenidoHTML += mostrarProductos(Producto)
        }))
        .catch(error => {
            console.error("Se ha producido un error.", error)
        })
        .finally(()=> sectioncards.innerHTML = contenidoHTML)
}

document.addEventListener("DOMContentLoaded", async ()=> {
    const espero = await cargarProductos()
          activarBoton()
})

const activarBoton = ()=> {
    let botones = document.querySelector(`#agregar${id}`)
        botones.forEach(boton => boton.addEventListener("click", (e)=> {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1000
              }).then(function(confirmed) {
                if(confirmed) {
                    agregarAlCarrito(e)
                }
              })
        }))
}


/*         const boton = document.querySelector(`#agregar${id}`)
            boton.addEventListener('click', () => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1000
                  }).then(function(confirmed) {
                    if(confirmed) {
                        agregarAlCarrito(id)
                    }
                  });
            }) */

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

cargarProductos()

recuperarCarrito()
