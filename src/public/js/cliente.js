/* Definir Variables */

const url = "http://localhost:3000/usuarios/usuario/"; // URL base para la API de usuarios
const contenedor = document.querySelector("tbody"); // Selección del contenedor donde se mostrará la tabla
let resultados = ""; // Variable para almacenar los resultados de la tabla

/* Inicializar Modal */

const modalClientes = new bootstrap.Modal(
  document.getElementById("modalClientes") // Selección del modal por su ID
);

/* Selecciona el formulario y los campos del formulario usando los IDs correctos */

const formClientes = document.querySelector("form"); // Selección del formulario
const nombre = document.querySelector("#nombre");
const documento = document.querySelector("#documento");
const celular = document.querySelector("#celular");
const direccion = document.querySelector("#direccion");
const rol = document.querySelector("#rol");
const limite = document.querySelector("#limite");
const inicia = document.querySelector("#inicia");
const vence = document.querySelector("#vence");
const estado = document.querySelector("#estado");
const documentoError = document.querySelector("#documento-error");
const celularError = document.querySelector("#celular-error");
const btnCrear = document.getElementById("btnCrear");
let opcion = "crear"; // Variable para controlar la opción de creación o edición

/* Verifica que btnCrear esté definido y tenga el evento agregado correctamente */

if (btnCrear) {
  btnCrear.addEventListener("click", () => {
    if (opcion == "crear") {
      // Limpia los valores de los campos del formulario
      if (nombre) nombre.value = "";
      if (documento) documento.value = "";
      if (celular) celular.value = "";
      if (direccion) direccion.value = "";
      if (rol) rol.value = "";
      if (limite) limite.value = "";
      if (inicia) inicia.value = "";
      if (vence) vence.value = "";
      if (estado) estado.value = "";

      // Muestra el modal
      modalClientes.show();
    } else {
      // Aquí puedes manejar otras opciones si es necesario
      console.log("Opción no soportada.");
    }
  });
} else {
  console.error("Botón Crear no encontrado.");
}

/* Validaciones */

/* Función de validación para el campo documento */

const validarDocumento = () => {
  let valor = documento.value;
  if (valor.length > 10) {
    valor = valor.slice(0, 10); // Trunca el valor a los primeros 10 caracteres
    documento.value = valor;
    documentoError.style.display = "block";
    return false;
  } else {
    documentoError.style.display = "none";
    return true;
  }
};
// Añade el evento input al campo de documento para validar mientras el usuario escribe
documento.addEventListener("input", validarDocumento);

/* Función de validación para el campo celular */

const validarCelular = () => {
  let valor = celular.value;
  if (valor.length > 10) {
    valor = valor.slice(0, 10); // Trunca el valor a los primeros 10 caracteres
    celular.value = valor;
    celularError.style.display = "block";
    return false;
  } else {
    celularError.style.display = "none";
    return true;
  }
};
// Añade el evento input al campo de documento para validar mientras el usuario escribe
celular.addEventListener("input", validarCelular);

/* Función de validación para el campo nombre */

const validarNombre = () => {
  const regex = /^[a-zA-Z\s]*$/; // Expresión regular para permitir solo letras y espacios
  const valor = nombre.value;

  if (!regex.test(valor)) {
    nombre.value = valor.slice(0, -1); // Elimina el último carácter ingresado si no es válido
    // Aquí puedes mostrar un mensaje de error si deseas
    alert("Solo se permiten letras en el campo Nombre");
    return false;
  }
  return true;
};
// Añade el evento input al campo de nombre para validar mientras el usuario escribe
nombre.addEventListener("input", validarNombre);

/* Función para establecer la fecha mínima en los campos de fecha */

const establecerFechaMinima = () => {
  // Obtener la fecha actual en formato YYYY-MM-DD
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  const fechaHoy = `${año}-${mes}-${dia}`;

  // Seleccionar los campos de fecha en el formulario
  const inicia = document.querySelector("#inicia");
  const vence = document.querySelector("#vence");

  // Establecer la fecha mínima en los campos
  if (inicia) {
    inicia.setAttribute("min", fechaHoy);
  }
  if (vence) {
    vence.setAttribute("min", fechaHoy);
  }
};
// Llamar a la función para establecer la fecha mínima cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", establecerFechaMinima);

