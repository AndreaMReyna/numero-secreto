let numeroSecreto = 0; // Variable para almacenar el número secreto que el usuario debe adivinar
let intentos = 0; // Contador de intentos realizados por el usuario
let listaNumerosSorteados = []; // Lista para almacenar los números que ya han sido sorteados
const numeroMaximo = 10; // Número máximo que el usuario puede adivinar

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    const elementoHTML = document.querySelector(elemento); // Selecciona el elemento HTML usando el selector proporcionado
    if (elementoHTML) { // Verifica si el elemento existe
        elementoHTML.innerHTML = texto; // Asigna el texto al elemento
    }
}

// Función para verificar si el intento del usuario es correcto
function verificarIntento() {
    const numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value, 10); // Obtiene el valor ingresado por el usuario y lo convierte a entero
    
    // Verifica si el número ingresado es válido
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número válido entre 1 y ${numeroMaximo}.`); // Mensaje de error si el número no es válido
        return; // Sale de la función si el número no es válido
    }
    
    // Comprueba si el número ingresado es igual al número secreto
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`); // Mensaje de acierto
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita el botón de reinicio
        
        // Mostrar el popup de acierto
        document.getElementById('popup').style.display = 'flex'; // Muestra el popup
    } else {
        // Indica si el número secreto es mayor o menor
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++; // Incrementa el contador de intentos
        limpiarCaja(); // Limpia el campo de entrada
    }
}

// Función para limpiar el campo de entrada
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; // Limpia el valor del campo de entrada
}

// Función para generar un nuevo número secreto
function generarNumeroSecreto() {
    let numeroGenerado; // Variable para almacenar el número generado
    
    // Verifica si ya se han sorteado todos los números posibles
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles'); // Mensaje de error si ya se agotaron los números
        return; // Sale de la función
    }

    // Genera un número aleatorio único entre 1 y el número máximo
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // Genera un número aleatorio
    } while (listaNumerosSorteados.includes(numeroGenerado)); // Repite si el número ya ha sido sorteado
    
    listaNumerosSorteados.push(numeroGenerado); // Agrega el número generado a la lista de sorteados
    return numeroGenerado; // Retorna el número generado
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!'); // Establece el título del juego
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`); // Mensaje de instrucciones
    numeroSecreto = generarNumeroSecreto(); // Genera un nuevo número secreto
    intentos = 1; // Reinicia el contador de intentos
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); // Desactiva el botón de reinicio
    
    // Oculta la imagen de acierto al reiniciar el juego
    document.getElementById('imagenAcierto').style.display = 'none';
    console.log(numeroSecreto); // Muestra el número secreto en la consola para pruebas
}

// Función para reiniciar el juego
function reiniciarJuego() {
    limpiarCaja(); // Limpia el campo de entrada
    condicionesIniciales(); // Establece las condiciones iniciales nuevamente
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); // Desactiva el botón de reinicio
}

// Llama a la función de condiciones iniciales al cargar el script
condicionesIniciales();

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none'; // Oculta el popup al cerrarlo
}
