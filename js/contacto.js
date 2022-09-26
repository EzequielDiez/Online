const inputNombre = document.querySelector("#inputNombre")
const inputEmail = document.querySelector("#inputEmail")
const inputCelular = document.querySelector("#inputCelular")
const inputMensaje = document.querySelector("#inputMensaje")
const btnEnviar = document.querySelector("#btnEnviar")

function guardarDatos() {
    localStorage.setItem("Nombre", inputNombre.value)
    localStorage.setItem("Email", inputEmail.value)
    localStorage.setItem("Celular", inputCelular.value)
    localStorage.setItem("Mensaje", inputMensaje.value)
}

btnEnviar.addEventListener("click", guardarDatos)

function recuperarDatos(){
    inputNombre.value = localStorage.getItem("Nombre")
    inputEmail.value = localStorage.getItem("Email")
    inputCelular.value = localStorage.getItem("Celular")
    inputMensaje.value = localStorage.getItem("Mensaje")
}