/* Selecciona el botón de "Cerrar" dentro del modal */
const btnCerrarModal = document.querySelector("#modalClientes .btn-secondary");

/* Evento click para cerrar el modal */

btnCerrarModal.addEventListener("click", () => {
  modalClientes.hide(); // Oculta el modal al hacer clic en el botón "Cerrar"
});

/* Mostrar resultados de la API */

const mostrar = (usuarios) => {
  console.log("Datos recibidos:", usuarios); // Verifica la estructura de los datos

  if (Array.isArray(usuarios)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    usuarios.forEach((usuario) => {
      const fecha = new Date(usuario.INICIA);

      // Obtener día, mes y año
      const dia = fecha.getUTCDate().toString().padStart(2, "0");
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
      const año = fecha.getUTCFullYear();

      // Formatear la fecha
      const fechaFormateada = `${dia}/${mes}/${año}`;

      const fecha2 = new Date(usuario.VENCE);

      // Obtener día, mes y año
      const dia2 = fecha2.getUTCDate().toString().padStart(2, "0");
      const mes2 = (fecha2.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
      const año2 = fecha2.getUTCFullYear();

      // Formatear la fecha
      const fechaFormateada2 = `${dia2}/${mes2}/${año2}`;

      // Construir las filas de la tabla con los datos del usuario
      resultados += `
        <tr>
          <td>${usuario.ID_USUARIOS}</td>
          <td>${usuario.NOMBRE}</td>
          <td>${usuario.DOCUMENTO}</td>
          <td>${usuario.CELULAR}</td>
          <td>${usuario.DIRECCION}</td>
          <td>${usuario.ROL}</td>
          <td>${usuario.LIMITE}</td>
          <td>${fechaFormateada}</td>
          <td>${fechaFormateada2}</td>
          <td>${usuario.ESTADO}</td>
          <td class="text-center">
            <a class="btnEditar btn btn-primary">Editar</a>
            <br></br>
            <a class="btnBorrar btn btn-danger">Eliminar</a>
          </td>
        </tr>
      `;
    });

    contenedor.innerHTML = resultados;
  } else {
    console.error("Los datos recibidos no son un array.");
  }
};

/* Metodo GET */

fetch(url)
  .then((respuesta) => respuesta.json())
  .then((data) => {
    console.log("Datos de la API:", data); // Verifica los datos aquí
    mostrar(data.respuesta); // Asegúrate de pasar el array correcto
  })
  .catch((error) => console.log(error));

// Función para añadir eventos de manera delegada
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

/* Metodo DELETE */

on(document, "click", ".btnBorrar", (e) => {
  const fila = e.target.parentNode.parentNode; // Selecciona la fila del botón clickeado
  const idd = fila.firstElementChild.innerHTML; // Obtiene el ID del usuario
  alertify.confirm(
    "¿Estás seguro de eliminar a este usuario?",
    function () {
      fetch(url + idd, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
      alertify.success("Usuario eliminado");
    },
    function () {
      alertify.error("Acción cancelada");
    }
  );
});

/* Función para convertir la fecha de DD/MM/YYYY a YYYY-MM-DD */

const convertirFecha = (fechaFormateada) => {
  const [dia, mes, año] = fechaFormateada.split("/");
  return `${año}-${mes}-${dia}`;
};

/* Modal para editar */

let idform = 0;
on(document, "click", ".btnEditar", (e) => {
  const fila = e.target.parentNode.parentNode;
  idform = fila.children[0].innerHTML;
  const nombreForm = fila.children[1].innerHTML;
  const documentoForm = fila.children[2].innerHTML;
  const celularForm = fila.children[3].innerHTML;
  const direccionForm = fila.children[4].innerHTML;
  const rolForm = fila.children[5].innerHTML;
  const limiteForm = fila.children[6].innerHTML;
  const iniciaForm = convertirFecha(fila.children[7].innerHTML.trim());
  const venceForm = convertirFecha(fila.children[8].innerHTML.trim());
  const estadoForm = fila.children[9].innerHTML;

  // Rellenar el formulario con los datos del usuario a editar
  nombre.value = nombreForm;
  documento.value = documentoForm;
  celular.value = celularForm;
  direccion.value = direccionForm;
  rol.value = rolForm;
  limite.value = limiteForm;
  inicia.value = iniciaForm;
  vence.value = venceForm;
  estado.value = estadoForm;

  opcion = "editar"; // Cambiar la opción a "editar"
  modalClientes.show(); // Mostrar el modal
});

// Función para formatear el número con separadores de miles
const formatNumber = (value) => {
  const parts = value.split(".");
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? "." + parts[1] : "";

  return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + decimalPart;
};

// Función para eliminar los separadores de miles y convertir a número decimal
const parseNumber = (value) => {
  return parseFloat(value.replace(/,/g, "")) || 0;
};

// Event listener para formatear el número mientras el usuario escribe
limite.addEventListener("input", (e) => {
  let value = e.target.value;
  // Limpiar caracteres no numéricos y formatear el número
  const parsedValue = parseNumber(value);
  e.target.value = formatNumber(parsedValue.toString());
});

/* Función para mostrar alertas */
const mostrarAlerta = (mensaje, tipo) => {
  const container = document.getElementById("alert-container");
  container.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      <h4 class="alert-heading">${tipo === "success" ? "Éxito!" : "Error!"}</h4>
      <p>${mensaje}</p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
};

/* Metodo POST y PUT */

formClientes.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el envío del formulario
  const limiteDecimal = parseNumber(limite.value); // Convertir el valor del campo a número decimal
  let mensaje = "";
  let tipo = "success";
  if (opcion == "crear") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        documento: documento.value,
        celular: celular.value,
        direccion: direccion.value,
        rol: rol.value,
        limite: limiteDecimal,
        inicia: inicia.value,
        vence: vence.value,
        estado: estado.value,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        mensaje = "Cliente registrado exitosamente";
        mostrarAlerta(mensaje, tipo);
        setTimeout(() => location.reload(), 2000); // Recargar después de mostrar el mensaje
      })
      .catch(() => {
        mensaje = "Error al registrar el cliente";
        tipo = "danger";
        mostrarAlerta(mensaje, tipo);
      });
  } else if (opcion == "editar") {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idform,
        nombre: nombre.value,
        documento: documento.value,
        celular: celular.value,
        direccion: direccion.value,
        rol: rol.value,
        limite: limiteDecimal,
        inicia: inicia.value,
        vence: vence.value,
        estado: estado.value,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then(() => {
        mensaje = "Modificación exitosa";
        mostrarAlerta(mensaje, tipo);
        setTimeout(() => location.reload(), 2000); // Recargar después de mostrar el mensaje
      })
      .catch(() => {
        mensaje = "Error al modificar el cliente";
        tipo = "danger";
        mostrarAlerta(mensaje, tipo);
      });
  }
  modalClientes.hide();
});

/* Función para filtrar la tabla */
function filterTable() {
  const query = document
    .getElementById("datatable-search-input")
    .value.toLowerCase(); // Obtener el valor del campo de búsqueda
  const rows = document.querySelectorAll("#tablaClientes tbody tr"); // Obtener todas las filas de la tabla

  rows.forEach((row) => {
    const nombreCell = row.cells[1].textContent.toLowerCase(); // Obtener el texto de la celda de la columna "Nombre"

    // Mostrar u ocultar la fila según si el texto coincide con la búsqueda
    if (nombreCell.includes(query)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Añadir el event listener al campo de búsqueda
document
  .getElementById("datatable-search-input")
  .addEventListener("input", filterTable);
