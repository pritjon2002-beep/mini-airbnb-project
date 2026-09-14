document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", () => {
    if (form.checkValidity()) {
      document.getElementById("page-loader").classList.remove("d-none");
    }
  });
});
