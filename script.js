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

// Validaciones de entrada
const VALIDACIONES = {
    nombre: /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,100}$/,
    apellido: /^[a-záéúóíñA-ZÁÉÍÓÚÑ\s]{2,100}$/,
    telefono: /^[0-9]{10}$/,
    // CURP: 18 caracteres - 4 letras iniciales + 6 dígitos fecha (AAMMDD) + 1 sexo (H/M) + 5 caracteres entidad/consonantes + 2 verificadores
    curp: /^[A-ZÑ]{4}\d{6}[HM][A-Z0-9]{5}[0-9A-Z]{2}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Función para guardar un registro
function guardarRegistro() {
    // Obtener valores del formulario
    var nombre = document.getElementById('nombre').value.trim();
    var apellido1 = document.getElementById('apellido1').value.trim();
    var apellido2 = document.getElementById('apellido2').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var curp = document.getElementById('curp').value.trim();
    var email = document.getElementById('email').value.trim();
    
    // Validar nombre
    if (nombre == "") {
        alert("Por favor ingresa un nombre válido.");
        return;
    }
    if (!VALIDACIONES.nombre.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }
    
    // Validar apellido1
    if (apellido1 == "") {
        alert("Por favor ingresa el primer apellido.");
        return;
    }
    if (!VALIDACIONES.apellido.test(apellido1)) {
        alert("El apellido solo puede contener letras y espacios.");
        return;
    }
    
    // Validar apellido2 (opcional)
    if (apellido2 != "" && !VALIDACIONES.apellido.test(apellido2)) {
        alert("El segundo apellido solo puede contener letras y espacios.");
        return;
    }
    
    // Validar teléfono (opcional)
    if (telefono != "" && !VALIDACIONES.telefono.test(telefono)) {
        alert("El teléfono debe tener exactamente 10 dígitos.");
        return;
    }
    
    // Validar CURP (opcional)
    if (curp != "" && !VALIDACIONES.curp.test(curp)) {
        alert("El CURP tiene un formato inválido.");
        return;
    }
    
    // Validar email (opcional)
    if (email != "" && !VALIDACIONES.email.test(email)) {
        alert("El correo electrónico tiene un formato inválido.");
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
