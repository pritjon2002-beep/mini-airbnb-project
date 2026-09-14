document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", () => {
    if (form.checkValidity()) {
      document.getElementById("page-loader").classList.remove("d-none");
    }
  });
});

window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0.6";
  document.body.style.pointerEvents = "none";
});
