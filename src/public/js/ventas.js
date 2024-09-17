// Definición de variables
const url = "http://localhost:3000/ventas/venta/";
const contenedor = document.querySelector("tbody");
let resultados = "";

// Asegúrate de que el modal esté inicializado correctamente
const modalVentas = new bootstrap.Modal(document.getElementById("modalVentas"));

// Selecciona el formulario y los campos del formulario usando los IDs correctos
const formventaes = document.querySelector("form");
const fecha = document.querySelector("#fecha");
const cliente = document.querySelector("#cliente");
const orden = document.querySelector("#orden");

// Función para mostrar los resultados
const mostrar = (ventas) => {
  console.log("Datos recibidos:", ventas); // Verifica la estructura de los datos

  if (Array.isArray(ventas)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    ventas.forEach((venta) => {
      const fecha = new Date(venta.FECHA);

      // Obtener día, mes y año
      const dia = fecha.getUTCDate().toString().padStart(2, "0");
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
      const año = fecha.getUTCFullYear();

      // Formatear la fecha
      const fechaFormateada = `${dia}/${mes}/${año}`;

      resultados += `
        <tr>
          <td>${venta.ID_VENTA}</td>
          <td>${fechaFormateada}</td>
          <td>${venta.NOMBRE}</td>
          <td>${venta.FK_ORDEN}</td>
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
