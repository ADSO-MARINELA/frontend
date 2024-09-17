// Definir la URL base
const BASE_URL = "http://localhost:3000";

// Construir la URL para la solicitud de inicio de sesión
const LOGIN_URL = `${BASE_URL}/administrador/loginadmin`;

// Función para vaciar los campos del formulario
const clearFormFields = () => {
  const user = document.querySelector("#user");
  const password = document.querySelector("#password");
  
  if (user) user.value = "";
  if (password) password.value = "";
};

// Manejo del inicio de sesión
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");
  const errorElement = document.querySelector(".error");

  // Vaciar los campos cuando el DOM esté completamente cargado
  clearFormFields();

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const user = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: user, clave: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem("token", data.token);
        // Redirigir al usuario a otra página o mostrar un mensaje de éxito
        window.location.href = "/dashboard";
      } else {
        if (response.status === 404 && data.message === "Usuario no existe") {
          errorElement.textContent = "Usuario no existe";
        } else if (response.status === 401 && data.message === "Clave incorrecta") {
          errorElement.textContent = "Clave errada";
        } else {
          errorElement.textContent = "Error al iniciar sesión";
        }
        errorElement.classList.remove("escondido");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      errorElement.textContent = "Error en el servidor, por favor inténtalo de nuevo más tarde";
      errorElement.classList.remove("escondido");
    }
  });
});
