// Definición de variables
const url = "http://localhost:3000/ordenes/orden/";
const contenedor = document.querySelector("tbody");
let resultados = "";

// Asegúrate de que el modal esté inicializado correctamente
const modalOrdenes = new bootstrap.Modal(
  document.getElementById("modalOrdenes")
);

// Selecciona el formulario y los campos del formulario usando los IDs correctos
const formOrdenes = document.querySelector("form");
const estado = document.querySelector("#estado");
const cliente = document.querySelector("#cliente");
const fecha = document.querySelector("#fecha");
const metodo = document.querySelector("#metodo");
const cantidad = document.querySelector("#cantidad");
const total = document.querySelector("#total");
const plato = document.querySelector("#plato");

// Función para mostrar los resultados
const mostrar = (ordenes) => {
  console.log("Datos recibidos:", ordenes); // Verifica la estructura de los datos

  if (Array.isArray(ordenes)) {
    resultados = ""; // Limpiar resultados antes de añadir nuevos datos
    ordenes.forEach((orden) => {
      const fecha = new Date(orden.FECHA);

      // Obtener día, mes y año
      const dia = fecha.getUTCDate().toString().padStart(2, "0");
      const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
      const año = fecha.getUTCFullYear();

      // Formatear la fecha
      const fechaFormateada = `${dia}/${mes}/${año}`;
      resultados += `
        <tr>
          <td>${orden.ID_ORDEN}</td>
          <td>${orden.ESTADO}</td>
          <td>${orden.NOMBRE}</td>
          <td>${fechaFormateada}</td>
          <td>${orden.TIPO}</td>
          <td>${orden.CANTIDAD}</td>
          <td>${orden.TOTAL}</td>
          <td>${orden.NOMBRES}</td>
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
