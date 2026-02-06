// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// Se elimino la informacion sensible y se mejoraron las practicas de seguridad
// ============================================

// Variables globales (accesibles desde toda la aplicación)
var registros = [];
var contador = 0;

// SEGURIDAD: Se removieron credenciales y información sensible del código
const CONFIG = {
    maxRegistros: 1000
};

// Función principal de inicialización
function inicializar() {
    // Event listener para el formulario
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarRegistro();
    });
}

// Función para guardar un registro
function guardarRegistro() {
    // Obtener valores del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var telefono = document.getElementById('telefono').value;
    var curp = document.getElementById('curp').value;
    var email = document.getElementById('email').value;
    
    // SEGURIDAD: Se valida que el nombre no esté vacío - mensaje genérico
    if (nombre == "") {
        alert("Por favor ingresa un nombre válido.");
        return;
    }
    
    // Crear objeto de registro
    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString()
    };
    
    // Agregar al arreglo global
    registros.push(nuevoRegistro);
    
    // Mostrar en tabla
    agregarFilaTabla(nuevoRegistro);
    
    // Limpiar formulario
    document.getElementById('registroForm').reset();
}

// Función para agregar fila a la tabla
// Refactorizaicon para evitar inyeccion de HTML
function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');
    
    // SEGURIDAD: Se usan métodos seguros del DOM en lugar de concatenación de HTML
    var nuevaFila = document.createElement('tr');
    
    var celdaNombre = document.createElement('td');
    celdaNombre.textContent = registro.nombreCompleto;
    
    var celdaTelefono = document.createElement('td');
    celdaTelefono.textContent = registro.telefono;
    
    var celdaCurp = document.createElement('td');
    celdaCurp.textContent = registro.curp;
    
    var celdaEmail = document.createElement('td');
    celdaEmail.textContent = registro.email;
    
    nuevaFila.appendChild(celdaNombre);
    nuevaFila.appendChild(celdaTelefono);
    nuevaFila.appendChild(celdaCurp);
    nuevaFila.appendChild(celdaEmail);
    
    tabla.appendChild(nuevaFila);
}

// SEGURIDAD: Se removió la función enviarAServidor que exponía endpoints y tokens

// SEGURIDAD: Se removieron funciones comentadas que no se usan

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function() {
    inicializar();
});
