const inputNombre = document.querySelector("#inputNombre")
const inputEmail = document.querySelector("#inputEmail")
const inputCelular = document.querySelector("#inputCelular")
const inputMensaje = document.querySelector("#inputMensaje")
const btnEnviar = document.querySelector("#btnEnviar")

function guardarDatos() {
    const formulario = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        celular: inputCelular.value,
        mensaje: inputMensaje.mensaje
    }
    localStorage.setItem("formulario", JSON.stringify(formulario))
}

btnEnviar.addEventListener("click", guardarDatos)

function recuperarDatos() {
    let recuperarFormulario = localStorage.getItem("formulario", JSON.parse(recuperarFormulario))
}

