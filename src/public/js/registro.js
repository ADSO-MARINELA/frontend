document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#register-form");
  const errorElement = document.querySelector(".error");
  const successElement = document.querySelector("#success-message");

  if (!form || !errorElement || !successElement) {
    console.error("Faltan elementos en el DOM.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const user = document.querySelector("#user").value.trim();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!user || !username || !password) {
      if (errorElement) {
        errorElement.textContent = "Todos los campos son obligatorios.";
        errorElement.classList.remove("escondido");
      }
      if (successElement) {
        successElement.classList.add("escondido");
      }
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/administrador/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: user,
            usuario: username,
            clave: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Mostrar un mensaje de éxito y ocultar el mensaje de error
        if (successElement) {
          successElement.textContent =
            data.message || "Registro exitoso. Por favor, inicia sesión.";
          successElement.classList.remove("escondido");
        }
        if (errorElement) {
          errorElement.classList.add("escondido");
        }
        form.reset(); // Limpiar el formulario
      } else {
        if (errorElement) {
          errorElement.textContent = data.error || "Error al registrarse";
          errorElement.classList.remove("escondido");
        }
        if (successElement) {
          successElement.classList.add("escondido");
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (errorElement) {
        errorElement.textContent =
          "Error en el servidor, por favor inténtalo de nuevo más tarde.";
        errorElement.classList.remove("escondido");
      }
      if (successElement) {
        successElement.classList.add("escondido");
      }
    }
  });
});
