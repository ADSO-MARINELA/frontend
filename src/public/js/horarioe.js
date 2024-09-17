// Definición de variables
const url = "http://localhost:3000/horarios/horario/";
const contenedor = document.querySelector("tbody");
let resultados = "";

// Asegúrate de que el modal esté inicializado correctamente
const modalHorarios = new bootstrap.Modal(
  document.getElementById("modalHorarios")
);

// Selecciona el formulario y los campos del formulario usando los IDs correctos
const formHorarios = document.querySelector("form");
const dia = document.querySelector("#dia");
const apertura = document.querySelector("#apertura");
const cierre = document.querySelector("#cierre");
const btnCrear = document.getElementById("btnCrear"); // Botón para crear cliente
let opcion = "crear"; // Variable para controlar la opción de creación o edición

// Verifica que btnCrear esté definido y tenga el evento agregado correctamente
if (btnCrear) {
  btnCrear.addEventListener("click", () => {
    if (opcion == "crear") {
      // Limpia los valores de los campos del formulario
      if (dia) dia.value = "";
      if (apertura) apertura.value = "";
      if (cierre) cierre.value = "";

      // Muestra el modal
      modalHorarios.show();
    } else {
      // Aquí puedes manejar otras opciones si es necesario
      console.log("Opción no soportada.");
    }
  });
} else {
  console.error("Botón Crear no encontrado.");
}

// Selecciona el botón de "Cerrar" dentro del modal
const btnCerrarModal = document.querySelector("#modalHorarios .btn-secondary");

// Añade el evento click para cerrar el modal
btnCerrarModal.addEventListener("click", () => {
  modalHorarios.hide(); // Oculta el modal al hacer clic en el botón "Cerrar"
});

//Funcion para mostrar los resultados
const mostrar = (horarios) => {
  console.log("Datos recibidos:", horarios); // Verifica la estructura de los datos

  if (Array.isArray(horarios)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    horarios.forEach((horario) => {
      resultados += `
                            <tr>
                                <td>${horario.ID_HORARIO}</td>
                                <td>${horario.DIA}</td>
                                <td>${horario.APERTURA}</td>
                                <td>${horario.CIERRE}</td>
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
    "¿Estás seguro de eliminar a este Horario?",
    function () {
      fetch(url + idd, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
      alertify.success("Horario eliminado");
    },
    function () {
      alertify.error("Acción cancelada");
    }
  );
});

//Procedimiento Editar
let idform = 0;
on(document, "click", ".btnEditar", (e) => {
  // console.log("EDITADO");
  const fila = e.target.parentNode.parentNode;
  idform = fila.children[0].innerHTML;
  // console.log(idform);
  const diaForm = fila.children[1].innerHTML;
  const aperturaForm = fila.children[2].innerHTML;
  const cierreForm = fila.children[3].innerHTML;
  dia.value = diaForm;
  apertura.value = aperturaForm;
  cierre.value = cierreForm;
  opcion = "editar";
  modalHorarios.show();
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
formHorarios.addEventListener("submit", (e) => {
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
        dia: dia.value,
        apertura: apertura.value,
        cierre: cierre.value,
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
        dia: dia.value,
        apertura: apertura.value,
        cierre: cierre.value,
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
  modalHorarios.hide();
});
