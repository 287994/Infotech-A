// Ruta a la que se entra después de iniciar sesión (cambiar cuando exista la página principal)
const DESTINO = "/app/";

const form = document.getElementById("login-form");
const errorBox = document.getElementById("error");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.textContent = "";
  submitBtn.disabled = true;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username.value.trim(),
        password: form.password.value,
      }),
    });
    const data = await res.json();

    if (res.ok && data.ok) {
      window.location.href = DESTINO;
    } else {
      errorBox.textContent = data.error || "No se pudo iniciar sesión";
    }
  } catch {
    errorBox.textContent = "No hay conexión con el servidor";
  } finally {
    submitBtn.disabled = false;
  }
});
