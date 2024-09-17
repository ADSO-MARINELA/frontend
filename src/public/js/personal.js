// Definición de variables
const url = "http://localhost:3000/personal/personall/";
const contenedor = document.querySelector("tbody");
let resultados = "";

// Asegúrate de que el modal esté inicializado correctamente
const modalPersonal = new bootstrap.Modal(
  document.getElementById("modalPersonal")
);

// Selecciona el formulario y los campos del formulario usando los IDs correctos
const formPersonal = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const documento = document.querySelector("#documento");
const celular = document.querySelector("#celular");
const tipos = document.querySelector("#tipos");
const fecha = document.querySelector("#fecha");
const estado = document.querySelector("#estado");
const documentoError = document.querySelector("#documento-error");
const celularError = document.querySelector("#celular-error");
const btnCrear = document.getElementById("btnCrear"); // Botón para crear cliente
let opcion = "crear"; // Variable para controlar la opción de creación o edición

// Verifica que btnCrear esté definido y tenga el evento agregado correctamente
if (btnCrear) {
  btnCrear.addEventListener("click", () => {
    if (opcion == "crear") {
      // Limpia los valores de los campos del formulario
      if (nombre) nombre.value = "";
      if (documento) documento.value = "";
      if (celular) celular.value = "";
      if (tipos) tipos.value = "";
      if (fecha) fecha.value = "";
      if (estado) estado.value = "";

      // Muestra el modal
      modalPersonal.show();
    } else {
      // Aquí puedes manejar otras opciones si es necesario
      console.log("Opción no soportada.");
    }
  });
} else {
  console.error("Botón Crear no encontrado.");
}

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

// Selecciona el botón de "Cerrar" dentro del modal
const btnCerrarModal = document.querySelector('#modalPersonal .btn-secondary');

// Añade el evento click para cerrar el modal
btnCerrarModal.addEventListener('click', () => {
  modalPersonal.hide(); // Oculta el modal al hacer clic en el botón "Cerrar"
});


//Funcion para mostrar los resultados
const mostrar = (personal) => {
  console.log("Datos recibidos:", personal); // Verifica la estructura de los datos
  if (Array.isArray(personal)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    personal.forEach((personall) => {
      const fecha = new Date(personall.FECHA);

      // Obtener día, mes y año
      const dia = fecha.getUTCDate().toString().padStart(2, "0");
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
      const año = fecha.getUTCFullYear();

      // Formatear la fecha
      const fechaFormateada = `${dia}/${mes}/${año}`;

      resultados += `
                            <tr>
                                <td>${personall.ID_PERSONAL}</td>
                                <td>${personall.NOMBRE}</td>
                                <td>${personall.DOCUMENTO}</td>
                                <td>${personall.CELULAR}</td>
                                <td>${personall.TIPOS}</td>
                                <td>${fechaFormateada}</td>
                                <td>${personall.ESTADO}</td>
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

// Procedimiento Mostrar
fetch(url)
  .then((respuesta) => respuesta.json())
  .then((data) => {
    console.log("Datos de la API:", data); // Verifica los datos aquí
    mostrar(data.respuesta); // Asegúrate de pasar el array correcto
  })
  .catch((error) => console.log(error));

const on = (element, event, selector, handler) => {
  // console.log(element);
  // console.log(event);
  // console.log(selector);
  // console.log(handler);
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

// Procedimiento Borrar
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
      alertify.success("Personal eliminado");
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

//Procedimiento Editar
let idform = 0;
on(document, "click", ".btnEditar", (e) => {
  // console.log("EDITADO");
  const fila = e.target.parentNode.parentNode;
  idform = fila.children[0].innerHTML;
  // console.log(idform);
  const nombreForm = fila.children[1].innerHTML;
  const documentoForm = fila.children[2].innerHTML;
  const celularForm = fila.children[3].innerHTML;
  const tiposForm = fila.children[4].innerHTML;
  const fechaForm = convertirFecha(fila.children[5].innerHTML.trim());
  const estadoForm = fila.children[6].innerHTML;
  nombre.value = nombreForm;
  documento.value = documentoForm;
  celular.value = celularForm;
  tipos.value = tiposForm;
  fecha.value = fechaForm;
  estado.value = estadoForm;
  opcion = "editar";
  modalPersonal.show();
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

// Procedimiento para Crear y Editar
formPersonal.addEventListener("submit", (e) => {
  e.preventDefault();
  let mensaje = "";
  let tipo = "success";
  if (opcion == "crear") {
    // console.log("OPCION CREAR");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        documento: documento.value,
        celular: celular.value,
        tipos: tipos.value,
        fecha: fecha.value,
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
  }
  if (opcion == "editar") {
    // console.log("OPCION EDITAR");
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
        tipos: tipos.value,
        fecha: fecha.value,
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
  modalPersonal.hide();
});
