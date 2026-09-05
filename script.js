// =========================================================
// G MÓVIL — script.js
// Programación básica: validación de formulario + filtro de tabla
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Validación del formulario de registro ---------- */
  var form = document.getElementById("registro");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nombre = document.getElementById("nombre").value.trim();
      var apellido = document.getElementById("apellido").value.trim();
      var email = document.getElementById("email").value.trim();
      var telefono = document.getElementById("telefono").value.trim();
      var interes = document.getElementById("interes").value;
      var terminos = document.getElementById("terminos").checked;

      var errores = [];

      if (nombre === "") errores.push("El nombre es obligatorio.");
      if (apellido === "") errores.push("El apellido es obligatorio.");
      if (!validarEmail(email)) errores.push("Escribe un correo electrónico válido.");
      if (telefono.length < 7) errores.push("Escribe un teléfono válido.");
      if (interes === "") errores.push("Selecciona un producto de interés.");
      if (!terminos) errores.push("Debes aceptar los términos y condiciones.");

      if (errores.length > 0) {
        alert("Por favor revisa lo siguiente:\n\n- " + errores.join("\n- "));
        return;
      }

      alert("¡Gracias, " + nombre + "! Tu registro se envió correctamente. Un asesor de G Móvil te contactará pronto.");
      form.reset();
    });
  }

  function validarEmail(valor) {
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(valor);
  }

  /* ---------- 2. Filtro de categoría en la tabla de productos ---------- */
  var chips = document.querySelectorAll(".chip");
  var filas = document.querySelectorAll("table.stock tbody tr");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");

      var categoria = chip.textContent.trim().toLowerCase();

      filas.forEach(function (fila) {
        var textoCategoria = fila.children[2].textContent.trim().toLowerCase();
        if (categoria === "todas" || textoCategoria.indexOf(categoria) !== -1) {
          fila.style.display = "";
        } else {
          fila.style.display = "none";
        }
      });
    });
  });

});
