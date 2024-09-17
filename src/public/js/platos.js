// Definición de variables
const url = "http://localhost:3000/platos/plato/";
const contenedor = document.querySelector("tbody");
let resultados = "";

// Asegúrate de que el modal esté inicializado correctamente
const modalPlatos = new bootstrap.Modal(document.getElementById("modalPlatos"));

// Selecciona el formulario y los campos del formulario usando los IDs correctos
const formPlatos = document.querySelector("form");
const nombres = document.querySelector("#nombres");
const categoria = document.querySelector("#categoria");
const descripcion = document.querySelector("#descripcion");
const precio = document.querySelector("#precio");
const imagen = document.querySelector("#imagen");
const stock = document.querySelector("#stock");
const rentabilidad = document.querySelector("#rentabilidad");

// Función para mostrar los resultados
const mostrar = (platos) => {
  console.log("Datos recibidos:", platos); // Verifica la estructura de los datos

  if (Array.isArray(platos)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    platos.forEach((plato) => {
      resultados += `
        <tr>
          <td>${plato.ID_PLATO}</td>
          <td>${plato.NOMBRES}</td>
          <td>${plato.CATEGORIA}</td>
          <td>${plato.DESCRIPCION}</td>
          <td>${plato.PRECIO}</td>
          <td><img src="${plato.IMAGEN}" alt="Imagen del plato" style="width:150px; height:auto;"/></td>
          <td>${plato.STOCK}</td>
          <td>${plato.RENTABILIDAD}</td>
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

/* Función de validación para el campo nombre */

const validarNombre = () => {
  const regex = /^[a-zA-Z\s]*$/; // Expresión regular para permitir solo letras y espacios
  const valor = nombres.value;

  if (!regex.test(valor)) {
    nombres.value = valor.slice(0, -1); // Elimina el último carácter ingresado si no es válido
    // Aquí puedes mostrar un mensaje de error si deseas
    alert("Solo se permiten letras en el campo Nombre");
    return false;
  }
  return true;
};
// Añade el evento input al campo de nombre para validar mientras el usuario escribe
nombres.addEventListener("input", validarNombre);

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

//Procedimiento Borrar
on(document, "click", ".btnBorrar", (e) => {
  // console.log('BORRADO')
  const fila = e.target.parentNode.parentNode;
  const idd = fila.firstElementChild.innerHTML;
  const idjson = JSON.stringify(idd);
  alertify.confirm(
    "¿Estas Seguro de Eliminar a este Plato?",
    function () {
      fetch(url + idd, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
      alertify.success("Plato Eliminado");
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
  const nombresForm = fila.children[1].innerHTML;
  const categoriaForm = fila.children[2].innerHTML;
  const descripcionForm = fila.children[3].innerHTML;
  const precioForm = fila.children[4].innerHTML;
  const imagenForm = fila.children[5].querySelector("img").src; // Obtener la URL de la imagen
  const stockForm = fila.children[6].innerHTML;
  const rentabilidadForm = fila.children[7].innerHTML;
  nombres.value = nombresForm;
  categoria.value = categoriaForm;
  descripcion.value = descripcionForm;
  precio.value = precioForm;
  imagen.value = imagenForm;
  stock.value = stockForm;
  rentabilidad.value = rentabilidadForm;
  opcion = "editar";
  modalPlatos.show();
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
formPlatos.addEventListener("submit", (e) => {
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
        nombres: nombres.value,
        categoria: categoria.value,
        descripcion: descripcion.value,
        precio: precio.value,
        imagen: imagen.value,
        stock: stock.value,
        rentabilidad: rentabilidad.value,
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
        nombres: nombres.value,
        categoria: categoria.value,
        descripcion: descripcion.value,
        precio: precio.value,
        imagen: imagen.value,
        stock: stock.value,
        rentabilidad: rentabilidad.value,
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
  modalPlatos.hide();
});

// Función para filtrar la tabla
function filterTable() {
  // Obtener el valor del campo de búsqueda
  const query = document
    .getElementById("datatable-search-input")
    .value.toLowerCase();

  // Obtener todas las filas de la tabla
  const rows = document.querySelectorAll("#tablaPlatos tbody tr");

  rows.forEach((row) => {
    // Obtener el texto de la celda de la columna "Nombre" (la segunda columna)
    const nombreCell = row.cells[1].textContent.toLowerCase();

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
