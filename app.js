function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion__enlace');
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView( {
                behavior: 'smooth',
            });
        });
    })
}

scrollNav();

// Constructores
function Divisa(monto, divisa) {
    this.monto = monto;
    this.divisa = divisa;
}

function UI(){}

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('DIV');
    if (tipo === "error") {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje');
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#cotizador');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    
    setTimeout (() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, cotizacion) => {
    const {monto, divisa} = cotizacion;

    let textoDivisa;

    switch(divisa) {
        case '1':
            textoDivisa = 'Dólares';
            break;
        case '2':
            textoDivisa = 'Euros';
            break;
        case '3':
            textoDivisa = 'Libras Esterlinas';
            break;
    }

    // Crear el resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class="header"> Tu Resumen </p>
    <div id="resultado__grid">
        <p class="font-bold"> Monto: <span>$${monto} MXN</span> </p>
        <p class="font-bold"> Divisa: <span>${textoDivisa} </span> </p>
        <p class="font-bold"> Total: <span>${total} ${textoDivisa}</span> </p>
    </div>
    `;
    const resultadoDiv = document.querySelector('#resultado');

    // Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout (() => {
        spinner.style.display = 'none';   // Se borra el spinner
        resultadoDiv.appendChild(div); // Se muestra el resultado
    }, 3000);
}

// Instanciar UI
const ui = new UI();




// Realiza la cotización con los datos
Divisa.prototype.cotizarDivisa = function() {
    /*
        1 = Dolar 19.85
        2 = Euro 21
        3 = Europeo 24.45
    */
    let cambio;

   switch(this.divisa) {
       case '1':    
            cambio = this.monto * 0.050;
            break;
       case '2':
            cambio = this.monto * 0.045;
            break;
       case '3':
            cambio = this.monto * 0.040;
            break;
       default:
           break;
   }

   return cambio;
}

function eventListeners() {
    const formulario = document.querySelector('#cotizador');
    formulario.addEventListener('submit', cotizarDivisa);
}

eventListeners();

function cotizarDivisa (e) {
    console.log('hola');
    e.preventDefault();
    // Leer la marca seleccionada
    const monto = document.querySelector('#monto').value;
    
    // Leer el año seleccionado
    const divisa = document.querySelector('#divisas').value;

    if (divisa === "" || monto === "") {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');

    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    // Instanciar un seguro
    const cotizacion = new Divisa(monto, divisa);
    const total = cotizacion.cotizarDivisa();

    // Utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, cotizacion);
} 