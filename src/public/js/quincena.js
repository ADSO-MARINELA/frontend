// Definición de variables
const url = "http://localhost:3000/quincenas/quincena/";
const contenedor = document.querySelector("tbody");
let resultados = "";

// Asegúrate de que el modal esté inicializado correctamente
const modalQuincena = new bootstrap.Modal(
  document.getElementById("modalQuincena")
);

// Selecciona el formulario y los campos del formulario usando los IDs correctos
const formPersonal = document.querySelector("form");
const fecha = document.querySelector("#fecha");
const ingreso = document.querySelector("#ingreso");
let opcion = "editar";

//Funcion para mostrar los resultados
const mostrar = (quincenas) => {
  console.log("Datos recibidos:", quincenas); // Verifica la estructura de los datos
  if (Array.isArray(quincenas)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    quincenas.forEach((quincena) => {
      const fecha = new Date(quincena.FECHA);

      // Obtener día, mes y año
      const dia = fecha.getUTCDate().toString().padStart(2, "0");
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
      const año = fecha.getUTCFullYear();

      // Formatear la fecha
      const fechaFormateada = `${dia}/${mes}/${año}`;

      resultados += `
                            <tr>
                                <td>${quincena.ID_QUINCENA}</td>
                                <td>${fechaFormateada}</td>
                                <td>${quincena.INGRESO}</td>
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
